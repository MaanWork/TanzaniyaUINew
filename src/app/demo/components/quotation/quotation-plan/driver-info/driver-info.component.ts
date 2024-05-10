import { Component } from '@angular/core';
import { SharedService } from 'src/app/demo/service/shared.service';
import { QuotationPlanComponent } from '../quotation-plan.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styles: [`input{ min-width: 20rem; }`]
})
export class DriverInfoComponent {
  currencyCode: any;quoteRefNo:any=null;quoteNo:any=null;minDate:any=null;
  CoverList: any[]=[];subuserType:any=null;userDetails:any=null;currentDate:any=null;
  loginId:any=null;userType:any=null;agencyCode:any=null;branchCode:any=null;
  branchList:any=null;productId:any=null;insuranceId:any=null;loginType:any=null;RiskId:any=null;
  vehicleDetails:any=null;quoteDetails:any=null;Riskdetails:any=null;totalPremium:any=null;
  public AppConfig: any = (Mydatas as any).default;endorsementSection:boolean=false;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;LicenseList:any[]=[];driverOptions:any[]=[];
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;vehicleList:any[]=[];driverDetailsList:any[]=[];
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;EmiYn:any='N';localPremiumCost:any=null;customerRefNo:any=null;
  coverlist: any[];tabIndex:any=0;productName:any=null;
  driverNameError: boolean=false;
  licenseNoError: boolean=false;
  driverDobError: boolean=false;
  driverTypeError: boolean=false;
  constructor(private sharedService: SharedService,private quoteComponent:QuotationPlanComponent,
    private router:Router,
    private datePipe:DatePipe) {
    //this.vehicleId = sessionStorage.getItem('editVehicleId');
    //this.quoteNo = sessionStorage.getItem('quoteNo');
    //this.updateComponent.quoteNo = this.quoteNo;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     var d= new Date();
     var year = d.getFullYear();
     var month = d.getMonth();
     var day = d.getDate();
      this.currentDate = new Date();
      this.driverOptions = [
        {"label":'Driver',"value":'2'},
        {"label":'Owner',"value":'1'},
      ];
     this.minDate = new Date(year - 18,month, day );
     let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.customerRefNo = referenceNo;
    }
    
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    this.getEditQuoteDetails();
  }

  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.Riskdetails = data?.Result?.RiskDetails;
            if(this.endorsementSection){
              this.totalPremium = this.quoteDetails?.TotalEndtPremium;
            }
            else {
              if(this.EmiYn !='Y'){
                this.totalPremium = this.quoteDetails?.OverallPremiumFc;
              }
              else{
                this.totalPremium = this.quoteDetails?.DueAmount;
              }   
            }
            this.quoteComponent.setRiskDetails(this.Riskdetails);
            this.quoteComponent.currencyCode = data?.Result?.QuoteDetails?.Currency;
          for (let cover of this.Riskdetails) {
            let j = 0;
            if(cover?.SectionDetails){
              for (let section of cover?.SectionDetails) {
                let CoverData = section.Covers;
                for (let subsectioncover of section?.Covers) {
                  console.log("subsectioncover", subsectioncover);
                  if (cover?.totalPremium) {
                    cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                  }
                  else {
                    cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;
  
                  }
                  let baseCovers = [], otherCovers = [];
                  baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                  otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                  section.Covers = baseCovers.concat(otherCovers);
                  console.log("otherCovers", CoverData);
                  this.CoverList.push(cover);
                  console.log("CoverList", this.CoverList);
                  if (j == cover?.SectionDetails) {
                    this.CoverList.push(cover);
                    console.log("vehicleList", this.CoverList);
                  }
                  else j += 1;
                }
              }
            }
          }
            let quoteDetails = data?.Result?.QuoteDetails;
            if(quoteDetails){
            }
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.currencyCode = quoteDetails?.Currency;
           
            this.getDriverDetails();
            this.localPremiumCost = quoteDetails?.OverallPremiumLc;
            let vehicles:any[] = data?.Result?.RiskDetails;
            if(vehicles.length!=0){
              let i=0;this.vehicleList=[];
              for(let vehicle of vehicles){
                let entry:any;
                // if(this.productId=='5')  entry=vehicle.VehicleDetails;
                // else if(this.productId=='4')  entry=vehicle.TravelPassengerDetails;
                // else if(this.productId=='59')  entry=vehicle.BuildingDetails;
                // else entry = vehicle.CommonDetails;
                entry = vehicle;
                //entry['CoverList'] = vehicle.Covers;
                this.vehicleList.push(entry);
                let obj={
                  "Code":entry.RiskId,
                  "CodeDesc":entry.Registrationnumber,
                  "RiskId": entry.RiskId

                }
                this.LicenseList.push(obj);
                 this.RiskId=entry.RiskId;
                i+=1;
                if(i==vehicles.length){
                  console.log("Final License List",this.LicenseList)
                  //this.setVehicleList();
                  
                }

              }
            }
            if(this.vehicleList.length!=0){

              // if(this.productId=='59'){

              // }
              // else{
              //   this.setVehicleList();
              // }



              // let entry = this.vehicleList.find(ele=>String(ele.Vehicleid)==String(this.vehicleId));
              // if(entry){
              //   let index= this.vehicleList.findIndex(ele=>String(ele.Vehicleid)==entry.VehicleDetails.Vehicleid)
              //   let coverList:any[] = entry.Covers;
              //   if(coverList.length!=0 && this.coverList.length!=0){
              //     let i=0;
              //     for(let event of coverList){
              //       let cover = this.coverList.find(ele=>ele.CoverId == event.CoverId);
              //       if(cover){
              //         cover['selected']= true;
              //         this.onSelectCover(cover,true,this.vehicleId,'vehList');
              //       }
              //       i+=1;
              //       if(i==coverList.length){
              //         this.dataSource = new MatTableDataSource(this.coverList);
              //         this.dataSource.sort = this.sort;
              //         this.dataSource.paginator = this.paginator;
              //         this.applyFilter(this.filterValue);
              //       }
              //     }
              //   }
              //   else{
              //     this.dataSource = new MatTableDataSource(this.coverList);
              //     this.dataSource.sort = this.sort;
              //     this.dataSource.paginator = this.paginator;
              //     this.applyFilter(this.filterValue);
              //   }
              // }
              // else{
              //   this.dataSource = new MatTableDataSource(this.vehicleDetailsList);
              //   this.dataSource.sort = this.sort;
              //   this.dataSource.paginator = this.paginator;
              //   this.applyFilter(this.filterValue);
              // }
            }
            else{

            }
          }
          console.log("Final Total Premium",this.totalPremium);
      },
      (err) => { },
    );

  }
  getHeaderName(menu){
    if(this.productId=='5'){
      let name = menu.Registrationnumber;
      if(menu.SectionName!=null){
        name = name+` (${menu.SectionName})`
      }
      return name;
    }
    else if(this.productId=='4'){
      if(menu.TravelId=='1') return `Kids (${menu.TotalPassengers})`;
      if(menu.TravelId=='2') return `Adults (${menu.TotalPassengers})`;
      if(menu.TravelId=='3') return `Seniors (${menu.TotalPassengers})`;
      if(menu.TravelId=='4') return `Super Seniors (${menu.TotalPassengers})`;
      if(menu.TravelId=='5') return `Grand Seniors (${menu.TotalPassengers})`;
    }
    else if(this.productId!='59' && this.productId!='4' && this.productId!='5' && this.productId!='19' && this.productId!='14' && this.productId!='32') return this.productName;
    else if(this.productId=='59' || this.productId=='19' || this.productId=='14' || this.productId=='32') return menu.SectionName;
    else return '';
  }
  onNextProceed(index){
    let entry = this.driverDetailsList[index];
    let i=0;this.driverNameError =false;this.licenseNoError = false;this.driverDobError=false;this.driverTypeError = false;
    alert(entry.DriverDob)
    if(entry.DriverName==null || entry.DriverName=='' || entry.DriverName==undefined){i+=1;this.driverNameError=true;}
    if(entry.LicenseNo==null || entry.LicenseNo=='' || entry.LicenseNo==undefined){i+=1;this.licenseNoError=true;}
    if(entry.DriverDob==null || entry.DriverDob=='' || entry.DriverDob==undefined){i+=1;this.driverDobError=true;}
    if(entry.DriverType==null || entry.DriverType=='' || entry.DriverType==undefined){i+=1;this.driverTypeError=true;}
    if(i==0) this.tabIndex+=1;
  }
  ongetBack(){
    if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.coverlist=[];let i=0;
      for(let vehicle of this.Riskdetails){
        let vehEntry = vehicle.SectionDetails;
        if(vehEntry.length!=0){
          let j=0;
          for(let s of vehEntry){
          let covers = s.Covers;
          if(covers.length!=0){
            let entry = covers.filter(ele=>ele.CoverId == '55');
            if(entry.length!=0){
              this.coverlist.push(entry)
            }
          }
          j+=1;
        }
        }
        i+=1;
      }           
              if(this.coverlist.length!=0){
                this.router.navigate(['quotation/plan/main/accessories']);
              }
              else{
                 this.router.navigate(['/quotation/plan/premium-details']);
              }
    }
  }
  getDriverDetails(){
    let ReqObj = {
      //"QuoteNo": this.quoteNo
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getmotordrivers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.driverDetailsList= data.Result;
           console.log("License List ",this.LicenseList)
           if(this.driverDetailsList.length!=0){
              for(let driver of this.driverDetailsList){
                let entry = this.LicenseList.some(ele=>ele.Code==driver.RiskId)
                //if(!entry) driver.RiskId = null;
                // if(driver.DriverDob!=null && driver.DriverDob!=''){
                //   if(driver.DriverDob.split('/').length>1){
                //     let date = driver.DriverDob.split('/');
                //     driver.DriverDob = date[2] + '-' + date[1] + '-' + date[0];
                //   };
                // }
              }
           }
           else{
              this.driverDetailsList = [
                {
                  "QuoteNo": this.quoteNo,
                  "RiskId": null,
                  "DriverId": null,
                  "DriverName": null,
                  "DriverDob": null,
                  "DriverType": "1",
                  "LicenseNo": null,
                  "EntryDate": null,
                  "CreatedBy": this.loginId,
                  "StateId": null,
                  "CityId": null,
                  "CountryId": null,
                  "SuburbId": null,
                  "AreaGroup": null,
                  "MaritalStatus": null,
                  "LicenseIssueDt": null,
                  "Gender": null,
                  "DriverExperience": null,
                  "EndorsementDate": null,
                  "EndorsementRemarks": null,
                  "EndorsementEffectiveDate": null,
                  "OrginalPolicyNo": null,
                  "EndtPrevPolicyNo": null,
                  "EndtPrevQuoteNo": null,
                  "EndtCount": null,
                  "EndtStatus": null,
                  "IsFinanceEndt": null,
                  "EndtCategoryDesc": null,
                  "EndorsementType": null,
                  "EndorsementTypeDesc": null
                }
              ]
           }
             //this.EffectiveDate = data.Result.DriverDob
             /*if(this.EffectiveDate){
              this.onDateFormatInEdit(this.EffectiveDate);
             }*/
        }
      },
      (err) => { },
    );

  }
  onAddNewDriver(){
        this.driverDetailsList.push( {
          "QuoteNo": this.quoteNo,
          "RiskId": null,
          "DriverId": null,
          "DriverName": null,
          "DriverDob": null,
          "DriverType": "1",
          "LicenseNo": null,
          "EntryDate": null,
          "CreatedBy": this.loginId,
          "StateId": null,
          "CityId": null,
          "CountryId": null,
          "SuburbId": null,
          "AreaGroup": null,
          "MaritalStatus": null,
          "LicenseIssueDt": null,
          "Gender": null,
          "DriverExperience": null,
          "EndorsementDate": null,
          "EndorsementRemarks": null,
          "EndorsementEffectiveDate": null,
          "OrginalPolicyNo": null,
          "EndtPrevPolicyNo": null,
          "EndtPrevQuoteNo": null,
          "EndtCount": null,
          "EndtStatus": null,
          "IsFinanceEndt": null,
          "EndtCategoryDesc": null,
          "EndorsementType": null,
          "EndorsementTypeDesc": null
        })
  }
  onRemove(index){
    this.driverDetailsList.splice(index,1);
  }
  onsave(){
    let i=0,entryList:any=[];
   for(let driver of this.driverDetailsList){
    let date=null;
    if(driver.DriverDob!='' && driver.DriverDob!=null){
      console.log("Dob",driver)
      if(String(driver.DriverDob).includes('/')){
        date = driver.DriverDob;
      }
       else{
        date= this.datePipe.transform(driver.DriverDob, "dd/MM/yyyy");
       }
    }
    
    
    console.log("Before Date2",date)
    let entry = {
        "CreatedBy": this.loginId,
        "DriverDob":date,
        "DriverName": driver.DriverName,
        "DriverType": driver.DriverType,
        "LicenseNo": driver.LicenseNo,
        "QuoteNo": this.quoteNo,
        "RiskId": driver.RiskId,
        "RequestReferenceNo": this.quoteRefNo
      }
      entry['MaritalStatus'] = driver.MaritalStatus;
      entry['CountryId']=driver.CountryId;
      entry['StateId']=driver.StateId;
      entry['CityId']=driver.CityId;
      entry['AreaGroup']=driver.AreaGroup;
      entry['DriverExperience'] = driver.DriverExperience;
      entry['LicenseIssueDt'] = driver.LicenseIssueDt;
      entry['Gender'] = driver.Gender;
      if(this.endorsementSection){
        entry['EndtStatus'] = this.quoteDetails?.EndtStatus;
        entry['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
        entry['EndorsementType'] = this.quoteDetails?.EndtTypeId;
        entry['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
        entry['EndtCount'] = this.quoteDetails?.Endtcount;
        entry['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
        entry['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
      }
      entryList.push(entry);
      i++;
      if(i==this.driverDetailsList.length){
        console.log("Final List Driver",entryList)
        this.saveDriverDetails(entryList);}
   }

 }
 saveDriverDetails(entryList){
  console.log("DriverDetails",entryList)
  let urlLink = `${this.motorApiUrl}api/savemotordrivers`;
  this.sharedService.onPostMethodSync(urlLink,entryList).subscribe(
    (data: any) => {
      console.log("Save motor Res",data)
      if(data.Result){
        // if(this.endorsementSection && this.enableCustomerDetails){
        //       this.saveCustomerDetails();
        // }
        // else{
          if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
            this.router.navigate(['/Home/customer/ClientDetails']);
          }
          else {
            if(this.EmiYn!='Y'){
              this.router.navigate(['/quotation/plan/main/document-info']);
            }
            else{
              sessionStorage.removeItem('Makepaymentid');
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/Emi-Details']);
            }
            
          }
        //}
        
      }
      
    }
  )
 }
}
