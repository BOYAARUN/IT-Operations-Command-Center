import * as React from "react";
import styles from "./LicenseMatrixView.module.scss";

import {
  LicenseAllocationService,
  ILicenseAllocation
} from "../../services/LicenseAllocationService";


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

  loading:boolean;

  error?:string;

}



export default class LicenseMatrixView 
extends React.Component<IProps,IState>{


private service:LicenseAllocationService;



constructor(props:IProps){

super(props);


this.service =
new LicenseAllocationService(
props.serviceContext
);



this.state={

allocations:[],

clients:[],

licenses:[],

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
active.map(
x=>x.License?.Title || ""
)
)
).filter(Boolean);



this.setState({

allocations:active,

clients,

licenses,

loading:false

});


}

catch(error){

this.setState({

loading:false,

error:"Unable to load license allocations"

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
Client License Allocation 
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
Total Clients
</span>

<strong>
{this.state.clients.length}
</strong>

<small>
Active Clients
</small>

</div>



<div className={styles.card}>

<span>
Total Licenses
</span>

<strong>
{this.state.licenses.length}
</strong>

<small>
License Types
</small>

</div>




<div className={styles.card}>

<span>
Total Allocations
</span>

<strong>
{this.state.allocations.length}
</strong>

<small>
Active Allocations
</small>

</div>




<div className={styles.card}>

<span>
Available Licenses
</span>

<strong>
-
</strong>

<small>
Not Allocated
</small>

</div>



</div>






<div className={styles.matrixBox}>


<div className={styles.matrixHeader}>

<div>

<h2>
License Allocation Matrix
</h2>

<p>
Client license allocation overview
</p>

</div>



<input

className={styles.search}

placeholder="Search client..."

 />

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
    {this.getTotal(client)}
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
this.getLicenseTotal(license)
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