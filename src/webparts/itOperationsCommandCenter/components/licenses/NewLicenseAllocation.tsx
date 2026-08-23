import * as React from "react";
import styles from "./NewLicenseAllocation.module.scss";

import {
  LicenseAllocationService
} from "../../services/LicenseAllocationService";

import {
  LicenseService,
  ILicense
} from "../../services/LicenseService";

import {
  EmployeeService,
  IEmployee
} from "../../services/EmployeeService";


interface IProps {

  serviceContext:any;

  clientName?:string;

  clientId?:number;

  onSaved?:()=>void;

  onCancel?:()=>void;

}


interface IState {

  employees:IEmployee[];

  licenses:ILicense[];

  selectedEmployee:string;

  selectedLicense:string;

  loading:boolean;

  saving:boolean;

  message?:string;

}



export default class NewLicenseAllocation
extends React.Component<IProps,IState>{


private allocationService:LicenseAllocationService;

private licenseService:LicenseService;

private employeeService:EmployeeService;



constructor(props:IProps){

super(props);


this.allocationService =
new LicenseAllocationService(
props.serviceContext
);


this.licenseService =
new LicenseService(
props.serviceContext
);


this.employeeService =
new EmployeeService(
props.serviceContext
);



this.state={

employees:[],

licenses:[],

selectedEmployee:"",

selectedLicense:"",

loading:true,

saving:false

};


}



public async componentDidMount(){

await this.loadData();

}



private async loadData(){

try{


const employees =
await this.employeeService.getEmployees();



const licenses =
await this.licenseService.getLicenses();



this.setState({

employees,

licenses,

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
"Unable to load employees or licenses"

});


}

}




private async save(){


if(
!this.state.selectedEmployee ||
!this.state.selectedLicense
){

this.setState({

message:
"Select employee and license"

});

return;

}



try{


this.setState({

saving:true

});



await this.allocationService.createAllocation({

Title:
"License Allocation",


EmployeeNameId:
Number(
this.state.selectedEmployee
),


LicenseId:
Number(
this.state.selectedLicense
),


ClientId:
this.props.clientId || null,


AllocatedDate:
new Date()
.toISOString(),


Status:
"Active"


});



this.setState({

saving:false,

message:
"License allocated successfully"

});


if(this.props.onSaved){

this.props.onSaved();

}



}

catch(error){


console.error(
"Create allocation error",
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

Loading allocation form...

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

onClick={
this.props.onCancel
}

>

← Back

</button>



</div>




<div className={styles.card}>


<label>

Employee

</label>


<select

value={
this.state.selectedEmployee
}

onChange={
e=>

this.setState({

selectedEmployee:
e.target.value

})

}

>


<option value="">

Select Employee

</option>



{

this.state.employees.map(

emp=>

<option

key={emp.Id}

value={emp.Id}

>

{emp.Title}

</option>

)

}


</select>




<label>

License

</label>


<select

value={
this.state.selectedLicense
}

onChange={
e=>

this.setState({

selectedLicense:
e.target.value

})

}

>


<option value="">

Select License

</option>



{

this.state.licenses.map(

license=>

<option

key={license.Id}

value={license.Id}

>

{license.Title}

</option>

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

onClick={
this.props.onCancel
}

>

Cancel

</button>



<button

className={styles.saveButton}

disabled={
this.state.saving
}

onClick={
()=>this.save()
}

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