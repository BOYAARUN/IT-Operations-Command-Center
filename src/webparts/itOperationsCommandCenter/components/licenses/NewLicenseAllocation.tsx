import * as React from "react";
import styles from "./NewLicenseAllocation.module.scss";

import {
  LicenseAllocationService
} from "../../services/LicenseAllocationService";

import {
  LicenseMasterService,
  ILicenseMaster
} from "../../services/LicenseMasterService";


interface IClient {

  Id:number;

  Title:string;

}



interface IProps {

  serviceContext:any;

  clientName?:string;

  clientId?:number;

  onSaved?:()=>void;

  onCancel?:()=>void;

}



interface IState {

  licenses:ILicenseMaster[];

  clients:IClient[];

  email:string;

  selectedClient:string;

  selectedLicense:string;

  loading:boolean;

  saving:boolean;

  message?:string;

}



export default class NewLicenseAllocation
extends React.Component<IProps,IState>{


private allocationService:LicenseAllocationService;

private licenseService:LicenseMasterService;



constructor(props:IProps){

super(props);


this.allocationService =
new LicenseAllocationService(
props.serviceContext
);


this.licenseService =
new LicenseMasterService(
props.serviceContext
);



this.state={

licenses:[],

clients:[],

email:"",

selectedClient:"",

selectedLicense:"",

loading:true,

saving:false

};


}





public async componentDidMount(){

try{


const licenses =
await this.licenseService.getLicenses();



const clientUrl =

`${this.props.serviceContext.webAbsoluteUrl}/_api/web/lists/getbytitle('Client Master')/items?$select=Id,Title&$orderby=Title`;



const clientResponse =

await this.props.serviceContext.spHttpClient.get(

clientUrl,

this.props.serviceContext.spHttpClientConfiguration

);



const clientData =
await clientResponse.json();



this.setState({

licenses,

clients:
clientData.value || [],

loading:false

});


}

catch(error){

console.error(
"Load allocation data error",
error
);


this.setState({

loading:false,

message:
"Unable to load clients or licenses"

});


}


}








private async save(){



if(

!this.state.email ||

!this.state.selectedClient ||

!this.state.selectedLicense

){

this.setState({

message:
"Enter email, select client and license"

});

return;

}



try{


this.setState({

saving:true,

message:""

});





const userUrl =

`${this.props.serviceContext.webAbsoluteUrl}/_api/web/ensureuser`;





const userResponse =

await this.props.serviceContext.spHttpClient.post(

userUrl,

this.props.serviceContext.spHttpClientConfiguration,

{

headers:{

"Accept":
"application/json;odata=nometadata",

"Content-Type":
"application/json;odata=nometadata"

},

body:JSON.stringify({

logonName:
this.state.email

})

}

);





const user =
await userResponse.json();







await this.allocationService.createAllocation({



Title:
"License Allocation",



EmployeeNameId:
user.Id,



ClientId:
Number(
this.state.selectedClient
),



LicenseId:
Number(
this.state.selectedLicense
),



AllocatedDate:
new Date().toISOString(),



Status:
"Active"



});





this.setState({

saving:false,

message:
"License allocated successfully",

email:"",

selectedClient:"",

selectedLicense:""

});



if(this.props.onSaved){

this.props.onSaved();

}


}



catch(error){


console.error(

"Allocation save error",

error

);


this.setState({

saving:false,

message:
"Unable to allocate license"

});


}



}







public render(){


if(this.state.loading){

return (

<div className={styles.loading}>

Loading clients and licenses...

</div>

);

}





return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h2>

Allocate License

</h2>


<p>

Assign license to employee

</p>


</div>



<button

className={styles.secondaryButton}

onClick={this.props.onCancel}

>

← Back

</button>


</div>






<div className={styles.card}>


<label>

Employee Email

</label>


<input

type="email"

placeholder="user@finacplus.com"

value={this.state.email}

onChange={
e=>

this.setState({

email:e.target.value

})

}

/>






<label>

Client

</label>



<select

value={this.state.selectedClient}

onChange={
e=>

this.setState({

selectedClient:e.target.value

})

}

>


<option value="">

Select Client

</option>


{

this.state.clients.map(

client=>(

<option

key={client.Id}

value={client.Id}

>

{client.Title}

</option>

)

)

}


</select>







<label>

License

</label>



<select

value={this.state.selectedLicense}

onChange={
e=>

this.setState({

selectedLicense:e.target.value

})

}

>


<option value="">

Select License

</option>



{

this.state.licenses.map(

license=>(

<option

key={license.Id}

value={license.Id}

>

{license.Title}

</option>

)

)

}


</select>






{

this.state.message &&

<div className={styles.message}>

{this.state.message}

</div>

}





<div className={styles.actions}>


<button

className={styles.cancelButton}

onClick={this.props.onCancel}

>

Cancel

</button>




<button

className={styles.saveButton}

disabled={this.state.saving}

onClick={()=>this.save()}

>


{

this.state.saving

?

"Saving..."

:

"Allocate License"

}


</button>



</div>



</div>


</div>

);


}


}