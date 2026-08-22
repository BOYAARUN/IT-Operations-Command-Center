import * as React from 'react';
import styles from './ItOperationsCommandCenter.module.scss';
import type { IItOperationsCommandCenterProps } from './IItOperationsCommandCenterProps';

import NewJoinerForm from './forms/NewJoinerForm';
import BulkNewJoinerForm from './forms/bulk/BulkNewJoinerForm';

import NewJoinersView, {
  INewJoinerRequest
} from './screens/NewJoinersView';

import RequestDetailsView from './screens/RequestDetailsView';

import VendorActionsView, {
  IVendorActionRequest
} from './vendor/VendorActionsView';

import AssetsView from './assets/AssetsView';

interface IRequestItem {
  Id: number;
  Title: string;
  EmployeeName: string;

  RequestType?: {
    Value?: string;
  } | string;

  Client?: {
    Title?: string;
  };

  DOJ?: string;
  LWD?: string;

  Location?: {
    Value?: string;
  } | string;

  Status?: {
    Value?: string;
  } | string;

  CompanyEmail?: string;
  ClientEmail?: string;
  MobileNumber?: string;
  DeliveryAddress?: string;
  HardwareRequirement?: string;

  VendorEmailSent?: boolean;
  VendorEmailSentDate?: string;

  Created?: string;
}

interface ILicenseItem {
  Id: number;

  Status?: {
    Value?: string;
  } | string;

  AllocatedDate?: string;
  ReleasedDate?: string;
}

interface IRequestResponse {
  value: IRequestItem[];
}

interface ILicenseResponse {
  value: ILicenseItem[];
}

type IView =
  | 'dashboard'
  | 'newJoiners'
  | 'newJoinerForm'
  | 'bulkNewJoinerForm'
  | 'requestDetails'
  | 'editNewJoiner'
  | 'vendorActions'
  | 'assets';

interface IState {
  requests: IRequestItem[];

  activeLicenses: number;

  loading: boolean;

  error: string;

  view: IView;

  selectedRequestId?: number;
}

export default class ItOperationsCommandCenter
  extends React.Component<
    IItOperationsCommandCenterProps,
    IState
  > {

  public state: IState = {
    requests: [],
    activeLicenses: 0,
    loading: true,
    error: '',
    view: 'dashboard',
    selectedRequestId: undefined
  };

  public componentDidMount(): void {
    void this._loadDashboardData();
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

  private async _loadDashboardData(): Promise<void> {

    this.setState({
      loading: true,
      error: ''
    });

    try {

      await Promise.all([
        this._loadRequests(),
        this._loadLicenses()
      ]);

      this.setState({
        loading: false,
        error: ''
      });

    } catch (error) {

      this.setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load dashboard data.'
      });
    }
  }

  private async _loadRequests(): Promise<void> {

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items` +
      `?$select=Id,Title,EmployeeName,RequestType,Client/Title,DOJ,LWD,Location,Status,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement,VendorEmailSent,VendorEmailSentDate,Created` +
      `&$expand=Client` +
      `&$orderby=Created desc` +
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

      throw new Error(
        `IT Requests returned ${response.status} ${response.statusText}`
      );
    }

    const data:
      IRequestResponse =
      await response.json();

    this.setState({
      requests:
        data.value || []
    });
  }

  private async _loadLicenses(): Promise<void> {

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('License Allocations')/items` +
      `?$select=Id,Status,AllocatedDate,ReleasedDate` +
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

      throw new Error(
        `License Allocations returned ${response.status} ${response.statusText}`
      );
    }

    const data:
      ILicenseResponse =
      await response.json();

    const activeLicenses =
      (data.value || []).filter(
        item =>
          this._choiceValue(
            item.Status
          ) === 'Active'
      ).length;

    this.setState({
      activeLicenses
    });
  }

  private _activeRequests():
    IRequestItem[] {

    return this.state.requests.filter(
      item =>
        this._choiceValue(
          item.Status
        ) !== 'Completed'
    );
  }

  private _newJoiners():
    IRequestItem[] {

    return this.state.requests.filter(
      item =>
        this._choiceValue(
          item.RequestType
        ) === 'New Joiner' &&
        this._choiceValue(
          item.Status
        ) !== 'Completed'
    );
  }

  private _offboarding():
    IRequestItem[] {

    return this.state.requests.filter(
      item =>
        this._choiceValue(
          item.RequestType
        ) === 'Offboarding' &&
        this._choiceValue(
          item.Status
        ) !== 'Completed'
    );
  }

  private _vendorActions():
