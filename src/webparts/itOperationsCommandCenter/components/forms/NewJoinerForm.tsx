import NavigationButtons from '../NavigationButtons';
import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './NewJoinerForm.module.scss';

export interface INewJoinerFormProps {
  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;
  requestId?: number;
  onCancel: () => void;
  onSuccess: () => void;
}

interface IClient {
  Id: number;
  Title: string;
  HardwareBaseline?: string;
  IsActive?: boolean;
}

interface IClientResponse {
  value: IClient[];
}

interface IExistingRequest {
  Id: number;
  Title: string;
  EmployeeName?: string;
  ClientId?: number;
  DOJ?: string;
  Location?: { Value?: string } | string;
  CompanyEmail?: string;
  ClientEmail?: string;
  MobileNumber?: string;
  DeliveryAddress?: string;
  HardwareRequirement?: string;
}

interface IFormState {
  employeeName: string;
  clientId: string;
  clientName: string;
  hardwareRequirement: string;
  doj: string;
  location: string;
  companyEmail: string;
  clientEmail: string;
  mobileNumber: string;
  deliveryAddress: string;
  ticketId: string;

  clients: IClient[];

  loadingClients: boolean;
  loadingRequest: boolean;
  saving: boolean;

  message: string;
  error: string;
}

type ITextField =
  | 'employeeName'
  | 'location'
  | 'companyEmail'
  | 'clientEmail'
  | 'mobileNumber'
  | 'deliveryAddress'
  | 'hardwareRequirement'
  | 'ticketId';

