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

loading:true

};


}




public async componentDidMount(){

await this.loadData();

}





private async loadData(){


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





public render(){


if(this.state.loading)

return (

<div className={styles.loading}>

Loading inventory...

</div>

);



return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h2>

License Inventory

</h2>

<p>

Track total, allocated and available licenses

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




<div className={styles.grid}>


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

<div

className={styles.card}

key={license.Id}

>


<h3>

{license.Title}

</h3>


<div className={styles.stats}>


<div>

<span>Total</span>

<strong>

{license.TotalLicense}

</strong>

</div>



<div>

<span>Allocated</span>

<strong>

{allocated}

</strong>

</div>



<div>

<span>Available</span>

<strong>

{available}

</strong>

</div>



</div>


</div>


);


}

)

}



</div>


</div>

);


}



}