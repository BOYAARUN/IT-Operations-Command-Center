import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './BulkNewJoinerForm.module.scss';
import NavigationButtons from '../../NavigationButtons';

export interface IBulkNewJoinerFormProps {
  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;
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

interface IBulkRow {
  rowId: number;
  employeeName: string;
  clientId: string;
  doj: string;
  location: string;
  companyEmail: string;
  mobileNumber: string;
  deliveryAddress: string;
  hardwareRequirement: string;
  ticketId: string;
}

interface IState {
  clients: IClient[];
  rows: IBulkRow[];
  loadingClients: boolean;
  saving: boolean;
  error: string;
  message: string;
}

export default class BulkNewJoinerForm
  extends React.Component<
    IBulkNewJoinerFormProps,
    IState
  > {

  public state: IState = {
    clients: [],
    rows: [this._createEmptyRow(1)],
    loadingClients: true,
    saving: false,
    error: '',
    message: ''
  };

  private _nextRowId = 2;

  public componentDidMount(): void {
    void this._loadClients();
  }

  private _createEmptyRow(rowId: number): IBulkRow {
    return {
      rowId,
      employeeName: '',
      clientId: '',
      doj: '',
      location: '',
      companyEmail: '',
      mobileNumber: '',
      deliveryAddress: '',
      hardwareRequirement: '',
      ticketId: ''
    };
  }

  private async _loadClients(): Promise<void> {
    try {
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
        loadingClients: false,
        error: ''
      });

    } catch (error) {

      this.setState({
        loadingClients: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to load clients.'
      });
    }
  }

  private _handleClientChange = (
    rowId: number,
    clientId: string
  ): void => {

    const selectedClient =
      this.state.clients.find(
        client =>
          client.Id.toString() === clientId
      );

    const rows =
      this.state.rows.map(row =>
        row.rowId === rowId
          ? {
              ...row,
              clientId,
              hardwareRequirement:
                selectedClient?.HardwareBaseline || ''
            }
          : row
      );

    this.setState({
      rows,
      error: ''
    });
  };

  private _updateRow(
    rowId: number,
    field: keyof IBulkRow,
    value: string
  ): void {

    const rows =
      this.state.rows.map(row =>
        row.rowId === rowId
          ? {
              ...row,
              [field]: value
            }
          : row
      );

    this.setState({
      rows
    });
  }

  private _handleDateChange(
    rowId: number,
    value: string
  ): void {

    let cleaned =
      value.replace(/\D/g, '');

    cleaned =
      cleaned.substring(0, 8);

    if (cleaned.length >= 5) {

      cleaned =
        `${cleaned.substring(0, 2)}/` +
        `${cleaned.substring(2, 4)}/` +
        cleaned.substring(4);

    } else if (cleaned.length >= 3) {

      cleaned =
        `${cleaned.substring(0, 2)}/` +
        cleaned.substring(2);
    }

    this._updateRow(
      rowId,
      'doj',
      cleaned
    );
  }

  private _addRow = (): void => {

    const rowId =
      this._nextRowId++;

    this.setState({
      rows: [
        ...this.state.rows,
        this._createEmptyRow(rowId)
      ]
    });
  };

  private _removeRow = (
    rowId: number
  ): void => {

    if (this.state.rows.length === 1) {
      return;
    }

    this.setState({
      rows:
        this.state.rows.filter(
          row => row.rowId !== rowId
        )
    });
  };

  private _convertDate(
    value: string
  ): string {

    const match =
      value.trim().match(
        /^(\d{2})\/(\d{2})\/(\d{4})$/
      );

    if (!match) {
      throw new Error(
        'DOJ must be in DD/MM/YYYY format.'
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
        'Invalid date. Please use DD/MM/YYYY.'
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

  private _validateRows(): void {

    if (this.state.rows.length === 0) {
      throw new Error(
        'Add at least one employee.'
      );
    }

    this.state.rows.forEach(
      (row, index) => {

        const rowNumber =
          index + 1;

        if (!row.employeeName.trim()) {
          throw new Error(
            `Row ${rowNumber}: Employee Name is required.`
          );
        }

        if (!row.clientId) {
          throw new Error(
            `Row ${rowNumber}: Client is required.`
          );
        }

        if (!row.doj.trim()) {
          throw new Error(
            `Row ${rowNumber}: DOJ is required.`
          );
        }

        if (!row.hardwareRequirement.trim()) {
          throw new Error(
            `Row ${rowNumber}: Hardware Requirement is required.`
          );
        }

        if (!row.ticketId.trim()) {
          throw new Error(
            `Row ${rowNumber}: Atera Ticket ID is required.`
          );
        }
      }
    );
  }

  private async _createOne(
    row: IBulkRow
  ): Promise<void> {

    const payload = {
      Title:
        row.ticketId.trim(),

      RequestType:
        'New Joiner',

      EmployeeName:
        row.employeeName.trim(),

      ClientId:
        Number(row.clientId),

      DOJ:
        this._convertDate(row.doj),

      Location:
        row.location || undefined,

      CompanyEmail:
        row.companyEmail.trim(),

      MobileNumber:
        row.mobileNumber.trim(),

      DeliveryAddress:
        row.deliveryAddress.trim(),

      HardwareRequirement:
        row.hardwareRequirement.trim(),

      Status:
        'Pending',

      VendorEmailSent:
        false,

      OffboardingAssetsProcessed:
        false
    };

    const response =
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
            JSON.stringify(payload)
        }
      );

    if (!response.ok) {

      const text =
        await response.text();

      throw new Error(
        `Unable to create ${row.employeeName}: ${text}`
      );
    }
  }

  private _createAll = async (): Promise<void> => {

    this.setState({
      error: '',
      message: '',
      saving: true
    });

    try {

      this._validateRows();

      for (
        let index = 0;
        index < this.state.rows.length;
        index++
      ) {

        await this._createOne(
          this.state.rows[index]
        );
      }

      this.setState({
        saving: false,

        message:
          `${this.state.rows.length} New Joiner request(s) created successfully.`
      });

      setTimeout(() => {

        this.props.onSuccess();

      }, 1200);

    } catch (error) {

      this.setState({
        saving: false,

        error:
          error instanceof Error
            ? error.message
            : 'Unable to create the New Joiner requests.'
      });
    }
  };

  public render():
    React.ReactElement<IBulkNewJoinerFormProps> {

    return (
      <div className={styles.page}>

        <div className={styles.header}>

          <div>

            <h2>
              Bulk New Joiners
            </h2>

            <p>
              Create multiple onboarding requests at once.
            </p>

          </div>

          <NavigationButtons
            onDashboard={() => {

              window.dispatchEvent(
                new CustomEvent('itom-dashboard')
              );

            }}
            onBack={
              this.props.onCancel
            }
            backLabel="Back to New Joiners"
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

        <div className={styles.card}>

          <div className={styles.topControls}>

            <div>

              <strong>
                {this.state.rows.length}
                {' '}
                employee(s)
              </strong>

              <div className={styles.helperText}>
                Client is selected separately for each employee.
              </div>

            </div>

            <button
              type="button"
              className={styles.addRowButton}
              onClick={
                this._addRow
              }
              disabled={
                this.state.saving
              }
            >
              + Add Row
            </button>

          </div>

          <div className={styles.tableWrapper}>

            <table>

              <thead>

                <tr>

                  <th>#</th>
                  <th>Employee Name *</th>
                  <th>Client *</th>
                  <th>DOJ *</th>
                  <th>Location</th>
                  <th>Company Email</th>
                  <th>Mobile Number</th>
                  <th>Delivery Address</th>
                  <th>Hardware Requirement *</th>
                  <th>Atera Ticket ID *</th>
                  <th></th>

                </tr>

              </thead>

              <tbody>

                {this.state.rows.map(
                  (row, index) => (

                    <tr key={row.rowId}>

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            row.employeeName
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'employeeName',
                                event.target.value
                              )
                          }
                          placeholder="Employee name"
                        />

                      </td>

                      <td>

                        <select
                          value={
                            row.clientId
                          }
                          onChange={
                            event =>
                              this._handleClientChange(
                                row.rowId,
                                event.target.value
                              )
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

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            row.doj
                          }
                          onChange={
                            event =>
                              this._handleDateChange(
                                row.rowId,
                                event.target.value
                              )
                          }
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                          inputMode="numeric"
                        />

                      </td>

                      <td>

                        <select
                          value={
                            row.location
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'location',
                                event.target.value
                              )
                          }
                        >

                          <option value="">
                            Select
                          </option>

                          <option value="WFO">
                            WFO
                          </option>

                          <option value="WFH">
                            WFH
                          </option>

                        </select>

                      </td>

                      <td>

                        <input
                          type="email"
                          value={
                            row.companyEmail
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'companyEmail',
                                event.target.value
                              )
                          }
                          placeholder="Company email"
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            row.mobileNumber
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'mobileNumber',
                                event.target.value
                              )
                          }
                          placeholder="Mobile"
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            row.deliveryAddress
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'deliveryAddress',
                                event.target.value
                              )
                          }
                          placeholder="Delivery address"
                        />

                      </td>

                      <td>

                        <textarea
                          value={
                            row.hardwareRequirement
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'hardwareRequirement',
                                event.target.value
                              )
                          }
                          rows={2}
                        />

                      </td>

                      <td>

                        <input
                          type="text"
                          value={
                            row.ticketId
                          }
                          onChange={
                            event =>
                              this._updateRow(
                                row.rowId,
                                'ticketId',
                                event.target.value
                              )
                          }
                          placeholder="Ticket ID"
                        />

                      </td>

                      <td>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            this._removeRow(
                              row.rowId
                            )
                          }
                          disabled={
                            this.state.rows.length === 1 ||
                            this.state.saving
                          }
                          title="Remove row"
                        >
                          ×
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          <div className={styles.footer}>

            <div className={styles.footerButtons}>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={
                  this.props.onCancel
                }
                disabled={
                  this.state.saving
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className={styles.createButton}
                onClick={() =>
                  void this._createAll()
                }
                disabled={
                  this.state.saving
                }
              >
                {this.state.saving
                  ? 'Creating...'
                  : `Create ${this.state.rows.length} New Joiner(s)`}
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }
}