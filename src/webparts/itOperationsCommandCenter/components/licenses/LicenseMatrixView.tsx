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
this.getStatus(item.Status)!=="Released"
);



const clients =
Array.from(
new Set(
active.map(
x=>x.Client?.Title || ""
)
)
)
.filter(Boolean);



const licenses =
Array.from(
new Set(
active.map(
x=>x.License?.Title || ""
)
)
)
.filter(Boolean);



this.setState({

allocations:active,

clients,

licenses,

loading:false

});


}

catch(error){

console.error(error);


this.setState({

loading:false,

error:
"Unable to load license allocations"

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

item=>

item.Client?.Title===client &&

item.License?.Title===license

).length;


}



private getTotal(client:string){

return this.state.allocations.filter(

item=>

item.Client?.Title===client

).length;


}



public render(){


if(this.state.loading){

return (

<div className={styles.loading}>

Loading license allocation...

</div>

);

}



return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h1>
Client License Allocation Matrix
</h1>


<p>
Client wise license assignment overview
</p>


</div>



<div className={styles.actions}>


<button

className={styles.backButton}

onClick={
this.props.onBack
}

>

← Dashboard

</button>



<button

className={styles.primaryButton}

onClick={
this.props.onNewAllocation
}

>

＋ Allocate License

</button>



<button

className={styles.inventoryButton}

onClick={
this.props.onInventory
}

>

▣ License Inventory

</button>



</div>


</div>




<div className={styles.tableCard}>


<div className={styles.tableHeader}>


<h2>
License Allocation
</h2>


<span>
Active Assignments
</span>


</div>



<div className={styles.tableWrapper}>


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


<td className={styles.clientName}>

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

styles.activeBadge

:

styles.emptyBadge

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


<span className={styles.totalBadge}>

{

this.getTotal(client)

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


</div>



</div>


);


}


}