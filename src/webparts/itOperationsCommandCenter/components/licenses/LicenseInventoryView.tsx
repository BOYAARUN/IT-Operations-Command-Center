import * as React from "react";

import styles from "./LicenseInventoryView.module.scss";

import {
  LicenseMasterService,
  ILicenseMaster
} from "../../services/LicenseMasterService";

import {
  LicenseAllocationService,
  ILicenseAllocation
} from "../../services/LicenseAllocationService";


interface IProps {

  serviceContext:any;

  onAddLicense?:()=>void;

  onBack?:()=>void;

}



interface IState {

  licenses:ILicenseMaster[];

  allocations:ILicenseAllocation[];

  loading:boolean;

  editingId?:number;

  editValue:number;

  message?:string;

}



export default class LicenseInventoryView
extends React.Component<IProps,IState>{


private licenseService:LicenseMasterService;

private allocationService:LicenseAllocationService;



constructor(props:IProps){

super(props);


this.licenseService =
new LicenseMasterService(
props.serviceContext
);


this.allocationService =
new LicenseAllocationService(
props.serviceContext
);



this.state={

licenses:[],

allocations:[],

loading:true,

editValue:0

};


}





public async componentDidMount(){

await this.loadData();

}





private async loadData(){


try{


const licenses =
await this.licenseService.getLicenses();


const allocations =
await this.allocationService.getAllocations();



this.setState({

licenses,

allocations,

loading:false

});


}

catch(error){

console.error(
"Inventory load error",
error
);


this.setState({

loading:false,

message:
"Unable to load inventory"

});


}



}






private getAllocated(
licenseId:number
){


return this.state.allocations.filter(

x =>

x.License?.Id === licenseId

&&

(
typeof x.Status==="string"
?
x.Status
:
x.Status?.Value
)

!=="Released"

).length;


}






private startEdit(
license:ILicenseMaster
){


this.setState({

editingId:license.Id,

editValue:license.TotalLicense

});


}







private async saveEdit(
license:ILicenseMaster
){


try{


await this.licenseService.updateLicense(

license.Id,

{

TotalLicense:
Number(this.state.editValue)

}

);



this.setState({

editingId:undefined,

message:
"License quantity updated"

});



await this.loadData();


}

catch(error){

console.error(
"Update license error",
error
);


this.setState({

message:
"Unable to update license"

});


}



}






public render(){


if(this.state.loading){

return (

<div className={styles.loading}>

Loading inventory...

</div>

);

}




return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h2>

License Inventory

</h2>

<p>

Manage purchased licenses and availability

</p>

</div>



<div>


<button

className={styles.addButton}

onClick={
this.props.onAddLicense
}

>

+ Add License

</button>



<button

className={styles.backButton}

onClick={
this.props.onBack
}

>

← Dashboard

</button>


</div>



</div>





<div className={styles.tableCard}>


<table>


<thead>

<tr>

<th>
License
</th>


<th>
Vendor
</th>


<th>
Purchased
</th>


<th>
Allocated
</th>


<th>
Available
</th>


<th>
Updated By
</th>


<th>
Action
</th>


</tr>

</thead>



<tbody>


{

this.state.licenses.map(

license=>{


const allocated =
this.getAllocated(
license.Id
);


const available =
license.TotalLicense - allocated;



return (


<tr key={license.Id}>


<td className={styles.name}>

{license.Title}

</td>



<td>

{license.Vendor || "-"}

</td>



<td>


{

this.state.editingId === license.Id

?

<input

type="number"

value={
this.state.editValue
}

onChange={
e=>

this.setState({

editValue:
Number(e.target.value)

})

}

/>


:

license.TotalLicense


}


</td>



<td>

{allocated}

</td>



<td>

<span className={styles.greenBadge}>

{available}

</span>

</td>



<td>

{license.LastUpdatedBy || "-"}

</td>



<td>


{

this.state.editingId === license.Id

?


<button

className={styles.saveButton}

onClick={()=>this.saveEdit(license)}

>

Save

</button>


:


<button

className={styles.editButton}

onClick={()=>this.startEdit(license)}

>

Edit

</button>


}


</td>



</tr>


);


}

)

}



</tbody>


</table>


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