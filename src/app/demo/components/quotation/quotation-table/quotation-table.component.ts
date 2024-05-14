import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../app-config.json';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-quotation-table',
  templateUrl: './quotation-table.component.html',
})
export class QuotationTableComponent implements OnInit {
  items: MenuItem[] | undefined;
  columns:string[] = []; 
  quotations:any[] = []; 
  isSearchFormVisible = false;
  customerFilterSuggestions:any[] = [];
  customers:any[]=[];customerColumn:any[]=[];
  tableView = 'table';
  userDetails:any;loginId:any=null;
  agencyCode:any=null;brokerbranchCode:any=null;
  branchCode:any=null;productId:any=null;
  userType:any=null;insuranceId:any=null;
  brokerCode:any=null;brokerList:any[]=[];
  quoteData:any[]=[];limit:any=0;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorurl:any = this.AppConfig.MotorApiUrl;
  totalQuoteRecords: any=null;
  pageCount: any=null;
  quotePageNo: any=null;
  startIndex: any=null;
  endIndex: any=null;
  brokerLapsedList: any[]=[];
  brokerlapsedCode: any=null;lapsedQuoteData:any[]=[];
  totalLapsedQuoteRecords: any;
  pageLapsedCount: any=null;
  quoteLapsedPageNo: any=null;
  startLapsedIndex: any=null;
  endLapsedIndex: any=null;
  brokerRejectedList: any[]=[];
  brokerRejectedCode: string;
  totalRejectedQuoteRecords: any;
  pageRejectedCount: any=null;
  quoteRejectedPageNo: any=null;
  quoteRejectedData: any[]=[];RejectList:any[]=[];
  startRejectedIndex: any=null;quoteDataList:any[]=[];
  endRejectedIndex: any=null;selectedCustomer:any=null;
  cols:any[]=[];clearSearchSection:boolean = false;searchValue:any=[];
  quote: any=null;rejectedColumns:any[]=[]
  quotes: boolean=false;
  Remarks: any=null;
  Reference: any=null;isRejectVisible:boolean=false;
  RejectdList: any;tabIndex:any=0;
  remarksError: boolean=false;
  MotorList: any[]=[];
  constructor(private router: Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    sessionStorage.removeItem('FinalizeYN');

  }

  ngOnInit() {
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Quotation'}];
    this.customerColumn = [ 'Select','Reference No','Customer Name',  'Customer Type','ID Number'];
    if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      this.columns = [ 'Vehicle Details','Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode', 'Actions'];
      this.rejectedColumns = [ 'Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode','Reason'];
    }
    else{ this.columns = ['Quote No','Reference No','Customer Name','Start Date','End Date','Premium','CurrencyCode','Actions'] 
    this.rejectedColumns = [ 'Quote No', 'Reference No', 'Customer Name', 'Policy Start Date', 'Policy End Date', 'Premium','CurrencyCode','Reason'];
    }
    this.cols = [ 
      { field: "QuoteNo", header: "Quote No" }, 
      { field: "RequestReferenceNo", header: "Reference No" }, 
      { field: "ClientName", header: "Customer Name" }, 
    ]; 
    this.quotations = [{referenceNo:'123'}, {referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'},{referenceNo:'123'}];
    this.getBrokerList();
    // this.getLapsedBrokerList();
    // this.getRejectedBrokerList();
  }
  onTabClicked(event){
    console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
   if(this.tabIndex==0) this.getBrokerList();
   if(this.tabIndex==1) this.getLapsedBrokerList();
   if(this.tabIndex==2) this.getRejectedBrokerList();
  }
  getBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  }

