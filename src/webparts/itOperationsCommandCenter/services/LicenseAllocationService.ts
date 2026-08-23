import {
  ISharePointServiceContext,
  SharePointService
} from "./ISharePointService";


export interface ILicenseAllocation {

  Id:number;

  Client?:{
    Id:number;
    Title:string;
  };

  EmployeeName?:{
    Id:number;
    Title:string;
    EMail?:string;
  };

  License?:{
    Id:number;
    Title:string;
  };

  Status?:{
    Value:string;
  } | string;

  AllocatedDate?:string;

  ReleasedDate?:string;

}



export class LicenseAllocationService extends SharePointService {


constructor(
context:ISharePointServiceContext
){

super(context);

}



public async getAllocations()
:Promise<ILicenseAllocation[]> {


return this.getItems<ILicenseAllocation>(

"License Allocations",

`?$select=
Id,
Status,
AllocatedDate,
ReleasedDate,

Client/Id,
Client/Title,

EmployeeName/Id,
EmployeeName/Title,
EmployeeName/EMail,

License/Id,
License/Title

&$expand=
Client,
EmployeeName,
License

&$orderby=Id desc

&$top=5000`

);


}




public async getClientAllocations(
clientName:string
)
:Promise<ILicenseAllocation[]> {


const data =
await this.getAllocations();


return data.filter(

item =>

item.Client?.Title === clientName

);


}




public async removeAllocation(
id:number
):Promise<void>{


await this.updateItem(

"License Allocations",

id,

{

Status:"Released",

ReleasedDate:
new Date().toISOString()

}

);


}




public async createAllocation(
payload:any
):Promise<any>{


return this.postItem(

"License Allocations",

payload

);


}




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