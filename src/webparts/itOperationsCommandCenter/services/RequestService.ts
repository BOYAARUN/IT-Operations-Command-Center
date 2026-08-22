import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export type RequestType =
  | 'New Joiner'
  | 'Offboarding'
  | 'Replacement'
  | 'Additional Asset'
  | 'License';

export interface IRequest {
  Id: number;
  Title?: string;
  RequestID?: string;
  RequestType?: RequestType | string;
  Employee?: { Id?: number; Title?: string; EMail?: string };
  EmployeeName?: string;
  Client?: string;
  DOJ?: string;
  LWD?: string;
  Location?: string;
  Status?: string;
  Priority?: string;
  Created?: string;
  AssetTag?: string;
  Reason?: string;
  ReplacementAssetType?: string;
  AdditionalRequirement?: string;
}

export class RequestService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getRequests(): Promise<IRequest[]> {
    return this.getItems<IRequest>(
      'Requests',
      '?$select=Id,Title,RequestID,RequestType,Employee/Id,Employee/Title,Employee/EMail,Client,DOJ,LWD,Location,Status,Priority,Created,AssetTag,Reason,ReplacementAssetType,AdditionalRequirement&$expand=Employee&$orderby=Created desc&$top=5000'
    );
  }

  public async getRequestsByType(requestType: string): Promise<IRequest[]> {
    const safe = requestType.replace(/'/g, "''");
    return this.getItems<IRequest>(
      'Requests',
      `?$select=Id,Title,RequestID,RequestType,Employee/Id,Employee/Title,Employee/EMail,Client,DOJ,LWD,Location,Status,Priority,Created,AssetTag,Reason,ReplacementAssetType,AdditionalRequirement&$expand=Employee&$filter=RequestType eq '${encodeURIComponent(safe)}'&$orderby=Created desc&$top=5000`
    );
  }

  public async createRequest(payload: Partial<IRequest>): Promise<IRequest> {
    return this.postItem<IRequest>('Requests', payload);
  }

  public async updateRequest(id: number, payload: Partial<IRequest>): Promise<void> {
    await this.updateItem('Requests', id, payload);
  }
}
