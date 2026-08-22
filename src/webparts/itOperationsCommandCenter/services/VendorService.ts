import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface IVendorAction {
  Id: number;
  Title?: string;
  RequestID?: string;
  RequestType?: string;
  Vendor?: string;
  Action?: string;
  EmailSent?: boolean;
  SentDate?: string;
  Status?: string;
}

export class VendorService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getVendorActions(): Promise<IVendorAction[]> {
    return this.getItems<IVendorAction>(
      'VendorActions',
      '?$select=Id,Title,RequestID,RequestType,Vendor,Action,EmailSent,SentDate,Status&$orderby=Id desc&$top=5000'
    );
  }

  public async createVendorAction(payload: Partial<IVendorAction>): Promise<IVendorAction> {
    return this.postItem<IVendorAction>('VendorActions', payload);
  }

  public async updateVendorAction(id: number, payload: Partial<IVendorAction>): Promise<void> {
    await this.updateItem('VendorActions', id, payload);
  }
}
