import { Component } from '@angular/core';

@Component({
  selector: 'app-quotation-plan',
  templateUrl: './quotation-plan.component.html',
})
export class QuotationPlanComponent {

  riskDetails:any[]=[];tabIndex:any=0;


  setRiskDetails(riskDetails){
    if(riskDetails.length!=0){
      this.riskDetails = riskDetails;
    }
  }
  onTabClicked(rowData){
    
  }
}
