import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface ILicense {
  Id: number;
  Title: string;
  LicenseType?: string;
  Vendor?: string;
  TotalSeats?: number;
  AssignedSeats?: number;
  AvailableSeats?: number;
  ExpiryDate?: string;
  CostCenter?: string;
  Status?: string;
}

export class LicenseService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getLicenses(): Promise<ILicense[]> {
    return this.getItems<ILicense>(
      'Licenses',
      '?$select=Id,Title,LicenseType,Vendor,TotalSeats,AssignedSeats,AvailableSeats,ExpiryDate,CostCenter,Status&$orderby=Title asc&$top=5000'
    );
  }

  public async createLicense(payload: Partial<ILicense>): Promise<ILicense> {
    return this.postItem<ILicense>('Licenses', payload);
  }

  public async updateLicense(id: number, payload: Partial<ILicense>): Promise<void> {
    await this.updateItem('Licenses', id, payload);
  }
}
