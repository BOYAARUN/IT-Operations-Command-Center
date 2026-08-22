import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface IOffboarding {
  Id: number;
  Title?: string;
  RequestID?: string;
  Employee?: { Id?: number; Title?: string; EMail?: string };
  LWD?: string;
  AssetReturnStatus?: string;
  LicenseRemovalStatus?: string;
  AccountStatus?: string;
  ChecklistStatus?: string;
  VendorStatus?: string;
  OverallStatus?: string;
  Created?: string;
}

export class OffboardingService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getOffboardings(): Promise<IOffboarding[]> {
    return this.getItems<IOffboarding>(
      'Offboarding',
      '?$select=Id,Title,RequestID,Employee/Id,Employee/Title,Employee/EMail,LWD,AssetReturnStatus,LicenseRemovalStatus,AccountStatus,ChecklistStatus,VendorStatus,OverallStatus,Created&$expand=Employee&$orderby=LWD asc&$top=5000'
    );
  }

  public async createOffboarding(payload: Partial<IOffboarding>): Promise<IOffboarding> {
    return this.postItem<IOffboarding>('Offboarding', payload);
  }

  public async updateOffboarding(id: number, payload: Partial<IOffboarding>): Promise<void> {
    await this.updateItem('Offboarding', id, payload);
  }
}
