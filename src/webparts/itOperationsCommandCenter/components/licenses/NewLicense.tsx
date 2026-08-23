import * as React from "react";
import styles from "./NewLicense.module.scss";

import {
  LicenseMasterService
} from "../../services/LicenseMasterService";


interface IProps {

  serviceContext:any;

  onSaved?:()=>void;

  onCancel?:()=>void;

  onBack?:()=>void;

}


interface IState {

  licenseName:string;

  vendor:string;

  totalLicense:string;

  renewalDate:string;

  active:boolean;

  saving:boolean;

  message?:string;

}



export default class NewLicense extends React.Component<IProps,IState>{


private service:LicenseMasterService;



constructor(props:IProps){

super(props);


this.service =
new LicenseMasterService(
props.serviceContext
);


this.state={

licenseName:"",

vendor:"",

totalLicense:"",

renewalDate:"",

active:true,

saving:false

};


}



private async save(){


if(
!this.state.licenseName ||
!this.state.totalLicense
){

this.setState({

message:
"Enter license name and total license"

});

return;

}



try{


this.setState({

saving:true,

message:""

});



await this.service.createLicense({
  Id:0,
  Title:this.state.licenseName,
  Vendor:this.state.vendor,
  TotalLicense:Number(this.state.totalLicense),
  RenewalDate:this.state.renewalDate,
  Active:this.state.active
});



this.setState({

saving:false,

message:
"License created successfully"

});



if(this.props.onSaved){

this.props.onSaved();

}



}

catch(error){


console.error(error);


this.setState({

saving:false,

message:
"Unable to create license"

});


}


}





private goBack = ():void => {


if(this.props.onBack){

this.props.onBack();

return;

}


if(this.props.onCancel){

this.props.onCancel();

}


}





public render(){


return (

<div className={styles.page}>


<div className={styles.header}>


<div>

<h2>

Add New License

</h2>


<p>

Add license inventory details

</p>


</div>



<button

className={styles.backButton}

onClick={
this.goBack
}

>

← Back

</button>


</div>





<div className={styles.card}>


<label>

License Name

</label>


<input

value={
this.state.licenseName
}

onChange={
e=>

this.setState({

licenseName:
e.target.value

})

}

/>





<label>

Vendor

</label>


<input

value={
this.state.vendor
}

onChange={
e=>

this.setState({

vendor:
e.target.value

})

}

/>





<label>

Total License

</label>


<input

type="number"

value={
this.state.totalLicense
}

onChange={
e=>

this.setState({

totalLicense:
e.target.value

})

}

/>





<label>

Renewal Date

</label>


<input

type="date"

value={
this.state.renewalDate
}

onChange={
e=>

this.setState({

renewalDate:
e.target.value

})

}

/>





<label className={styles.check}>


<input

type="checkbox"

checked={
this.state.active
}

onChange={
e=>

this.setState({

active:
e.target.checked

})

}

/>


Active


</label>





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
this.goBack
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

"Save License"

}


</button>



</div>



</div>



</div>

);


}


}