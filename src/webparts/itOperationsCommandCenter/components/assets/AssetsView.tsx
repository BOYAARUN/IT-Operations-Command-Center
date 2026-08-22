import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './AssetsView.module.scss';
import NavigationButtons from '../NavigationButtons';

export interface IAssetsViewProps {
  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;
  onBack: () => void;
  onDashboard: () => void;
}

interface IEmployee {
  Id: number;
  Title: string;
  Email?: string;
  LoginName?: string;
}

interface IAsset {
  Id: number;
  Title?: string;
  AssetID?: string;
  AssetType?: string;
  AssetModel?: string;
  SerialNumber?: string;

  EmpName?: {
    Id?: number;
    Title?: string;
    EMail?: string;
  };

  AllocatedDate?: string;
  WarrantyExpiry?: string;
  AssetStatus?: string;
  Client?: string;
  ReturnDate?: string;
  HostName?: string;
  OwnedBy?: string;
  AckStatus?: string;
  AckDate?: string;
  Location?: string;
  AssignmentID?: string;

  Own_x002f_Lease?: string | { Value?: string };
}

interface IAssetResponse {
  value: IAsset[];
}

interface IAssetRow {
  rowId: number;
  assetType: string;
  assetId: string;
  assetModel: string;
  serialNumber: string;
  client: string;
  warrantyExpiry: string;
  ownLease: string;
  ownedBy: string;
  assetStatus: string;
  ackStatus: string;
  location: string;
}

interface IClientEmployee {
  employee: IEmployee;
  assets: IAsset[];
}

interface IClientDetail {
  client: string;
  employees: IClientEmployee[];
  assets: IAsset[];
}

interface ICategoryDetail {
  category: string;
  assets: IAsset[];
}

type IWarrantyState =
  | 'expired'
  | '7days'
  | '30days'
  | 'safe'
  | 'none';

type IDetailMode =
  | 'none'
  | 'dashboard'
  | 'client'
  | 'category';

interface IState {
  assets: IAsset[];

  loading: boolean;
  saving: boolean;
  updatingAssetId: number | null;

  searchText: string;
  employeeResults: IEmployee[];

  selectedEmployee?: IEmployee;
  selectedEmployeeAssets: IAsset[];

  selectedClient?: IClientDetail;
  selectedCategory?: ICategoryDetail;

  detailMode: IDetailMode;
  detailTitle: string;
  detailAssets: IAsset[];

  showSingleAdd: boolean;
  showBulkAdd: boolean;

  singleEmployee?: IEmployee;
  singleEmployeeText: string;
  singleEmployeeResults: IEmployee[];
  singleEmployeeId: string;
  singleAsset: IAssetRow;

  bulkEmployee?: IEmployee;
  bulkEmployeeText: string;
  bulkEmployeeResults: IEmployee[];
  bulkEmployeeId: string;
  bulkAllocatedDate: string;
  bulkRows: IAssetRow[];

  categoryFilter: string;
  clientFilter: string;
  statusFilter: string;
  ownershipFilter: string;
  ownedByFilter: string;
  locationFilter: string;

  showAllCategories: boolean;
  showAllClients: boolean;

  error: string;
  message: string;
}

