import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './RequestDetailsView.module.scss';
import NavigationButtons from '../NavigationButtons';

export interface IRequestDetails {
  Id: number;
  Title: string;
  EmployeeName: string;

  RequestType?: { Value?: string } | string;

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
}

export interface IRequestDetailsViewProps {
  requestId: number;

  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;

  onBack: () => void;
  onDashboard: () => void;
  onEdit: () => void;
}

interface IState {
  request?: IRequestDetails;
  loading: boolean;
  error: string;
}

export default class RequestDetailsView
  extends React.Component<
    IRequestDetailsViewProps,
    IState
  > {

  public state: IState = {
    request: undefined,
    loading: true,
    error: ''
  };

  public componentDidMount(): void {
    void this._loadRequest();
  }

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

  private async _loadRequest(): Promise<void> {

    try {

      const url =
        `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${this.props.requestId})` +
        `?$select=Id,Title,EmployeeName,RequestType,Client/Title,DOJ,LWD,Location,Status,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement,VendorEmailSent,VendorEmailSentDate` +
        `&$expand=Client`;

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
          `Request returned ${response.status} ${response.statusText}`
        );
      }

      const request:
        IRequestDetails =
        await response.json();

      this.setState({
        request,
        loading: false,
        error: ''
      });

    } catch (error) {

      this.setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load request details.'
      });
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

  public render():
    React.ReactElement<IRequestDetailsViewProps> {

    if (this.state.loading) {

      return (
        <div className={styles.loading}>
          Loading request details...
        </div>
      );
    }

    if (this.state.error) {

      return (
        <div className={styles.page}>

          <div className={styles.error}>
            {this.state.error}
          </div>

          <NavigationButtons
            onDashboard={
              this.props.onDashboard
            }
            onBack={
              this.props.onBack
            }
            backLabel="Back to New Joiners"
          />

        </div>
      );
    }

    const request =
      this.state.request;

    if (!request) {

      return (
        <div className={styles.page}>

          <div className={styles.error}>
            Request not found.
          </div>

          <NavigationButtons
            onDashboard={
              this.props.onDashboard
            }
            onBack={
              this.props.onBack
            }
            backLabel="Back to New Joiners"
          />

        </div>
      );
    }

    const requestType =
      this._choiceValue(
        request.RequestType
      );

    const status =
      this._choiceValue(
        request.Status
      );

    const location =
      this._choiceValue(
        request.Location
      );

    return (
      <div className={styles.page}>

        <div className={styles.header}>

          <div>

            <div className={styles.breadcrumb}>
              New Joiners / Request Details
            </div>

            <h2>
              {request.EmployeeName ||
                'Request Details'}
            </h2>

            <p>
              {request.Title || '-'}
              {' · '}
              {request.Client?.Title || '-'}
            </p>

          </div>

          <div className={styles.headerActions}>

            <NavigationButtons
              onDashboard={
                this.props.onDashboard
              }
              onBack={
                this.props.onBack
              }
              backLabel="Back to New Joiners"
            />

            <button
              type="button"
              className={styles.editButton}
              onClick={
                this.props.onEdit
              }
            >
              Edit Request
            </button>

          </div>

        </div>

        <div className={styles.statusBar}>

          <div>
            <span>
              Request Type
            </span>

            <strong>
              {requestType || '-'}
            </strong>
          </div>

          <div>
            <span>
              Status
            </span>

            <strong
              className={`${styles.statusPill} ${this._statusClass(status)}`}
            >
              {status || '-'}
            </strong>
          </div>

          <div>
            <span>
              Atera Ticket ID
            </span>

            <strong>
              {request.Title || '-'}
            </strong>
          </div>

          <div>
            <span>
              Vendor Email
            </span>

            <strong>
              {request.VendorEmailSent
                ? `Sent ${this._formatDate(
                    request.VendorEmailSentDate
                  )}`
                : 'Pending'}
            </strong>
          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.cardTitle}>
            Employee Details
          </div>

          <div className={styles.detailGrid}>

            <div>
              <span>
                Employee Name
              </span>

              <strong>
                {request.EmployeeName || '-'}
              </strong>
            </div>

            <div>
              <span>
                Client
              </span>

              <strong>
                {request.Client?.Title || '-'}
              </strong>
            </div>

            <div>
              <span>
                DOJ
              </span>

              <strong>
                {this._formatDate(
                  request.DOJ
                )}
              </strong>
            </div>

            <div>
              <span>
                Location
              </span>

              <strong>
                {location || '-'}
              </strong>
            </div>

            <div>
              <span>
                Company Email
              </span>

              <strong>
                {request.CompanyEmail || '-'}
              </strong>
            </div>

            <div>
              <span>
                Client Email
              </span>

              <strong>
                {request.ClientEmail || '-'}
              </strong>
            </div>

            <div>
              <span>
                Mobile Number
              </span>

              <strong>
                {request.MobileNumber || '-'}
              </strong>
            </div>

            <div className={styles.fullWidth}>
              <span>
                Delivery Address
              </span>

              <strong>
                {request.DeliveryAddress || '-'}
              </strong>
            </div>

          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.cardTitle}>
            Hardware Requirement
          </div>

          <div className={styles.hardwareBox}>
            {request.HardwareRequirement ||
              'No hardware requirement entered.'}
          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.cardTitle}>
            Workflow
          </div>

          <div className={styles.workflowGrid}>

            <div className={styles.workflowItem}>
              <span>
                Vendor Action
              </span>

              <strong>
                {request.VendorEmailSent
                  ? `Sent ${this._formatDate(
                      request.VendorEmailSentDate
                    )}`
                  : 'Pending'}
              </strong>
            </div>

            <div className={styles.workflowItem}>
              <span>
                Checklist
              </span>

              <strong>
                Not connected yet
              </strong>
            </div>

            <div className={styles.workflowItem}>
              <span>
                Assets
              </span>

              <strong>
                Not connected yet
              </strong>
            </div>

            <div className={styles.workflowItem}>
              <span>
                Licenses
              </span>

              <strong>
                Not connected yet
              </strong>
            </div>

          </div>

        </div>

      </div>
    );
  }
}