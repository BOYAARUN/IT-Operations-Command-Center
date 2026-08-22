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

  onSaved?:()=>void;

  onCancel?:()=>void;

}


interface IState {

  employees:IEmployee[];

  licenses:ILicense[];

  selectedEmployee:string;

  selectedLicense:string;

  allocationDate:string;

  notes:string;

  loading:boolean;

  saving:boolean;

  message?:string;

}



export default class NewLicenseAllocation extends React.Component<
IProps,
IState
>{


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

allocationDate:
new Date()
.toISOString()
.substring(0,10),

notes:"",

loading:true,

saving:false

};


}



public async componentDidMount(){

await this.loadData();

}



private async loadData(){

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

EmployeeId:
Number(
this.state.selectedEmployee
),

LicenseId:
Number(
this.state.selectedLicense
),

Client:
this.props.clientName || "",

AllocationDate:
this.state.allocationDate,

Status:
"Active",

Notes:
this.state.notes

});



this.setState({

message:
"License allocated successfully",

saving:false

});



if(this.props.onSaved){

this.props.onSaved();

}



}

catch(error){


this.setState({

message:
"Unable to create allocation",

saving:false

});


}


}




public render(){


if(this.state.loading){


return (

<div className={styles.loading}>

Loading...

</div>

);


}



return (

<div className={styles.page}>


<div className={styles.header}>

<h2>

New License Allocation

</h2>


</div>



<div className={styles.form}>


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
emp=>(

<option
key={emp.Id}
value={emp.Id}
>

{emp.Title}

</option>

)
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




<label>

Allocation Date

</label>


<input

type="date"

value={
this.state.allocationDate
}

onChange={
e=>
this.setState({

allocationDate:
e.target.value

})
}

/>



<label>

Notes

</label>


<textarea

value={
this.state.notes
}

onChange={
e=>
this.setState({

notes:
e.target.value

})
}

/>



<div className={styles.actions}>


<button

className={styles.cancel}

onClick={
this.props.onCancel
}

>

Cancel

</button>



<button

className={styles.save}

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
"Save Allocation"
}


</button>


</div>



{

this.state.message &&

<div className={styles.message}>

{this.state.message}

</div>

}



</div>


</div>

);


}


}