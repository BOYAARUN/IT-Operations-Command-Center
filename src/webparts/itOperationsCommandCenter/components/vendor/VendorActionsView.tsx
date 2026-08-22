import * as React from 'react';
import styles from './VendorActionsView.module.scss';
import NavigationButtons from '../NavigationButtons';

export interface IVendorActionRequest {
  Id: number;
  Title?: string;
  EmployeeName?: string;
  RequestType?: {
    Value?: string;
  } | string;
  Client?: {
    Title?: string;
  };
  DOJ?: string;
  RequestDate?: string;
  LWD?: string;
  Location?: { Value?: string } | string;
  CompanyEmail?: string;
  DeliveryAddress?: string;
  HardwareRequirement?: string;
  VendorEmailSent?: boolean;
  VendorEmailSentDate?: string;
}

export interface IVendorActionsViewProps {
  requests?: IVendorActionRequest[];
  onBack: () => void;
  onDashboard: () => void;
  onMarkSent: (requestIds: number[]) => Promise<void>;
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

  private _getRequests():
    IVendorActionRequest[] {

    return Array.isArray(
      this.props.requests
    )
      ? this.props.requests
      : [];
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

  private _getRequestType(
    request: IVendorActionRequest
  ): string {

    return this._choiceValue(
      request.RequestType
    );

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

    const dayNumber =
      date.getDate();

    const day =
      dayNumber < 10
        ? `0${dayNumber}`
        : `${dayNumber}`;

    const monthNumber =
      date.getMonth() + 1;

    const month =
      monthNumber < 10
        ? `0${monthNumber}`
        : `${monthNumber}`;

    return `${day}/${month}/${date.getFullYear()}`;
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

  private _toggleSelection = (
    requestId: number
  ): void => {

    const selected =
      this.state.selectedIds.indexOf(
        requestId
      ) !== -1;

    this.setState({
      selectedIds: selected
        ? this.state.selectedIds.filter(
            id =>
              id !== requestId
          )
        : [
            ...this.state.selectedIds,
            requestId
          ],
      error: '',
      message: ''
    });
  };

  private _toggleSelectAll =
    (): void => {

      const requests =
        this._getRequests();

      const allSelected =
        requests.length > 0 &&
        this.state.selectedIds.length ===
          requests.length;

      this.setState({
        selectedIds:
          allSelected
            ? []
            : requests.map(
                request =>
                  request.Id
              ),
        error: '',
        message: ''
      });
    };

  private _getSelectedRequests():
    IVendorActionRequest[] {

    const selectedIds =
      this.state.selectedIds;

    return this._getRequests().filter(
      request =>
        selectedIds.indexOf(
          request.Id
        ) !== -1
    );
  }

  private _buildEmailSubject(
    requests: IVendorActionRequest[]
  ): string {

    const types =
      Array.from(
        new Set(
          requests.map(
            request =>
              this._getRequestType(request)
          )
        )
      );

    if (types.length === 1) {

      switch(types[0]) {

        case "New Joiner":
          return "New Joiner Asset Requirements";

        case "Offboarding":
          return "Employee Exit Asset Collection Request";

        case "Replacement":
          return "Asset Replacement Request";

        case "Additional Asset":
          return "Additional Asset Request";

      }

    }

    return "IT Asset Request";

  }

  private _getEmailIntroduction(
    requests: IVendorActionRequest[]
  ): string {

    const type =
      this._getRequestType(requests[0]);

    switch(type) {

      case "Offboarding":
        return "Please arrange asset collection for the below employee(s).";

      case "Replacement":
        return "Please arrange replacement assets for the below employee(s).";

      case "Additional Asset":
        return "Please arrange additional IT assets for the below employee(s).";

      default:
        return "Please arrange the following IT assets for the below new joiners.";

    }

  }


  private _buildVendorTable(
    requests: IVendorActionRequest[]
  ): string {

    const type =
      this._getRequestType(requests[0]);

    if (type === "Offboarding") {

      return `
        <table
          cellpadding="0"
          cellspacing="0"
          style="border-collapse:collapse;width:100%;font-size:11px;border:1px solid #b7b7b7;"
        >
          <tr>
            <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Employee Name</th>
            <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Client</th>
            <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">LWD</th>
            <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Location</th>
            <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Assets To Collect</th>
          </tr>

          ${requests.map(request => `
          <tr>
            <td style="border:1px solid #b7b7b7;padding:8px;">${request.EmployeeName || '-'}</td>
            <td style="border:1px solid #b7b7b7;padding:8px;">${request.Client?.Title || '-'}</td>
            <td style="border:1px solid #b7b7b7;padding:8px;">${this._formatDate(request.LWD)}</td>
            <td style="border:1px solid #b7b7b7;padding:8px;">${this._choiceValue(request.Location) || '-'}</td>
            <td style="border:1px solid #b7b7b7;padding:8px;">${request.HardwareRequirement || '-'}</td>
          </tr>
          `).join('')}

        </table>
      `;
    }

    return `
      <table
        cellpadding="0"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;font-size:11px;border:1px solid #b7b7b7;"
      >
        <tr>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Employee Name</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Client</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">DOJ</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Location</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Company Email</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Delivery Address</th>
          <th style="border:1px solid #b7b7b7;padding:9px;background:#e9eef5;">Hardware Requirement</th>
        </tr>

        ${requests.map(request => `
        <tr>
          <td>${request.EmployeeName || '-'}</td>
          <td>${request.Client?.Title || '-'}</td>
          <td>${this._formatDate(request.DOJ)}</td>
          <td>${this._choiceValue(request.Location) || '-'}</td>
          <td>${request.CompanyEmail || '-'}</td>
          <td>${request.DeliveryAddress || '-'}</td>
          <td>${request.HardwareRequirement || '-'}</td>
        </tr>
        `).join('')}

      </table>
    `;
  }

  private _buildHtmlBody(
    requests: IVendorActionRequest[]
  ): string {

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
          ${this._getEmailIntroduction(requests)}
        </p>

        ${this._buildVendorTable(requests)}

        <p>
          Please confirm once the request is completed.
        </p>

        <p>
          Regards,<br />
          IT Operations
        </p>

      </div>
    `;

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
          ].join('\n');

        }
      );

    return [
      'Hi Team,',
      '',
      this._getEmailIntroduction(requests),
      '',
      rows.join('\n\n'),
      '',
      'Please confirm once the request is completed.',
      '',
      'Regards,',
      'IT Operations'
    ].join('\n');
  }

  private _copyBulkEmail =
    async (): Promise<void> => {

      const requests =
        this._getSelectedRequests();

      if (requests.length === 0) {

        this.setState({
          error:
            'Select at least one vendor action.',
          message: ''
        });

        return;
      }

      this.setState({
        copying: true,
        error: '',
        message: ''
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

        const plainText =
          this._buildPlainTextBody(
            requests
          );

        if (
          typeof ClipboardItem !==
            'undefined' &&
          navigator.clipboard &&
          typeof navigator.clipboard.write ===
            'function'
        ) {

          const clipboardItem =
            new ClipboardItem({

              'text/html':
                new Blob(
                  [htmlBody],
                  {
                    type:
                      'text/html'
                  }
                ),

              'text/plain':
                new Blob(
                  [plainText],
                  {
                    type:
                      'text/plain'
                  }
                )

            });

          await navigator.clipboard.write(
            [clipboardItem]
          );

        } else {

          const container =
            document.createElement(
              'div'
            );

          container.innerHTML =
            htmlBody;

          container.contentEditable =
            'true';

          container.style.position =
            'fixed';

          container.style.left =
            '-999999px';

          container.style.top =
            '0';

          container.style.width =
            '1200px';

          document.body.appendChild(
            container
          );

          const selection =
            window.getSelection();

          const range =
            document.createRange();

          range.selectNodeContents(
            container
          );

          if (selection) {

            selection.removeAllRanges();

            selection.addRange(
              range
            );
          }

          const copied =
            document.execCommand(
              'copy'
            );

          if (selection) {
            selection.removeAllRanges();
          }

          document.body.removeChild(
            container
          );

          if (!copied) {

            throw new Error(
              'Browser could not copy the formatted email.'
            );
          }
        }

        this.setState({
          copying: false,

          message:
            `${requests.length} vendor request(s) copied as a formatted table. Paste into Outlook.`,

          error: ''
        });

        console.log(
          `Vendor Email Subject: ${subject}`
        );

      } catch (error) {

        this.setState({
          copying: false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to copy the formatted email.',

          message: ''
        });
      }
    };

  private _markSelectedSent =
    async (): Promise<void> => {

      const requests =
        this._getSelectedRequests();

      if (requests.length === 0) {

        this.setState({
          error:
            'Select at least one vendor action.',
          message: ''
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
        markingSent: true,
        error: '',
        message: ''
      });

      try {

        await this.props.onMarkSent(
          requests.map(
            request =>
              request.Id
          )
        );

        this.setState({
          selectedIds: [],
          markingSent: false,

          message:
            `${requests.length} vendor request(s) marked as sent.`,

          error: ''
        });

      } catch (error) {

        this.setState({
          markingSent: false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to mark vendor requests as sent.',

          message: ''
        });
      }
    };

  public render():
    React.ReactElement<IVendorActionsViewProps> {

    const requests =
      this._getRequests();

    const selectedCount =
      this.state.selectedIds.length;

    const allSelected =
      requests.length > 0 &&
      selectedCount ===
        requests.length;

    const subject =
      selectedCount > 0
        ? this._buildEmailSubject(
            this._getSelectedRequests()
          )
        : 'IT Asset Request';

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

          <NavigationButtons
            onDashboard={
              this.props.onDashboard
            }
            onBack={
              this.props.onBack
            }
            backLabel="Back"
          />

        </div>

        {this.state.message && (
          <div className={styles.success}>
            {this.state.message}
          </div>
        )}

        {this.state.error && (
          <div className={styles.error}>
            {this.state.error}
          </div>
        )}

        <div className={styles.actionBar}>

          <div>

            <strong>
              {selectedCount}
            </strong>

            <span>
              selected
            </span>

          </div>

          <div className={styles.actionButtons}>

            <div className={styles.subjectPreview}>

              <span>
                Subject
              </span>

              <strong>
                {subject}
              </strong>

            </div>

            <button
              type="button"
              className={
                styles.copyButton
              }
              onClick={
                this._copyBulkEmail
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
              className={
                styles.sentButton
              }
              onClick={
                this._markSelectedSent
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
  Request Date
</div>

<div>
  DOJ
</div>

<div>
  LWD
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
            requests.map(
              request => {

                const selected =
                  this.state
                    .selectedIds
                    .indexOf(
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

                    <div
                      className={
                        styles.employee
                      }
                    >
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
request.RequestDate
)
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
this._formatDate(
request.LWD
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
            requests.length === 0 && (

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