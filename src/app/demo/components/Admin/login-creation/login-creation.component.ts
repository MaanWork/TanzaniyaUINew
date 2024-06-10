import { Component } from '@angular/core';

@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.scss']
})
export class LoginCreationComponent {
  tabIndex: any=0;

  onTabClicked(event){
    // console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
  //  if(this.tabIndex==0) this.getBrokerList();
  //  if(this.tabIndex==1) this.getLapsedBrokerList();
  //  if(this.tabIndex==2) this.getRejectedBrokerList();
  //  if(this.tabIndex==3) this.getSQBrokerList();
  }
}
