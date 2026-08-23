import * as React from "react";
import styles from "./ClientLicenseUsers.module.scss";
import { LicenseAllocationService, ILicenseAllocation } from "../../services/LicenseAllocationService";

interface IProps {
  serviceContext:any;
  clientName:string;
  onBack?:()=>void;
  onNewAllocation?:()=>void;
}

interface IState {
  loading:boolean;
  allocations:ILicenseAllocation[];
  error?:string;
}

export default class ClientLicenseUsers extends React.Component<IProps,IState>{

private service:LicenseAllocationService;

constructor(props:IProps){
super(props);
this.service=new LicenseAllocationService(props.serviceContext);
this.state={loading:true,allocations:[]};
}

public async componentDidMount(){
await this.loadUsers();
}

private async loadUsers(){
try{
const data=await this.service.getClientAllocations(this.props.clientName);
this.setState({allocations:data,loading:false});
}
catch(error){
this.setState({loading:false,error:"Unable to load license users"});
}
}

private async removeAllocation(id:number){
await this.service.removeAllocation(id);
await this.loadUsers();
}

public render(){

if(this.state.loading)
return <div className={styles.loading}>Loading users...</div>;

if(this.state.error)
return <div className={styles.error}>{this.state.error}</div>;

return <div className={styles.page}>

<div className={styles.header}>
<div>
<h2>{this.props.clientName}</h2>
<span>License allocations</span>
</div>

<div className={styles.actions}>
<button className={styles.secondary} onClick={this.props.onBack}>
← Dashboard
</button>

<button className={styles.primary} onClick={this.props.onNewAllocation}>
+ Allocate License
</button>
</div>
</div>

<div className={styles.tableCard}>
<table>
<thead>
<tr>
<th>Employee</th>
<th>License</th>
<th>Status</th>
<th>Allocated Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{this.state.allocations.map(item=>

<tr key={item.Id}>

<td>
<strong>
{item.EmployeeName?.Title || "-"}
</strong>
<br/>
<small>
{item.EmployeeName?.EMail}
</small>
</td>

<td>
{item.License?.Title || "-"}
</td>

<td>
{typeof item.Status==="object"
? item.Status.Value
: item.Status}
</td>

<td>
{item.AllocatedDate
? new Date(item.AllocatedDate).toLocaleDateString()
:"-"}
</td>

<td>
<button
className={styles.remove}
onClick={()=>this.removeAllocation(item.Id)}
>
Remove
</button>
</td>

</tr>

)}

</tbody>
</table>

{this.state.allocations.length===0 &&
<div className={styles.empty}>
No license allocations found
</div>
}

</div>

</div>;
}

}
