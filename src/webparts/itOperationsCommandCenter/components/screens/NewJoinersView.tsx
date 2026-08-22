import * as React from 'react';
import styles from './NewJoinersView.module.scss';
import NavigationButtons from '../NavigationButtons';

export interface INewJoinerRequest {
  Id: number;
  Title: string;
  EmployeeName: string;
  RequestType?: { Value?: string } | string;
  Client?: { Title?: string };
  DOJ?: string;
  Location?: { Value?: string } | string;
  Status?: { Value?: string } | string;
}

export interface INewJoinersViewProps {
  requests: INewJoinerRequest[];
  onAddNewJoiner: () => void;
  onAddBulkNewJoiners: () => void;
  onBack: () => void;
  onDashboard: () => void;
  onViewRequest: (requestId: number) => void;
}

type IFilter = 'Pending' | 'In Progress' | 'Completed' | 'All';

interface IState {
  filter: IFilter;
  showAddOptions: boolean;
}

export default class NewJoinersView
  extends React.Component<INewJoinersViewProps, IState> {

  public state: IState = {
    filter: 'Pending',
    showAddOptions: false
  };

  private _choiceValue(
    value?: { Value?: string } | string
  ): string {
    if (!value) {
      return '';
    }

    return typeof value === 'string'
      ? value
      : value.Value || '';
  }

  private _formatDate(value?: string): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '-';
    }

    const day =
      date.getDate() < 10
        ? `0${date.getDate()}`
        : `${date.getDate()}`;

    const monthNumber = date.getMonth() + 1;

    const month =
      monthNumber < 10
        ? `0${monthNumber}`
        : `${monthNumber}`;

    return `${day}/${month}/${date.getFullYear()}`;
  }

  private _getNewJoiners(): INewJoinerRequest[] {
    return this.props.requests.filter(
      request =>
        this._choiceValue(request.RequestType) === 'New Joiner'
    );
  }

  private _getFilteredRequests(): INewJoinerRequest[] {
    const newJoiners =
      this._getNewJoiners();

    if (this.state.filter === 'All') {
      return newJoiners;
    }

    return newJoiners.filter(
      request =>
        this._choiceValue(request.Status) === this.state.filter
    );
  }

  private _getCount(filter: IFilter): number {
    const newJoiners =
      this._getNewJoiners();

    if (filter === 'All') {
      return newJoiners.length;
    }

    return newJoiners.filter(
      request =>
        this._choiceValue(request.Status) === filter
    ).length;
  }

  private _statusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return styles.statusPending;

      case 'In Progress':
        return styles.statusInProgress;

      case 'Completed':
        return styles.statusCompleted;

      default:
        return styles.statusDefault;
    }
  }

  private _toggleAddOptions = (): void => {
    this.setState({
      showAddOptions:
        !this.state.showAddOptions
    });
  };

  private _openSingle = (): void => {
    this.setState({
      showAddOptions: false
    });

    this.props.onAddNewJoiner();
  };

  private _openBulk = (): void => {
    this.setState({
      showAddOptions: false
    });

    this.props.onAddBulkNewJoiners();
  };

  public render():
    React.ReactElement<INewJoinersViewProps> {

    const filteredRequests =
      this._getFilteredRequests();

    return (
      <div className={styles.page}>

        <div className={styles.pageHeader}>

          <div>
            <h2>
              New Joiners
            </h2>

            <p>
              Manage onboarding requests and track their progress.
            </p>
          </div>

          <div className={styles.headerButtons}>

            <NavigationButtons
              onDashboard={
                this.props.onDashboard
              }
              onBack={
                this.props.onBack
              }
              backLabel="Back"
            />

            <div className={styles.addMenuWrapper}>

              <button
                type="button"
                className={styles.addButton}
                onClick={
                  this._toggleAddOptions
                }
              >
                + Add New Joiner
              </button>

              {this.state.showAddOptions && (
                <div className={styles.addMenu}>

                  <button
                    type="button"
                    className={styles.addMenuItem}
                    onClick={
                      this._openSingle
                    }
                  >
                    <strong>
                      Single New Joiner
                    </strong>

                    <span>
                      Create one onboarding request
                    </span>
                  </button>

                  <button
                    type="button"
                    className={styles.addMenuItem}
                    onClick={
                      this._openBulk
                    }
                  >
                    <strong>
                      Bulk New Joiners
                    </strong>

                    <span>
                      Create multiple onboarding requests
                    </span>
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

        <div className={styles.summaryGrid}>

          <div className={`${styles.summaryCard} ${styles.pendingCard}`}>
            <span>
              Pending
            </span>

            <strong>
              {this._getCount('Pending')}
            </strong>
          </div>

          <div className={`${styles.summaryCard} ${styles.progressCard}`}>
            <span>
              In Progress
            </span>

            <strong>
              {this._getCount('In Progress')}
            </strong>
          </div>

          <div className={`${styles.summaryCard} ${styles.completedCard}`}>
            <span>
              Completed
            </span>

            <strong>
              {this._getCount('Completed')}
            </strong>
          </div>

          <div className={`${styles.summaryCard} ${styles.allCard}`}>
            <span>
              All
            </span>

            <strong>
              {this._getCount('All')}
            </strong>
          </div>

        </div>

        <div className={styles.filterBar}>

          <button
            type="button"
            className={
              this.state.filter === 'Pending'
                ? styles.filterActive
                : styles.filterButton
            }
            onClick={() =>
              this.setState({
                filter: 'Pending'
              })
            }
          >
            Pending
          </button>

          <button
            type="button"
            className={
              this.state.filter === 'In Progress'
                ? styles.filterActive
                : styles.filterButton
            }
            onClick={() =>
              this.setState({
                filter: 'In Progress'
              })
            }
          >
            In Progress
          </button>

          <button
            type="button"
            className={
              this.state.filter === 'Completed'
                ? styles.filterActive
                : styles.filterButton
            }
            onClick={() =>
              this.setState({
                filter: 'Completed'
              })
            }
          >
            Completed
          </button>

          <button
            type="button"
            className={
              this.state.filter === 'All'
                ? styles.filterActive
                : styles.filterButton
            }
            onClick={() =>
              this.setState({
                filter: 'All'
              })
            }
          >
            All
          </button>

        </div>

        <div className={styles.tableCard}>

          <div className={styles.tableHeader}>
            <span>Employee</span>
            <span>Client</span>
            <span>DOJ</span>
            <span>Location</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filteredRequests.map(
            request => {

              const status =
                this._choiceValue(
                  request.Status
                );

              const location =
                this._choiceValue(
                  request.Location
                );

              return (
                <div
                  key={request.Id}
                  className={styles.tableRow}
                >

                  <div className={styles.employee}>
                    {request.EmployeeName || '-'}
                  </div>

                  <div>
                    {request.Client?.Title || '-'}
                  </div>

                  <div>
                    {this._formatDate(request.DOJ)}
                  </div>

                  <div>
                    {location || '-'}
                  </div>

                  <div>
                    <span
                      className={`${styles.statusPill} ${this._statusClass(status)}`}
                    >
                      {status || '-'}
                    </span>
                  </div>

                  <div>
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() =>
                        this.props.onViewRequest(
                          request.Id
                        )
                      }
                    >
                      View
                    </button>
                  </div>

                </div>
              );
            }
          )}

          {filteredRequests.length === 0 && (
            <div className={styles.emptyState}>
              No New Joiner requests found.
            </div>
          )}

        </div>

      </div>
    );
  }
}