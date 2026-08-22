import {
  ISharePointServiceContext,
  SharePointService
} from "./ISharePointService";

export interface ILicenseAllocation {
  Id: number;

  Title?: string;

  Employee?: {
    Id: number;
    Title: string;
    EMail?: string;
  };

  Client?: string;

  License?: {
    Id: number;
    Title: string;
  };

  AllocationDate?: string;

  Status?: string;

  Notes?: string;
}


export class LicenseAllocationService extends SharePointService {

  public constructor(context: ISharePointServiceContext) {
    super(context);
  }


  // Get all allocations
  public async getAllocations(): Promise<ILicenseAllocation[]> {

    return this.getItems<ILicenseAllocation>(
      "License Allocations",
      `?$select=
      Id,
      Title,
      Client,
      AllocationDate,
      Status,
      Notes,
      Employee/Id,
      Employee/Title,
      Employee/EMail,
      License/Id,
      License/Title
      &$expand=Employee,License
      &$orderby=Id desc
      &$top=5000`
    );

  }



  // Get licenses by client

  public async getClientAllocations(
    clientName:string
  ):Promise<ILicenseAllocation[]> {


    return this.getItems<ILicenseAllocation>(
      "License Allocations",
      `?$select=
      Id,
      Title,
      Client,
      AllocationDate,
      Status,
      Notes,
      Employee/Id,
      Employee/Title,
      Employee/EMail,
      License/Id,
      License/Title
      &$expand=Employee,License
      &$filter=Client eq '${clientName}'
      &$orderby=Id desc`
    );

  }




  // Create new allocation

  public async createAllocation(
    payload:any
  ):Promise<ILicenseAllocation>{


    return this.postItem<ILicenseAllocation>(
      "License Allocations",
      payload
    );

  }




  // Remove / update allocation

  public async updateAllocation(
    id:number,
    payload:any
  ):Promise<void>{

    await this.updateItem(
      "License Allocations",
      id,
      payload
    );

  }


}