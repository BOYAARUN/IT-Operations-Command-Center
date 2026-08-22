import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface IActivityLog {
  Id: number;
  Title?: string;
  RequestID?: string;
  Employee?: string;
  ActivityType?: string;
  Description?: string;
  PerformedBy?: string;
  PerformedDate?: string;
}

export class ActivityLogService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getActivityLogs(): Promise<IActivityLog[]> {
    return this.getItems<IActivityLog>(
      'ActivityLogs',
      '?$select=Id,Title,RequestID,Employee,ActivityType,Description,PerformedBy,PerformedDate&$orderby=PerformedDate desc&$top=5000'
    );
  }

  public async addActivityLog(payload: Partial<IActivityLog>): Promise<IActivityLog> {
    return this.postItem<IActivityLog>('ActivityLogs', {
      ...payload,
      PerformedDate: payload.PerformedDate || new Date().toISOString()
    });
  }
}
