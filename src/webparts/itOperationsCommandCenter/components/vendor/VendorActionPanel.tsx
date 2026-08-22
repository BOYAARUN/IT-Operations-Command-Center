import * as React from 'react';
import styles from './VendorActionsView.module.scss';

export interface IVendorActionRequest {
  Id: number;
  Title?: string;
  EmployeeName?: string;
  Client?: {
    Title?: string;
  };
  DOJ?: string;
  Location?: {
    Value?: string;
  } | string;
  CompanyEmail?: string;
  DeliveryAddress?: string;
  HardwareRequirement?: string;
  VendorEmailSent?: boolean;
  VendorEmailSentDate?: string;
}

export interface IVendorActionsViewProps {
  requests: IVendorActionRequest[];
  onBack: () => void;
  onMarkSent: (
    requestIds: number[]
  ) => Promise<void>;
}

interface IState {
  selectedIds: number[];
  copying: boolean;
  markingSent: boolean;
  message: string;
  error: string;
}

export default class VendorActionsView
  extends React.Component<
    IVendorActionsViewProps,
    IState
  > {

  public state: IState = {
    selectedIds: [],
    copying: false,
    markingSent: false,
    message: '',
    error: ''
  };

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

    if (
      isNaN(
        date.getTime()
      )
    ) {
      return '-';
    }

    const day =
      date.getDate();

    const month =
      date.getMonth() + 1;

    const dayText =
      day < 10
        ? '0' + day
        : '' + day;

    const monthText =
      month < 10
        ? '0' + month
        : '' + month;

    return (
      dayText +
      '/' +
      monthText +
      '/' +
      date.getFullYear()
    );
  }

  private _toggleSelection = (
    requestId: number
  ): void => {

    const exists =
      this.state.selectedIds.indexOf(
        requestId
      ) !== -1;

    let selectedIds: number[];

    if (exists) {

      selectedIds =
        this.state.selectedIds.filter(
          id =>
            id !== requestId
        );

    } else {

      selectedIds =
        this.state.selectedIds.concat(
          requestId
        );
    }

    this.setState({
      selectedIds:
        selectedIds,

      message:
        '',

      error:
        ''
    });
  };

  private _toggleSelectAll = (): void => {

    if (
      this.state.selectedIds.length ===
      this.props.requests.length
    ) {

      this.setState({
        selectedIds: []
      });

      return;
    }

    this.setState({
      selectedIds:
        this.props.requests.map(
          request =>
            request.Id
        )
    });
  };

  private _getSelectedRequests():
    IVendorActionRequest[] {

    const selected =
      this.state.selectedIds;

    return this.props.requests.filter(
      request =>
        selected.indexOf(
          request.Id
        ) !== -1
    );
  }

  private _escapeHtml(
    value: string
  ): string {

    return value
      .replace(
        /&/g,
        '&amp;'
      )
      .replace(
        /</g,
        '&lt;'
      )
      .replace(
        />/g,
        '&gt;'
      )
      .replace(
        /"/g,
        '&quot;'
      )
      .replace(
        /'/g,
        '&#039;'
      );
  }

  private _buildEmailSubject(
    requests: IVendorActionRequest[]
  ): string {

    const clients =
      Array.from(
        new Set(
          requests
            .map(
              request =>
                request.Client?.Title ||
                ''
            )
            .filter(
              Boolean
            )
        )
      );

    if (
      clients.length === 1
    ) {

      return (
        'New Joiner Asset Requirements - ' +
        clients[0]
      );
    }

    return (
      'New Joiner Asset Requirements'
    );
  }

  private _buildPlainTextBody(
    requests: IVendorActionRequest[]
  ): string {

    const rows =
      requests.map(
        (
          request,
          index
        ) => {

          const location =
            this._choiceValue(
              request.Location
            );

          return [
            `${index + 1}.`,
            `Employee Name: ${request.EmployeeName || '-'}`,
            `Client: ${request.Client?.Title || '-'}`,
            `DOJ: ${this._formatDate(request.DOJ)}`,
            `Location: ${location || '-'}`,
            `Company Email: ${request.CompanyEmail || '-'}`,
            `Delivery Address: ${request.DeliveryAddress || '-'}`,
            `Hardware Requirement: ${request.HardwareRequirement || '-'}`
          ].join(
            '\n'
          );
        }
      );

    return [
      'Hi Team,',
      '',
      'Please arrange the following IT assets for the below new joiners.',
      '',
      rows.join(
        '\n\n'
      ),
      '',
      'Please confirm once the assets are arranged.',
      '',
      'Regards,',
      'IT Operations'
    ].join(
      '\n'
    );
  }

  private _buildHtmlBody(
    requests: IVendorActionRequest[]
  ): string {

    const rows =
      requests
        .map(
          request => {

            const location =
              this._choiceValue(
                request.Location
              );

            return `
              <tr>
                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    request.EmployeeName || '-'
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    request.Client?.Title || '-'
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    this._formatDate(request.DOJ)
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    location || '-'
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    request.CompanyEmail || '-'
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    request.DeliveryAddress || '-'
                  )}
                </td>

                <td style="border:1px solid #d1d5db;padding:8px;">
                  ${this._escapeHtml(
                    request.HardwareRequirement || '-'
                  )}
                </td>
              </tr>
            `;
          }
        )
        .join('');

    return `
      <div
        style="
          font-family:Segoe UI,Arial,sans-serif;
          font-size:12px;
          color:#172033;
        "
      >

        <p>
          Hi Team,
        </p>

        <p>
          Please arrange the following IT assets for the below new joiners.
        </p>

        <table
          style="
            border-collapse:collapse;
            width:100%;
            max-width:1100px;
            font-family:Segoe UI,Arial,sans-serif;
            font-size:11px;
          "
        >

          <thead>

            <tr>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Employee Name
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Client
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                DOJ
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Location
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Company Email
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Delivery Address
              </th>

              <th
                style="
                  border:1px solid #d1d5db;
                  padding:8px;
                  text-align:left;
                  background:#f3f4f6;
                "
              >
                Hardware Requirement
              </th>

            </tr>

          </thead>

          <tbody>
            ${rows}
          </tbody>

        </table>

        <p>
          Please confirm once the assets are arranged.
        </p>

        <p>
          Regards,<br/>
          IT Operations
        </p>

      </div>
    `;
  }

  private _copyBulkEmail =
    async (): Promise<void> => {

      const requests =
        this._getSelectedRequests();

      if (
        requests.length === 0
      ) {

        this.setState({
          error:
            'Select at least one vendor action.',

          message:
            ''
        });

        return;
      }

      this.setState({

        copying:
          true,

        error:
          '',

        message:
          ''
      });

      try {

        const subject =
          this._buildEmailSubject(
            requests
          );

        const htmlBody =
          this._buildHtmlBody(
            requests
          );

        const plainBody =
          this._buildPlainTextBody(
            requests
          );

        const html =
          '<meta charset="utf-8">' +
          '<div>' +
          '<p><strong>Subject:</strong> ' +
          this._escapeHtml(
            subject
          ) +
          '</p>' +
          htmlBody +
          '</div>';

        const clipboardItem =
          new ClipboardItem({
            'text/html':
              new Blob(
                [html],
                {
                  type:
                    'text/html'
                }
              ),

            'text/plain':
              new Blob(
                [
                  'Subject: ' +
                  subject +
                  '\n\n' +
                  plainBody
                ],
                {
                  type:
                    'text/plain'
                }
              )
          });

        await navigator.clipboard.write(
          [
            clipboardItem
          ]
        );

        this.setState({

          copying:
            false,

          message:
            `${requests.length} vendor request(s) copied. Paste directly into Outlook.`,

          error:
            ''
        });

      } catch (error) {

        this.setState({

          copying:
            false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to copy the formatted email.'
        });
      }
    };

  private _markSelectedSent =
    async (): Promise<void> => {

      const requests =
        this._getSelectedRequests();

      if (
        requests.length === 0
      ) {

        this.setState({

          error:
            'Select at least one vendor action.',

          message:
            ''
        });

        return;
      }

      const confirmed =
        window.confirm(
          `Confirm that the vendor email has been sent for ${requests.length} selected request(s).`
        );

      if (!confirmed) {
        return;
      }

      this.setState({

        markingSent:
          true,

        error:
          '',

        message:
          ''
      });

      try {

        await this.props.onMarkSent(
          requests.map(
            request =>
              request.Id
          )
        );

        this.setState({

          selectedIds:
            [],

          markingSent:
            false,

          message:
            `${requests.length} vendor request(s) marked as sent.`,

          error:
            ''
        });

      } catch (error) {

        this.setState({

          markingSent:
            false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to mark vendor requests as sent.'
        });
      }
    };

  public render():
    React.ReactElement<IVendorActionsViewProps> {

    const selectedCount =
      this.state.selectedIds.length;

    const allSelected =
      this.props.requests.length > 0 &&
      selectedCount ===
        this.props.requests.length;

    return (
      <div className={styles.page}>

        <div className={styles.header}>

          <div>

            <h2>
              Vendor Actions
            </h2>

            <p>
              Pending vendor asset requests.
            </p>

          </div>

          <button
            type="button"
            onClick={
              this.props.onBack
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '34px',
              padding: '0 12px',
              border: '1px solid #d0d5dd',
              borderRadius: '7px',
              background: '#ffffff',
              color: '#344054',
              fontSize: '9px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Back
          </button>

        </div>

        {
          this.state.message && (
            <div className={styles.success}>
              {
                this.state.message
              }
            </div>
          )
        }

        {
          this.state.error && (
            <div className={styles.error}>
              {
                this.state.error
              }
            </div>
          )
        }

        <div className={styles.actionBar}>

          <div>

            <strong>
              {
                selectedCount
              }
            </strong>

            <span>
              selected
            </span>

          </div>

          <div className={styles.actionButtons}>

            <button
              type="button"
              className={styles.copyButton}
              onClick={
                () =>
                  void this._copyBulkEmail()
              }
              disabled={
                selectedCount === 0 ||
                this.state.copying ||
                this.state.markingSent
              }
            >
              {
                this.state.copying
                  ? 'Copying...'
                  : 'Copy Bulk Email'
              }
            </button>

            <button
              type="button"
              className={styles.sentButton}
              onClick={
                () =>
                  void this._markSelectedSent()
              }
              disabled={
                selectedCount === 0 ||
                this.state.markingSent ||
                this.state.copying
              }
            >
              {
                this.state.markingSent
                  ? 'Updating...'
                  : 'Mark Selected as Sent'
              }
            </button>

          </div>

        </div>

        <div className={styles.tableCard}>

          <div className={styles.tableHeader}>

            <div>

              <input
                type="checkbox"
                checked={
                  allSelected
                }
                onChange={
                  this._toggleSelectAll
                }
              />

            </div>

            <div>
              Employee Name
            </div>

            <div>
              Client
            </div>

            <div>
              DOJ
            </div>

            <div>
              Location
            </div>

            <div>
              Company Email
            </div>

            <div>
              Delivery Address
            </div>

            <div>
              Hardware Requirement
            </div>

          </div>

          {
            this.props.requests.map(
              request => {

                const selected =
                  this.state.selectedIds.indexOf(
                    request.Id
                  ) !== -1;

                const location =
                  this._choiceValue(
                    request.Location
                  );

                return (
                  <div
                    key={
                      request.Id
                    }
                    className={
                      selected
                        ? `${styles.tableRow} ${styles.selectedRow}`
                        : styles.tableRow
                    }
                  >

                    <div>

                      <input
                        type="checkbox"
                        checked={
                          selected
                        }
                        onChange={() =>
                          this._toggleSelection(
                            request.Id
                          )
                        }
                      />

                    </div>

                    <div className={styles.employee}>
                      {
                        request.EmployeeName ||
                        '-'
                      }
                    </div>

                    <div>
                      {
                        request.Client?.Title ||
                        '-'
                      }
                    </div>

                    <div>
                      {
                        this._formatDate(
                          request.DOJ
                        )
                      }
                    </div>

                    <div>
                      {
                        location ||
                        '-'
                      }
                    </div>

                    <div>
                      {
                        request.CompanyEmail ||
                        '-'
                      }
                    </div>

                    <div>
                      {
                        request.DeliveryAddress ||
                        '-'
                      }
                    </div>

                    <div>
                      {
                        request.HardwareRequirement ||
                        '-'
                      }
                    </div>

                  </div>
                );
              }
            )
          }

          {
            this.props.requests.length === 0 && (
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

      </div>
    );
  }
}