  onInnerData(rowData){
    let ReqObj = {
        "RequestReferenceNo": rowData.RequestReferenceNo
      }
      let urlLink = `${this.motorurl}api/getallmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.MotorList = data.Result;
          }
        },
        (err) => { },
      );
}
  onRejects(rowData){
   console.log('rrrrrrrrr',rowData)
    this.isRejectVisible = true;
   this.RejectList=rowData;
    
   this.quote=rowData.QuoteNo;
    if(this.quote){
      this.quotes=true;
    }
    else{
      this.quotes=false
    }
    this.Reference=rowData.RequestReferenceNo



   this.Remarks=rowData.RejectReason
   //this.RejectQuote(this.Remarks,rowData)
  }
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerList.find(ele=>ele.Code==this.brokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
        loginId='';
        bdmCode=this.brokerCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":1000
    }
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetails) {
            if (data.Result?.CustomerDetails.length != 0) {
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = data.Result?.CustomerDetails;
                  this.quoteDataList = data.Result?.CustomerDetails;
                  if (quoteData.length <= this.pageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;
                
                this.startIndex = startCount; this.endIndex = endCount;
              }
              else {

                let startCount = element.startCount, endCount = element.endCount;
                this.pageCount = element.n;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
                if (this.totalQuoteRecords <= endCount + (element.n)) {
                  endCount = this.totalQuoteRecords
                }
                else endCount = endCount + (element.n);
                this.startIndex = startCount; this.endIndex = endCount;
              }
            }
            else {
              this.quoteData = []; 
            }
          }
        }
      },
      (err) => { },
    );
    }
  }
  RejectQuote(){
    if(this.Remarks!=null && this.Remarks!=undefined){
      this.remarksError = false;
      let ReqObj = {
        "RequestReferenceNo": this.Reference,
        "LoginId":this.loginId,
        "ProductId":this.productId,
        "Status":"R",
        "RejectReason": this.Remarks
  
      }
      let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
      
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this. RejectdList = data.Result;
            console.log('RRRR',this. RejectList);
            this.isRejectVisible = false;
            this.getRejectedBrokerList();
            this.tabIndex= 2;
          }
        },
        (err) => { },
      );
    }
    else this.remarksError = true;
    
  }
  getLapsedBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdownlapsed`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = []
        this.brokerLapsedList = defaultObj.concat(data.Result);
        if(this.brokerLapsedList.length==0){this.brokerlapsedCode = ''; this.brokerLapsedList = []}
        else this.brokerlapsedCode = this.loginId;
        if(this.brokerlapsedCode!=null && this.brokerlapsedCode!=''){
          if(!this.brokerLapsedList.some(ele=>ele.Code==this.brokerlapsedCode)) this.brokerlapsedCode = this.brokerLapsedList[0].Code;
          this.getLapsedQuotes(null,'change')
        }
        else{
          this.brokerlapsedCode = this.brokerLapsedList[0].Code;
          this.getLapsedQuotes(null,'change')
        }
        
      },
      (err) => { },
    );
  }
  getLapsedQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerlapsedCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerLapsedList.find(ele=>ele.Code==this.brokerlapsedCode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
        loginId='';
        bdmCode=this.brokerlapsedCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":1000
      }
      let urlLink = `${this.CommonApiUrl}api/lapsedquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.CustomerDetails) {
              if (data.Result?.CustomerDetails.length != 0) {
                this.totalLapsedQuoteRecords = data.Result?.TotalCount;
                this.pageLapsedCount = 10;
                if (entryType == 'change') {
                  this.quoteLapsedPageNo = 1;
                  let startCount = 1, endCount = this.pageLapsedCount;
                  startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.lapsedQuoteData = data.Result?.CustomerDetails;
                  if (quoteData.length <= this.pageLapsedCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageLapsedCount;
                  this.startLapsedIndex = startCount; this.endLapsedIndex = endCount;
                }
                else {
                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageLapsedCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.lapsedQuoteData = this.lapsedQuoteData.concat(data.Result?.CustomerDetails);
                    if (this.totalLapsedQuoteRecords <= endCount + (element.n)) {
                      endCount = this.totalLapsedQuoteRecords
                    }
                    else endCount = endCount + (element.n);
                    this.startLapsedIndex = startCount; this.endLapsedIndex = endCount;
                }
              }
              else {
                this.lapsedQuoteData = []; 
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  getRejectedBrokerList(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId="";
      brokerbranchCode = '';
    }
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdownrejected`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerRejectedList = defaultObj.concat(data.Result);
          if(this.brokerRejectedList.length==0){this.brokerRejectedCode = ''; this.brokerRejectedList = []}
          else this.brokerRejectedCode = this.loginId;
          if(this.brokerRejectedCode!=null && this.brokerRejectedCode!=''){
            if(!this.brokerRejectedList.some(ele=>ele.Code==this.brokerRejectedCode)) this.brokerRejectedCode = this.brokerRejectedList[0].Code;
            this.getRejectedQuotes(null,'change')
          }
          else{
            if(this.brokerRejectedList.length!=0){
              this.brokerRejectedCode = this.brokerRejectedList[0].Code;
              this.getRejectedQuotes(null,'change')
            }
          }
        }
        
      },
      (err) => { },
    );
  }
  getRejectedQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerRejectedCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerRejectedCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerRejectedList.find(ele=>ele.Code==this.brokerRejectedCode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
        loginId='';
        bdmCode=this.brokerRejectedCode;
      }
      else{
        bdmCode=null;
      }
      let ReqObj = {
          "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": bdmCode,
           "ProductId":this.productId,
          "Limit":this.limit,
          "Offset":60
      }
      let urlLink = `${this.CommonApiUrl}api/rejectedquotedetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          sessionStorage.removeItem('loadingType');
          if(data.Result){
            if (data.Result?.CustomerDetails) {
              if (data.Result?.CustomerDetails.length != 0) {
                this.totalRejectedQuoteRecords = data.Result?.TotalCount;
                this.pageRejectedCount = 10;
                if (entryType == 'change') {
                  this.quoteRejectedPageNo = 1;
                  let startCount = 1, endCount = this.pageRejectedCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.quoteRejectedData = data.Result?.CustomerDetails;
                    if (quoteData.length <= this.pageRejectedCount) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pageRejectedCount;
                  
                  this.startRejectedIndex = startCount; this.endRejectedIndex = endCount;
                }
                else {

                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageRejectedCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.CustomerDetails;
                    this.quoteRejectedData = this.quoteRejectedData.concat(data.Result?.CustomerDetails);
                  if (this.totalRejectedQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalRejectedQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startRejectedIndex = startCount; this.endRejectedIndex = endCount;
                }
              }
              else {
                this.quoteRejectedData = []; 
              }
            }
          }
        },
        (err) => { },
      );
    }
  }
  onCustomerSearch(){
    if(this.searchValue){
      this.customers = [];
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "SearchValue":this.searchValue,
        "CreatedBy": ""
      }
      let urlLink = `${this.CommonApiUrl}api/searchcustomerdata`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.customers=data.Result;
              this.clearSearchSection = true;
          }
        },
        (err) => { },
      );
    }
  }
  onSelectCustomer(rowData){
    this.selectedCustomer = rowData.CustomerReferenceNo;
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
  }
  showSearchForm(type) {
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('endorsePolicyNo');
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
   
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "InsuranceId":this.insuranceId,
        "ProductId": this.productId,
        "CreatedBy":this.loginId,
        "BranchCode":this.branchCode,
        "UserType": this.userType,
        "Limit":"0",
        "Offset":"1000"
    }
    let urlLink = `${this.CommonApiUrl}api/getactivecustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customers = data?.Result;
            this.clearSearchSection = false;
            this.searchValue = [];
            this.isSearchFormVisible = true;
        }
      });
    
    
  }
  onEditQuotes(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('homeCommonDetails');
    sessionStorage.setItem('Pagefrom',"Existing");
    if(this.productId){
      
      if(rowData.QuoteNo!='' && rowData.QuoteNo!=undefined && rowData.QuoteNo!=null){
        this.checkStatus(rowData);
      }
      else{
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
        sessionStorage.removeItem('quoteNo');
        if(this.productId=='5'){
          this.router.navigate(['/policyDetails']);
        }
        else{
          this.router.navigate(['/quotation/plan/quote-details']);
        }
        
      }
      // if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
      
      //     sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //     sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //     sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //     sessionStorage.setItem('updatebar',rowData.QuoteNo);
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        

      // }
      // else{
      //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //   if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //   sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
      //   sessionStorage.removeItem('quoteNo');
      //   this.router.navigate(['/policyDetails']);
      // }
    }
    // if(this.productId=='4'){
    //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
    //   sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    //   this.router.navigate(['/Travel/customerDetails']);
    // }


  }
  checkStatus(rowData){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${rowData.QuoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
          let date = rowData.PolicyStartDate;
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
          let date2 = null;
          if(date!='' && date !=null){
            if(date.split('/').length>1){
              let dates = date.split('/')
              date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
            }
          } 
          if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
              sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
              sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
              sessionStorage.setItem('quoteNo',rowData.QuoteNo);
              sessionStorage.setItem('updatebar',rowData.QuoteNo);
              //if(this.productId=='5'){
                this.router.navigate(['/quotation/plan/premium-details']);
              // }
              // else{
              //   this.router.navigate(['/quotation/plan/quote-details']);
              // }
          }
          else{
            sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
            if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
            sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
            sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
            sessionStorage.removeItem('quoteNo');
            if(this.productId=='5'){
              this.router.navigate(['/policyDetails']);
            }
            else{
              this.router.navigate(['/quotation/plan/quote-details']);
            }
          }
        }
        else{
            sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
              sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
              sessionStorage.setItem('quoteNo',rowData.QuoteNo);
              if(this.productId=='5'){
                this.router.navigate(['/policyDetails']);
              }
              else{
                this.router.navigate(['/quotation/plan/quote-details']);
              }
        }
      })

  }
  hideSearchForm() {
    this.isSearchFormVisible = false;
    this.selectedCustomer=null;
  }

  navigateToCustomerDetail() {
    sessionStorage.setItem('customerReferenceNo',this.selectedCustomer);
    if(this.productId=='5'){
      this.router.navigate(['/policyDetails']);
    }
    else{
      this.router.navigate(['/quotation/plan/quote-details'])
    }
  }

  customerSearch(event) {
    this.customerFilterSuggestions = [{'name':'Customer 1'}, {'name':'Customer 2'}];
  }

  lapsedAction(rowData){
    let ReqObj = {
      
      "RequestReferenceNo": rowData?.RequestReferenceNo,
      "LoginId":this.loginId,
      "ProductId":this.productId,
      "Status":"R",
      "RejectReason": "none"//rowData?.RejectReason
    
    }
    let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data.Result);
        
  })
}
}