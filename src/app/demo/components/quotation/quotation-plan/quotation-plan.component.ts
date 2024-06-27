import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';

@Component({
  selector: 'app-quotation-plan',
  templateUrl: './quotation-plan.component.html',
})
export class QuotationPlanComponent {

  riskDetails:any[]=[];tabIndex:any=0;productId:any=null;
  vehicleDetailsList:any[]=[];userType:any=null;agencyCode:any=null;branchList:any[]=[];
  currencyCode:any=null;userDetails:any=null;subuserType:any=null;branchCode:any=null;productName:any=null;
  insuranceId:any=null;brokerbranchCode:any=null;loginType:any=null;
  constructor(private router:Router,private sharedService:SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let loginType = sessionStorage.getItem('resetLoginDetails');
    this.userType = this.userDetails?.Result?.UserType;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.loginType = this.userDetails.Result.LoginType;
  }
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
  checkCovers2(sections,type){
    if(this.productId=='59'){
      let i=0,k=0;
      for(let veh of this.riskDetails){
        for(let sec of veh.SectionDetails){
            let j=0,l=0;
            for(let cover of sec.Covers){
              if(cover.isSelected=='D' && cover.CoverageType!='A' && type=='default') i+=1;
              else if(cover.isSelected=='D' && cover.CoverageType=='A' && type=='benefit') i+=1;
              j+=1;
              if(j==sec.Covers.length){
                l+=1;
                if(l==veh.SectionDetails.length){
                  k+=1;
                  if(k==this.riskDetails.length) return i!=0;
                }
              }
            }
        }
      }
    }
    else return true;
  }
  getHeaderName(menu){
    if(this.productId=='5'){
      let name = menu.Registrationnumber;
      if(menu.SectionName!=null){
        name = name+` (${menu.SectionName})`
      }
      else name = name+`(null)`
      return name;
    }
    else if(this.productId=='4'){
      return menu.PassengerName;
      // if(menu.TravelId=='1') return `Kids (${menu.TotalPassengers})`;
      // if(menu.TravelId=='2') return `Adults (${menu.TotalPassengers})`;
      // if(menu.TravelId=='59') return `Seniors (${menu.TotalPassengers})`;
      // if(menu.TravelId=='4') return `Super Seniors (${menu.TotalPassengers})`;
      // if(menu.TravelId=='5') return `Grand Seniors (${menu.TotalPassengers})`;
    }
    else if(this.productId!='59' && this.productId!='4' && this.productId!='5' && this.productId!='19' && this.productId!='14' && this.productId!='32') return this.productName;
    else if(this.productId=='19' || this.productId=='14' || this.productId=='32') return menu.SectionDetails[0].SectionName;
    else if(this.productId=='59') return menu.LocationName
    else return '';
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