IRequestItem[] {

return this.state.requests.filter(
item =>

(
this._choiceValue(item.RequestType) === 'New Joiner' ||
this._choiceValue(item.RequestType) === 'Offboarding' ||
this._choiceValue(item.RequestType) === 'Replacement' ||
this._choiceValue(item.RequestType) === 'Additional Asset'
)

&&

item.VendorEmailSent !== true

&&

!!item.HardwareRequirement

&&

item.HardwareRequirement.trim().length > 0

&&

this._choiceValue(item.Status) !== 'Completed'

);

}

  private _requestTypeClass(
    type: string
  ): string {

    switch (type) {

      case 'New Joiner':
        return styles.requestTypeJoiner;

      case 'Offboarding':
        return styles.requestTypeOffboarding;

      case 'Replacement':
      case 'Additional Asset':
        return styles.requestTypeOther;

      default:
        return styles.requestTypeDefault;
    }
  }

  private _statusClass(
    status: string
  ): string {

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

  private _goDashboard = (): void => {

    this.setState({
      view: 'dashboard',
      selectedRequestId: undefined,
      error: ''
    });

    void this._loadDashboardData();
  };

  private _openNewJoiners = (): void => {

    this.setState({
      view: 'newJoiners',
      error: ''
    });
  };

  private _openNewJoinerForm = (): void => {

    this.setState({
      view: 'newJoinerForm',
      selectedRequestId: undefined,
      error: ''
    });
  };

  private _openBulkNewJoinerForm = (): void => {

    this.setState({
      view: 'bulkNewJoinerForm',
      selectedRequestId: undefined,
      error: ''
    });
  };

  private _openVendorActions = (): void => {

    this.setState({
      view: 'vendorActions',
      error: ''
    });
  };

  private _openAssets = (): void => {

    this.setState({
      view: 'assets',
      error: ''
    });
  };

  private _openRequestDetails = (
    requestId: number
  ): void => {

    this.setState({
      view: 'requestDetails',
      selectedRequestId:
        requestId,
      error: ''
    });
  };

  private _openEditRequest = (): void => {

    if (!this.state.selectedRequestId) {
      return;
    }

    this.setState({
      view: 'editNewJoiner',
      error: ''
    });
  };

  private _backToDashboard = (): void => {
    this._goDashboard();
  };

  private _backToNewJoiners = (): void => {

    this.setState({
      view: 'newJoiners',
      selectedRequestId: undefined,
      error: ''
    });

    void this._loadDashboardData();
  };

  private _backToRequestDetails = (): void => {

    if (!this.state.selectedRequestId) {
      this._backToNewJoiners();
      return;
    }

    this.setState({
      view: 'requestDetails',
      error: ''
    });
  };

  private _afterNewJoinerCreated = (): void => {

    this.setState({
      view: 'newJoiners',
      selectedRequestId: undefined,
      error: ''
    });

    void this._loadDashboardData();
  };

  private _afterBulkNewJoinersCreated = (): void => {

    this.setState({
      view: 'newJoiners',
      selectedRequestId: undefined,
      error: ''
    });

    void this._loadDashboardData();
  };

  private _afterEditSaved = (): void => {

    if (!this.state.selectedRequestId) {
      this._backToNewJoiners();
      return;
    }

    this.setState({
      view: 'requestDetails',
      error: ''
    });

    void this._loadDashboardData();
  };

  private _getNewJoinerRequests():
    INewJoinerRequest[] {

    return this.state.requests
      .filter(
        item =>
          this._choiceValue(
            item.RequestType
          ) === 'New Joiner'
      )
      .map(item => ({
        Id: item.Id,
        Title: item.Title,
        EmployeeName:
          item.EmployeeName,
        RequestType:
          item.RequestType,
        Client:
          item.Client,
        DOJ:
          item.DOJ,
        Location:
          item.Location,
        Status:
          item.Status
      }));
  }

  private _getVendorActionRequests():
    IVendorActionRequest[] {

    return this.state.requests
      .filter(
        item =>

(
this._choiceValue(item.RequestType) === 'New Joiner' ||
this._choiceValue(item.RequestType) === 'Offboarding' ||
this._choiceValue(item.RequestType) === 'Replacement' ||
this._choiceValue(item.RequestType) === 'Additional Asset'
)

&&

item.VendorEmailSent !== true

&&

!!item.HardwareRequirement &&
          item.HardwareRequirement.trim().length > 0 &&
          this._choiceValue(
            item.Status
          ) !== 'Completed'
      )
      .map(item => ({
        Id: item.Id,
        Title: item.Title,
        EmployeeName:
          item.EmployeeName,
        Client:
          item.Client,
        DOJ:
          item.DOJ,
        Location:
          item.Location,
        CompanyEmail:
          item.CompanyEmail,
        DeliveryAddress:
          item.DeliveryAddress,
        RequestType:
          item.RequestType,
        RequestDate:
          item.Created,
        LWD:
          item.LWD,
        HardwareRequirement:
          item.HardwareRequirement,
        VendorEmailSent:
          item.VendorEmailSent,
        VendorEmailSentDate:
          item.VendorEmailSentDate
      }));
  }

  private _markVendorRequestsSent =
    async (
      requestIds: number[]
    ): Promise<void> => {

      await Promise.all(
        requestIds.map(
          async requestId => {

            const response =
              await this.props.spHttpClient.post(
                `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${requestId})`,
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
                    JSON.stringify({
                      VendorEmailSent:
                        true
                    })
                }
              );

            if (!response.ok) {

              throw new Error(
                `Unable to mark request ${requestId} as sent.`
              );
            }
          }
        )
      );

      await this._loadDashboardData();
    };

  public render():
    React.ReactElement<
      IItOperationsCommandCenterProps
    > {

    if (
      this.state.view ===
      'assets'
    ) {

      return (
        <AssetsView
          spHttpClient={
            this.props.spHttpClient
          }
          spHttpClientConfiguration={
            this.props
              .spHttpClientConfiguration
          }
          webAbsoluteUrl={
            this.props.webAbsoluteUrl
          }
          onBack={
            this._backToDashboard
          }
          onDashboard={
            this._goDashboard
          }
        />
      );
    }

    if (
      this.state.view ===
      'vendorActions'
    ) {

      return (
        <VendorActionsView
          requests={
            this._getVendorActionRequests()
          }
          onBack={
            this._backToDashboard
          }
          onDashboard={
            this._goDashboard
          }
          onMarkSent={
            this._markVendorRequestsSent
          }
        />
      );
    }

    if (
      this.state.view ===
        'editNewJoiner' &&
      this.state.selectedRequestId
    ) {

      return (
        <NewJoinerForm
          requestId={
            this.state
              .selectedRequestId
          }
          spHttpClient={
            this.props.spHttpClient
          }
          spHttpClientConfiguration={
            this.props
              .spHttpClientConfiguration
          }
          webAbsoluteUrl={
            this.props.webAbsoluteUrl
          }
          onCancel={
            this._backToRequestDetails
          }
          onSuccess={
            this._afterEditSaved
          }
        />
      );
    }

    if (
      this.state.view ===
        'requestDetails' &&
      this.state.selectedRequestId
    ) {

      return (
        <RequestDetailsView
          requestId={
            this.state
              .selectedRequestId
          }
          spHttpClient={
            this.props.spHttpClient
          }
          spHttpClientConfiguration={
            this.props
              .spHttpClientConfiguration
          }
          webAbsoluteUrl={
            this.props.webAbsoluteUrl
          }
          onBack={
            this._backToNewJoiners
          }
          onDashboard={
            this._goDashboard
          }
          onEdit={
            this._openEditRequest
          }
        />
      );
    }

    if (
      this.state.view ===
      'newJoiners'
    ) {

      return (
        <NewJoinersView
          requests={
            this._getNewJoinerRequests()
          }
          onAddNewJoiner={
            this._openNewJoinerForm
          }
          onAddBulkNewJoiners={
            this._openBulkNewJoinerForm
          }
          onBack={
            this._backToDashboard
          }
          onDashboard={
            this._goDashboard
          }
          onViewRequest={
            this._openRequestDetails
          }
        />
      );
    }

    if (
      this.state.view ===
      'newJoinerForm'
    ) {

      return (
        <NewJoinerForm
          spHttpClient={
            this.props.spHttpClient
          }
          spHttpClientConfiguration={
            this.props
              .spHttpClientConfiguration
          }
          webAbsoluteUrl={
            this.props.webAbsoluteUrl
          }
          onCancel={
            this._backToNewJoiners
          }
          onSuccess={
            this._afterNewJoinerCreated
          }
        />
      );
    }

    if (
      this.state.view ===
      'bulkNewJoinerForm'
    ) {

      return (
        <BulkNewJoinerForm
          spHttpClient={
            this.props.spHttpClient
          }
          spHttpClientConfiguration={
            this.props
              .spHttpClientConfiguration
          }
          webAbsoluteUrl={
            this.props.webAbsoluteUrl
          }
          onCancel={
            this._backToNewJoiners
          }
          onSuccess={
            this._afterBulkNewJoinersCreated
          }
        />
      );
    }

    const activeRequests =
      this._activeRequests();

    const newJoiners =
      this._newJoiners();

    const offboarding =
      this._offboarding();

    const vendorActions =
      this._vendorActions();

    return (
      <div className={styles.appShell}>

        <aside className={styles.sidebar}>

          <div className={styles.brand}>

            <div className={styles.brandMark}>
              IT
            </div>

            <div>

              <div className={styles.brandTitle}>
                IT OPERATIONS
              </div>

              <div className={styles.brandSubtitle}>
                Command Center
              </div>

            </div>

          </div>

          <nav className={styles.navigation}>

            <button
              className={`${styles.navItem} ${styles.navItemActive}`}
            >
              <span className={styles.navIcon}>
                ⌂
              </span>

              Dashboard
            </button>

            <button
              className={styles.navItem}
              onClick={
                this._openNewJoiners
              }
            >
              <span className={styles.navIcon}>
                +
              </span>

              New Joiners
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ↪
              </span>

              Offboarding
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ▤
              </span>

              Open Requests
            </button>

            <button
              className={styles.navItem}
              onClick={
                this._openVendorActions
              }
            >
              <span className={styles.navIcon}>
                ✉
              </span>

              Vendor Actions
            </button>

            <button
              className={styles.navItem}
              onClick={
                this._openAssets
              }
            >
              <span className={styles.navIcon}>
                ▣
              </span>

              Assets
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ↶
              </span>

              Returned Assets
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ◈
              </span>

              Licenses
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ▥
              </span>

              Reports
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ⚙
              </span>

              Master Data
            </button>

            <button
              className={styles.navItem}
            >
              <span className={styles.navIcon}>
                ⚙
              </span>

              Settings
            </button>

          </nav>

        </aside>

        <main className={styles.mainContent}>

          <header className={styles.header}>

            <div>

              <h1>
                IT Operations Management
              </h1>

              <p>
                IT Operations Command Center
              </p>

            </div>

            <div
              className={
                styles.userArea
              }
            >

              <div
                className={
                  styles.userAvatar
                }
              >
                IT
              </div>

              <div>

                <div
                  className={
                    styles.userName
                  }
                >
                  {
                    this.props
                      .userDisplayName
                  }
                </div>

                <div
                  className={
                    styles.userRole
                  }
                >
                  IT Operations
                </div>

              </div>

            </div>

          </header>

          <div
            className={
              styles.dashboardBody
            }
          >

            {
              this.state.loading &&
              (
                <div
                  className={
                    styles.loadingState
                  }
                >
                  Loading IT Operations data...
                </div>
              )
            }

            {
              !this.state.loading &&
              this.state.error &&
              (

                <div
                  className={
                    styles.errorState
                  }
                >

                  <strong>
                    Unable to load dashboard data.
                  </strong>

                  <div>
                    {this.state.error}
                  </div>

                </div>
              )
            }

            {
              !this.state.loading &&
              !this.state.error &&
              (

                <>

                  <section
                    className={
                      styles.kpiGrid
                    }
                  >

                    <div
                      className={`${styles.kpiCard} ${styles.kpiGreen}`}
                    >

                      <div
                        className={
                          styles.kpiLabel
                        }
                      >
                        New Joiners
                      </div>

                      <div
                        className={
                          styles.kpiValue
                        }
                      >
                        {
                          newJoiners.length
                        }
                      </div>

                      <div
                        className={
                          styles.kpiSubtitle
                        }
                      >
                        Open requests
                      </div>

                    </div>

                    <div
                      className={`${styles.kpiCard} ${styles.kpiRed}`}
                    >

                      <div
                        className={
                          styles.kpiLabel
                        }
                      >
                        Offboarding
                      </div>

                      <div
                        className={
                          styles.kpiValue
                        }
                      >
                        {
                          offboarding.length
                        }
                      </div>

                      <div
                        className={
                          styles.kpiSubtitle
                        }
                      >
                        Open exits
                      </div>

                    </div>

                    <div
                      className={`${styles.kpiCard} ${styles.kpiBlue}`}
                    >

                      <div
                        className={
                          styles.kpiLabel
                        }
                      >
                        Open Requests
                      </div>

                      <div
                        className={
                          styles.kpiValue
                        }
                      >
                        {
                          activeRequests.length
                        }
                      </div>

                      <div
                        className={
                          styles.kpiSubtitle
                        }
                      >
                        Active requests
                      </div>

                    </div>

                    <div
                      className={`${styles.kpiCard} ${styles.kpiOrange}`}
                    >

                      <div
                        className={
                          styles.kpiLabel
                        }
                      >
                        Vendor Actions
                      </div>

                      <div
                        className={
                          styles.kpiValue
                        }
                      >
                        {
                          vendorActions.length
                        }
                      </div>

                      <div
                        className={
                          styles.kpiSubtitle
                        }
                      >
                        Awaiting action
                      </div>

                    </div>

                    <div
                      className={`${styles.kpiCard} ${styles.kpiPurple}`}
                    >

                      <div
                        className={
                          styles.kpiLabel
                        }
                      >
                        Licenses
                      </div>

                      <div
                        className={
                          styles.kpiValue
                        }
                      >
                        {
                          this.state
                            .activeLicenses
                        }
                      </div>

                      <div
                        className={
                          styles.kpiSubtitle
                        }
                      >
                        Currently allocated
                      </div>

                    </div>

                  </section>

                  <section
                    className={
                      styles.contentGrid
                    }
                  >

                    <div
                      className={
                        styles.panelLarge
                      }>

                      <div
                        className={
                          styles.panelHeader
                        }>

                        <div>

                          <h2>
                            Open Requests
                          </h2>

                          <span>
                            Active IT requests
                          </span>

                        </div>

                        <button
                          className={
                            styles.viewAllButton
                          }
                        >
                          View All
                        </button>

                      </div>

                      <div
                        className={
                          styles.requestHeader
                        }>

                        <span>
                          Employee
                        </span>

                        <span>
                          Client
                        </span>

                        <span>
                          Type
                        </span>

                        <span>
                          DOJ / LWD
                        </span>

                        <span>
                          Status
                        </span>

                      </div>

                      {
                        activeRequests
                          .slice(0, 8)
                          .map(
                            item => {

                              const requestType =
                                this._choiceValue(
                                  item.RequestType
                                );

                              const status =
                                this._choiceValue(
                                  item.Status
                                );

                              const requestDate =
                                requestType ===
                                'Offboarding'
                                  ? item.LWD
                                  : item.DOJ;

                              return (
                                <div
                                  key={
                                    item.Id
                                  }
                                  className={
                                    styles.requestRow
                                  }
                                >

                                  <span
                                    className={
                                      styles.employeeCell
                                    }
                                  >
                                    {
                                      item.EmployeeName ||
                                      '-'
                                    }
                                  </span>

                                  <span>
                                    {
                                      item.Client?.Title ||
                                      '-'
                                    }
                                  </span>

                                  <span>

                                    <span
                                      className={`${styles.requestTypePill} ${this._requestTypeClass(requestType)}`}
                                    >
                                      {
                                        requestType ||
                                        '-'
                                      }
                                    </span>

                                  </span>

                                  <span>
                                    {
                                      this._formatDate(
                                        requestDate
                                      )
                                    }
                                  </span>

                                  <span>

                                    <span
                                      className={`${styles.statusPill} ${this._statusClass(status)}`}
                                    >
                                      {
                                        status ||
                                        '-'
                                      }
                                    </span>

                                  </span>

                                </div>
                              );
                            }
                          )
                      }

                      {
                        activeRequests.length ===
                          0 && (
                          <div
                            className={
                              styles.emptyState
                            }
                          >
                            No open requests.
                          </div>
                        )
                      }

                    </div>

                    <div
                      className={
                        styles.panel
                      }
                    >

                      <div
                        className={
                          styles.panelHeader
                        }>

                        <div>

                          <h2>
                            Vendor Actions
                          </h2>

                          <span>
                            Pending vendor activity
                          </span>

                        </div>

                        <button
                          className={
                            styles.viewAllButton
                          }
                          onClick={
                            this._openVendorActions
                          }
                        >
                          View All
                        </button>

                      </div>

                      {
                        vendorActions
                          .slice(0, 5)
                          .map(
                            item => (

                              <div
                                key={
                                  item.Id
                                }
                                className={
                                  styles.vendorRow
                                }
                              >

                                <div>

                                  <strong>
                                    {
                                      item.EmployeeName ||
                                      '-'
                                    }
                                  </strong>

                                  <span>
                                    {
                                      item.Client?.Title ||
                                      '-'
                                    }
                                  </span>

                                </div>

                                <span
                                  className={
                                    styles.vendorHardware
                                  }
                                >
                                  {
                                    item.HardwareRequirement ||
                                    '-'
                                  }
                                </span>

                              </div>
                            )
                          )
                      }

                      {
                        vendorActions.length ===
                          0 && (
                          <div
                            className={
                              styles.emptyState
                            }
                          >
                            No pending vendor actions.
                          </div>
                        )
                      }

                    </div>

                  </section>

                  <section
                    className={
                      styles.bottomGrid
                    }
                  >

                    <div
                      className={
                        styles.panel
                      }
                    >

                      <div
                        className={
                          styles.panelHeader
                        }>

                        <div>

                          <h2>
                            Recent New Joiners
                          </h2>

                          <span>
                            Latest onboarding requests
                          </span>

                        </div>

                      </div>

                      {
                        newJoiners
                          .slice(0, 5)
                          .map(
                            item => (

                              <div
                                key={
                                  item.Id
                                }
                                className={
                                  styles.simpleRow
                                }
                              >

                                <div>

                                  <strong>
                                    {
                                      item.EmployeeName ||
                                      '-'
                                    }
                                  </strong>

                                  <span>
                                    {
                                      item.Client?.Title ||
                                      '-'
                                    }
                                  </span>

                                </div>

                                <span>
                                  {
                                    this._formatDate(
                                      item.DOJ
                                    )
                                  }
                                </span>

                              </div>
                            )
                          )
                      }

                      {
                        newJoiners.length ===
                          0 && (
                          <div
                            className={
                              styles.emptyState
                            }
                          >
                            No active new joiners.
                          </div>
                        )
                      }

                    </div>

                    <div
                      className={
                        styles.panel
                      }
                    >

                      <div
                        className={
                          styles.panelHeader
                        }>

                        <div>

                          <h2>
                            Recent Exits
                          </h2>

                          <span>
                            Latest offboarding requests
                          </span>

                        </div>

                      </div>

                      {
                        offboarding
                          .slice(0, 5)
                          .map(
                            item => (

                              <div
                                key={
                                  item.Id
                                }
                                className={
                                  styles.simpleRow
                                }
                              >

                                <div>

                                  <strong>
                                    {
                                      item.EmployeeName ||
                                      '-'
                                    }
                                  </strong>

                                  <span>
                                    {
                                      item.Client?.Title ||
                                      '-'
                                    }
                                  </span>

                                </div>

                                <span>
                                  {
                                    this._formatDate(
                                      item.LWD
                                    )
                                  }
                                </span>

                              </div>
                            )
                          )
                      }

                      {
                        offboarding.length ===
                          0 && (
                          <div
                            className={
                              styles.emptyState
                            }
                          >
                            No active offboarding requests.
                          </div>
                        )
                      }

                    </div>

                  </section>

                  <section
                    className={
                      styles.summaryPanel
                    }
                  >

                    <div
                      className={
                        styles.summaryTitle
                      }
                    >
                      Assets &amp; Licenses Summary
                    </div>

                    <div
                      className={
                        styles.summaryGrid
                      }
                    >

                      <div>

                        <span>
                          Assets in Use
                        </span>

                        <strong>
                          --
                        </strong>

                      </div>

                      <div>

                        <span>
                          Assets to Return
                        </span>

                        <strong>
                          --
                        </strong>

                      </div>

                      <div>

                        <span>
                          Returned Assets
                        </span>

                        <strong>
                          --
                        </strong>

                      </div>

                      <div>

                        <span>
                          Active Licenses
                        </span>

                        <strong>
                          {
                            this.state
                              .activeLicenses
                          }
                        </strong>

                      </div>

                      <div>

                        <span>
                          Licenses to Release
                        </span>

                        <strong>
                          --
                        </strong>

                      </div>

                      <div>

                        <span>
                          Released Licenses
                        </span>

                        <strong>
                          --
                        </strong>

                      </div>

                    </div>

                  </section>

                </>
              )
            }

          </div>

        </main>

      </div>
    );
  }
}