import { Component } from '@angular/core';

@Component({
  selector: 'app-yakeen-search',
  templateUrl: './yakeen-search.component.html',
  styleUrls: ['./yakeen-search.component.scss']
})
export class YakeenSearchComponent {
  SequenceNumber:boolean=false;
  CustomID:boolean=false;;
  customNumber:any;
  Change(type){
    if(type=="SequenceNumber"){
      this.SequenceNumber=true;
      this.CustomID=false;
    }
   else if(type=="CustomID"){
      this.CustomID=true;
      this.SequenceNumber=false;
    }
    
  }
}
