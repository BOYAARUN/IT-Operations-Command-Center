import {
  SharePointService,
  ISharePointServiceContext
} from "./ISharePointService";


export interface ILicense {

  Id:number;

  Title:string;

  Vendor?:string;

  TotalLicense:number;

  RenewalDate?:string;

  Active:boolean;

}



export class LicenseService extends SharePointService {


constructor(
context:ISharePointServiceContext
){

super(context);

}



public async getLicenses()
:Promise<ILicense[]> {


return this.getItems<ILicense>(

"License Master",

`?$select=
Id,
Title,
Vendor,
TotalLicense,
RenewalDate,
Active
&$orderby=Title asc`

);


}



}