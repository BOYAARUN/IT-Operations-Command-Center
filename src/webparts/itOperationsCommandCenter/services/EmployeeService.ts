import { ISharePointServiceContext, SharePointService } from './ISharePointService';

export interface IEmployee {
  Id: number;
  Title: string;
  Email?: string;
  Department?: string;
  Client?: string;
  Location?: string;
  Manager?: string;
  DOJ?: string;
  LWD?: string;
  Status?: string;
  EmployeeID?: string;
}

export class EmployeeService extends SharePointService {
  public constructor(context: ISharePointServiceContext) {
    super(context);
  }

  public async getEmployees(): Promise<IEmployee[]> {
    return this.getItems<IEmployee>('Employees', '?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$orderby=Title asc&$top=5000');
  }

  public async searchEmployees(searchText: string): Promise<IEmployee[]> {
    const text = searchText.trim().replace(/'/g, "''");
    if (!text) return [];

    const filter = `substringof('${text}',Title) or substringof('${text}',Email) or substringof('${text}',EmployeeID)`;

    return this.getItems<IEmployee>(
      'Employees',
      `?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$filter=${encodeURIComponent(filter)}&$orderby=Title asc&$top=50`
    );
  }

  public async getEmployee(id: number): Promise<IEmployee> {
    return this.getItems<IEmployee>(
      'Employees',
      `?$select=Id,Title,Email,Department,Client,Location,Manager,DOJ,LWD,Status,EmployeeID&$filter=Id eq ${id}&$top=1`
    ).then(items => {
      if (!items.length) throw new Error(`Employee ${id} not found.`);
      return items[0];
    });
  }
}