export default class AssetsView
  extends React.Component<IAssetsViewProps, IState> {

  private _nextRowId: number = 1;

  public state: IState = {
    assets: [],
    loading: true,
    saving: false,
    updatingAssetId: null,

    searchText: '',
    employeeResults: [],

    selectedEmployee: undefined,
    selectedEmployeeAssets: [],

    selectedClient: undefined,
    selectedCategory: undefined,

    detailMode: 'none',
    detailTitle: '',
    detailAssets: [],

    showSingleAdd: false,
    showBulkAdd: false,

    singleEmployee: undefined,
    singleEmployeeText: '',
    singleEmployeeResults: [],
    singleEmployeeId: '',
    singleAsset: this._createAssetRow(),

    bulkEmployee: undefined,
    bulkEmployeeText: '',
    bulkEmployeeResults: [],
    bulkEmployeeId: '',
    bulkAllocatedDate: this._todayForInput(),

    bulkRows: [
      this._createAssetRow(),
      this._createAssetRow()
    ],

    categoryFilter: 'All',
    clientFilter: 'All',
    statusFilter: 'All',
    ownershipFilter: 'All',
    ownedByFilter: 'All',
    locationFilter: 'All',

    showAllCategories: false,
    showAllClients: false,

    error: '',
    message: ''
  };

  public componentDidMount(): void {
    void this._loadAssets();
  }

  private _createAssetRow(): IAssetRow {
    return {
      rowId: this._nextRowId++,
      assetType: '',
      assetId: '',
      assetModel: '',
      serialNumber: '',
      client: '',
      warrantyExpiry: '',
      ownLease: 'Own',
      ownedBy: 'FinacPlus',
      assetStatus: 'In Use',
      ackStatus: 'Pending',
      location: 'Remote'
    };
  }

  private _todayForInput(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const mm =
      month < 10
        ? '0' + month
        : '' + month;

    const dd =
      day < 10
        ? '0' + day
        : '' + day;

    return (
      year +
      '-' +
      mm +
      '-' +
      dd
    );
  }

  private _formatDate(value?: string): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return '-';
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const dd =
      day < 10
        ? '0' + day
        : '' + day;

    const mm =
      month < 10
        ? '0' + month
        : '' + month;

    return (
      dd +
      '/' +
      mm +
      '/' +
      date.getFullYear()
    );
  }

  private _assetIcon(type?: string): string {
    switch (type) {

      case 'Laptop':
        return '💻';

      case 'Monitor':
      case 'Monitor 1':
      case 'Monitor 2':
        return '🖥️';

      case 'CPU':
      case 'Desktop':
        return '🖥';

      case 'Keyboard':
        return '⌨️';

      case 'Mouse':
        return '🖱️';

      case 'Headset':
        return '🎧';

      case 'Webcam':
        return '📷';

      case 'Docking Station':
        return '🔌';

      default:
        return '📦';
    }
  }

  private _displayAssetType(type?: string): string {

    if (
      type === 'CPU' ||
      type === 'Desktop'
    ) {
      return 'Desktop';
    }

    return type || '-';
  }

  private _getOwnershipValue(
    asset: IAsset
  ): string {

    const value: any =
      asset.Own_x002f_Lease;

    if (!value) {
      return '';
    }

    if (
      typeof value === 'string'
    ) {
      return value.trim();
    }

    if (
      value.Value
    ) {
      return String(
        value.Value
      ).trim();
    }

    return String(
      value
    ).trim();
  }

  private _getWarrantyState(
    value?: string
  ): IWarrantyState {

    if (!value) {
      return 'none';
    }

    const expiry =
      new Date(value);

    if (isNaN(expiry.getTime())) {
      return 'none';
    }

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    expiry.setHours(
      0,
      0,
      0,
      0
    );

    const days =
      Math.ceil(
        (
          expiry.getTime() -
          today.getTime()
        ) /
        (1000 * 60 * 60 * 24)
      );

    if (days < 0) {
      return 'expired';
    }

    if (days <= 7) {
      return '7days';
    }

    if (days <= 30) {
      return '30days';
    }

    return 'safe';
  }

  private _warrantyLabel(
    value?: string
  ): string {

    switch (
      this._getWarrantyState(value)
    ) {

      case 'expired':
        return 'Expired';

      case '7days':
        return 'Expires <= 7 days';

      case '30days':
        return 'Expires <= 30 days';

      case 'safe':
        return 'Valid';

      default:
        return 'No Warranty Date';
    }
  }

  private _warrantyClass(
    value?: string
  ): string {

    switch (
      this._getWarrantyState(value)
    ) {

      case 'expired':
        return styles.warranty_expired;

      case '7days':
        return styles.warranty_7days;

      case '30days':
        return styles.warranty_30days;

      case 'safe':
        return styles.warranty_safe;

      default:
        return styles.warranty_none;
    }
  }

  private _countOwnedAssets(
    assets: IAsset[]
  ): number {

    return assets.filter(
      asset => {

        const value =
          this._getOwnershipValue(
            asset
          ).toLowerCase();

        return value === 'own';
      }
    ).length;
  }

  private _countLeasedAssets(
    assets: IAsset[]
  ): number {

    return assets.filter(
      asset => {

        const value =
          this._getOwnershipValue(
            asset
          ).toLowerCase();

        return (
          value === 'lease' ||
          value === 'leased'
        );
      }
    ).length;
  }

  private _countWarranty30Days(
    assets: IAsset[]
  ): number {

    return assets.filter(
      asset =>
        this._getWarrantyState(
          asset.WarrantyExpiry
        ) === '30days'
    ).length;
  }

  private _countWarranty7Days(
    assets: IAsset[]
  ): number {

    return assets.filter(
      asset =>
        this._getWarrantyState(
          asset.WarrantyExpiry
        ) === '7days'
    ).length;
  }

  private _countWarrantyExpired(
    assets: IAsset[]
  ): number {

    return assets.filter(
      asset =>
        this._getWarrantyState(
          asset.WarrantyExpiry
        ) === 'expired'
    ).length;
  }

  private _getActiveAssets(): IAsset[] {

    return this.state.assets.filter(
      asset =>
        asset.AssetStatus === 'In Use'
    );
  }

  private _getClientAssets(
    client: string
  ): IAsset[] {

    return this._getActiveAssets().filter(
      asset =>
        asset.Client === client
    );
  }

  private _getCategoryAssets(
    category: string
  ): IAsset[] {

    if (
      category === 'Desktop'
    ) {

      return this._getActiveAssets().filter(
        asset =>
          asset.AssetType === 'CPU' ||
          asset.AssetType === 'Desktop'
      );
    }

    return this._getActiveAssets().filter(
      asset =>
        asset.AssetType === category
    );
  }

  private _getAssetTypes(): string[] {

    const preferred: string[] = [
      'Laptop',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Headset',
      'Docking Station',
      'CPU',
      'Desktop'
    ];

    const discovered: string[] = [];

    this.state.assets.forEach(
      asset => {

        const type =
          (
            asset.AssetType ||
            ''
          ).trim();

        if (
          type &&
          discovered.indexOf(type) === -1
        ) {
          discovered.push(type);
        }
      }
    );

    const ordered: string[] = [];

    preferred.forEach(
      item => {

        const exact =
          discovered.find(
            value =>
              value.toLowerCase() ===
              item.toLowerCase()
          );

        if (
          exact &&
          ordered.indexOf(exact) === -1
        ) {

          if (
            exact === 'CPU' ||
            exact === 'Desktop'
          ) {

            if (
              ordered.indexOf('CPU') === -1 &&
              ordered.indexOf('Desktop') === -1
            ) {
              ordered.push(exact);
            }

          } else {

            ordered.push(exact);
          }
        }
      }
    );

    return ordered.concat(
      discovered
        .filter(
          value =>
            ordered.indexOf(value) === -1
        )
        .sort(
          (a, b) =>
            a.localeCompare(b)
        )
    );
  }

  private _getClients(): string[] {

    const values: string[] = [];

    this.state.assets.forEach(
      asset => {

        const client =
          (
            asset.Client ||
            ''
          ).trim();

        if (
          client &&
          values.indexOf(client) === -1
        ) {
          values.push(client);
        }
      }
    );

    return values.sort();
  }

  private _getStatuses(): string[] {

    const values: string[] = [];

    this.state.assets.forEach(
      asset => {

        const status =
          (
            asset.AssetStatus ||
            ''
          ).trim();

        if (
          status &&
          values.indexOf(status) === -1
        ) {
          values.push(status);
        }
      }
    );

    return values.sort();
  }

  private _getEmployees(): IEmployee[] {

    const result: IEmployee[] = [];
    const ids: number[] = [];

    this._getActiveAssets().forEach(
      asset => {

        const id =
          asset.EmpName &&
          asset.EmpName.Id
            ? asset.EmpName.Id
            : 0;

        if (
          id &&
          ids.indexOf(id) === -1
        ) {

          ids.push(id);

          result.push({
            Id: id,

            Title:
              (
                asset.EmpName &&
                asset.EmpName.Title
              ) ||
              'Unknown User',

            Email:
              (
                asset.EmpName &&
                asset.EmpName.EMail
              ) ||
              ''
          });
        }
      }
    );

    return result.sort(
      (a, b) =>
        a.Title.localeCompare(
          b.Title
        )
    );
  }

  private _getEmployeeAssets(
    employeeId: number
  ): IAsset[] {

    return this._getActiveAssets().filter(
      asset =>
        Number(
          asset.EmpName &&
          asset.EmpName.Id
        ) ===
        Number(employeeId)
    );
  }

  private _getEmployeeId(
    assets: IAsset[]
  ): string {

    const found =
      assets.find(
        asset =>
          !!asset.Title
      );

    return (
      found &&
      found.Title
        ? found.Title
        : '-'
    );
  }

  private _getEmployeeClients(
    assets: IAsset[]
  ): string[] {

    const values: string[] = [];

    assets.forEach(
      asset => {

        const client =
          (
            asset.Client ||
            ''
          ).trim();

        if (
          client &&
          values.indexOf(client) === -1
        ) {
          values.push(client);
        }
      }
    );

    return values.sort();
  }

  private _getEmployeeLocations(
    assets: IAsset[]
  ): string[] {

    const values: string[] = [];

    assets.forEach(
      asset => {

        const location =
          (
            asset.Location ||
            ''
          ).trim();

        if (
          location &&
          values.indexOf(location) === -1
        ) {
          values.push(location);
        }
      }
    );

    return values.sort();
  }

  private _countType(
    assets: IAsset[],
    type: string
  ): number {

    if (
      type === 'Desktop' ||
      type === 'CPU'
    ) {

      return assets.filter(
        asset =>
          asset.AssetType === 'CPU' ||
          asset.AssetType === 'Desktop'
      ).length;
    }

    return assets.filter(
      asset =>
        asset.AssetType === type
    ).length;
  }

  private _getClientEmployees(
    client: string
  ): IClientEmployee[] {

    const result:
      IClientEmployee[] = [];

    const ids: number[] = [];

    this._getClientAssets(
      client
    ).forEach(
      asset => {

        const id =
          asset.EmpName &&
          asset.EmpName.Id
            ? asset.EmpName.Id
            : 0;

        if (
          id &&
          ids.indexOf(id) === -1
        ) {

          ids.push(id);

          result.push({
            employee: {
              Id: id,

              Title:
                (
                  asset.EmpName &&
                  asset.EmpName.Title
                ) ||
                'Unknown User',

              Email:
                (
                  asset.EmpName &&
                  asset.EmpName.EMail
                ) ||
                ''
            },

            assets:
              this._getEmployeeAssets(
                id
              )
          });
        }
      }
    );

    return result.sort(
      (a, b) =>
        a.employee.Title.localeCompare(
          b.employee.Title
        )
    );
  }

  private _getClientDetail(
    client: string
  ): IClientDetail {

    return {
      client: client,

      employees:
        this._getClientEmployees(
          client
        ),

      assets:
        this._getClientAssets(
          client
        )
    };
  }

  private _getCategoryDetail(
    category: string
  ): ICategoryDetail {

    return {
      category: category,

      assets:
        this._getCategoryAssets(
          category
        )
    };
  }

  private _getPercentage(
    value: number,
    total: number
  ): string {

    if (!total) {
      return '0%';
    }

    return (
      (
        (value / total) *
        100
      ).toFixed(1) +
      '%'
    );
  }

  private _loadAssets =
    async (): Promise<void> => {

      this.setState({
        loading: true,
        error: ''
      });

      try {

        const url =
          `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Active IT Assets')/items` +
          `?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease` +
          `&$expand=EmpName` +
          `&$orderby=Id desc` +
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
            `Active IT Assets returned ${response.status}. ${text}`
          );
        }

        const data:
          IAssetResponse =
          await response.json();

        this.setState({
          assets:
            data.value || [],

          loading: false,

          error:
            ''
        });

      } catch (error) {

        this.setState({
          loading: false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to load Active IT Assets.'
        });
      }
    };

  private _searchUsers =
    async (
      value: string
    ): Promise<IEmployee[]> => {

      const text =
        value
          .trim()
          .toLowerCase();

      const url =
        `${this.props.webAbsoluteUrl}/_api/web/siteusers?$select=Id,Title,Email,LoginName&$top=5000`;

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
          `User search returned ${response.status}.`
        );
      }

      const data =
        await response.json();

      const users:
        any[] =
        data.value || [];

      return users
        .filter(
          user => {

            const name =
              String(
                user.Title || ''
              ).toLowerCase();

            const email =
              String(
                user.Email || ''
              ).toLowerCase();

            const login =
              String(
                user.LoginName || ''
              ).toLowerCase();

            return (
              name.indexOf(text) !== -1 ||
              email.indexOf(text) !== -1 ||
              login.indexOf(text) !== -1
            );
          }
        )
        .slice(
          0,
          20
        )
        .map(
          user => ({
            Id:
              Number(
                user.Id
              ),

            Title:
              user.Title || '',

            Email:
              user.Email || '',

            LoginName:
              user.LoginName || ''
          })
        );
    };

  private _employeeSearch =
    async (
      value: string
    ): Promise<void> => {

      this.setState({

        searchText:
          value,

        selectedEmployee:
          undefined,

        selectedEmployeeAssets:
          [],

        selectedClient:
          undefined,

        selectedCategory:
          undefined,

        detailMode:
          'none',

        detailTitle:
          '',

        detailAssets:
          [],

        employeeResults:
          [],

        error:
          ''
      });

      if (!value.trim()) {
        return;
      }

      try {

        const users =
          await this._searchUsers(
            value
          );

        this.setState({
          employeeResults:
            users
        });

      } catch (error) {

        this.setState({

          employeeResults:
            [],

          error:
            error instanceof Error
              ? error.message
              : 'Unable to search Microsoft 365 users.'
        });
      }
    };

  private _selectEmployee =
    (
      employee: IEmployee
    ): void => {

      this.setState({

        selectedEmployee:
          employee,

        selectedEmployeeAssets:
          this._getEmployeeAssets(
            employee.Id
          ),

        searchText:
          employee.Title,

        employeeResults:
          [],

        selectedClient:
          undefined,

        selectedCategory:
          undefined,

        detailMode:
          'none',

        detailTitle:
          '',

        detailAssets:
          [],

        error:
          '',

        message:
          ''
      });
    };

  private _clearEmployee =
    (): void => {

      this.setState({

        searchText:
          '',

        employeeResults:
          [],

        selectedEmployee:
          undefined,

        selectedEmployeeAssets:
          [],

        selectedClient:
          undefined,

        selectedCategory:
          undefined,

        detailMode:
          'none',

        detailTitle:
          '',

        detailAssets:
          [],

        error:
          ''
      });
    };

  private _openDashboardDetail =
    (
      title: string,
      assets: IAsset[]
    ): void => {

      this.setState({

        detailMode:
          'dashboard',

        detailTitle:
          title,

        detailAssets:
          assets,

        selectedEmployee:
          undefined,

        selectedEmployeeAssets:
          [],

        selectedClient:
          undefined,

        selectedCategory:
          undefined,

        searchText:
          '',

        employeeResults:
          [],

        error:
          ''
      });
    };

  private _closeDetail =
    (): void => {

      this.setState({

        detailMode:
          'none',

        detailTitle:
          '',

        detailAssets:
          []
      });
    };

  private _openClient =
    (
      client: string
    ): void => {

      this.setState({

        selectedClient:
          this._getClientDetail(
            client
          ),

        selectedEmployee:
          undefined,

        selectedEmployeeAssets:
          [],

        selectedCategory:
          undefined,

        detailMode:
          'client',

        detailTitle:
          client,

        detailAssets:
          this._getClientAssets(
            client
          ),

        searchText:
          '',

        employeeResults:
          [],

        error:
          ''
      });
    };

  private _openCategory =
    (
      category: string
    ): void => {

      this.setState({

        selectedCategory:
          this._getCategoryDetail(
            category
          ),

        selectedClient:
          undefined,

        selectedEmployee:
          undefined,

        selectedEmployeeAssets:
          [],

        detailMode:
          'category',

        detailTitle:
          category,

        detailAssets:
          this._getCategoryAssets(
            category
          ),

        searchText:
          '',

        employeeResults:
          [],

        error:
          ''
      });
    };

  private _openSingleAdd =
    (): void => {

      const employee =
        this.state.selectedEmployee;

      const assets =
        employee
          ? this._getEmployeeAssets(
              employee.Id
            )
          : [];

      this.setState({

        showSingleAdd:
          true,

        showBulkAdd:
          false,

        singleEmployee:
          employee,

        singleEmployeeText:
          employee
            ? employee.Title
            : '',

        singleEmployeeResults:
          [],

        singleEmployeeId:
          this._getEmployeeId(
            assets
          ),

        singleAsset:
          this._createAssetRow(),

        error:
          '',

        message:
          ''
      });
    };

  private _closeSingleAdd =
    (): void => {

      this.setState({

        showSingleAdd:
          false,

        singleEmployee:
          undefined,

        singleEmployeeText:
          '',

        singleEmployeeResults:
          [],

        singleEmployeeId:
          '',

        error:
          ''
      });
    };

  private _openBulkAdd =
    (): void => {

      const employee =
        this.state.selectedEmployee;

      const assets =
        employee
          ? this._getEmployeeAssets(
              employee.Id
            )
          : [];

      this.setState({

        showBulkAdd:
          true,

        showSingleAdd:
          false,

        bulkEmployee:
          employee,

        bulkEmployeeText:
          employee
            ? employee.Title
            : '',

        bulkEmployeeResults:
          [],

        bulkEmployeeId:
          this._getEmployeeId(
            assets
          ),

        bulkAllocatedDate:
          this._todayForInput(),

        bulkRows: [
          this._createAssetRow(),
          this._createAssetRow()
        ],

        error:
          '',

        message:
          ''
      });
    };

  private _closeBulkAdd =
    (): void => {

      this.setState({

        showBulkAdd:
          false,

        bulkEmployee:
          undefined,

        bulkEmployeeText:
          '',

        bulkEmployeeResults:
          [],

        bulkEmployeeId:
          '',

        bulkRows: [
          this._createAssetRow(),
          this._createAssetRow()
        ],

        error:
          ''
      });
    };

  private _singleEmployeeSearch =
    async (
      value: string
    ): Promise<void> => {

      this.setState({

        singleEmployeeText:
          value,

        singleEmployeeResults:
          []
      });

      if (!value.trim()) {
        return;
      }

      try {

        this.setState({

          singleEmployeeResults:
            await this._searchUsers(
              value
            )
        });

      } catch {

        this.setState({
          singleEmployeeResults:
            []
        });
      }
    };

  private _bulkEmployeeSearch =
    async (
      value: string
    ): Promise<void> => {

      this.setState({

        bulkEmployeeText:
          value,

        bulkEmployeeResults:
          []
      });

      if (!value.trim()) {
        return;
      }

      try {

        this.setState({

          bulkEmployeeResults:
            await this._searchUsers(
              value
            )
        });

      } catch {

        this.setState({
          bulkEmployeeResults:
            []
        });
      }
    };

  private _selectSingleEmployee =
    (
      employee: IEmployee
    ): void => {

      this.setState({

        singleEmployee:
          employee,

        singleEmployeeText:
          employee.Title,

        singleEmployeeResults:
          [],

        singleEmployeeId:
          this._getEmployeeId(
            this._getEmployeeAssets(
              employee.Id
            )
          ),

        error:
          ''
      });
    };

  private _selectBulkEmployee =
    (
      employee: IEmployee
    ): void => {

      this.setState({

        bulkEmployee:
          employee,

        bulkEmployeeText:
          employee.Title,

        bulkEmployeeResults:
          [],

        bulkEmployeeId:
          this._getEmployeeId(
            this._getEmployeeAssets(
              employee.Id
            )
          ),

        error:
          ''
      });
    };

  private _updateSingleAsset =
    (
      field: keyof IAssetRow,
      value: string
    ): void => {

      this.setState({

        singleAsset: {
          ...this.state.singleAsset,

          [field]:
            value
        }
      });
    };

  private _updateBulkRow =
    (
      rowId: number,
      field: keyof IAssetRow,
      value: string
    ): void => {

      this.setState({

        bulkRows:
          this.state.bulkRows.map(
            row =>
              row.rowId === rowId
                ? {
                    ...row,

                    [field]:
                      value
                  }
                : row
          )
      });
    };

  private _addBulkRow =
    (): void => {

      this.setState({

        bulkRows:
          this.state.bulkRows.concat(
            [
              this._createAssetRow()
            ]
          )
      });
    };

  private _removeBulkRow =
    (
      rowId: number
    ): void => {

      if (
        this.state.bulkRows.length <= 1
      ) {
        return;
      }

      this.setState({

        bulkRows:
          this.state.bulkRows.filter(
            row =>
              row.rowId !== rowId
          )
      });
    };

  private _validateAsset(
    row: IAssetRow
  ): string {

    if (!row.assetType.trim()) {
      return 'Asset Type is required.';
    }

    if (!row.assetId.trim()) {
      return 'Asset ID is required.';
    }

    if (!row.client.trim()) {
      return 'Client is required.';
    }

    if (!row.ownLease.trim()) {
      return 'Ownership is required.';
    }

    if (!row.ownedBy.trim()) {
      return 'Owned By is required.';
    }

    if (!row.location.trim()) {
      return 'Location is required.';
    }

    return '';
  }

  private _createAsset =
    async (
      row: IAssetRow,
      employee: IEmployee,
      employeeId: string,
      allocatedDate: string
    ): Promise<void> => {

      const payload: any = {

        Title:
          employeeId,

        EmpNameId:
          employee.Id,

        AssetID:
          row.assetId,

        AssetType:
          row.assetType,

        AssetModel:
          row.assetModel,

        SerialNumber:
          row.serialNumber,

        Client:
          row.client,

        AllocatedDate:
          allocatedDate,

        WarrantyExpiry:
          row.warrantyExpiry ||
          null,

        'Own_x002f_Lease':
          row.ownLease,

        OwnedBy:
          row.ownedBy,

        Location:
          row.location,

        AssetStatus:
          row.assetStatus,

        AckStatus:
          row.ackStatus,

        AssignmentID:
          'ASSIGN-' +
          Date.now() +
          '-' +
          row.rowId
      };

      const url =
        `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Active IT Assets')/items`;

      const response =
        await this.props.spHttpClient.post(
          url,
          this.props.spHttpClientConfiguration,
          {
            headers: {

              Accept:
                'application/json;odata=nometadata',

              'Content-Type':
                'application/json;odata=nometadata'
            },

            body:
              JSON.stringify(
                payload
              )
          }
        );

      if (!response.ok) {

        const text =
          await response.text();

        throw new Error(
          `Unable to create asset ${row.assetId}: ${text}`
        );
      }
    };

  private _saveSingleAsset =
    async (): Promise<void> => {

      const employee =
        this.state.singleEmployee;

      if (
        !employee ||
        !employee.Id
      ) {

        this.setState({
          error:
            'Select an exact Microsoft 365 employee.'
        });

        return;
      }

      if (
        !this.state.singleEmployeeId.trim()
      ) {

        this.setState({
          error:
            'Employee ID is required.'
        });

        return;
      }

      const validation =
        this._validateAsset(
          this.state.singleAsset
        );

      if (validation) {

        this.setState({
          error:
            validation
        });

        return;
      }

      this.setState({

        saving:
          true,

        error:
          '',

        message:
          ''
      });

      try {

        await this._createAsset(
          this.state.singleAsset,
          employee,
          this.state.singleEmployeeId,
          this._todayForInput()
        );

        await this._loadAssets();

        this.setState({

          saving:
            false,

          showSingleAdd:
            false,

          selectedEmployee:
            employee,

          selectedEmployeeAssets:
            this._getEmployeeAssets(
              employee.Id
            ),

          message:
            'Asset added successfully.'
        });

      } catch (error) {

        this.setState({

          saving:
            false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to add asset.'
        });
      }
    };

  private _saveBulkAssets =
    async (): Promise<void> => {

      const employee =
        this.state.bulkEmployee;

      if (
        !employee ||
        !employee.Id
      ) {

        this.setState({
          error:
            'Select an exact Microsoft 365 employee.'
        });

        return;
      }

      if (
        !this.state.bulkEmployeeId.trim()
      ) {

        this.setState({
          error:
            'Employee ID is required.'
        });

        return;
      }

      let validation =
        '';

      this.state.bulkRows.some(
        row => {

          validation =
            this._validateAsset(
              row
            );

          return validation !== '';
        }
      );

      if (validation) {

        this.setState({
          error:
            validation
        });

        return;
      }

      this.setState({

        saving:
          true,

        error:
          '',

        message:
          ''
      });

      try {

        const total =
          this.state.bulkRows.length;

        for (
          const row
          of this.state.bulkRows
        ) {

          await this._createAsset(
            row,
            employee,
            this.state.bulkEmployeeId,
            this.state.bulkAllocatedDate
          );
        }

        await this._loadAssets();

        this.setState({

          saving:
            false,

          showBulkAdd:
            false,

          selectedEmployee:
            employee,

          selectedEmployeeAssets:
            this._getEmployeeAssets(
              employee.Id
            ),

          message:
            `${total} asset(s) assigned successfully.`
        });

      } catch (error) {

        this.setState({

          saving:
            false,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to assign assets.'
        });
      }
    };

  private _updateAssetStatus =
    async (
      assetId: number,
      status: string
    ): Promise<void> => {

      this.setState({

        updatingAssetId:
          assetId,

        error:
          '',

        message:
          ''
      });

      try {

        const url =
          `${this.props.webAbsoluteUrl}/_api/web/lists/getbytitle('Active IT Assets')/items(${assetId})`;

        const payload: any = {
          AssetStatus:
            status
        };

        if (
          status === 'Returned to Vendor'
        ) {

          payload.ReturnDate =
            this._todayForInput();
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
                JSON.stringify(
                  payload
                )
            }
          );

        if (!response.ok) {

          const text =
            await response.text();

          throw new Error(
            `Unable to update asset status. ${text}`
          );
        }

        await this._loadAssets();

        const employee =
          this.state.selectedEmployee;

        let detailAssets =
          this.state.detailAssets;

        if (
          this.state.detailMode ===
          'dashboard'
        ) {

          const active =
            this._getActiveAssets();

          if (
            this.state.detailTitle ===
            'Laptops'
          ) {

            detailAssets =
              this._getCategoryAssets(
                'Laptop'
              );

          } else if (
            this.state.detailTitle ===
            'Monitors'
          ) {

            detailAssets =
              this._getCategoryAssets(
                'Monitor'
              );

          } else if (
            this.state.detailTitle ===
            'Desktops'
          ) {

            detailAssets =
              this._getCategoryAssets(
                'Desktop'
              );

          } else if (
            this.state.detailTitle ===
            'Warranty <= 30 Days'
          ) {

            detailAssets =
              active.filter(
                asset =>
                  this._getWarrantyState(
                    asset.WarrantyExpiry
                  ) === '30days'
              );

          } else if (
            this.state.detailTitle ===
            'Warranty <= 7 Days'
          ) {

            detailAssets =
              active.filter(
                asset =>
                  this._getWarrantyState(
                    asset.WarrantyExpiry
                  ) === '7days'
              );

          } else if (
            this.state.detailTitle ===
            'Warranty Expired'
          ) {

            detailAssets =
              active.filter(
                asset =>
                  this._getWarrantyState(
                    asset.WarrantyExpiry
                  ) === 'expired'
              );

          } else {

            detailAssets =
              active;
          }

        } else if (
          this.state.detailMode ===
          'client'
        ) {

          detailAssets =
            this._getClientAssets(
              this.state.detailTitle
            );

        } else if (
          this.state.detailMode ===
          'category'
        ) {

          detailAssets =
            this._getCategoryAssets(
              this.state.detailTitle
            );
        }

        this.setState({

          updatingAssetId:
            null,

          selectedEmployeeAssets:
            employee
              ? this._getEmployeeAssets(
                  employee.Id
                )
              : [],

          detailAssets:
            detailAssets,

          message:
            status ===
            'Returned to Vendor'
              ? 'Asset marked as Returned to Vendor.'
              : 'Asset status updated.'
        });

      } catch (error) {

        this.setState({

          updatingAssetId:
            null,

          error:
            error instanceof Error
              ? error.message
              : 'Unable to update asset status.'
        });
      }
    };

  private _resetFilters =
    (): void => {

      this.setState({

        categoryFilter:
          'All',

        clientFilter:
          'All',

        statusFilter:
          'All',

        ownershipFilter:
          'All',

        ownedByFilter:
          'All',

        locationFilter:
          'All'
      });
    };

  private _renderWarranty(
    value?: string
  ): React.ReactElement<{}> {

    return (
      <div className={styles.warrantyInfo}>

        <strong>
          {
            this._formatDate(
              value
            )
          }
        </strong>

        <span
          className={
            this._warrantyClass(
              value
            )
          }
        >
          {
            this._warrantyLabel(
              value
            )
          }
        </span>

      </div>
    );
  }

  public render():
    React.ReactElement<IAssetsViewProps> {

    const totalAssets =
      this.state.assets.length;

    const activeAssets =
      this._getActiveAssets();

    const employees =
      this._getEmployees();

    const clients =
      this._getClients();

    const assetTypes =
      this._getAssetTypes();

    const statuses =
      this._getStatuses();

    const activeCount =
      activeAssets.length;

    const laptops =
      this._countType(
        activeAssets,
        'Laptop'
      );

    const monitors =
      this._countType(
        activeAssets,
        'Monitor'
      );

    const desktops =
      this._countType(
        activeAssets,
        'CPU'
      );

    const warranty30 =
      this._countWarranty30Days(
        activeAssets
      );

    const warranty7 =
      this._countWarranty7Days(
        activeAssets
      );

    const warrantyExpired =
      this._countWarrantyExpired(
        activeAssets
      );

    const employeeMode =
      this.state.searchText.trim().length > 0 ||
      !!this.state.selectedEmployee;

    return (
      <div className={styles.page}>

        <div className={styles.pageHeader}>

          <div className={styles.brandLine}>

            <span className={styles.brandIcon}>
              ◈
            </span>

            <div>

              <div className={styles.brandTitle}>
                Asset Management
              </div>

              <div className={styles.brandSubtitle}>
                Hardware &amp; IT Inventory Hub
              </div>

            </div>

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

        <div className={styles.actionHeader}>

          <div>

            <h1>
              Master Asset Inventory
            </h1>

            <p>
              Central view of employee hardware and client allocations.
            </p>

          </div>

          <div className={styles.topActions}>

            <button
              type="button"
              className={
                styles.secondaryTopButton
              }
              onClick={
                this._openBulkAdd
              }
            >
              ⊞ Add Multiple Assets
            </button>

            <button
              type="button"
              className={
                styles.primaryTopButton
              }
              onClick={
                this._openSingleAdd
              }
            >
              ＋ Add Asset
            </button>

          </div>

        </div>

        {
          this.state.error && (
            <div className={styles.error}>
              {
                this.state.error
              }
            </div>
          )
        }

        {
          this.state.message && (
            <div className={styles.success}>
              {
                this.state.message
              }
            </div>
          )
        }

        <div className={styles.filterPanel}>

          <div className={styles.searchBox}>

            <span>
              🔎
            </span>

            <input
              type="text"
              value={
                this.state.searchText
              }
              onChange={
                event =>
                  void this._employeeSearch(
                    event.target.value
                  )
              }
              placeholder="Search employees..."
            />

            {
              this.state.searchText && (
                <button
                  type="button"
                  className={
                    styles.searchClear
                  }
                  onClick={
                    this._clearEmployee
                  }
                >
                  ×
                </button>
              )
            }

          </div>

          {!employeeMode && (
            <React.Fragment>

              <select
                value={
                  this.state.categoryFilter
                }
                onChange={
                  event =>
                    this.setState({
                      categoryFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Categories ({assetTypes.length})
                </option>

                {
                  assetTypes.map(
                    type => (
                      <option
                        key={type}
                        value={type}
                      >
                        {
                          this._displayAssetType(
                            type
                          )
                        }
                      </option>
                    )
                  )
                }

              </select>

              <select
                value={
                  this.state.clientFilter
                }
                onChange={
                  event =>
                    this.setState({
                      clientFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Clients ({clients.length})
                </option>

                {
                  clients.map(
                    client => (
                      <option
                        key={client}
                        value={client}
                      >
                        {
                          client
                        }
                      </option>
                    )
                  )
                }

              </select>

              <select
                value={
                  this.state.statusFilter
                }
                onChange={
                  event =>
                    this.setState({
                      statusFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Statuses
                </option>

                {
                  statuses.map(
                    status => (
                      <option
                        key={status}
                        value={status}
                      >
                        {
                          status
                        }
                      </option>
                    )
                  )
                }

              </select>

              <select
                value={
                  this.state.ownershipFilter
                }
                onChange={
                  event =>
                    this.setState({
                      ownershipFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Ownership
                </option>

                <option value="Own">
                  Own
                </option>

                <option value="Leased">
                  Leased
                </option>

              </select>

              <select
                value={
                  this.state.ownedByFilter
                }
                onChange={
                  event =>
                    this.setState({
                      ownedByFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Owned By
                </option>

                <option value="FinacPlus">
                  FinacPlus
                </option>

                <option value="SixSigma">
                  SixSigma
                </option>

              </select>

              <select
                value={
                  this.state.locationFilter
                }
                onChange={
                  event =>
                    this.setState({
                      locationFilter:
                        event.target.value
                    })
                }
              >

                <option value="All">
                  All Locations
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="Hyderabad">
                  Hyderabad
                </option>

                <option value="Bangalore">
                  Bangalore
                </option>

                <option value="Mohali">
                  Mohali
                </option>

              </select>

              <button
                type="button"
                className={
                  styles.resetButton
                }
                onClick={
                  this._resetFilters
                }
              >
                Reset
              </button>

            </React.Fragment>
          )}

          <div className={styles.resultLine}>

            {
              employeeMode
                ? 'Search Microsoft 365 employee and select a user.'
                : 'Active asset inventory'
            }

          </div>

        </div>

        {
          this.state.employeeResults.length > 0 && (

            <div className={styles.peopleDropdown}>

              {
                this.state.employeeResults.map(
                  employee => (

                    <button
                      key={
                        employee.Email ||
                        employee.Title
                      }
                      type="button"
                      onClick={() =>
                        this._selectEmployee(
                          employee
                        )
                      }
                    >

                      <span
                        className={
                          styles.peopleAvatar
                        }
                      >
                        {
                          employee.Title.substring(
                            0,
                            1
                          ).toUpperCase()
                        }
                      </span>

                      <span>

                        <strong>
                          {
                            employee.Title
                          }
                        </strong>

                        <small>
                          {
                            employee.Email ||
                            employee.LoginName ||
                            ''
                          }
                        </small>

                      </span>

                    </button>
                  )
                )
              }

            </div>
          )
        }

        {
          employeeMode &&
          this.state.selectedEmployee && (

            <div className={styles.employeeProfilePage}>

              <div
                className={
                  styles.employeeProfileHeader
                }
              >

                <div
                  className={
                    styles.employeeIdentityLarge
                  }
                >

                  <div
                    className={
                      styles.employeeAvatarProfile
                    }
                  >
                    {
                      this.state.selectedEmployee.Title
                        .substring(
                          0,
                          1
                        ).toUpperCase()
                    }
                  </div>

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      EMPLOYEE ASSET PROFILE
                    </div>

                    <h2>
                      {
                        this.state.selectedEmployee.Title
                      }
                    </h2>

                    <p>
                      {
                        this.state.selectedEmployee.Email ||
                        ''
                      }
                    </p>

                  </div>

                </div>

                <div className={styles.profileActions}>

                  <button
                    type="button"
                    className={
                      styles.profileSecondaryButton
                    }
                    onClick={
                      this._openSingleAdd
                    }
                  >
                    ＋ Add Asset
                  </button>

                  <button
                    type="button"
                    className={
                      styles.profilePrimaryButton
                    }
                    onClick={
                      this._openBulkAdd
                    }
                  >
                    ⊞ Add Multiple Assets
                  </button>

                </div>

              </div>

              <div className={styles.profileStats}>

                <div>

                  <span>
                    Employee ID
                  </span>

                  <strong>
                    {
                      this._getEmployeeId(
                        this.state.selectedEmployeeAssets
                      )
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    Client
                  </span>

                  <strong>
                    {
                      this._getEmployeeClients(
                        this.state.selectedEmployeeAssets
                      ).join(
                        ', '
                      ) || '-'
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {
                      this._getEmployeeLocations(
                        this.state.selectedEmployeeAssets
                      ).join(
                        ', '
                      ) || '-'
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    Total Assets
                  </span>

                  <strong>
                    {
                      this.state.selectedEmployeeAssets.length
                    }
                  </strong>

                </div>

              </div>

              <div
                className={
                  styles.employeeAssetSection
                }
              >

                <div
                  className={
                    styles.employeeSectionHeader
                  }
                >

                  <div>

                    <h2>
                      Assigned Assets
                    </h2>

                    <p>
                      Active assets assigned to this employee.
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.backToDashboardButton
                    }
                    onClick={
                      this._clearEmployee
                    }
                  >
                    ← Back to Inventory
                  </button>

                </div>

                {
                  this.state.selectedEmployeeAssets.length === 0 && (

                    <div
                      className={
                        styles.employeeNoAssets
                      }
                    >

                      <div>
                        📦
                      </div>

                      <strong>
                        No active assets assigned
                      </strong>

                      <span>
                        This employee currently has no active assets.
                      </span>

                    </div>
                  )
                }

                {
                  this.state.selectedEmployeeAssets.length > 0 && (

                    <div
                      className={
                        styles.employeeAssetGrid
                      }
                    >

                      {
                        this.state.selectedEmployeeAssets.map(
                          asset => (

                            <div
                              key={
                                asset.Id
                              }
                              className={
                                styles.employeeAssetCard
                              }
                            >

                              <div
                                className={
                                  styles.employeeAssetIconLarge
                                }
                              >
                                {
                                  this._assetIcon(
                                    asset.AssetType
                                  )
                                }
                              </div>

                              <div
                                className={
                                  styles.employeeAssetMain
                                }
                              >

                                <strong>
                                  {
                                    this._displayAssetType(
                                      asset.AssetType
                                    )
                                  }
                                </strong>

                                <span>
                                  {
                                    asset.AssetID ||
                                    '-'
                                  }
                                </span>

                                <small>
                                  {
                                    asset.AssetModel ||
                                    '-'
                                  }
                                </small>

                              </div>

                              <div
                                className={
                                  styles.employeeAssetDetails
                                }
                              >

                                <span>
                                  Serial
                                </span>

                                <strong>
                                  {
                                    asset.SerialNumber ||
                                    '-'
                                  }
                                </strong>

                                <span>
                                  Warranty
                                </span>

                                {
                                  this._renderWarranty(
                                    asset.WarrantyExpiry
                                  )
                                }

                              </div>

                              <div
                                className={
                                  styles.employeeAssetLocation
                                }
                              >

                                <span>
                                  Location
                                </span>

                                <strong>
                                  {
                                    asset.Location ||
                                    '-'
                                  }
                                </strong>

                                <span>
                                  Owned By
                                </span>

                                <strong>
                                  {
                                    asset.OwnedBy ||
                                    '-'
                                  }
                                </strong>

                                <button
                                  type="button"
                                  className={
                                    styles.returnVendorButton
                                  }
                                  disabled={
                                    this.state.updatingAssetId ===
                                    asset.Id
                                  }
                                  onClick={() =>
                                    void this._updateAssetStatus(
                                      asset.Id,
                                      'Returned to Vendor'
                                    )
                                  }
                                >
                                  {
                                    this.state.updatingAssetId ===
                                    asset.Id
                                      ? 'Updating...'
                                      : 'Return to Vendor'
                                  }
                                </button>

                              </div>

                            </div>
                          )
                        )
                      }

                    </div>
                  )
                }

              </div>

            </div>
          )
        }

        {
          !employeeMode &&
          this.state.detailMode === 'none' && (

            <React.Fragment>

              <div className={styles.kpiGrid}>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.blueCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Total Assets',
                      activeAssets
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    ◈
                  </div>

                  <span>
                    Total Assets
                  </span>

                  <strong>
                    {
                      totalAssets.toLocaleString()
                    }
                  </strong>

                  <small>
                    {
                      activeCount
                    }
                    {' '}
                    active
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.greenCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Active Units',
                      activeAssets
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    ✓
                  </div>

                  <span>
                    Active Units
                  </span>

                  <strong>
                    {
                      activeCount.toLocaleString()
                    }
                  </strong>

                  <small>
                    {
                      this._getPercentage(
                        activeCount,
                        totalAssets
                      )
                    }
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.purpleCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Employees',
                      activeAssets
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    ◎
                  </div>

                  <span>
                    Employees
                  </span>

                  <strong>
                    {
                      employees.length.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view employees
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.orangeCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Laptops',
                      this._getCategoryAssets(
                        'Laptop'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    💻
                  </div>

                  <span>
                    Laptops
                  </span>

                  <strong>
                    {
                      laptops.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.pinkCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Monitors',
                      this._getCategoryAssets(
                        'Monitor'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    🖥️
                  </div>

                  <span>
                    Monitors
                  </span>

                  <strong>
                    {
                      monitors.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.redCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Desktops',
                      this._getCategoryAssets(
                        'Desktop'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    🖥
                  </div>

                  <span>
                    Desktops
                  </span>

                  <strong>
                    {
                      desktops.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.warranty30Card}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Warranty <= 30 Days',
                      activeAssets.filter(
                        asset =>
                          this._getWarrantyState(
                            asset.WarrantyExpiry
                          ) === '30days'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    ⏳
                  </div>

                  <span>
                    Warranty ≤ 30 Days
                  </span>

                  <strong>
                    {
                      warranty30.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.warranty7Card}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Warranty <= 7 Days',
                      activeAssets.filter(
                        asset =>
                          this._getWarrantyState(
                            asset.WarrantyExpiry
                          ) === '7days'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    ⚠
                  </div>

                  <span>
                    Warranty ≤ 7 Days
                  </span>

                  <strong>
                    {
                      warranty7.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

                <button
                  type="button"
                  className={
                    `${styles.kpiCard} ${styles.warrantyExpiredCard}`
                  }
                  onClick={() =>
                    this._openDashboardDetail(
                      'Warranty Expired',
                      activeAssets.filter(
                        asset =>
                          this._getWarrantyState(
                            asset.WarrantyExpiry
                          ) === 'expired'
                      )
                    )
                  }
                >

                  <div className={styles.kpiIcon}>
                    !
                  </div>

                  <span>
                    Warranty Expired
                  </span>

                  <strong>
                    {
                      warrantyExpired.toLocaleString()
                    }
                  </strong>

                  <small>
                    Click to view devices
                  </small>

                </button>

              </div>

              <div className={styles.dashboardGrid}>

                <div
                  className={
                    styles.categoryPanel
                  }
                >

                  <div
                    className={
                      styles.panelHeader
                    }
                  >

                    <div>

                      <h2>
                        ◔ Assets by Category
                      </h2>

                      <span>
                        Click a category to view its assets.
                      </span>

                    </div>

                    <span
                      className={
                        styles.panelBadge
                      }
                    >
                      {
                        assetTypes.length
                      }
                      {' '}
                      Categories
                    </span>

                  </div>

                  <div
                    className={
                      styles.categoryList
                    }
                  >

                    {
                      assetTypes
                        .filter(
                          type =>
                            type !== 'Desktop'
                        )
                        .slice(
                          0,
                          10
                        )
                        .map(
                          type => {

                            const displayType =
                              this._displayAssetType(
                                type
                              );

                            const count =
                              this._countType(
                                activeAssets,
                                displayType
                              );

                            return (
                              <button
                                key={
                                  type
                                }
                                type="button"
                                className={
                                  styles.categoryItemButton
                                }
                                onClick={() =>
                                  this._openCategory(
                                    displayType
                                  )
                                }
                              >

                                <div
                                  className={
                                    styles.categoryItem
                                  }
                                >

                                  <div
                                    className={
                                      styles.categoryItemIcon
                                    }
                                  >
                                    {
                                      this._assetIcon(
                                        type
                                      )
                                    }
                                  </div>

                                  <div
                                    className={
                                      styles.categoryItemMain
                                    }
                                  >

                                    <div
                                      className={
                                        styles.categoryItemTop
                                      }
                                    >

                                      <span>
                                        {
                                          displayType
                                        }
                                      </span>

                                      <strong>
                                        {
                                          count
                                        }
                                      </strong>

                                    </div>

                                    <div
                                      className={
                                        styles.progressTrack
                                      }
                                    >

                                      <div
                                        className={
                                          styles.progressFill
                                        }
                                        style={{
                                          width:
                                            this._getPercentage(
                                              count,
                                              activeCount
                                            )
                                        }}
                                      />

                                    </div>

                                  </div>

                                  <small>
                                    {
                                      this._getPercentage(
                                        count,
                                        activeCount
                                      )
                                    }
                                  </small>

                                </div>

                              </button>
                            );
                          }
                        )
                    }

                    {
                      (
                        assetTypes.indexOf('CPU') !== -1 ||
                        assetTypes.indexOf('Desktop') !== -1
                      ) && (

                        <button
                          type="button"
                          className={
                            styles.categoryItemButton
                          }
                          onClick={() =>
                            this._openCategory(
                              'Desktop'
                            )
                          }
                        >

                          <div
                            className={
                              styles.categoryItem
                            }
                          >

                            <div
                              className={
                                styles.categoryItemIcon
                              }
                            >
                              🖥
                            </div>

                            <div
                              className={
                                styles.categoryItemMain
                              }
                            >

                              <div
                                className={
                                  styles.categoryItemTop
                                }
                              >

                                <span>
                                  Desktop
                                </span>

                                <strong>
                                  {
                                    desktops
                                  }
                                </strong>

                              </div>

                              <div
                                className={
                                  styles.progressTrack
                                }
                              >

                                <div
                                  className={
                                    styles.progressFill
                                  }
                                  style={{
                                    width:
                                      this._getPercentage(
                                        desktops,
                                        activeCount
                                      )
                                  }}
                                />

                              </div>

                            </div>

                            <small>
                              {
                                this._getPercentage(
                                  desktops,
                                  activeCount
                                )
                              }
                            </small>

                          </div>

                        </button>
                      )
                    }

                  </div>

                </div>

                <div
                  className={
                    styles.clientPanel
                  }
                >

                  <div
                    className={
                      styles.panelHeader
                    }
                  >

                    <div>

                      <h2>
                        ▦ Client Wise Assets
                      </h2>

                      <span>
                        View asset distribution by client.
                      </span>

                    </div>

                    <span
                      className={
                        styles.panelBadge
                      }
                    >
                      {
                        clients.length
                      }
                      {' '}
                      Clients
                    </span>

                  </div>

                  <div
                    className={
                      styles.clientSummaryGrid
                    }
                  >

                    {
                      clients
                        .slice(
                          0,
                          12
                        )
                        .map(
                          client => {

                            const count =
                              this._getClientAssets(
                                client
                              ).length;

                            return (
                              <button
                                key={
                                  client
                                }
                                type="button"
                                className={
                                  styles.clientSummaryCard
                                }
                                onClick={() =>
                                  this._openClient(
                                    client
                                  )
                                }
                              >

                                <div
                                  className={
                                    styles.clientSummaryTop
                                  }
                                >

                                  <span>
                                    {
                                      client
                                    }
                                  </span>

                                  <strong>
                                    {
                                      count
                                    }
                                  </strong>

                                </div>

                                <div
                                  className={
                                    styles.progressTrack
                                  }
                                >

                                  <div
                                    className={
                                      styles.clientProgress
                                    }
                                    style={{
                                      width:
                                        this._getPercentage(
                                          count,
                                          activeCount
                                        )
                                    }}
                                  />

                                </div>

                              </button>
                            );
                          }
                        )
                    }

                  </div>

                </div>

              </div>

            </React.Fragment>
          )
        }

        {
          this.state.detailMode === 'dashboard' && (

            <div
              className={
                styles.detailOverlay
              }
            >

              <div
                className={
                  styles.dashboardDetailModal
                }
              >

                <div
                  className={
                    styles.detailModalHeader
                  }
                >

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      ASSET DETAILS
                    </div>

                    <h2>
                      {
                        this.state.detailTitle
                      }
                    </h2>

                    <p>
                      {
                        this.state.detailAssets.length
                      }
                      {' '}
                      active assets
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.detailClose
                    }
                    onClick={
                      this._closeDetail
                    }
                  >
                    ×
                  </button>

                </div>

                <div
                  className={
                    styles.dashboardDetailSummary
                  }
                >

                  <div>
                    <span>
                      Devices
                    </span>

                    <strong>
                      {
                        this.state.detailAssets.length
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Employees
                    </span>

                    <strong>
                      {
                        new Set(
                          this.state.detailAssets
                            .filter(
                              asset =>
                                !!(
                                  asset.EmpName &&
                                  asset.EmpName.Id
                                )
                            )
                            .map(
                              asset =>
                                asset.EmpName &&
                                asset.EmpName.Id
                            )
                        ).size
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Own
                    </span>

                    <strong>
                      {
                        this._countOwnedAssets(
                          this.state.detailAssets
                        )
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Leased
                    </span>

                    <strong>
                      {
                        this._countLeasedAssets(
                          this.state.detailAssets
                        )
                      }
                    </strong>
                  </div>

                </div>

                <div
                  className={
                    styles.dashboardAssetTable
                  }
                >

                  <div
                    className={
                      styles.dashboardAssetHeader
                    }
                  >

                    <span>
                      Device
                    </span>

                    <span>
                      Employee
                    </span>

                    <span>
                      Client
                    </span>

                    <span>
                      Model
                    </span>

                    <span>
                      Serial
                    </span>

                    <span>
                      Location
                    </span>

                    <span>
                      Warranty
                    </span>

                  </div>

                  {
                    this.state.detailAssets.map(
                      asset => (

                        <div
                          key={
                            asset.Id
                          }
                          className={
                            styles.dashboardAssetRow
                          }
                        >

                          <div
                            className={
                              styles.dashboardDevice
                            }
                          >

                            <span
                              className={
                                styles.dashboardDeviceIcon
                              }
                            >
                              {
                                this._assetIcon(
                                  asset.AssetType
                                )
                              }
                            </span>

                            <div>

                              <strong>
                                {
                                  this._displayAssetType(
                                    asset.AssetType
                                  )
                                }
                              </strong>

                              <small>
                                {
                                  asset.AssetID ||
                                  '-'
                                }
                              </small>

                            </div>

                          </div>

                          <div
                            className={
                              styles.dashboardEmployee
                            }
                          >

                            <strong>
                              {
                                (
                                  asset.EmpName &&
                                  asset.EmpName.Title
                                ) ||
                                'Unassigned'
                              }
                            </strong>

                            <small>
                              {
                                (
                                  asset.EmpName &&
                                  asset.EmpName.EMail
                                ) ||
                                ''
                              }
                            </small>

                          </div>

                          <div>
                            {
                              asset.Client ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.AssetModel ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.SerialNumber ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.Location ||
                              '-'
                            }
                          </div>

                          {
                            this._renderWarranty(
                              asset.WarrantyExpiry
                            )
                          }

                        </div>
                      )
                    )
                  }

                  {
                    this.state.detailAssets.length === 0 && (

                      <div
                        className={
                          styles.categoryEmpty
                        }
                      >
                        No matching assets found.
                      </div>
                    )
                  }

                </div>

              </div>

            </div>
          )
        }

        {
          this.state.detailMode === 'client' &&
          this.state.selectedClient && (

            <div
              className={
                styles.detailOverlay
              }
            >

              <div
                className={
                  styles.clientDetailModal
                }
              >

                <div
                  className={
                    styles.detailModalHeader
                  }
                >

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      CLIENT PORTFOLIO
                    </div>

                    <h2>
                      {
                        this.state.selectedClient.client
                      }
                    </h2>

                    <p>
                      {
                        this.state.selectedClient.employees.length
                      }
                      {' '}
                      employees
                      {' · '}
                      {
                        this.state.selectedClient.assets.length
                      }
                      {' '}
                      active assets
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.detailClose
                    }
                    onClick={
                      this._closeDetail
                    }
                  >
                    ×
                  </button>

                </div>

                <div
                  className={
                    styles.clientStatsRow
                  }
                >

                  <div>
                    <span>
                      Employees
                    </span>

                    <strong>
                      {
                        this.state.selectedClient.employees.length
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Laptops
                    </span>

                    <strong>
                      {
                        this._countType(
                          this.state.selectedClient.assets,
                          'Laptop'
                        )
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Monitors
                    </span>

                    <strong>
                      {
                        this._countType(
                          this.state.selectedClient.assets,
                          'Monitor'
                        )
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Desktops
                    </span>

                    <strong>
                      {
                        this._countType(
                          this.state.selectedClient.assets,
                          'Desktop'
                        )
                      }
                    </strong>
                  </div>

                </div>

                <div
                  className={
                    styles.clientEmployeeGrid
                  }
                >

                  {
                    this.state.selectedClient.employees.map(
                      entry => (

                        <button
                          key={
                            entry.employee.Id
                          }
                          type="button"
                          className={
                            styles.clientEmployeeCard
                          }
                          onClick={() =>
                            this._selectEmployee(
                              entry.employee
                            )
                          }
                        >

                          <div
                            className={
                              styles.employeeAvatarLarge
                            }
                          >
                            {
                              entry.employee.Title
                                .substring(
                                  0,
                                  1
                                )
                                .toUpperCase()
                            }
                          </div>

                          <div
                            className={
                              styles.clientEmployeeInfo
                            }
                          >

                            <strong>
                              {
                                entry.employee.Title
                              }
                            </strong>

                            <span>
                              {
                                entry.employee.Email ||
                                ''
                              }
                            </span>

                            <small>
                              {
                                entry.assets.length
                              }
                              {' '}
                              assets
                            </small>

                          </div>

                          <span
                            className={
                              styles.arrow
                            }
                          >
                            →
                          </span>

                        </button>
                      )
                    )
                  }

                </div>

              </div>

            </div>
          )
        }

        {
          this.state.detailMode === 'category' &&
          this.state.selectedCategory && (

            <div
              className={
                styles.detailOverlay
              }
            >

              <div
                className={
                  styles.categoryDetailModal
                }
              >

                <div
                  className={
                    styles.detailModalHeader
                  }
                >

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      CATEGORY ASSET VIEW
                    </div>

                    <h2>
                      {
                        this.state.selectedCategory.category
                      }
                    </h2>

                    <p>
                      {
                        this.state.selectedCategory.assets.length
                      }
                      {' '}
                      active assets
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.detailClose
                    }
                    onClick={
                      this._closeDetail
                    }
                  >
                    ×
                  </button>

                </div>

                <div
                  className={
                    styles.categoryDetailStats
                  }
                >

                  <div>
                    <span>
                      Assets
                    </span>

                    <strong>
                      {
                        this.state.selectedCategory.assets.length
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Employees
                    </span>

                    <strong>
                      {
                        new Set(
                          this.state.selectedCategory.assets
                            .filter(
                              asset =>
                                !!(
                                  asset.EmpName &&
                                  asset.EmpName.Id
                                )
                            )
                            .map(
                              asset =>
                                asset.EmpName &&
                                asset.EmpName.Id
                            )
                        ).size
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Own
                    </span>

                    <strong>
                      {
                        this._countOwnedAssets(
                          this.state.selectedCategory.assets
                        )
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Leased
                    </span>

                    <strong>
                      {
                        this._countLeasedAssets(
                          this.state.selectedCategory.assets
                        )
                      }
                    </strong>
                  </div>

                </div>

                <div
                  className={
                    styles.categoryAssetTable
                  }
                >

                  <div
                    className={
                      styles.categoryAssetHeader
                    }
                  >

                    <span>
                      Asset
                    </span>

                    <span>
                      Employee
                    </span>

                    <span>
                      Client
                    </span>

                    <span>
                      Model
                    </span>

                    <span>
                      Serial
                    </span>

                    <span>
                      Location
                    </span>

                    <span>
                      Status
                    </span>

                    <span>
                      Warranty
                    </span>

                  </div>

                  {
                    this.state.selectedCategory.assets.map(
                      asset => (

                        <div
                          key={
                            asset.Id
                          }
                          className={
                            styles.categoryAssetRow
                          }
                        >

                          <div
                            className={
                              styles.categoryAssetIdentity
                            }
                          >

                            <span
                              className={
                                styles.categoryAssetIcon
                              }
                            >
                              {
                                this._assetIcon(
                                  asset.AssetType
                                )
                              }
                            </span>

                            <div>

                              <strong>
                                {
                                  asset.AssetID ||
                                  '-'
                                }
                              </strong>

                              <small>
                                {
                                  this._displayAssetType(
                                    asset.AssetType
                                  )
                                }
                              </small>

                            </div>

                          </div>

                          <div>
                            {
                              (
                                asset.EmpName &&
                                asset.EmpName.Title
                              ) ||
                              'Unassigned'
                            }
                          </div>

                          <div>
                            {
                              asset.Client ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.AssetModel ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.SerialNumber ||
                              '-'
                            }
                          </div>

                          <div>
                            {
                              asset.Location ||
                              '-'
                            }
                          </div>

                          <div>

                            <span
                              className={
                                styles.inUseBadge
                              }
                            >
                              {
                                asset.AssetStatus ||
                                '-'
                              }
                            </span>

                          </div>

                          {
                            this._renderWarranty(
                              asset.WarrantyExpiry
                            )
                          }

                        </div>
                      )
                    )
                  }

                </div>

              </div>

            </div>
          )
        }

        {
          this.state.showSingleAdd && (

            <div
              className={
                styles.modalOverlay
              }
            >

              <div
                className={
                  styles.assetModal
                }
              >

                <div
                  className={
                    styles.modalHeader
                  }
                >

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      ASSET ASSIGNMENT
                    </div>

                    <h2>
                      Add Asset
                    </h2>

                    <p>
                      Add one asset to a Microsoft 365 employee.
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.detailClose
                    }
                    onClick={
                      this._closeSingleAdd
                    }
                  >
                    ×
                  </button>

                </div>

                <div
                  className={
                    styles.modalBody
                  }
                >

                  <div
                    className={
                      styles.employeePicker
                    }
                  >

                    <label>
                      Employee / User Name *
                    </label>

                    <input
                      type="text"
                      value={
                        this.state.singleEmployeeText
                      }
                      onChange={
                        event =>
                          void this._singleEmployeeSearch(
                            event.target.value
                          )
                      }
                      placeholder="Search Microsoft 365 user"
                    />

                    {
                      this.state.singleEmployeeResults.length > 0 && (

                        <div
                          className={
                            styles.peopleDropdownInside
                          }
                        >

                          {
                            this.state.singleEmployeeResults.map(
                              employee => (

                                <button
                                  key={
                                    employee.Email ||
                                    employee.Title
                                  }
                                  type="button"
                                  onClick={() =>
                                    this._selectSingleEmployee(
                                      employee
                                    )
                                  }
                                >

                                  <strong>
                                    {
                                      employee.Title
                                    }
                                  </strong>

                                  <small>
                                    {
                                      employee.Email ||
                                      ''
                                    }
                                  </small>

                                </button>
                              )
                            )
                          }

                        </div>
                      )
                    }

                  </div>

                  <div
                    className={
                      styles.formGridFour
                    }
                  >

                    <div>

                      <label>
                        Employee ID
                      </label>

                      <input
                        value={
                          this.state.singleEmployeeId
                        }
                        onChange={
                          event =>
                            this.setState({
                              singleEmployeeId:
                                event.target.value
                            })
                        }
                      />

                    </div>

                    <div>

                      <label>
                        Allocation Date
                      </label>

                      <input
                        type="date"
                        value={
                          this._todayForInput()
                        }
                        readOnly
                      />

                    </div>

                    <div>

                      <label>
                        Client
                      </label>

                      <select
                        value={
                          this.state.singleAsset.client
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'client',
                              event.target.value
                            )
                        }
                      >

                        <option value="">
                          Select
                        </option>

                        {
                          clients.map(
                            client => (

                              <option
                                key={
                                  client
                                }
                                value={
                                  client
                                }
                              >
                                {
                                  client
                                }
                              </option>
                            )
                          )
                        }

                      </select>

                    </div>

                    <div>

                      <label>
                        Location
                      </label>

                      <select
                        value={
                          this.state.singleAsset.location
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'location',
                              event.target.value
                            )
                        }
                      >

                        <option value="Remote">
                          Remote
                        </option>

                        <option value="Hyderabad">
                          Hyderabad
                        </option>

                        <option value="Bangalore">
                          Bangalore
                        </option>

                        <option value="Mohali">
                          Mohali
                        </option>

                      </select>

                    </div>

                  </div>

                  <div
                    className={
                      styles.formGridFour
                    }
                  >

                    <div>

                      <label>
                        Asset Type *
                      </label>

                      <select
                        value={
                          this.state.singleAsset.assetType
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'assetType',
                              event.target.value
                            )
                        }
                      >

                        <option value="">
                          Select
                        </option>

                        {
                          assetTypes.map(
                            type => (

                              <option
                                key={
                                  type
                                }
                                value={
                                  type
                                }
                              >
                                {
                                  this._displayAssetType(
                                    type
                                  )
                                }
                              </option>
                            )
                          )
                        }

                      </select>

                    </div>

                    <div>

                      <label>
                        Asset ID *
                      </label>

                      <input
                        value={
                          this.state.singleAsset.assetId
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'assetId',
                              event.target.value
                            )
                        }
                      />

                    </div>

                    <div>

                      <label>
                        Model
                      </label>

                      <input
                        value={
                          this.state.singleAsset.assetModel
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'assetModel',
                              event.target.value
                            )
                        }
                      />

                    </div>

                    <div>

                      <label>
                        Serial Number
                      </label>

                      <input
                        value={
                          this.state.singleAsset.serialNumber
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'serialNumber',
                              event.target.value
                            )
                        }
                      />

                    </div>

                  </div>

                  <div
                    className={
                      styles.formGridFour
                    }
                  >

                    <div>

                      <label>
                        Warranty Expiry
                      </label>

                      <input
                        type="date"
                        value={
                          this.state.singleAsset.warrantyExpiry
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'warrantyExpiry',
                              event.target.value
                            )
                        }
                      />

                    </div>

                    <div>

                      <label>
                        Ownership
                      </label>

                      <select
                        value={
                          this.state.singleAsset.ownLease
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'ownLease',
                              event.target.value
                            )
                        }
                      >

                        <option value="Own">
                          Own
                        </option>

                        <option value="Leased">
                          Leased
                        </option>

                      </select>

                    </div>

                    <div>

                      <label>
                        Owned By
                      </label>

                      <select
                        value={
                          this.state.singleAsset.ownedBy
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'ownedBy',
                              event.target.value
                            )
                        }
                      >

                        <option value="FinacPlus">
                          FinacPlus
                        </option>

                        <option value="SixSigma">
                          SixSigma
                        </option>

                      </select>

                    </div>

                    <div>

                      <label>
                        Status
                      </label>

                      <select
                        value={
                          this.state.singleAsset.assetStatus
                        }
                        onChange={
                          event =>
                            this._updateSingleAsset(
                              'assetStatus',
                              event.target.value
                            )
                        }
                      >

                        <option value="In Use">
                          In Use
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

                <div
                  className={
                    styles.modalFooter
                  }
                >

                  <button
                    type="button"
                    className={
                      styles.cancelButton
                    }
                    onClick={
                      this._closeSingleAdd
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className={
                      styles.saveButton
                    }
                    onClick={
                      this._saveSingleAsset
                    }
                    disabled={
                      this.state.saving
                    }
                  >
                    {
                      this.state.saving
                        ? 'Saving...'
                        : 'Add Asset'
                    }
                  </button>

                </div>

              </div>

            </div>
          )
        }

        {
          this.state.showBulkAdd && (

            <div
              className={
                styles.modalOverlay
              }
            >

              <div
                className={
                  styles.assetModalWide
                }
              >

                <div
                  className={
                    styles.modalHeader
                  }
                >

                  <div>

                    <div
                      className={
                        styles.detailEyebrow
                      }
                    >
                      ASSET ASSIGNMENT
                    </div>

                    <h2>
                      Add Multiple Assets at Once for a User
                    </h2>

                    <p>
                      Assign hardware in a single batch.
                    </p>

                  </div>

                  <button
                    type="button"
                    className={
                      styles.detailClose
                    }
                    onClick={
                      this._closeBulkAdd
                    }
                  >
                    ×
                  </button>

                </div>

                <div
                  className={
                    styles.modalBody
                  }
                >

                  <div
                    className={
                      styles.assignmentSection
                    }
                  >

                    <div
                      className={
                        styles.assignmentSectionHeader
                      }
                    >

                      <div>

                        <strong>
                          1. User &amp; Allocation Details
                        </strong>

                        <span>
                          Select the exact Microsoft 365 user.
                        </span>

                      </div>

                    </div>

                    <div
                      className={
                        styles.formGridFour
                      }
                    >

                      <div
                        className={
                          styles.employeePicker
                        }
                      >

                        <label>
                          Employee / User Name *
                        </label>

                        <input
                          value={
                            this.state.bulkEmployeeText
                          }
                          onChange={
                            event =>
                              void this._bulkEmployeeSearch(
                                event.target.value
                              )
                          }
                          placeholder="Search Microsoft 365 user"
                        />

                        {
                          this.state.bulkEmployeeResults.length > 0 && (

                            <div
                              className={
                                styles.peopleDropdownInside
                              }
                            >

                              {
                                this.state.bulkEmployeeResults.map(
                                  employee => (

                                    <button
                                      key={
                                        employee.Email ||
                                        employee.Title
                                      }
                                      type="button"
                                      onClick={() =>
                                        this._selectBulkEmployee(
                                          employee
                                        )
                                      }
                                    >

                                      <strong>
                                        {
                                          employee.Title
                                        }
                                      </strong>

                                      <small>
                                        {
                                          employee.Email ||
                                          ''
                                        }
                                      </small>

                                    </button>
                                  )
                                )
                              }

                            </div>
                          )
                        }

                      </div>

                      <div>

                        <label>
                          Employee ID
                        </label>

                        <input
                          value={
                            this.state.bulkEmployeeId
                          }
                          onChange={
                            event =>
                              this.setState({
                                bulkEmployeeId:
                                  event.target.value
                              })
                          }
                        />

                      </div>

                      <div>

                        <label>
                          Client Account
                        </label>

                        <select
                          value={
                            this.state.bulkRows[0]
                              ? this.state.bulkRows[0].client
                              : ''
                          }
                          onChange={
                            event => {

                              const client =
                                event.target.value;

                              this.setState({

                                bulkRows:
                                  this.state.bulkRows.map(
                                    row => ({
                                      ...row,

                                      client:
                                        client
                                    })
                                  )
                              });
                            }
                          }
                        >

                          <option value="">
                            Select Client
                          </option>

                          {
                            clients.map(
                              client => (

                                <option
                                  key={
                                    client
                                  }
                                  value={
                                    client
                                  }
                                >
                                  {
                                    client
                                  }
                                </option>
                              )
                            )
                          }

                        </select>

                      </div>

                      <div>

                        <label>
                          Allocation Date
                        </label>

                        <input
                          type="date"
                          value={
                            this.state.bulkAllocatedDate
                          }
                          onChange={
                            event =>
                              this.setState({
                                bulkAllocatedDate:
                                  event.target.value
                              })
                          }
                        />

                      </div>

                    </div>

                    <div
                      className={
                        styles.formGridFour
                      }
                    >

                      <div>

                        <label>
                          Location
                        </label>

                        <select
                          value={
                            this.state.bulkRows[0]
                              ? this.state.bulkRows[0].location
                              : 'Remote'
                          }
                          onChange={
                            event => {

                              const location =
                                event.target.value;

                              this.setState({

                                bulkRows:
                                  this.state.bulkRows.map(
                                    row => ({
                                      ...row,

                                      location:
                                        location
                                    })
                                  )
                              });
                            }
                          }
                        >

                          <option value="Remote">
                            Remote
                          </option>

                          <option value="Hyderabad">
                            Hyderabad
                          </option>

                          <option value="Bangalore">
                            Bangalore
                          </option>

                          <option value="Mohali">
                            Mohali
                          </option>

                        </select>

                      </div>

                      <div>

                        <label>
                          Ownership
                        </label>

                        <select
                          value={
                            this.state.bulkRows[0]
                              ? this.state.bulkRows[0].ownLease
                              : 'Own'
                          }
                          onChange={
                            event => {

                              const ownLease =
                                event.target.value;

                              this.setState({

                                bulkRows:
                                  this.state.bulkRows.map(
                                    row => ({
                                      ...row,

                                      ownLease:
                                        ownLease
                                    })
                                  )
                              });
                            }
                          }
                        >

                          <option value="Own">
                            Own
                          </option>

                          <option value="Leased">
                            Leased
                          </option>

                        </select>

                      </div>

                      <div>

                        <label>
                          Owned By
                        </label>

                        <select
                          value={
                            this.state.bulkRows[0]
                              ? this.state.bulkRows[0].ownedBy
                              : 'FinacPlus'
                          }
                          onChange={
                            event => {

                              const ownedBy =
                                event.target.value;

                              this.setState({

                                bulkRows:
                                  this.state.bulkRows.map(
                                    row => ({
                                      ...row,

                                      ownedBy:
                                        ownedBy
                                    })
                                  )
                              });
                            }
                          }
                        >

                          <option value="FinacPlus">
                            FinacPlus
                          </option>

                          <option value="SixSigma">
                            SixSigma
                          </option>

                        </select>

                      </div>

                      <div>

                        <label>
                          Assignment
                        </label>

                        <div
                          className={
                            styles.bundleInfo
                          }
                        >
                          Applied to all rows
                        </div>

                      </div>

                    </div>

                  </div>

                  <div
                    className={
                      styles.assignmentSection
                    }
                  >

                    <div
                      className={
                        styles.assignmentSectionHeader
                      }
                    >

                      <div>

                        <strong>
                          2. Equipment to Assign
                        </strong>

                        <span>
                          Add individual assets to this employee.
                        </span>

                      </div>

                      <div
                        className={
                          styles.quickButtons
                        }
                      >

                        <button
                          type="button"
                          onClick={() =>
                            this.setState({

                              bulkRows:
                                this.state.bulkRows.concat(
                                  [
                                    {
                                      ...this._createAssetRow(),

                                      assetType:
                                        'Laptop'
                                    }
                                  ]
                                )
                            })
                          }
                        >
                          ＋ Laptop
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            this.setState({

                              bulkRows:
                                this.state.bulkRows.concat(
                                  [
                                    {
                                      ...this._createAssetRow(),

                                      assetType:
                                        'Monitor'
                                    }
                                  ]
                                )
                            })
                          }
                        >
                          ＋ Monitor
                        </button>

                        <button
                          type="button"
                          onClick={
                            this._addBulkRow
                          }
                        >
                          ＋ Custom Asset
                        </button>

                      </div>

                    </div>

                    <div
                      className={
                        styles.bulkTable
                      }
                    >

                      <div
                        className={
                          styles.bulkHeader
                        }
                      >

                        <span>
                          #
                        </span>

                        <span>
                          Category *
                        </span>

                        <span>
                          Asset ID *
                        </span>

                        <span>
                          Serial No
                        </span>

                        <span>
                          Model &amp; Details
                        </span>

                        <span>
                          Warranty
                        </span>

                        <span>
                          Status
                        </span>

                        <span>
                          DEL
                        </span>

                      </div>

                      {
                        this.state.bulkRows.map(
                          (
                            row,
                            index
                          ) => (

                            <div
                              key={
                                row.rowId
                              }
                              className={
                                styles.bulkRow
                              }
                            >

                              <span
                                className={
                                  styles.rowNumber
                                }
                              >
                                {
                                  index + 1
                                }
                              </span>

                              <select
                                value={
                                  row.assetType
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'assetType',
                                      event.target.value
                                    )
                                }
                              >

                                <option value="">
                                  Select
                                </option>

                                {
                                  assetTypes.map(
                                    type => (

                                      <option
                                        key={
                                          type
                                        }
                                        value={
                                          type
                                        }
                                      >
                                        {
                                          this._displayAssetType(
                                            type
                                          )
                                        }
                                      </option>
                                    )
                                  )
                                }

                              </select>

                              <input
                                value={
                                  row.assetId
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'assetId',
                                      event.target.value
                                    )
                                }
                                placeholder="Asset ID"
                              />

                              <input
                                value={
                                  row.serialNumber
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'serialNumber',
                                      event.target.value
                                    )
                                }
                                placeholder="Serial"
                              />

                              <input
                                value={
                                  row.assetModel
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'assetModel',
                                      event.target.value
                                    )
                                }
                                placeholder="Model / Details"
                              />

                              <input
                                type="date"
                                value={
                                  row.warrantyExpiry
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'warrantyExpiry',
                                      event.target.value
                                    )
                                }
                              />

                              <select
                                value={
                                  row.assetStatus
                                }
                                onChange={
                                  event =>
                                    this._updateBulkRow(
                                      row.rowId,
                                      'assetStatus',
                                      event.target.value
                                    )
                                }
                              >

                                <option value="In Use">
                                  In Use
                                </option>

                              </select>

                              <button
                                type="button"
                                className={
                                  styles.deleteRow
                                }
                                onClick={() =>
                                  this._removeBulkRow(
                                    row.rowId
                                  )
                                }
                                disabled={
                                  this.state.bulkRows.length <=
                                  1
                                }
                              >
                                🗑
                              </button>

                            </div>
                          )
                        )
                      }

                    </div>

                    <button
                      type="button"
                      className={
                        styles.addAnotherRow
                      }
                      onClick={
                        this._addBulkRow
                      }
                    >
                      ＋ Add Another Asset Row
                    </button>

                  </div>

                </div>

                <div
                  className={
                    styles.modalFooter
                  }
                >

                  <span
                    className={
                      styles.footerInfo
                    }
                  >
                    All rows will be linked to the selected employee.
                  </span>

                  <div
                    className={
                      styles.modalFooterRight
                    }
                  >

                    <button
                      type="button"
                      className={
                        styles.cancelButton
                      }
                      onClick={
                        this._closeBulkAdd
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className={
                        styles.saveButton
                      }
                      onClick={
                        this._saveBulkAssets
                      }
                      disabled={
                        this.state.saving
                      }
                    >
                      {
                        this.state.saving
                          ? 'Saving...'
                          : 'Save & Assign ' +
                            this.state.bulkRows.length +
                            ' Assets'
                      }
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )
        }

      </div>
    );
  }
}