import { SPHttpClient } from "@microsoft/sp-http";
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

  AddedBy?:string;

  LastUpdatedBy?:string;

  LastUpdatedDate?:string;

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
      Active,
      AddedBy,
      LastUpdatedBy,
      LastUpdatedDate
      &$orderby=Title asc`

    );


  }






  public async createLicense(
    data:ILicenseMaster
  ):Promise<any>{



    const currentUser =
    await this.getCurrentUser();




    const payload = {


      Title:data.Title,


      Vendor:
      data.Vendor || "",


      TotalLicense:
      Number(data.TotalLicense),


      RenewalDate:
      data.RenewalDate || null,


      Active:
      Boolean(data.Active),


      AddedBy:
      currentUser.Title,


      LastUpdatedBy:
      currentUser.Title,


      LastUpdatedDate:
      new Date().toISOString()


    };



    console.log(
      "Creating License",
      payload
    );



    return this.postItem(

      "License Master",

      payload

    );


  }







  public async updateLicense(

    id:number,

    data:Partial<ILicenseMaster>

  ):Promise<void>{



    const currentUser =
    await this.getCurrentUser();




    const payload = {


      ...data,


      LastUpdatedBy:
      currentUser.Title,


      LastUpdatedDate:
      new Date().toISOString()


    };




    await this.updateItem(

      "License Master",

      id,

      payload

    );



  }







  private async getCurrentUser(){

  const user =
  await this.context.spHttpClient.get(

    `${this.context.webAbsoluteUrl}/_api/web/currentuser`,

    SPHttpClient.configurations.v1

  );


  return await user.json();

}

}