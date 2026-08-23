import {
  SharePointService,
  ISharePointServiceContext
} from "./ISharePointService";


export interface ILicenseMaster {

  Id:number;

  Title:string;

  Vendor?:string;

  TotalLicense:number;

  RenewalDate?:string;

  Active:boolean;

}



export class LicenseMasterService extends SharePointService {


constructor(
context:ISharePointServiceContext
){

super(context);

}



public async getLicenses()
:Promise<ILicenseMaster[]> {


return this.getItems<ILicenseMaster>(

"License Master",

`?$select=
Id,
Title,
Vendor,
TotalLicense,
RenewalDate,
Active

&$orderby=Title`

);


}




public async createLicense(
data:any
):Promise<any>{


return this.postItem(

"License Master",

data

);


}




public async updateLicense(
id:number,
data:any
):Promise<void>{


await this.updateItem(

"License Master",

id,

data

);


}



}