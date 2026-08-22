import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface IAsset {
  Id: number;
  Title?: string;
  AssetID?: string;
  AssetType?: string;
  AssetModel?: string;
  SerialNumber?: string;
  EmpName?: { Id?: number; Title?: string; EMail?: string };
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

export class AssetService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getAssets(): Promise<IAsset[]> {
    return this.getItems<IAsset>(
      'Active IT Assets',
      '?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease&$expand=EmpName&$orderby=Id desc&$top=5000'
    );
  }

  public async getEmployeeAssets(employeeId: number): Promise<IAsset[]> {
    return this.getItems<IAsset>(
      'Active IT Assets',
      `?$select=Id,Title,AssetID,AssetType,AssetModel,SerialNumber,EmpName/Id,EmpName/Title,EmpName/EMail,AllocatedDate,WarrantyExpiry,AssetStatus,Client,ReturnDate,HostName,OwnedBy,AckStatus,AckDate,Location,AssignmentID,Own_x002f_Lease&$expand=EmpName&$filter=EmpName/Id eq ${employeeId}&$orderby=Id desc&$top=5000`
    );
  }

  public async createAsset(payload: Record<string, any>): Promise<IAsset> {
    return this.postItem<IAsset>('Active IT Assets', payload);
  }

  public async updateAsset(id: number, payload: Record<string, any>): Promise<void> {
    await this.updateItem('Active IT Assets', id, payload);
  }
}
