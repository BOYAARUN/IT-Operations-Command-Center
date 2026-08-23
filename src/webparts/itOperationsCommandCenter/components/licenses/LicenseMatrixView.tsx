import * as React from "react";
import styles from "./LicenseMatrixView.module.scss";

import {
  LicenseAllocationService,
  ILicenseAllocation
} from "../../services/LicenseAllocationService";

import {
  LicenseService,
  ILicense
} from "../../services/LicenseService";


interface IProps {

  serviceContext:any;

  onBack?:()=>void;

  onClientSelect?:(client:string)=>void;

  onNewAllocation?:()=>void;

  onInventory?:()=>void;

}


interface IState {

  allocations:ILicenseAllocation[];

  clients:string[];

  licenses:string[];

  licenseMaster:ILicense[];

  loading:boolean;

  error?:string;

}



export default class LicenseMatrixView
extends React.Component<IProps,IState>{


private service:LicenseAllocationService;

private licenseService:LicenseService;



constructor(props:IProps){

super(props);


this.service =
new LicenseAllocationService(
props.serviceContext
);


this.licenseService =
new LicenseService(
props.serviceContext
);



this.state={

allocations:[],

clients:[],

licenses:[],

licenseMaster:[],

loading:true

};


}



public async componentDidMount(){

await this.loadData();

}



private async loadData(){

try{


const data =
await this.service.getAllocations();



const master =
await this.licenseService.getLicenses();



const active =
data.filter(
item =>
this.getStatus(item.Status) !== "Released"
);



const clients:string[] =
Array.from(
new Set(
active.map(
x=>x.Client?.Title || ""
)
)
).filter(Boolean);



const licenses:string[] =
Array.from(
new Set(
master.map(
x=>x.Title
)
)
).filter(Boolean);



this.setState({

allocations:active,

clients,

licenses,

licenseMaster:master,

loading:false

});


}

catch(error){

console.error(error);

this.setState({

loading:false,

error:"Unable to load license data"

});

}


}



private getStatus(status:any){

if(typeof status==="string"){

return status;

}

return status?.Value || "";

}



private getCount(
client:string,
license:string
){

return this.state.allocations.filter(

item =>

item.Client?.Title === client &&

item.License?.Title === license

).length;

}



private getTotal(
client:string
){

return this.state.allocations.filter(

item =>

item.Client?.Title === client

).length;

}



private getLicenseTotal(
license:string
){

return this.state.allocations.filter(

item =>

item.License?.Title === license

).length;

}



private getLicenseUsed(
license:string
){

return this.state.allocations.filter(

item =>

item.License?.Title === license

).length;

}



private getLicenseAvailable(
license:string
){

const item =
this.state.licenseMaster.find(

x=>x.Title===license

);


if(!item){

return 0;

}


return (

Number(item.TotalLicense)

-

this.getLicenseUsed(license)

);

}



private getTotalPurchased(){

return this.state.licenseMaster.reduce(

(sum,item)=>

sum + Number(item.TotalLicense || 0),

0

);

}



private getTotalAvailable(){

return (

this.getTotalPurchased()

-

this.state.allocations.length

);

}
public render(){


if(this.state.loading){

return (

<div className={styles.loading}>
Loading license matrix...
</div>

);

}



return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h1>
License Management
</h1>

<p>
Client wise license usage overview
</p>

</div>



<div className={styles.actions}>


<button
className={styles.backButton}
onClick={this.props.onBack}
>
← Dashboard
</button>



<button
className={styles.primaryButton}
onClick={this.props.onNewAllocation}
>
＋ Allocate License
</button>



<button
className={styles.primaryButton}
onClick={this.props.onInventory}
>
▣ License Inventory
</button>


</div>


</div>





<div className={styles.cards}>


<div className={styles.card}>

<span>
Total Purchased
</span>

<strong>
{this.getTotalPurchased()}
</strong>

<small>
License Quantity
</small>

</div>



<div className={styles.card}>

<span>
Allocated
</span>

<strong>
{this.state.allocations.length}
</strong>

<small>
Active Allocation
</small>

</div>



<div className={styles.card}>

<span>
Available
</span>

<strong>
{this.getTotalAvailable()}
</strong>

<small>
Remaining License
</small>

</div>



<div className={styles.card}>

<span>
License Types
</span>

<strong>
{this.state.licenseMaster.length}
</strong>

<small>
Products
</small>

</div>


</div>






<div className={styles.licenseSummaryBox}>


<h2>
License Availability
</h2>


<p>
Current license usage and remaining count
</p>



<table className={styles.summaryTable}>


<thead>

<tr>

<th>
License
</th>

<th>
Total
</th>

<th>
Used
</th>

<th>
Available
</th>

</tr>

</thead>



<tbody>


{

this.state.licenseMaster.map(

license=>(


<tr key={license.Id}>


<td>
{license.Title}
</td>


<td>

<span className={styles.totalBadge}>
{license.TotalLicense}
</span>

</td>


<td>

<span className={styles.usedBadge}>
{
this.getLicenseUsed(
license.Title
)
}
</span>

</td>


<td>

<span className={styles.availableBadge}>
{
this.getLicenseAvailable(
license.Title
)
}
</span>

</td>


</tr>


)

)


}


</tbody>


</table>


</div>







<div className={styles.matrixBox}>


<div className={styles.matrixHeader}>


<div>

<h2>
Client License Allocation Matrix
</h2>


<p>
Client license allocation overview
</p>


</div>



</div>





<table>


<thead>

<tr>

<th>
Client
</th>


{

this.state.licenses.map(

license=>(

<th key={license}>
{license}
</th>

)

)

}



<th>
Total
</th>


</tr>

</thead>





<tbody>


{

this.state.clients.map(

client=>(


<tr
key={client}
onClick={()=>{

if(this.props.onClientSelect){

this.props.onClientSelect(client);

}

}}
>



<td>
{client}
</td>



{

this.state.licenses.map(

license=>(


<td key={license}>


<span
className={
this.getCount(client,license)
?
styles.greenBadge
:
styles.greyBadge
}
>


{
this.getCount(
client,
license
)
}


</span>


</td>


)

)

}



<td>


<span className={styles.blueBadge}>

{
this.getTotal(client)
}

</span>


</td>



</tr>


)

)

}



<tr className={styles.summary}>


<td>
Total Summary
</td>


{

this.state.licenses.map(

license=>(


<td key={license}>

{
this.getLicenseTotal(
license
)
}

</td>


)

)


}



<td>

{
this.state.allocations.length
}

</td>


</tr>


</tbody>


</table>


</div>



</div>


);


}

}