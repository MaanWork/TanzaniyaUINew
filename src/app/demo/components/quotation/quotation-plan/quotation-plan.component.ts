import { Component } from '@angular/core';

@Component({
  selector: 'app-quotation-plan',
  templateUrl: './quotation-plan.component.html',
})
export class QuotationPlanComponent {

  riskDetails:any[]=[];tabIndex:any=0;
  vehicleDetailsList:any[]=[];
  currencyCode:any=null;
  setRiskDetails(riskDetails){
    if(riskDetails.length!=0){
      this.riskDetails = riskDetails;
    }
  }
  onTabClicked(rowData){
    
  }
  checkCovers(sections,type){
    let coverList = sections.Covers;
      let i=0,j=0;
      for(let cover of coverList){
        if(cover.isSelected=='Y' && type=='opted') i+=1;
        else if(cover.isSelected=='D' && cover.CoverageType!='A' && type=='default') i+=1;
        else if(cover.isSelected=='D' && cover.CoverageType=='A' && type=='benefit') i+=1;
        else if(cover.SubCovers){
          if(cover.SubCovers.some(ele=>ele.isSelected=='Y' && type=='opted')) i+=1;
        }
        j+=1;
        if(j==coverList.length){
          return i!=0;
        }
      }
  }
  checkCoverSelected(cover){
    if(cover.isSelected=='Y' && cover.CoverageType!='A') return true;
    else if(cover.SubCovers){
      if(cover.SubCovers.some(ele=>ele.isSelected=='Y')) return true;
      else return false;
    }
    else return false;
  }
  getPremiumIncTax(cover){
    if(cover.PremiumIncludedTax) return cover.PremiumIncludedTax;
    else if(cover.SubCovers){
      for(let sub of cover.SubCovers){
        if(sub.isSelected=='Y') return sub.PremiumIncludedTax;
      }
    }
    else return '';
  }
  getSubCoverName(cover){
    if(cover.SubCovers){
        for(let sub of cover.SubCovers){
          if(sub.isSelected=='Y') return sub.SubCoverName;
        }  
    }
  }
  checkSubCoverName(cover){
    if(cover.SubCovers){
      let i =0,j=0;
      for(let sub of cover.SubCovers){
          if(sub.isSelected=='Y') i+=1;
          j+=1;
          if(j==cover.SubCovers.length){
            return i!=0;
          }
      }
    }
  }
}
