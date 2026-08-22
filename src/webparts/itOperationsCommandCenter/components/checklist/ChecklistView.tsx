import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './ChecklistView.module.scss';
import NavigationButtons from '../NavigationButtons';

export interface IChecklistViewProps {
  requestId: number;
  employeeName: string;
  clientName: string;
  doj?: string;

  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;

  onBack: () => void;
  onDashboard: () => void;
}

interface IChecklistItem {
  Id: number;
  Title?: string;
  ChecklistItem?: string;

  ITRequestId?: number;

  ChecklistMasterItem?: {
    Title?: string;
  };

  Status?: {
    Value?: string;
  } | string;

  CompletedBy?: {
    Title?: string;
  };

  CompletedAt?: string;

  SortOrder?: number;
}

interface IChecklistResponse {
  value: IChecklistItem[];
}

interface ICurrentUser {
  Id: number;
  Title: string;
  Email?: string;
}

interface IState {
  items: IChecklistItem[];
  loading: boolean;
  savingId?: number;
  error: string;
  message: string;
  started: boolean;
  completedCount: number;
  totalCount: number;
  currentUser?: ICurrentUser;
}

export default class ChecklistView
  extends React.Component<IChecklistViewProps, IState> {

  public state: IState = {
    items: [],
    loading: true,
    savingId: undefined,
    error: '',
    message: '',
    started: false,
    completedCount: 0,
    totalCount: 0,
    currentUser: undefined
  };

  public componentDidMount(): void {
    void this._initialize();
  }

  private _choiceValue(
    value?: {
      Value?: string;
    } | string
  ): string {

    if (!value) {
      return '';
    }

    return typeof value === 'string'
      ? value
      : value.Value || '';
  }

  private _formatDate(
    value?: string
  ): string {

    if (!value) {
      return '-';
    }

    const date =
      new Date(value);

    if (isNaN(date.getTime())) {
      return '-';
    }

    const day =
      date.getDate() < 10
        ? `0${date.getDate()}`
        : `${date.getDate()}`;

    const monthNumber =
      date.getMonth() + 1;

    const month =
      monthNumber < 10
        ? `0${monthNumber}`
        : `${monthNumber}`;

    return `${day}/${month}/${date.getFullYear()}`;
  }

  private async _initialize(): Promise<void> {

    try {

      const [user, items] =
        await Promise.all([
          this._loadCurrentUser(),
          this._loadChecklist()
        ]);

      this.setState({
        currentUser: user,
        items,
        loading: false,
        totalCount: items.length,
        completedCount:
          this._completedCount(items)
      });

    } catch (error) {

      this.setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load onboarding checklist.'
      });
    }
  }

  private async _loadCurrentUser():
    Promise<ICurrentUser> {

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/currentuser`;

    const response =
      await this.props.spHttpClient.get(
        url,
        this.props.spHttpClientConfiguration,
        {
          headers: {
            Accept:
              'application/json;odata=nometadata'
          }
        }
      );

    if (!response.ok) {

      throw new Error(
        `Unable to load current user (${response.status}).`
      );
    }

    return await response.json();
  }

  private async _loadChecklist():
    Promise<IChecklistItem[]> {

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Onboarding Checklist')/items` +
      `?$select=Id,Title,ChecklistItem,ITRequestId,ChecklistMasterItem/Title,Status,CompletedBy/Title,CompletedAt,SortOrder` +
      `&$expand=ChecklistMasterItem,CompletedBy` +
      `&$filter=ITRequestId eq ${this.props.requestId}` +
      `&$orderby=SortOrder asc` +
      `&$top=5000`;

    const response =
      await this.props.spHttpClient.get(
        url,
        this.props.spHttpClientConfiguration,
        {
          headers: {
            Accept:
              'application/json;odata=nometadata'
          }
        }
      );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(
        `Onboarding Checklist returned ${response.status}. ${text}`
      );
    }

    const data:
      IChecklistResponse =
      await response.json();

    return data.value || [];
  }

  private _completedCount(
    items: IChecklistItem[]
  ): number {

    return items.filter(
      item =>
        this._choiceValue(
          item.Status
        ) === 'Completed'
    ).length;
  }

  private _isCompleted(
    item: IChecklistItem
  ): boolean {

    return this._choiceValue(
      item.Status
    ) === 'Completed';
  }

  private _isNA(
    item: IChecklistItem
  ): boolean {

    return this._choiceValue(
      item.Status
    ) === 'N/A';
  }

  private _itemTitle(
    item: IChecklistItem
  ): string {

    return (
      item.ChecklistItem ||
      item.ChecklistMasterItem?.Title ||
      item.Title ||
      'Checklist Item'
    );
  }

  private _markRequestInProgress =
    async (): Promise<void> => {

      const url =
        `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${this.props.requestId})`;

      const response =
        await this.props.spHttpClient.post(
          url,
          this.props.spHttpClientConfiguration,
          {
            headers: {
              Accept:
                'application/json;odata=nometadata',

              'Content-Type':
                'application/json;odata=nometadata',

              'IF-MATCH':
                '*',

              'X-HTTP-Method':
                'MERGE'
            },

            body: JSON.stringify({
              Status: 'In Progress'
            })
          }
        );

      if (!response.ok) {

        const text =
          await response.text();

        throw new Error(
          `Unable to start checklist (${response.status}). ${text}`
        );
      }
    };

  private _startChecklist =
    async (): Promise<void> => {

      this.setState({
        error: '',
        message: ''
      });

      try {

        await this._markRequestInProgress();

        this.setState({
          started: true,
          message:
            'Checklist started. Request is now In Progress.'
        });

      } catch (error) {

        this.setState({
          error:
            error instanceof Error
              ? error.message
              : 'Unable to start checklist.'
        });
      }
    };

  private _updateChecklistItem =
    async (
      item: IChecklistItem,
      status: 'Completed' | 'N/A'
    ): Promise<void> => {

      if (!this.state.currentUser) {
        this.setState({
          error:
            'Current user could not be identified.'
        });
        return;
      }

      this.setState({
        savingId: item.Id,
        error: '',
        message: ''
      });

      try {

        const url =
          `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Onboarding Checklist')/items(${item.Id})`;

        const payload: any = {
          Status: status,

          CompletedAt:
            new Date().toISOString(),

          CompletedById:
            this.state.currentUser.Id
        };

        if (status === 'N/A') {
          payload.CompletedAt =
            new Date().toISOString();

          payload.CompletedById =
            this.state.currentUser.Id;
        }

        const response =
          await this.props.spHttpClient.post(
            url,
            this.props.spHttpClientConfiguration,
            {
              headers: {
                Accept:
                  'application/json;odata=nometadata',

                'Content-Type':
                  'application/json;odata=nometadata',

                'IF-MATCH':
                  '*',

                'X-HTTP-Method':
                  'MERGE'
              },

              body:
                JSON.stringify(payload)
            }
          );

        if (!response.ok) {

          const text =
            await response.text();

          throw new Error(
            `Unable to update checklist item (${response.status}). ${text}`
          );
        }

        const items =
          this.state.items.map(
            current =>
              current.Id === item.Id
                ? {
                    ...current,
                    Status: status,
                    CompletedAt:
                      new Date().toISOString(),
                    CompletedBy: {
                      Title:
                        this.state.currentUser?.Title || ''
                    }
                  }
                : current
          );

        const completedCount =
          this._completedCount(items);

        this.setState({
          items,
          completedCount,
          savingId: undefined,
          started: true,
          message:
            status === 'Completed'
              ? 'Checklist item completed.'
              : 'Checklist item marked N/A.',
          error: ''
        });

        await this._checkForCompletion(
          items
        );

      } catch (error) {

        this.setState({
          savingId: undefined,
          error:
            error instanceof Error
              ? error.message
              : 'Unable to update checklist item.',
          message: ''
        });
      }
    };

  private async _checkForCompletion(
    items: IChecklistItem[]
  ): Promise<void> {

    if (items.length === 0) {
      return;
    }

    const allDone =
      items.every(
        item =>
          this._choiceValue(
            item.Status
          ) === 'Completed' ||
          this._choiceValue(
            item.Status
          ) === 'N/A'
      );

    if (!allDone) {
      return;
    }

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${this.props.requestId})`;

    const response =
      await this.props.spHttpClient.post(
        url,
        this.props.spHttpClientConfiguration,
        {
          headers: {
            Accept:
              'application/json;odata=nometadata',

            'Content-Type':
              'application/json;odata=nometadata',

            'IF-MATCH':
              '*',

            'X-HTTP-Method':
              'MERGE'
          },

          body: JSON.stringify({
            Status: 'Completed'
          })
        }
      );

    if (!response.ok) {

      throw new Error(
        `Checklist finished but request status could not be updated (${response.status}).`
      );
    }

    this.setState({
      message:
        'All checklist items are complete. Request marked Completed.'
    });
  }

  public render():
    React.ReactElement<IChecklistViewProps> {

    const progress =
      this.state.totalCount > 0
        ? Math.round(
            (
              this.state.completedCount /
              this.state.totalCount
            ) * 100
          )
        : 0;

    return (
      <div className={styles.page}>

        <div className={styles.header}>

          <div>

            <div className={styles.breadcrumb}>
              New Joiners / Checklist
            </div>

            <h2>
              Onboarding Checklist
            </h2>

            <p>
              {this.props.employeeName}
              {' · '}
              {this.props.clientName}
              {' · DOJ '}
              {this._formatDate(
                this.props.doj
              )}
            </p>

          </div>

          <NavigationButtons
            onDashboard={
              this.props.onDashboard
            }
            onBack={
              this.props.onBack
            }
            backLabel="Back to Request"
          />

        </div>

        {this.state.error && (
          <div className={styles.error}>
            {this.state.error}
          </div>
        )}

        {this.state.message && (
          <div className={styles.success}>
            {this.state.message}
          </div>
        )}

        <div className={styles.progressCard}>

          <div className={styles.progressHeader}>

            <div>

              <span>
                Checklist Progress
              </span>

              <strong>
                {this.state.completedCount}
                {' / '}
                {this.state.totalCount}
              </strong>

            </div>

            <div className={styles.progressPercent}>
              {progress}%
            </div>

          </div>

          <div className={styles.progressTrack}>

            <div
              className={styles.progressBar}
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>

        <div className={styles.actionBar}>

          <div>

            <span>
              Status
            </span>

            <strong>
              {progress === 100
                ? 'Completed'
                : this.state.started
                  ? 'In Progress'
                  : 'Pending'}
            </strong>

          </div>

          {!this.state.started &&
            progress < 100 && (
              <button
                type="button"
                className={styles.startButton}
                onClick={
                  this._startChecklist
                }
              >
                Start Checklist
              </button>
            )}

        </div>

        <div className={styles.listCard}>

          {this.state.loading && (
            <div className={styles.emptyState}>
              Loading checklist...
            </div>
          )}

          {!this.state.loading &&
            this.state.items.length === 0 && (
              <div className={styles.emptyState}>
                No checklist items were found for this request.
              </div>
            )}

          {!this.state.loading &&
            this.state.items.length > 0 &&
            this.state.items.map(
              (item, index) => {

                const completed =
                  this._isCompleted(item);

                const na =
                  this._isNA(item);

                return (
                  <div
                    key={item.Id}
                    className={
                      completed || na
                        ? `${styles.itemRow} ${styles.itemDone}`
                        : styles.itemRow
                    }
                  >

                    <div className={styles.itemNumber}>
                      {index + 1}
                    </div>

                    <div className={styles.checkboxArea}>

                      <input
                        type="checkbox"
                        checked={completed}
                        disabled={
                          completed ||
                          na ||
                          this.state.savingId === item.Id
                        }
                        onChange={() =>
                          void this._updateChecklistItem(
                            item,
                            'Completed'
                          )
                        }
                      />

                    </div>

                    <div className={styles.itemContent}>

                      <strong>
                        {this._itemTitle(item)}
                      </strong>

                      <span>
                        {item.ChecklistMasterItem?.Title ||
                          'Onboarding task'}
                      </span>

                    </div>

                    <div className={styles.itemStatus}>

                      {completed && (
                        <span
                          className={
                            styles.completedBadge
                          }
                        >
                          Completed
                        </span>
                      )}

                      {na && (
                        <span
                          className={
                            styles.naBadge
                          }
                        >
                          N/A
                        </span>
                      )}

                      {!completed && !na && (
                        <>

                          <button
                            type="button"
                            className={
                              styles.completeButton
                            }
                            disabled={
                              this.state.savingId === item.Id
                            }
                            onClick={() =>
                              void this._updateChecklistItem(
                                item,
                                'Completed'
                              )
                            }
                          >
                            {this.state.savingId === item.Id
                              ? 'Saving...'
                              : 'Complete'}
                          </button>

                          <button
                            type="button"
                            className={
                              styles.naButton
                            }
                            disabled={
                              this.state.savingId === item.Id
                            }
                            onClick={() =>
                              void this._updateChecklistItem(
                                item,
                                'N/A'
                              )
                            }
                          >
                            N/A
                          </button>

                        </>
                      )}

                    </div>

                    <div className={styles.completedInfo}>

                      {completed || na
                        ? `${item.CompletedBy?.Title || this.state.currentUser?.Title || ''} · ${this._formatDate(item.CompletedAt)}`
                        : ''}

                    </div>

                  </div>
                );
              }
            )}

        </div>

      </div>
    );
  }
}