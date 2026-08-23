import {
  SharePointService,
  ISharePointServiceContext
} from "./ISharePointService";


export interface ILicenseMaster {

  Id: number;

  Title: string;

  Vendor?: string;

  TotalLicense: number;

  RenewalDate?: string;

  Active: boolean;

}



export class LicenseMasterService extends SharePointService {


  constructor(
    context: ISharePointServiceContext
  ) {

    super(context);

  }



  public async getLicenses()
    : Promise<ILicenseMaster[]> {


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
    data: ILicenseMaster
  ): Promise<any> {


    const payload = {

      Title: data.Title,

      Vendor: data.Vendor || "",

      TotalLicense: Number(data.TotalLicense),

      RenewalDate: data.RenewalDate || null,

      Active: Boolean(data.Active)

    };


    console.log(
      "Creating License:",
      payload
    );


    return this.postItem(

      "License Master",

      payload

    );


  }





  public async updateLicense(
    id: number,
    data: Partial<ILicenseMaster>
  ): Promise<void> {


    await this.updateItem(

      "License Master",

      id,

      data

    );


  }



}