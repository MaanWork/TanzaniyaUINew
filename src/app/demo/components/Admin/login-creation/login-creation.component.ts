import { Component } from '@angular/core';

@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.scss']
})
export class LoginCreationComponent {
  tabIndex: any=0;
  tableData:any[]=[];
  brokerDialogVisible:boolean=false;
  visibleBrokerDetails:boolean=false;
  ngOnInit(){
    this.tableData=[
      {
        id:"2133333",
        name:"sam_broker",
        mail:"sam@gamil.com",
        date:"11/06/2024",
        mob:"75144252",
        status:"Active",

      },
      {
        id:"216633333",
        name:"sample_broker",
        mail:"sam23@gamil.com",
        date:"11/06/2024",
        mob:"7517744252",
        status:"DeActive",

      },
    ]
  }
  onTabClicked(event){
    // console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
  //  if(this.tabIndex==0) this.getBrokerList();
  //  if(this.tabIndex==1) this.getLapsedBrokerList();
  //  if(this.tabIndex==2) this.getRejectedBrokerList();
  //  if(this.tabIndex==3) this.getSQBrokerList();
  }
  showDialogBrokerDetails(){
    this.brokerDialogVisible=true;
  }
  brokerDetailsView(){
    this.visibleBrokerDetails=true;
  }
}
