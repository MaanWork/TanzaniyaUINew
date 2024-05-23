import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as Mydatas from '../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-tira-search',
  templateUrl: './tira-search.component.html',
  styles: [`input, p-dropdown { max-width: 280px; }`]
})
export class TiraSearchComponent implements OnInit {
  items: MenuItem[] | undefined;
  userDetails:any=null;loginId:any=null;agencyCode:any=null;
  userType:any=null;branchCode:any=null;countryId:any=null;pageCount:any=null;
  brokerbranchCode:any=null;productId:any=null;PackageYn:any=null;motorDetails:any=null;
  insuranceId:any = null;issuerSection:boolean=false;branchValue:any=null;
  Code:any=null;sourceCodeDesc:any=null;customerCode:any=null;brokerBranchCodeError:boolean=false;
  sourceCodeError:boolean=false;branchValueError:boolean=false;brokerBranchCode:any=null;
  customerCodeError:boolean=false;brokerCode:any=null;brokerCodeError:boolean=false;
  policyPeriodExceed:boolean=false;limit:any=0;totalQuoteRecords:any=null;quotePageNo:any=null;
  public AppConfig: any = (Mydatas as any).default;quoteData:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;startIndex:any=null;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;endIndex:any=null;
  customerName: any=null;public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  brokerLoginId: any=null;regNo:any=null;
  regNoError: boolean;
  constructor(private router: Router,private sharedService: SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn= this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true; }
    else this.issuerSection = false
  }
  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Tira Search'}];
  }
  checkMandatories(){
    this.regNoError = false;
    if(this.issuerSection){
      let i=0;
          if(this.branchValue=='' || this.branchValue==null || this.branchValue==undefined){this.branchValueError=true;i+=1;}
          if(this.Code=='' || this.Code==null || this.Code==undefined){this.sourceCodeError=true;i+=1;}
          if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
            if(this.customerCode=='' || this.customerCode==null || this.customerCode==undefined){alert('Error');this.customerCodeError=true;i+=1;}
          }
          else if(this.sourceCodeDesc=='agent' || this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc=='whatsapp'){
            if(this.brokerCode=='' || this.brokerCode==null || this.brokerCode==undefined){this.brokerCodeError=true;i+=1;}
            if(this.brokerBranchCode=='' || this.brokerBranchCode==null || this.brokerBranchCode==undefined){this.brokerBranchCodeError=true;i+=1;}
          }
          if(i==0){ this.getExistingQuoteList(this.regNo,null,'change')}
    }
    else{ this.brokerBranchCode= this.brokerbranchCode;
      if(this.regNo!=null && this.regNo!='' && this.regNo!=undefined) this.getExistingQuoteList(this.regNo,null,'change') 
      else this.regNoError = true;
    }
  }
  getExistingQuoteList(value,element,entryType){
    this.policyPeriodExceed = false;
    let regNo = null,chassisNo = '';
     regNo=String(value).toUpperCase();
     let ReqObj = {
      "BranchCode":this.branchCode,
      "BrokerBranchCode":this.brokerBranchCode,
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "CreatedBy": this.loginId,
      "Limit":this.limit,
      "Offset":60,
      "RegisterNumber": regNo
    }
    let urlLink = `${this.CommonApiUrl}api/regnumberquotes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
            if (data.Result?.RegisterNumberQuotes) {
              if (data.Result?.RegisterNumberQuotes.length != 0) {
                this.totalQuoteRecords = data.Result?.TotalCount;
                this.pageCount = 10;
                if (entryType == 'change') {
                  this.quotePageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.RegisterNumberQuotes;
                    this.quoteData = data.Result?.RegisterNumberQuotes;
                    if (quoteData.length <= this.pageCount) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pageCount;
                  
                  this.startIndex = startCount; this.endIndex = endCount;
                  console.log("QuoteData",this.quoteData)
                }
                else {
  
                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.RegisterNumberQuotes;
                    this.quoteData = this.quoteData.concat(data.Result?.RegisterNumberQuotes);
                  if (this.totalQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startIndex = startCount; this.endIndex = endCount;
                }
              }
              else {
                this.quoteData = []; 
                this.getVehicleDetails(value);
              }
            }
    },
    (err) => { },
    );
  }
  getVehicleDetails(value){
    this.policyPeriodExceed = false;
    let regNo = null,chassisNo = '';
     regNo=String(value).toUpperCase();
     let ReqObj = {
      "ReqChassisNumber":chassisNo,
      "ReqRegNumber":regNo,
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.brokerBranchCode,
      "ProductId": this.productId,
      "CreatedBy": this.loginId,
      "SavedFrom": 'WEB'
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
      this.motorDetails = data.Result;
      if(this.motorDetails.ErrorMessage!=null){
        this.policyPeriodExceed = true;
        setTimeout(() => {this.policyPeriodExceed = false;},8000);
      }
      else if(this.motorDetails.PolicyHolderInfo){
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        sessionStorage.setItem('customerReferenceNo',this.motorDetails.PolicyHolderInfo.CustomerReferenceNo);
        sessionStorage.setItem('firstLoad','yes');
        this.router.navigate(['/Home/customer/ClientDetails']);
      }
      else{
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        this.getPolicyHolderDetails(ReqObj);
      }
      // sessionStorage.setItem('customerReferenceNo','Cust-00285');
      // sessionStorage.setItem('quoteReferenceNo','MOT-09677');
      //this.router.navigate(['/dashboardpage']);
      }
      },
      (err) => { },
    );
  }
  getPolicyHolderDetails(ReqObj){
    let urlLink = `${this.motorApiUrl}regulatory/showpolicyholder`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.CustomerReferenceNo){
            sessionStorage.setItem('customerReferenceNo',data.Result.CustomerReferenceNo);
            sessionStorage.setItem('firstLoad','yes');
            this.router.navigate(['/customer/create']);
          }
          else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/customer/create']);}
        }
        else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/customer/create']);}
        },
        (err) => { },
      );
  }
}