export default class NewJoinerForm
  extends React.Component<INewJoinerFormProps, IFormState> {

  public state: IFormState = {
    employeeName: '',
    clientId: '',
    clientName: '',
    hardwareRequirement: '',
    doj: '',
    location: '',
    companyEmail: '',
    clientEmail: '',
    mobileNumber: '',
    deliveryAddress: '',
    ticketId: '',

    clients: [],
    loadingClients: true,
    loadingRequest: false,
    saving: false,

    message: '',
    error: ''
  };

  public componentDidMount(): void {
    void this._initialize();
  }

  private async _initialize(): Promise<void> {
    try {
      await this._loadClients();

      if (this.props.requestId) {
        await this._loadExistingRequest(
          this.props.requestId
        );
      }

    } catch (error) {
      this.setState({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load form data.'
      });
    }
  }

  private async _loadClients(): Promise<void> {

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Client Master')/items` +
      `?$select=Id,Title,HardwareBaseline,IsActive` +
      `&$filter=IsActive eq 1` +
      `&$orderby=Title asc` +
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
        `Client Master returned ${response.status} ${response.statusText}`
      );
    }

    const data: IClientResponse =
      await response.json();

    this.setState({
      clients: data.value || [],
      loadingClients: false
    });
  }

  private async _loadExistingRequest(
    requestId: number
  ): Promise<void> {

    this.setState({
      loadingRequest: true
    });

    const url =
      `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${requestId})` +
      `?$select=Id,Title,EmployeeName,ClientId,DOJ,Location,CompanyEmail,ClientEmail,MobileNumber,DeliveryAddress,HardwareRequirement`;

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
      IExistingRequest =
      await response.json();

    const selectedClient =
      this.state.clients.find(
        client =>
          client.Id === Number(request.ClientId)
      );

    this.setState({
      employeeName:
        request.EmployeeName || '',

      clientId:
        request.ClientId
          ? String(request.ClientId)
          : '',

      clientName:
        selectedClient?.Title || '',

      hardwareRequirement:
        request.HardwareRequirement || '',

      doj:
        this._sharePointDateToDisplay(
          request.DOJ
        ),

      location:
        this._choiceValue(
          request.Location
        ),

      companyEmail:
        request.CompanyEmail || '',

      clientEmail:
        request.ClientEmail || '',

      mobileNumber:
        request.MobileNumber || '',

      deliveryAddress:
        request.DeliveryAddress || '',

      ticketId:
        request.Title || '',

      loadingRequest: false
    });
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

  private _handleClientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {

    const clientId =
      event.target.value;

    const selectedClient =
      this.state.clients.find(
        client =>
          client.Id.toString() === clientId
      );

    this.setState({
      clientId,
      clientName:
        selectedClient?.Title || '',
      hardwareRequirement:
        selectedClient?.HardwareBaseline || ''
    });
  };

  private _handleTextChange = (
    field: ITextField
  ) => (
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ): void => {

    this.setState({
      [field]: event.target.value
    } as Pick<IFormState, ITextField>);
  };

  private _handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {

    let value =
      event.target.value.replace(/\D/g, '');

    value =
      value.substring(0, 8);

    if (value.length >= 5) {
      value =
        `${value.substring(0, 2)}/` +
        `${value.substring(2, 4)}/` +
        value.substring(4);
    } else if (value.length >= 3) {
      value =
        `${value.substring(0, 2)}/` +
        value.substring(2);
    }

    this.setState({
      doj: value
    });
  };

  private _sharePointDateToDisplay(
    value?: string
  ): string {

    if (!value) {
      return '';
    }

    const date =
      new Date(value);

    if (isNaN(date.getTime())) {
      return '';
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

  private _convertDateToSharePoint(
    dateText: string
  ): string {

    const value =
      dateText.trim();

    const match =
      value.match(
        /^(\d{2})\/(\d{2})\/(\d{4})$/
      );

    if (!match) {
      throw new Error(
        'DOJ must be entered as DD/MM/YYYY.'
      );
    }

    const day =
      Number(match[1]);

    const month =
      Number(match[2]);

    const year =
      Number(match[3]);

    const date =
      new Date(
        year,
        month - 1,
        day
      );

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new Error(
        'Please enter a valid DOJ in DD/MM/YYYY format.'
      );
    }

    const monthText =
      month < 10
        ? `0${month}`
        : `${month}`;

    const dayText =
      day < 10
        ? `0${day}`
        : `${day}`;

    return `${year}-${monthText}-${dayText}`;
  }

  private async _saveRequest(): Promise<void> {

    const {
      employeeName,
      clientId,
      hardwareRequirement,
      doj,
      location,
      companyEmail,
      clientEmail,
      mobileNumber,
      deliveryAddress,
      ticketId
    } = this.state;

    if (!employeeName.trim()) {
      this.setState({
        error: 'Employee Name is required.'
      });
      return;
    }

    if (!clientId) {
      this.setState({
        error: 'Client is required.'
      });
      return;
    }

    if (!doj.trim()) {
      this.setState({
        error: 'DOJ is required.'
      });
      return;
    }

    if (!ticketId.trim()) {
      this.setState({
        error: 'Atera Ticket ID is required.'
      });
      return;
    }

    this.setState({
      saving: true,
      error: '',
      message: ''
    });

    try {

      const sharePointDate =
        this._convertDateToSharePoint(
          doj
        );

      const payload: {
        Title: string;
        EmployeeName: string;
        ClientId: number;
        DOJ: string;
        Location?: string;
        CompanyEmail: string;
        ClientEmail: string;
        MobileNumber: string;
        DeliveryAddress: string;
        HardwareRequirement: string;
      } = {
        Title:
          ticketId.trim(),

        EmployeeName:
          employeeName.trim(),

        ClientId:
          Number(clientId),

        DOJ:
          sharePointDate,

        Location:
          location || undefined,

        CompanyEmail:
          companyEmail.trim(),

        ClientEmail:
          clientEmail.trim(),

        MobileNumber:
          mobileNumber.trim(),

        DeliveryAddress:
          deliveryAddress.trim(),

        HardwareRequirement:
          hardwareRequirement.trim()
      };

      let response;

      if (this.props.requestId) {

        response =
          await this.props.spHttpClient.post(
            `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items(${this.props.requestId})`,
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

      } else {

        response =
          await this.props.spHttpClient.post(
            `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('IT Requests')/items`,
            this.props.spHttpClientConfiguration,
            {
              headers: {
                Accept:
                  'application/json;odata=nometadata',

                'Content-Type':
                  'application/json;odata=nometadata'
              },

              body:
                JSON.stringify({
                  ...payload,

                  RequestType:
                    'New Joiner',

                  Status:
                    'Pending',

                  VendorEmailSent:
                    false,

                  OffboardingAssetsProcessed:
                    false
                })
            }
          );
      }

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          `Save failed (${response.status}). ${errorText}`
        );
      }

      this.setState({
        saving: false,

        message:
          this.props.requestId
            ? 'Request updated successfully.'
            : 'New Joiner request created successfully.',

        error: ''
      });

      setTimeout(() => {
        this.props.onSuccess();
      }, 900);

    } catch (error) {

      this.setState({
        saving: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to save the request.'
      });
    }
  }

  public render():
    React.ReactElement<INewJoinerFormProps> {

    const isEditMode =
      !!this.props.requestId;

    if (
      this.state.loadingClients ||
      this.state.loadingRequest
    ) {
      return (
        <div className={styles.formPage}>
          <div className={styles.helpText}>
            Loading request...
          </div>
        </div>
      );
    }

    return (
      <div className={styles.formPage}>

        <div className={styles.formHeader}>

          <div>
            <h2>
              {isEditMode
                ? 'Edit New Joiner'
                : 'New Joiner Request'}
            </h2>

            <p>
              {isEditMode
                ? 'Update the onboarding request details.'
                : 'Create a new onboarding request for the IT team.'}
            </p>
          </div>

          <NavigationButtons
  onDashboard={() => {
    window.dispatchEvent(
      new CustomEvent('itom-dashboard')
    );
  }}
  onBack={this.props.onCancel}
  backLabel="Back to New Joiners"
/>

        </div>

        {this.state.error && (
          <div className={styles.errorMessage}>
            {this.state.error}
          </div>
        )}

        {this.state.message && (
          <div className={styles.successMessage}>
            {this.state.message}
          </div>
        )}

        <div className={styles.formCard}>

          <div className={styles.sectionTitle}>
            Employee Details
          </div>

          <div className={styles.formGrid}>

            <div className={styles.field}>
              <label>
                Employee Name *
              </label>

              <input
                type="text"
                value={this.state.employeeName}
                onChange={
                  this._handleTextChange(
                    'employeeName'
                  )
                }
                placeholder="Enter employee name"
              />
            </div>

            <div className={styles.field}>
              <label>
                Client *
              </label>

              <select
                value={this.state.clientId}
                onChange={
                  this._handleClientChange
                }
              >

                <option value="">
                  Select Client
                </option>

                {this.state.clients.map(
                  client => (
                    <option
                      key={client.Id}
                      value={client.Id}
                    >
                      {client.Title}
                    </option>
                  )
                )}

              </select>
            </div>

            <div className={styles.field}>
              <label>
                DOJ *
              </label>

              <input
                type="text"
                value={this.state.doj}
                onChange={
                  this._handleDateChange
                }
                placeholder="DD/MM/YYYY"
                maxLength={10}
                inputMode="numeric"
              />

              <small className={styles.helpText}>
                Enter date as DD/MM/YYYY
              </small>
            </div>

            <div className={styles.field}>
              <label>
                Location
              </label>

              <select
                value={this.state.location}
                onChange={
                  this._handleTextChange(
                    'location'
                  )
                }
              >

                <option value="">
                  Select Location
                </option>

                <option value="WFO">
  WFO
</option>

<option value="WFH">
  WFH
</option>

              </select>
            </div>

            <div className={styles.field}>
              <label>
                Company Email
              </label>

              <input
                type="email"
                value={this.state.companyEmail}
                onChange={
                  this._handleTextChange(
                    'companyEmail'
                  )
                }
                placeholder="employee@finacplus.com"
              />
            </div>

            <div className={styles.field}>
              <label>
                Client Email
              </label>

              <input
                type="email"
                value={this.state.clientEmail}
                onChange={
                  this._handleTextChange(
                    'clientEmail'
                  )
                }
                placeholder="client email"
              />
            </div>

            <div className={styles.field}>
              <label>
                Mobile Number
              </label>

              <input
                type="text"
                value={this.state.mobileNumber}
                onChange={
                  this._handleTextChange(
                    'mobileNumber'
                  )
                }
                placeholder="Mobile number"
              />
            </div>

            <div
              className={`${styles.field} ${styles.fullWidth}`}
            >
              <label>
                Delivery Address
              </label>

              <textarea
                value={this.state.deliveryAddress}
                onChange={
                  this._handleTextChange(
                    'deliveryAddress'
                  )
                }
                placeholder="Enter delivery address"
                rows={3}
              />
            </div>

          </div>

          <div className={styles.sectionTitle}>
            Hardware &amp; Request
          </div>

          <div className={styles.hardwareInfo}>

            <div>
              <span>
                Selected Client
              </span>

              <strong>
                {this.state.clientName || '-'}
              </strong>
            </div>

            <div className={styles.hardwareBox}>

              <label>
                Hardware Requirement
              </label>

              <textarea
                value={
                  this.state.hardwareRequirement
                }
                onChange={
                  this._handleTextChange(
                    'hardwareRequirement'
                  )
                }
                rows={3}
              />

              <small>
                Loaded from Client Master. IT can
                modify it when required.
              </small>

            </div>

          </div>

          <div className={styles.field}>

            <label>
              Atera Ticket ID *
            </label>

            <input
              type="text"
              value={this.state.ticketId}
              onChange={
                this._handleTextChange(
                  'ticketId'
                )
              }
              placeholder="Enter Atera Ticket ID"
            />

          </div>

          <div className={styles.formFooter}>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={this.props.onCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.createButton}
              onClick={() =>
                void this._saveRequest()
              }
              disabled={this.state.saving}
            >
              {this.state.saving
                ? 'Saving...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Create New Joiner'}
            </button>

          </div>

        </div>

      </div>
    );
  }
}