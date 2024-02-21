import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
declare var $:any;
interface Plan {
  title:string;
  excess:number;
  totalSum:number;
  year:number;
  discount:number
}

@Component({
  selector: 'app-common-quote-details',
  templateUrl: './common-quote-details.component.html',
  styles:[`
        ::ng-deep .p-menu-overlay {
            position: fixed !important;
        }
  `],
  providers: [MessageService]
})
export class CommonQuoteDetailsComponent implements OnInit {
  plans:Plan[] = [
    { title: 'Cash/ Cheque etc', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Geographical Extension', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Electronic Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Other Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
  ];
  tabIndex:any=0;claimsYN:any='N';gpsYn:any='N';
  policyStartDate:any=null;policyEndDate:any=null;
  promocode:any=null;currencyList:any[]=[];
  years:MenuItem[] = [];currencyCode:any=null;
  vehicles: MenuItem[] = [];agencyCode:any=null;
  exchangeRate:any=null;minDate:any=null;countryId:any=null;
  sidebarVisible:boolean = false;userType:any=null;
  userDetails:any=null;loginId:any=null;branchCode:any=null;
  brokerbranchCode:any=null;productId:any=null;PackageYn:any=null;
  insuranceId:any=null;branchList:any[]=[];loginType:any=null;
  referenceNo:any=null;customerDetails:any;regNo:any=null;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  vehicleDetails: any;customerData:any[]=[];
  havePromoCodeYN: any=null;typeList:any[]=[];
  noOfDays: any=null;
  sourceType: any=null;
  sourceTypeDesc: any=null;
  subuserType: any=null;
  brokerCode: any=null;
  brokerBranchCode: any=null;
  customerCode: any=null;
  endorsementDate: any=null;
  endorsementEffectiveDate: any=null;
  endorsementRemarks: any=null;
  endorsementType: any=null;
  endorsementTypeDesc: any=null;
  endtCategoryDesc: any=null;
  endtCount: any=null;
  endtPrevQuoteNo: any=null;
  endtStatus: any=null;
  endtPrevPolicyNo: any=null;
  orginalPolicyNo: any=null;
  isFinanceEndt: any=null;
  endorsementSection: boolean=false;
  customerName: any=null;
  quoteRefNo: any=null;
  endorsePolicyNo: any;
  finalizeYN: any='N';
  acExecutiveId: any=null;
  commissionType: any=null;messages: Message[] = [];
  endMinDate: Date;
  endMaxDate: Date;
  minCurrencyRate: any=null;
  maxCurrencyRate: any;typeValue:any=null;
  motorTypeList: any[]=[]; drivenBy:any="D";
  cityValue: any=null;
  bodyTypeValue: any=null;
  motorUsageList: any[]=[];
  motorUsageValue: any=null;
  classList: any[]=[];classValue:any=null;
  vehicleSI: any=null;accessoriesSI: any=null;windShieldSI: any=null;
  tppdSI: any=null;tiraCoverNoteNo:any=null;
  enableAddVehicle: boolean=false;
  endorsementYn: any=null;
  endorseEffectiveDate: any=null;
  collateralYN: any='N';
  borrowerValue: any=null;
  collateralName: any=null;
  firstLossPayee: any=null;
  endorseCoverModification:any=null;
  enableRemoveVehicle: boolean;
  adminSection: boolean=false;
  changeUwSection: boolean=false;
  uwQuestionList: any[]=[];
  vehicleId: string;
  applicationId: string;
  noOfCompPolicy: any;
  claimRatio: any;
  enableFieldsSection: boolean=false;
  currentIndex: number;
  collateralValue: boolean=false;
  fleetYN: any='';
  fleetValue: boolean = false;
  noOfVehicles: any=null;
  policyStartError: boolean=false;policyEndError: boolean=false;
  currencyCodeError: boolean=false;
  policyPassDate: boolean=false;customerCodeError:boolean=false;
  sourceTypeList: any[]=[];premiumList:any[]=[];
  modifiedYN: any='N';brokerBranchCodeError:boolean=false;
  Code: any;
  brokerList: any[]=[];
  sourceCodeDesc: any;
  brokerLoginId: null;
  backDays: any;
  brokerBranchList: any[]=[];customerList:any[]=[];
  commonSection: boolean=false;
  showCustomerList: boolean=false;
  issuerSection: boolean=false;
  commissionValue: any;
  executiveValue: any;
  noOfDaysVlaue: string;sourceCodeError:boolean=false;
  brokerCodeError: boolean;
  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe,private messageService: MessageService){
      this.minDate = new Date();
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn= this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.loginType = this.userDetails.Result.LoginType;
    let loginType = this.userDetails.Result.LoginType;
    this.getSourceList();
    this.getCurrencyList();
  }
  ngOnInit() {
    
    
    this.getInsuranceTypeList();
    this.getInsuranceClassList();
    // $(document).ready(function () {

    //   $('#CustomerInput').focus(function(){
    //     $('input-group').css("color","red");
    //   })
    //   let lastClick = null;
    //   $('#CustomerInput').mousedown(function (e) {
    //     lastClick = e.target;
    //   }).focus(function (e) {
    //     if (e.target != lastClick) {
    //       $(this).dropdown("toggle");
    //     }
    //     lastClick = null;
    //   });

    //   $('#CustomerInput').on('keyup', function () {
    //     var value = $(this).val().toLowerCase();

    //     $('.CustomerInput li').filter(function () {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    //     });
    //   });


    // });
    this.years = [{label: '1 Year'}, {label: '2 Year'}];
    this.vehicles = [{label: 'Vehicle 1'}, {label: 'Vehicle 2'}];
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      this.adminSection = true;this.issuerSection = false;
    }
    else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
    else this.issuerSection = false
    let quoteNo =  sessionStorage.getItem('quoteReferenceNo');
    if(quoteNo){
      this.quoteRefNo = quoteNo;
    }
    if(this.quoteRefNo){
      this.getExistingVehiclesList();
    }
    else{ this.currencyCode = this.userDetails?.Result?.CurrencyId;
      
    }
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }
    
  }
  getSourceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    //let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    let urlLink = `${this.CommonApiUrl}dropdown/getsourcetype`; 
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.sourceTypeList = data.Result;
            if(!sessionStorage.getItem('quoteReferenceNo')){
              if(sessionStorage.getItem('commonDetails')){
                let details = JSON.parse(sessionStorage.getItem('commonDetails'))
                console.log('Session Details',details);
                this.currencyCode = details?.currencyCode;
                this.promocode = details?.promocode;
                this.brokerCode = details?.BrokerCode;
                this.Code = details?.SourceCode;
                this.onSourceTypeChange('direct');
                this.sourceType = details?.SourceType;
                this.customerCode = details?.CustomerCode;
                this.customerName = details?.CustomerName;
                this.brokerBranchCode = details?.BrokerBranchCode;
                this.policyStartDate = details?.policyStartDate;
                this.policyEndDate = details?.policyEndDate;
                this.exchangeRate = this.exchangeRate;
                this.onCurrencyChange('direct');
              }
            }
            
            //this.premiunDropdown()
            //console.log(this.sourceCode)
        }
        /*if(this.sourceCode =='Broker')
        {
        this.getBrokersList();
        }
      else(this.sourceCode =='Agent')
      {
        //this.getBranchList()
      }*/

      },

      (err) => { },
    );
  }
  premiunDropdown(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":"3",
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.premiumList = data.Result;
        }
      },
      (err) => { },
    );
  }
  onSourceTypeChange(type){
    this.sourceCodeDesc = null;
    if(this.Code!=null && this.Code!='' && this.Code!=undefined){
      let entry = this.sourceTypeList.find(ele=>ele.Code==this.Code);
      if(entry) this.sourceCodeDesc = entry?.CodeDesc;
    }
    let ReqObj = {
      "SourceType": this.sourceCodeDesc,
      "BranchCode":  this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          //this.branchList = data.Result;
          // this.updateComponent.sourceType = this.Code;
          // this.updateComponent.sourceTypeDesc = this.sourceCodeDesc;
          this.brokerList = data.Result;
          //if(this.Code=='Agent') this.executiveSection = true;
          if(type=='change'){
            if(this.productId=='5' || this.productId=='46' || this.productId=='29'){this.modifiedYN = 'Y'}
            // this.updateComponent.CustomerCode = null;
            // this.updateComponent.brokerCode = null;
            // this.updateComponent.brokerBranchCode = null;
            // this.updateComponent.brokerLoginId = null;
            this.customerCode = null;
            this.customerName=null;
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            //if(this.Code=='Broker' || this.Code=='Agent'){
              if(this.productId=='3' && this.userType=='Issuer') this.getBackDaysDetails();
              let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
              if(entry){
                console.log("Found Entries",this.brokerCode,entry,this.Code)
                this.brokerLoginId = entry.Name; 
                // this.updateComponent.brokerLoginId = this.brokerLoginId;
                // this.updateComponent.brokerCode = this.brokerCode;
              }
              if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp' || this.sourceCodeDesc == 'Whatsapp'){
                if(type=='change'){
                  // this.updateComponent.CustomerCode = null;
                  // this.updateComponent.CustomerName = null;
                }
                this.getBrokerBranchList('direct');
                this.commonSection = true;
              }
              else this.onGetCustomerList('direct',this.customerCode);
            // }
            // else if(this.brokerCode){
            //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
            //  if(entry){
            //   this.brokerLoginId = entry.Name; 
            //   this.brokerBranchCode = null;
            //   this.updateComponent.brokerCode = this.brokerCode;
            //   this.updateComponent.brokerLoginId = this.brokerLoginId;
            //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
            //  }
             
            // }
          }
          
      },
      (err) => { },
    );
  }
  onGetCustomerList(type,code){
    if(this.userType=='Issuer'){
      if(code!='' && code!=null && code!=undefined){
        let branch = null;
        if(this.userType=='issuer'){branch = this.brokerBranchCode;}
        else branch = this.branchCode
        let ReqObj = {
          "SourceType": this.sourceCodeDesc,
          "BranchCode":  branch,
          "InsuranceId": this.insuranceId,
          "SearchValue":code
        }
        let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
                this.customerList = data.Result;
                if(type=='change'){
                  this.showCustomerList = true;
                  this.customerName = null;
                }
                else{
                  this.showCustomerList = false;
                  let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                  this.customerName = entry.Name;
                  this.setCustomerValue(this.customerCode,this.customerName,'direct')
                }
                
          },
          (err) => { },
        );
      }
      else{
        this.customerList = [];
      }
    }
    else{
      this.customerCode = this.userDetails.Result.CustomerCode;
        this.customerName = this.userDetails.Result.UserName;
        //this.updateComponent.CustomerCode = this.userDetails.Result.CustomerCode;
        this.commonSection = true;
    }
    
  }
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
      if(this.issuerSection){
        this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = null;
          this.commonSection = true;
      }
      if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.modifiedYN = 'Y'}
  }
  setCustomerValues(customerDetails){
    // this.title = customerDetails?.TitleDesc;
    // this.clientName = customerDetails?.ClientName;
    // this.dateOfBirth = customerDetails?.DobOrRegDate;
    // this.emailId = customerDetails?.Email1;
    // this.mobileNo = customerDetails?.MobileNo1;
    // this.idNumber = customerDetails?.IdNumber;
    // this.clientType = customerDetails?.PolicyHolderType;
    if(this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId=='14' || this.productId=='32'  || this.productId=='1'){
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
        //this.getExistingBuildingList();
      }
      else{
        this.quoteRefNo=null;
        this.branchCode = this.userDetails.Result.BranchCode;
        //this.updateComponent.branchValue = this.branchValue;
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange('direct');
        //this.searchSection = true;
        this.commonSection = true;
      }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        this.adminSection = true;this.issuerSection = false;
      }
      else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
      else this.issuerSection = false
    }
    else if(this.productId!='4'){
      let vehicleDetails:any;
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      }
      if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
        vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        //this.getExistingVehiclesList();
        //this.setCommonValues('direct');
      }
      else if(this.productId!='5' && this.productId!='29'){
        vehicleDetails = JSON.parse( sessionStorage.getItem('homeCommonDetails'));
      }
      if(vehicleDetails!=undefined){
        if(vehicleDetails.length!=0 && (sessionStorage.getItem('quoteReferenceNo')==undefined)){
          this.quoteRefNo = null;
          this.setExistingValues(vehicleDetails);
        }
        else{
          let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
          if(referenceNo){
            this.quoteRefNo = referenceNo;
           if(this.productId=='5' || this.productId=='46' || this.productId=='29') this.getExistingVehiclesList();
           //if(this.productId!='5' && this.productId!='4' && this.productId!='46' && this.productId!='29') this.getExistingBuildingList();
          }
          else{
            let loadType = sessionStorage.getItem('firstLoad');
            if((this.productId=='5' || this.productId=='29') && loadType){
              let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
              //this.setCommonValues(motorDetails);
              }
              else{
                this.quoteRefNo=null;
                this.currencyCode = this.userDetails.Result.CurrencyId;
                this.onCurrencyChange('direct');
                //this.searchSection = true;
                this.commonSection = true;
              }
          }
        }

      }
      else{
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.quoteRefNo = referenceNo;
         if(this.productId=='5' || this.productId=='46' || this.productId=='29') this.getExistingVehiclesList();
         //if(this.productId!='5' && this.productId!='4' && this.productId!='46' && this.productId!='29') this.getExistingBuildingList();
        }
        else{
          let loadType = sessionStorage.getItem('firstLoad');
            if((this.productId=='5' || this.productId=='29') && loadType){
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                this.adminSection = true;this.issuerSection = false;
              }
              else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
              else this.issuerSection = false
              let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
              this.setTiraVehicleValues(motorDetails);
              //this.setCommonValues(motorDetails);
            }
            else{
                this.quoteRefNo=null;
                this.branchCode = this.userDetails.Result.BranchCode;
                //this.updateComponent.branchValue = this.branchValue;
                this.currencyCode = this.userDetails.Result.CurrencyId;
                this.noOfDaysVlaue = '90';
                this.onCurrencyChange('direct');
                  var d= new Date();
                  var year = d.getFullYear();
                  var month = d.getMonth();
                  var day = d.getDate();
                  if(this.productId=='5' || this.productId=='29'){ this.policyStartDate = new Date(year,month, day ); this.onStartDateChange('direct')}
                  else if(this.productId=='46'){this.policyStartDate = new Date(year,month, day ); this.onStartDateChange('direct')}
                //this.searchSection = true;
                this.commonSection = true;
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                  this.adminSection = true;this.issuerSection = false;
                }
                else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
                else this.issuerSection = false;
            }
        }
      }
    }
    else if(this.productId=='4'){
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
        this.getExistingTravelDetails();
      }
      else{
        this.quoteRefNo=null;
        this.branchCode = this.userDetails.Result.BranchCode;
        // this.updateComponent.branchValue = this.branchValue;
        // this.updateComponent.HavePromoCode = this.HavePromoCode;
        // this.updateComponent.PromoCode = this.PromoCode;
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange('direct');
        //this.searchSection = true;
        this.commonSection = true;
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          this.adminSection = true;this.issuerSection = false;
        }
        else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
        else this.issuerSection = false
      }
    }
  }
  setTiraVehicleValues(entry){
    console.log("Entry Values",entry);
    if(entry?.PolicyStartDate != null ){
      var dateParts = entry.PolicyEndDate.split("/");
      var dateParts2 = entry.PolicyStartDate.split('/');
      var startDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
      var endDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if((new Date(startDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0)){
        var dateParts = entry?.PolicyStartDate.split("/");
        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        var dateParts2 = entry?.PolicyEndDate.split("/");
        this.onChangeEndDate();
      }
      else if(((new Date(endDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0))){
        var d = new Date(endDate);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        let policyStartDate:any = this.datePipe.transform(new Date(year, month, day+1), "dd/MM/yyyy");
        let policyEndDate:any = this.datePipe.transform(new Date(year+1, month, day), "dd/MM/yyyy");
        var dateParts = policyEndDate.split("/");
        var dateParts2 = policyStartDate.split('/');
        var startDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
        var endDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.policyStartDate = startDate;
        this.policyEndDate = endDate;
        this.onChangeEndDate();
      }
      else{
        let startDate1 = this.datePipe.transform(new Date(year, month, day), "dd/MM/yyyy");
        let EndDate1 = this.datePipe.transform(new Date(year+1, month, day-1), "dd/MM/yyyy");
        var dateParts:any = startDate1.split("/");
        var dateParts2:any = EndDate1.split('/');
        var endDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
        var startDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.policyStartDate = startDate;
        this.policyEndDate = endDate;
        this.onChangeEndDate();
          
      }
    }
    else{
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      let startDate1 = this.datePipe.transform(new Date(year, month, day), "dd/MM/yyyy");
        let EndDate1 = this.datePipe.transform(new Date(year+1, month, day-1), "dd/MM/yyyy");
        var dateParts:any = startDate1.split("/");
        var dateParts2:any = EndDate1.split('/');
        var endDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
        var startDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.policyStartDate = startDate;
        this.policyEndDate = endDate;
        this.onChangeEndDate();
    }
    // if(entry?.PolicyEndDate != null ){
    //   var dateParts = entry?.PolicyEndDate.split("/");
    //     // month is 0-based, that's why we need dataParts[1] - 1
    //     this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    //     this.updateComponent.policyEndDate = this.policyEndDate;
    //     this.onChangeEndDate('direct');
    //   }
    if(this.issuerSection){
      this.Code = entry.SourceType;
      
      if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
        this.customerCode = entry.CustomerCode;
        this.customerName = entry.CustomerName;
      }
      else{
        this.brokerCode = entry.BrokerCode;
        this.brokerBranchCode = entry.BrokerBranchCode;
      }
      this.onSourceTypeChange('direct');
    }
    if(entry.CURRENCY_CODE!=null)  this.currencyCode = entry?.CURRENCY_CODE;
    else this.currencyCode = this.userDetails.Result.CurrencyId;
    this.onCurrencyChange('direct');
      this.promocode = entry?.PromoCode;
      if(entry.SourceType!=null) this.Code = entry?.SourceType;
      this.customerCode = entry?.CustomerCode;
      this.branchCode = entry.BranchCode;
      this.brokerCode = entry.BrokerCode;
      this.brokerBranchCode = entry.BrokerBranchCode;
      this.executiveValue = entry?.AcExecutiveId;
      this.promocode = null;
      console.log("Final Values",this.brokerList,this.brokerCode)
      this.onSourceTypeChange('direct');
      
  }
  getExistingTravelDetails(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "TravelId": "1"
      }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            this.applicationId = customerDatas.ApplicationId;
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
              this.adminSection = true;this.issuerSection = false;
            }
            else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
            else this.issuerSection = false
            //this.travelDetails = customerDatas;
            this.Code= customerDatas.SourceTypeId;
            this.branchCode = customerDatas.BranchCode;
            this.brokerBranchCode = customerDatas.BrokerBranchCode;
            this.brokerCode = customerDatas.BrokerCode;
            this.onSourceTypeChange('direct');
            this.promocode = customerDatas.PromoCode;
            this.customerCode = customerDatas.CustomerCode;
            
            this.executiveValue = customerDatas?.AcExecutiveId;
            this.commissionValue = customerDatas?.CommissionType;
            if(customerDatas?.TravelStartDate != null ){
              var dateParts = customerDatas?.TravelStartDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              // this.travelStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              // this.updateComponent.travelStartDate = this.travelStartDate;
              //this.policyStartDate = dateObject.toString()
            }
            if(customerDatas?.TravelEndDate != null ){
              var dateParts = customerDatas?.TravelEndDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              // this.travelEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              // this.updateComponent.travelEndDate = this.travelEndDate;
              this.onChangeEndDate();
            }
          //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
          //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
           this.currencyCode = customerDatas.Currency;
           this.onCurrencyChange('direct');
           //this.exchangeRate = customerDatas.ExchangeRate;
           this.commonSection = true;
      },
      (err) => { },
    );
  }
  setExistingValues(vehicleList){
    console.log("Vehicles on Session",vehicleList)
    this.customerData = [];
      if(vehicleList.length!=0){
        let i=0;
        for(let vehicle of vehicleList){
          if(i==0){
            let entry = vehicle;
            // if(this.updateComponent.policyStartDate!=null && this.policyStartDate!=undefined && this.policyStartDate!=''){
            //    this.policyStartDate = this.updateComponent.policyStartDate;
            //    this.policyEndDate = this.updateComponent.policyEndDate;
            //   this.onChangeEndDate('direct');
            // }
            // else{
              if(entry?.PolicyStartDate != null ){
                var dateParts = entry?.PolicyStartDate.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                //this.policyStartDate = dateObject.toString()
              }
              if(entry?.PolicyEndDate != null ){
                var dateParts = entry?.PolicyEndDate.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                this.onChangeEndDate();
              }
            //}
            this.commissionValue = entry?.CommissionType;
            this.executiveValue = entry?.AcExecutive;
            this.Code = entry?.SourceType;
            //this.updateComponent.sourceType = this.Code;
            this.brokerCode = entry.BrokerCode;
            this.branchCode = entry?.BranchCode;
           // this.updateComponent.branchValue = this.branchValue;
            this.brokerBranchCode = entry?.BrokerBranchCode;
            //this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            this.brokerLoginId = entry?.LoginId;
            this.customerCode = entry.CustomerCode;
            this.onSourceTypeChange('direct');
            this.currencyCode = entry?.Currency;
            this.exchangeRate = entry?.ExchangeRate;
            this.onCurrencyChange('direct');
            // this.HavePromoCode = entry.HavePromoCode;
            //this.updateComponent.HavePromoCode = entry.HavePromoCode;
            if(entry.Promocode){
              // this.updateComponent.PromoCode = entry.Promocode;
              this.promocode = entry.Promocode;
            }
            else if(entry.PromoCode){  this.promocode = entry.PromoCode; }
            this.typeValue=entry?.SectionId;
            //this.onGetCustomerList('direct',this.customerCode);
          }
          if(this.currencyCode=="TZS"){ //this.editSection=false;
           }
          else{ //this.editSection=true; 
          }
          if(vehicle.Active){  this.customerData.push(vehicle); }
          else{
            // this.wishSection=true;
            // this.searchSection = true;
            //this.vehicleWishList.push(vehicle);
          }
          i+=1;
          if(i==vehicleList.length){
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
              this.adminSection = true;this.issuerSection = false;
            }
            else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
            else this.issuerSection = false
            this.commonSection = true;
          }
        }
      }
  }
  getBrokerBranchList(type){
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
  }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerBranchList = data?.Result;
            if(this.brokerBranchList.length==1){
              this.brokerBranchCode = this.brokerBranchList[0].Code;
              // this.updateComponent.brokerBranchCode = this.brokerBranchCode;
              // this.updateComponent.brokerCode = this.brokerCode;
              if(type=='change'){
                // this.updateComponent.CustomerCode=null;
                // this.updateComponent.CustomerName = null;
              }
            }
            
          }
        },
        (err) => { },
      );
  }
  getBackDaysDetails(){
    let loginId = null;
    if(this.userType!='Issuer') loginId = this.loginId;
    else{
      loginId = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode)?.Name;
    }
    let ReqObj = { 
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/brokerbackdays`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.backDays = data.Result.BackDays;
          if(this.backDays!=null){
            let backDate = new Date();
            var d = backDate;
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            backDate = new Date(year, month, day-Number(this.backDays));
            this.minDate = new Date(year, month, (day-Number(this.backDays))+1);
          }
          
        }
          
      },
      (err) => { },
    );
  }
  getInsuranceTypeList(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.typeList = data.Result;
        }

      },
      (err) => { },
    );
  }
  getInsuranceClassList(){
    let loginId = null;
    if(this.userType!='Issuer'){
      this.subuserType = sessionStorage.getItem('typeValue');
      if(this.subuserType=='B2C') loginId = 'guest';
      else{
      loginId=this.loginId;
      }
    }
    else{
      if(this.customerData.length!=0)  loginId = this.customerData[0].LoginId;
        //if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "LoginId":loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.classList = data.Result;
            
        }
      },
      (err) => { },
    );
  }
  onChangeClassType(){
    this.vehicleSI ="0";this.accessoriesSI="0",this.windShieldSI="0";this.tppdSI = "0";
  }
  getMotorTypeList(type,motorValue,vehicleUsage){
    let ReqObj = {
      "SectionId": this.typeValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(type=='change') this.cityValue = null;
            this.motorTypeList = data.Result;
            this.bodyTypeValue = motorValue;
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.VehicleType);
            //   if(value){ this.bodyTypeValue = value.Code}
            // }

            this.getMotorUsageList(vehicleUsage);
        }

      },
      (err) => { },
    );
  }
  onChangeBodyType(){
    if(this.bodyTypeValue=='7') this.cityValue='';
  }
  getMotorUsageList(vehicleValue){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SectionId": this.typeValue,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            this.motorUsageValue = vehicleValue;
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
            //   if(value){ this.motorUsageValue = value.Code}
            // }

            //this.getMotorUsageList();
        }

      },
      (err) => { },
    );
  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productcurrency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyList = data.Result;
             if(this.currencyCode){
            //   if(this.currencyList.some(ele=>ele.Code==this.currencyCode)){
                this.onCurrencyChange('direct');
                console.log('currency Details 888',this.currencyCode);
              // }
              // else this.currencyCode=this.currencyList[0].Code
            }
            else if(this.currencyList.length==1){
            this.currencyCode=this.currencyList[0].Code;
            this.onCurrencyChange('direct');
          }
        }

      },
      (err) => { },
    );
  }
  onCurrencyChange(type){
    let currencyData 
    if(this.currencyCode!=null && this.currencyCode!=''){
      console.log('Currency Listss',this.currencyList);
      if(this.currencyList.length!=0){
        currencyData = this.currencyList.find(ele=>ele.Code==this.currencyCode);
        if(currencyData){
          this.exchangeRate = currencyData?.ExchangeRate;
          this.minCurrencyRate = currencyData?.MinRate;
          this.maxCurrencyRate = currencyData?.MaxRate;
        }
        else{
          this.currencyCode= this.currencyList[0]?.Code;
          this.exchangeRate =this.currencyList[0]?.ExchangeRate;
          this.minCurrencyRate = this.currencyList[0]?.MinRate;
          this.maxCurrencyRate = this.currencyList[0]?.MaxRate;
        }
      }
      
    }
    console.log('CCCCCCCC',this.currencyCode)

    if(this.currencyCode=="TZS")
    {
      // this.editSection=false;
    }
    else{
      // this.editSection=true;
    }
    //if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    if(type=='change' && this.quoteRefNo!=null){
      // this.updateComponent.ModifiedCurrencyYN = 'Y';
    }
    if(type=='change'){
      if(this.customerData.length!=0){
        for(let customer of this.customerData) customer['modifiedYN'] = 'Y';
      }
    }
  }
  onCommonDetailsChange(){
    if(this.customerData.length!=0){
      for(let customer of this.customerData) customer['modifiedYN'] = 'Y';
    }
  }
  onVehicleValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.vehicleSI) {
      this.vehicleSI = this.vehicleSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  TppdCommaFormatted() {

    // format number
    if (this.tppdSI) {
     this.tppdSI = this.tppdSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}
  accessoriesCommaFormatted() {

    // format number
    if (this.accessoriesSI) {
     this.accessoriesSI = this.accessoriesSI.replace(/[^0-9.]|(?<=\..*)/g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  WindSICommaFormatted() {
    // format number
    if (this.windShieldSI) {
     this.windShieldSI = this.windShieldSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
        }

      });
  }
  onTabClicked(event){
    let index = event.index;
    this.tabIndex = index;
    if(index!=0){
      
      this.getMotorDetails(index-1);
    }

    console.log('Tab event',event);
  }
  checMandatories(){
    
    return true;
  }
  getMotorDetails(index){
        let vehicleDetails = this.customerData[index];
        let ReqObj =  {
          "RequestReferenceNo": this.quoteRefNo,
           "Idnumber": this.customerDetails?.IdNumber,
          "Vehicleid": vehicleDetails?.Vehicleid
         }
         let urlLink = `${this.motorApiUrl}api/getmotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
              this.vehicleDetails = data.Result;
              this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
              this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
              this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
              this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
              this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
              this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
              this.typeValue = this.vehicleDetails?.Insurancetype;
              this.classValue = this.vehicleDetails?.InsuranceClass;
                if(this.insuranceId!='100004') this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
                else{this.motorUsageValue=this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct');}
                this.bodyTypeValue = this.vehicleDetails?.VehicleType;
                this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
                this.motorUsageValue = this.vehicleDetails?.Motorusage;
                this.collateralYN = this.vehicleDetails?.CollateralYn;
                if(this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
                else this.claimsYN = 'N';
                if(this.vehicleDetails?.Gpstrackinginstalled) this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
                else this.gpsYn = 'N';
                this.vehicleSI = String(this.vehicleDetails?.SumInsured);
                this.CommaFormatted();
                this.windShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
                this.WindSICommaFormatted();
                this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
                this.TppdCommaFormatted();
                this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
                this.accessoriesCommaFormatted();
                // if(this.collateralYN=='Y'){
                //   this.collateralValue = true;
                //   this.collateralName = this.vehicleDetails?.CollateralName;
                //   this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
                //   this.borrowerValue = this.vehicleDetails?.BorrowerType;
                // }
                // if(this.vehicleDetails?.FleetOwnerYn){
                //   if(this.fleetYN!='')
                //   this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
                //   if(this.fleetYN=='Y'){
                //     this.fleetValue = true;
                //     this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
                //     this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
                //     this.claimRatio = this.vehicleDetails?.ClaimRatio
                //   }
                // }
            }
          });
  } 
  getMotorTypeAltList(type){
    let ReqObj = {
      "SectionId": this.motorUsageValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.motorTypeList = data.Result;
            if(type=='change') this.bodyTypeValue = '';
        }
      },
      (err) => { },
    );
  }
  onStartDateChange(type){
    if(this.productId!='4'){
      // if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
      var d = this.policyStartDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if(this.productId=='46'){
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year, month, day+29);
        this.endMaxDate = new Date(year, month, day+30);
        //this.updateComponent.policyEndDate = this.policyEndDate;
        this.onChangeEndDate();
      }
      else {
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year + 1, month, day-1);
        this.endMaxDate = new Date(year + 2, month, day-1);
        this.onChangeEndDate();
      }
    }
    else{
      // var d = this.travelStartDate;
      // var year = d.getFullYear();
      // var month = d.getMonth();
      // var day = d.getDate();
      // this.endMinDate = new Date(this.travelStartDate);
      // this.endMaxDate = new Date(year + 1, month, day-1);
      //  this.updateComponent.travelStartDate = this.travelStartDate;
      // if(this.noOfDays!='' && this.noOfDays!=undefined && this.noOfDays!=null){
      //   this.travelEndDate = new Date(year, month, day+Number(this.noOfDays-1));
      //   this.updateComponent.travelStartDate = this.travelStartDate;
      //   this.updateComponent.travelEndDate = this.travelEndDate;
      // }
    }
    if(type=='change') {
      if(this.customerData.length!=0){
        for(let customer of this.customerData) customer['modifiedYN'] = 'Y';
      }
    }
  }
  onChangeEndDate(){
    if(this.productId!='4'){
      // if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.policyStartDate);
    console.log(formattedDate);
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    }
    else{
    // const oneday = 24 * 60 * 60 * 1000;
    // const momentDate = new Date(this.travelEndDate); // Replace event.value with your date value
    // const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    // const formattedDatecurrent = new Date(this.travelStartDate);
    // console.log(formattedDate);
    // this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    // this.updateComponent.travelStartDate = this.travelStartDate;
    // this.updateComponent.travelEndDate = this.travelEndDate;
    // this.updateComponent.noOfDays = this.noOfDays;
    }
  }
  onSearchVehicle(){
    if(this.regNo!=null && this.regNo!=undefined && this.regNo!='' && this.checMandatories()){
      this.regNo = this.regNo.toUpperCase();
      let ReqObj = {
        "ReqChassisNumber": '',
        "ReqRegNumber": this.regNo,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "BrokerBranchCode": this.branchCode,
        "ProductId": this.productId,
        "CreatedBy": this.loginId,
        "SavedFrom": 'API'
      }
      let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
              this.vehicleDetails = data?.Result;
              if(this.customerData.length!=0){
                  let entry = this.customerData.some(ele=>ele.Registrationnumber==this.regNo);
                  if(entry){
                      // this.duplicateSection = true;
                      // this.validSection = false;
                  }
                  else this.onSaveSearchVehicles();
              }
              else this.onSaveSearchVehicles();
            }
            else if(data.ErrorMessage!=null){
              if(data.ErrorMessage.length!=0){
              }
            }
      });
    }
  }
  onSaveSearchVehicles(){
    this.subuserType = sessionStorage.getItem('typeValue');
    let appId = "1",loginId="",brokerbranchCode="",createdBy="";
    if(this.promocode=='' || this.promocode==null || this.promocode==undefined){
      this.havePromoCodeYN = 'N';
    }
    else this.havePromoCodeYN='Y';
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          createdBy = this.vehicleDetails.CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else{
          appId = this.loginId;
          loginId = this.vehicleDetails.LoginId;
          // loginId = this.updateComponent.brokerLoginId
          // brokerbranchCode = this.updateComponent.brokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        // this.sourceType = this.updateComponent.sourceType;
        // this.bdmCode = this.updateComponent.brokerCode;
        // this.brokerCode = this.updateComponent.brokerCode;
        // brokerbranchCode =  this.updateComponent.brokerBranchCode;
        // this.customerCode = this.updateComponent.CustomerCode;
        // this.customerName = this.updateComponent.CustomerName;
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      this.vehicleDetails['Vehicleid'] = String(this.customerData.length+1)
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      if(this.endorsementSection){
        let entry = this.customerData.filter(ele=>ele?.EndorsementDate!=undefined)
        if(entry){
          let details = entry[0];
          console.log("Filtered Endorsement Set",entry)
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceEndt;
        }
      }
      let startDate = null,endDate=null;
      if(this.policyStartDate!=null && this.policyStartDate!='' && this.policyStartDate!=undefined){
        startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
        endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
      
      let sumInsured = null;
      if(this.vehicleDetails?.SUM_INSURED) sumInsured = this.vehicleDetails?.SUM_INSURED;
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": null,
      "CommissionType": null,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleDetails.Vehicleid,
      "AcccessoriesSumInsured": null,
      "AccessoriesInformation": null,
      "AdditionalCircumstances": null,
      "AxelDistance": this.vehicleDetails?.AxelDistance,
      "Chassisnumber": this.vehicleDetails?.Chassisnumber,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": null,
      "CoverNoteNo": null,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": createdBy,
      "DrivenByDesc": 'D',
      "EngineNumber": this.vehicleDetails?.EngineNumber,
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": null,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": null,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": null,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": null,
      "NcdYn": null,
      "NoOfClaims": null,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": null,
      "PolicyType": null,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "Registrationnumber": this.vehicleDetails?.Registrationnumber,
      "RoofRack": null,
      "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
      "SourceTypeId": this.Code,
      "SourceType" : this.sourceTypeDesc,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": null,
      "Tareweight": this.vehicleDetails?.Tareweight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": null,
      "TrailerDetails": null,
      "Vehcilemodel":  this.vehicleDetails?.Vehcilemodel,
      "VehicleType": null,
      "Vehiclemake": this.vehicleDetails?.Vehiclemake,
      "WindScreenSumInsured": null,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": this.noOfDays,
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.havePromoCodeYN,
      "PromoCode": this.promocode,
      "CollateralYn": null,
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
      "NoOfComprehensives": null,
      "ClaimRatio": null,
      "SavedFrom": this.vehicleDetails?.SavedFrom,
      "UserType": this.userType,
      "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
      "EndorsementYn": this.vehicleDetails.EndorsementYn,
      "SaveOrSubmit": "Save",
      "EndorsementDate": this.endorsementDate,
      "EndorsementEffectiveDate": this.endorsementEffectiveDate,
      "EndorsementRemarks": this.endorsementRemarks,
      "EndorsementType": this.endorsementType,
      "EndorsementTypeDesc": this.endorsementTypeDesc,
      "EndtCategoryDesc": this.endtCategoryDesc,
      "EndtCount": this.endtCount,
      "EndtPrevPolicyNo": this.endtPrevPolicyNo,
      "EndtPrevQuoteNo": this.endtPrevQuoteNo,
      "EndtStatus": this.endtStatus,
      "IsFinanceEndt": this.isFinanceEndt,
      "OrginalPolicyNo": this.orginalPolicyNo,
      "Scenarios": {
          "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": null,
              "OldCurrency": this.currencyCode,
              "OldExchangeRate": this.exchangeRate,
              "OldSumInsured": null,
              "OldTppdIncreaeLimit": null,
              "OldWindScreenSumInsured": null
          }
      },
      "Status": "Y"
    }
    ReqObj['FleetOwnerYn'] = "N";
      if(this.endorsementSection){
        if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y'){
          ReqObj['Status'] = 'E';
        }
        else{
          ReqObj['Status'] = this.vehicleDetails?.Status;
        }
        ReqObj['PolicyNo'] = this.endorsePolicyNo
      }
      else{
        ReqObj['Status'] = 'Y';
      }
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
            let ulList:any='';
            const errorList: any[] = res.ErrorMessage;
            for (let index = 0; index < errorList.length; index++) {
                const element = errorList[index];
                //this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
                this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
                console.log('Final Messages',this.messages)
                // ulList +=`<li class="list-group-login-field">
                // 	<div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                // 	<div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                // </li>`
             }
          }
          else{
            this.quoteRefNo = data?.Result?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
              this.vehicleDetails = null;
              this.regNo=null;
              
              this.getExistingVehiclesList();
          }
        },
        (err) => { },
      );
  }
  getExistingVehiclesList(){
    this.customerData = [];
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.customerData = data.Result;
            if(this.customerData.length!=0){
              if(this.customerData[0]?.FinalizeYn!=null){
                this.finalizeYN = this.customerData[0]?.FinalizeYn;
                sessionStorage.setItem('FinalizeYN',this.customerData[0]?.FinalizeYn)
              }
              else this.finalizeYN = 'N';
              this.currencyCode = this.customerData[0].Currency;
              this.exchangeRate = this.customerData[0].ExchangeRate;
              this.policyStartDate = this.customerData[0].PolicyStartDate;
              this.policyEndDate = this.customerData[0].PolicyEndDate;
              this.havePromoCodeYN = this.customerData[0].HavePromoCode;
              this.promocode = this.customerData[0].PromoCode;
              this.acExecutiveId = this.customerData[0].AcExecutiveId;
              this.commissionType = this.customerData[0].CommissionType;
              if(this.userType!='Broker' && this.userType!='broker' && this.userType!='user'){
                this.Code = this.customerData[0].SourceTypeId;
                this.brokerBranchCode = this.customerData[0].BrokerBranchCode;
                this.customerCode = this.customerData[0].CustomerCode;
                this.brokerCode = this.customerData[0].BrokerCode;
                this.onSourceTypeChange('direct');
              }
             // this.updateComponent.setCommonValues(this.customerData[0]);
              for(let veh of this.customerData){
                veh['Active'] = true;
              }
            }
            else{
              //this.searchSection = true;
            }
        }
      },
      (err) => { },
    );
  }
  saveMotorDetails(index){
    sessionStorage.removeItem('loadingType');

    if(this.finalizeYN!='Y'){
        if(this.insuranceId=='100004') this.typeValue = this.classValue;
        let createdBy="";
        let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
        if(this.vehicleSI==undefined) vehicleSI = null;
        else if(this.vehicleSI.includes(',')){ vehicleSI = this.vehicleSI.replace(/,/g, '') }
        else vehicleSI = this.vehicleSI;
        if(this.accessoriesSI==undefined) accSI = null;
        else if(this.accessoriesSI.includes(',')){ accSI = this.accessoriesSI.replace(/,/g, '') }
        else accSI = this.accessoriesSI
        if(this.windShieldSI==undefined) windSI = null;
        else if(this.windShieldSI.includes(',')){ windSI = this.windShieldSI.replace(/,/g, '') }
        else windSI = this.windShieldSI
        if(this.tppdSI==undefined) tppSI = null;
        else if(this.tppdSI.includes(',')){ tppSI = this.tppdSI.replace(/,/g, '') }
        else tppSI = this.tppdSI
        if(this.policyStartDate){
          if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
             startDate = this.endorseEffectiveDate;
             const oneday = 24 * 60 * 60 * 1000;
              const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
              const formattedDate = moment(momentDate).format("YYYY-MM-DD");
              const formattedDatecurrent = new Date(startDate);
              console.log(formattedDate);
    
            console.log(formattedDatecurrent);
    
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          }
          else if(this.endorsementSection && this.vehicleDetails?.Status=='D'){
            startDate = this.vehicleDetails?.PolicyStartDate;
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.vehicleDetails?.PolicyStartDate);
            console.log(formattedDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          }
          else{
            if(typeof this.policyStartDate === 'string'){
              if(this.policyStartDate.includes('/')) startDate = this.policyStartDate;
              else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            }
            else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.policyEndDate); 
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.policyStartDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          }
        }
        if(this.policyEndDate){
          if(this.endorsementSection && this.vehicleDetails.Status=='D'){
            endDate = this.endorseEffectiveDate;
          }
          else{
            if(typeof this.policyEndDate === 'string'){
              if(this.policyEndDate.includes('/')) endDate = this.policyEndDate;
              else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        
        let appId = "1",loginId="",brokerbranchCode="";
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          brokerbranchCode = this.customerData[0].BrokerBranchCode;
            createdBy = this.customerData[0].CreatedBy;
        }
        else{
          createdBy = this.loginId;
          if(this.userType!='Issuer'){
            this.brokerCode = this.agencyCode;
            appId = "1"; loginId=this.loginId;
            brokerbranchCode = this.brokerbranchCode;
          }
          else{
            appId = this.loginId;
            loginId = this.customerData[0].LoginId;
          //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
          //   brokerbranchCode = this.customerData[0].BrokerBranchCode;
          // }
        }
        if(this.userType!='Broker' && this.userType!='User'){
            // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
            //   this.sourceType = this.vehicleDetails.SourceTypeId;
            //   this.bdmCode = this.vehicleDetails.BrokerCode;
            //   this.brokerCode = this.vehicleDetails.BrokerCode;
            //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
            //   this.customerCode = this.vehicleDetails.CustomerCode;
            //   this.customerName = this.vehicleDetails.CustomerName;
            // }
            // else{
            //   this.sourceType = this.updateComponent.sourceType;
            //   this.bdmCode = this.updateComponent.brokerCode;
            //   this.brokerCode = this.updateComponent.brokerCode;
            //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
            //   this.customerCode = this.updateComponent.CustomerCode;
            //   this.customerName = this.updateComponent.CustomerName;
            // }
          }
          else {
            this.sourceType = this.subuserType;
            this.customerCode = this.userDetails?.Result.CustomerCode;
          }
          if(this.customerName ==undefined) this.customerName = null;
          let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
          if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
          IdNo = this.customerDetails?.IdNumber;
          regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
          let ReqObj = {
            "BrokerBranchCode": brokerbranchCode,
            "AcExecutiveId": this.acExecutiveId,
            "CommissionType": this.commissionType,
            "CustomerCode": this.customerCode,
            "CustomerName": this.customerName,
            "BdmCode": this.customerCode,
            "BrokerCode": this.brokerCode,
            "LoginId": loginId,
            "SubUserType": this.subuserType,
            "ApplicationId": appId,
            "CustomerReferenceNo": refNo,
            "RequestReferenceNo": this.quoteRefNo,
            "Idnumber": IdNo,
            "VehicleId": this.customerData[index-1].Vehicleid,
            "AcccessoriesSumInsured": accSI,
            "AccessoriesInformation": "",
            "AdditionalCircumstances": "",
            "AxelDistance": this.vehicleDetails?.AxelDistance,
            "Chassisnumber": this.vehicleDetails?.Chassisnumber,
            "Color": this.vehicleDetails?.Color,
            "CityLimit": this.cityValue,
            "CoverNoteNo": null,
            "OwnerCategory": this.vehicleDetails?.OwnerCategory,
            "CubicCapacity": this.vehicleDetails?.Grossweight,
            "CreatedBy": createdBy,
            "DrivenByDesc": this.drivenBy,
            "EngineNumber": this.vehicleDetails?.EngineNumber,
            "FuelType": this.vehicleDetails?.FuelType,
            "Gpstrackinginstalled": this.gpsYn,
            "Grossweight": this.vehicleDetails?.Grossweight,
            "HoldInsurancePolicy": "N",
            "Insurancetype": this.typeValue,
            "InsuranceId": this.insuranceId,
            "InsuranceClass": this.classValue,
            "InsurerSettlement": "",
            "InterestedCompanyDetails": "",
            "ManufactureYear": this.vehicleDetails?.ManufactureYear,
            "ModelNumber": null,
            "MotorCategory": this.vehicleDetails?.MotorCategory,
            "Motorusage": this.motorUsageValue,
            "NcdYn": this.claimsYN,
            "NoOfClaims": null,
            "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
            "BranchCode": this.branchCode,
            "AgencyCode": this.agencyCode,
            "ProductId": this.productId,
            "SectionId": this.typeValue,
            "PolicyType": IdType,
            "RadioOrCasseteplayer": null,
            "RegistrationYear": regYear,
            "Registrationnumber": this.vehicleDetails?.Registrationnumber,
            "RoofRack": null,
            "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
            "SourceTypeId":this.Code,
            "SourceType" : this.sourceTypeDesc,
            "SpotFogLamp": null,
            "Stickerno": null,
            "SumInsured": vehicleSI,
            "Tareweight": this.vehicleDetails?.Tareweight,
            "TppdFreeLimit": null,
            "TppdIncreaeLimit": tppSI,
            "TrailerDetails": null,
            "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
            "VehicleType": this.bodyTypeValue,
            "Vehiclemake": this.vehicleDetails?.Vehiclemake,
            "WindScreenSumInsured": windSI,
            "Windscreencoverrequired": null,
            "accident": null,
            "periodOfInsurance": this.noOfDays,
            "PolicyStartDate": startDate,
            "PolicyEndDate": endDate,
            "Currency" : this.currencyCode,
            "ExchangeRate": this.exchangeRate,
            "HavePromoCode": this.havePromoCodeYN,
            "PromoCode" : this.promocode,
            "CollateralYn": this.collateralYN,
            "BorrowerType": this.borrowerValue,
            "CollateralName": this.collateralName,
            "FirstLossPayee": this.firstLossPayee,
            "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
            "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
            "NoOfComprehensives": this.vehicleDetails?.NoOfComprehensives,
            "ClaimRatio": this.vehicleDetails?.ClaimRatio,
            "SavedFrom": this.vehicleDetails?.SavedFrom,
            "UserType": this.userType,
            "TiraCoverNoteNo": this.tiraCoverNoteNo,
            "EndorsementYn": this.endorsementYn,
            "EndorsementDate":this.endorsementDate,
            "EndorsementEffectiveDate": this.endorsementEffectiveDate,
            "EndorsementRemarks": this.endorsementRemarks,
            "EndorsementType": this.endorsementType,
            "EndorsementTypeDesc": this.endorsementTypeDesc,
            "EndtCategoryDesc": this.endtCategoryDesc,
            "EndtCount":this.endtCount,
            "EndtPrevPolicyNo":this.endtPrevPolicyNo,
            "EndtPrevQuoteNo": this.endtPrevQuoteNo,
            "EndtStatus": this.endtStatus,
            "IsFinanceEndt": this.isFinanceEndt,
            "OrginalPolicyNo": this.orginalPolicyNo,
            "Scenarios": {
              "ExchangeRateScenario": {
                "OldAcccessoriesSumInsured": this.vehicleDetails.OldAcccessoriesSumInsured,
                "OldCurrency": this.vehicleDetails.OldCurrency,
                "OldExchangeRate": this.vehicleDetails.OldExchangeRate,
                "OldSumInsured": this.vehicleDetails.OldSumInsured,
                "OldTppdIncreaeLimit": this.vehicleDetails.OldTppdIncreaeLimit,
                "OldWindScreenSumInsured": this.vehicleDetails.OldWindScreenSumInsured
              }
            }
            }
          ReqObj['FleetOwnerYn'] = "N";
          if(this.endorsementSection){
          if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status =='RP' && !this.adminSection)){
            ReqObj['Status'] = 'E';
          }
          else{
            ReqObj['Status'] = this.vehicleDetails?.Status;
          }
          ReqObj['PolicyNo'] = this.endorsePolicyNo
          }
          else{
            ReqObj['Status'] = 'Y';
          }
          let urlLink = `${this.motorApiUrl}api/savemotordetails`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              if(data.ErrorMessage.length!=0){
                if(res.ErrorMessage){
                }
              }
              else{
                let entry = this.customerData[index-1];
                entry['PolicyEndDate'] = endDate;
                entry['PolicyStartDate'] = startDate;
      
                entry['InsuranceType'] = data?.Result?.SectionId;
                entry['MSRefNo'] = data?.Result?.MSRefNo;
                entry['VdRefNo'] = data?.Result?.VdRefNo;
                entry['CdRefNo'] = data?.Result?.CdRefNo;
                entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
                entry['Active'] = true;
                entry['VehicleId'] = data.Result?.VehicleId;
                this.getCalculationDetails(entry,null,index-1,'proceedSave');
              }
          });
        }
    }
  }
  getCalculationDetails(vehicleDetails,type,index,returnType){
    let createdBy="";
          let coverModificationYN = 'N';
          if(this.endorsementSection){
            // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
            // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
            // else coverModificationYN = 'N';
            if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
          }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP'){
              createdBy = this.customerData[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
         
          let endDate:any = null;
          if(this.policyEndDate){
            if(this.endorsementSection && this.enableRemoveVehicle){
              coverModificationYN = 'Y';
              endDate = this.endorseEffectiveDate;
            }
            // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
            //   coverModificationYN = 'N';
            // }
            else{
              if(this.policyEndDate){
                let dateList = String(this.policyEndDate).split('/');
                if(dateList.length>1) endDate = this.policyEndDate;
                else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
              }
            }
          }
          let effectiveDate=null;
          if(this.endorsementSection){
              effectiveDate = this.endorseEffectiveDate;
          }
          else {
            if(this.policyStartDate){

              let dateList = String(this.policyStartDate).split('/');
              if(dateList.length>1)  effectiveDate = this.policyStartDate; 
              else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            }
          }
          
          
          let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "SectionId": vehicleDetails?.InsuranceType,
              "ProductId": this.productId,
              "MSRefNo": vehicleDetails?.MSRefNo,
              "VehicleId": vehicleDetails?.VehicleId,
              "CdRefNo": vehicleDetails?.CdRefNo,
              "VdRefNo": vehicleDetails?.VdRefNo,
              "CreatedBy": createdBy,
              "productId": this.productId,
              "sectionId": this.typeValue,
              "RequestReferenceNo": this.quoteRefNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": endDate,
              "CoverModification": coverModificationYN
          }
          let urlLink = `${this.CommonApiUrl}calculator/calc`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
                if(index==this.customerData.length-1){
                  this.onFinalProceed();
                }
                else{
                  this.tabIndex = this.tabIndex+1;
                  this.getMotorDetails(index+1);
                }
              // sessionStorage.setItem('coverObject',JSON.stringify(data?.CoverList));
              // this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              // console.log("Res",data);
            },
            (err) => { },
          );
  }
  onFinalProceed(){
    let i=0,j=0;
    for(let veh of this.customerData){
      let refNo = veh?.MSRefNo;
      if(((refNo==undefined && (veh.modifiedYN=='Y' || this.quoteRefNo==null || this.quoteRefNo==undefined || this.endorsementSection || this.changeUwSection)) && (this.finalizeYN!='Y'))){
        i+=1;
      }
      j+=1;
      if(j==this.customerData.length){
        console.log("Final I",i,this.customerData)
        if(i==0){
          sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.customerData));
          // if(this.uwQuestionList.length!=0){
          //   let i = 0;
          //   let uwList:any[]=new Array();
          //   for(let ques of this.uwQuestionList){
          //     ques['BranchCode'] = this.branchCode;
          //     let createdBy="";
          //       let quoteStatus = sessionStorage.getItem('QuoteStatus');
          //       if(quoteStatus=='AdminRP'){
          //           createdBy = this.customerData[0].CreatedBy;
          //       }
          //       else{
          //         createdBy = this.loginId;
          //       }
          //       let status = null,loading = null;
          //       if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
          //         let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
          //         console.log("Found Obj",ques,obj)
          //         if(obj){
          //           loading = obj.LoadingPercent
          //           if(obj.ReferralYn=='Y') status = 'R';
          //           else status = 'Y';
          //         }
          //         else status = 'Y';
          //       }
          //       else status = ques.Status;
          //       let entry = {
          //         "InsuranceId": this.insuranceId,
          //         "ProductId": this.productId,
          //         "UwQuestionId": ques.UwQuestionId,
          //         "UwQuestionDesc": ques.UwQuestionDesc,
          //         "QuestionType": ques.QuestionType,
          //         "EffectiveDateStart": ques.EffectiveDateStart,
          //         "Status": status,
          //         "LoadingPercent": loading,
          //         "MandatoryYn": ques.MandatoryYn,
          //         "DataType": ques.DataType,
          //         "CreatedBy": createdBy,
          //         "UpdatedBy":  this.loginId,
          //         "Value": ques.Value,
          //         "BranchCode": this.branchCode,
          //         "RequestReferenceNo": this.requestReferenceNo,
          //         "VehicleId": this.vehicleId
          //       }
          //       uwList.push(entry);
          //     i+=1;
          //     if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
          //   }
          // }
          // else{
            this.router.navigate(['/quotation/plan/premium-details']);
          //}
          
        }
        else{
          this.saveExistData();
        }
      }
    }
  }
  saveExistData(){
    let i = 0;
    console.log("Received VehicleDetails",this.customerData)
    for(let veh of this.customerData){
      let refNo = veh?.MSRefNo;
      if((refNo==undefined && (veh?.modifiedYN=='Y' || this.quoteRefNo==null || this.quoteRefNo==undefined || this.endorsementSection || this.changeUwSection))){
        let reqRefNo = veh?.RequestReferenceNo;
        if(reqRefNo == undefined){
          reqRefNo = null;
        }
        this.vehicleId = String(veh.Vehicleid);
        let ReqObj =  {
          "RequestReferenceNo": veh.RequestReferenceNo,
           "Idnumber": this.customerDetails?.IdNumber,
          "Vehicleid": veh.Vehicleid
         }
         let urlLink = `${this.motorApiUrl}api/getmotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
              let vehicleDetails:any = data.Result;
              let startDate = "",endDate = ""
              //this.updateComponent.vehicleDetails = this.vehicleDetails;
              if(this.endorsementSection && this.enableAddVehicle && vehicleDetails.EndorsementYn=='Y'){
                startDate = this.endorseEffectiveDate;
                const oneday = 24 * 60 * 60 * 1000;
                 const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                 const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                 const formattedDatecurrent = new Date(startDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
             }
             else if(this.policyStartDate){
              if(this.endorsementSection && veh.Status=='D'){
                startDate = veh.PolicyStartDate;
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(veh.PolicyStartDate);
                console.log(formattedDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
              }
              else{
                let dateList = String(this.policyStartDate).split('/');
                if(dateList.length==1) startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                else startDate = this.policyStartDate; 
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(this.policyStartDate);
                console.log(formattedDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
              }
                
                
              }
              if(this.endorsementSection && veh.Status=='D'){
                endDate = this.endorseEffectiveDate;
              }
              else if(this.policyEndDate){
                let dateList = String(this.policyEndDate).split('/');
                if(dateList.length==1)  endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy"); 
                else endDate = this.policyEndDate;
              }
             
              let createdBy="";
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                  createdBy = this.customerData[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
              }
              if(this.userType=='Broker'){
                this.brokerCode = this.agencyCode;
                createdBy = this.loginId;
                
                this.applicationId = "01";
              }
              this.subuserType = sessionStorage.getItem('typeValue');
              console.log("AcExecutive",this.acExecutiveId);
              if(vehicleDetails?.FleetOwnerYn==null) vehicleDetails.FleetOwnerYn = 'N';
              let appId = "1",loginId="",brokerbranchCode="";
              brokerbranchCode = this.brokerbranchCode;
              console.log("Quote Status Received",quoteStatus)
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                brokerbranchCode = this.customerData[0].BrokerBranchCode;
                  createdBy = this.customerData[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
                if(this.userType!='Issuer'){
                  this.brokerCode = this.agencyCode;
                  appId = "1"; loginId=this.loginId;
                  brokerbranchCode = this.brokerbranchCode;
                }
                else{
                  appId = this.loginId;
                  loginId = this.customerData[0].LoginId;
                  brokerbranchCode = this.customerData[0].BrokerBranchCode;
                }
              }
              if(this.userType!='Broker' && this.userType!='User'){
                // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
                  
                //   this.sourceType = this.vehicleDetails.SourceTypeId;
                //   this.bdmCode = this.vehicleDetails.BrokerCode;
                //   this.brokerCode = this.vehicleDetails.BrokerCode;
                //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
                //   this.customerCode = this.vehicleDetails.CustomerCode;
                //   this.customerName = this.vehicleDetails.CustomerName;
                // }
                // else{
                //   this.sourceType = this.updateComponent.sourceType;
                //   this.bdmCode = this.updateComponent.brokerCode;
                //   this.brokerCode = this.updateComponent.brokerCode;
                //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
                //   this.customerCode = this.updateComponent.CustomerCode;
                //   this.customerName = this.updateComponent.CustomerName;
                // }
                
              }
              else {
                this.sourceType = this.subuserType;
                this.customerCode = this.userDetails?.Result.CustomerCode;
              }
               
              let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
              if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
                IdNo = this.customerDetails?.IdNumber;
                regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
                console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.brokerCode,this.customerCode);
              console.log("AcExecutive",this.acExecutiveId);
              let ReqObj = {
                "BrokerBranchCode": brokerbranchCode,
                "AcExecutiveId": this.acExecutiveId,
                "CommissionType": this.commissionType,
                "CustomerCode": this.customerCode,
                "CustomerName": this.customerName,
                "BdmCode": this.customerCode,
                "BrokerCode": this.brokerCode,
                "LoginId": loginId,
              "SourceTypeId":this.Code,
              "SourceType" : this.sourceTypeDesc,
              "SubUserType": this.subuserType,
              "ApplicationId": appId,
              "CustomerReferenceNo": refNo,
              "RequestReferenceNo": veh.RequestReferenceNo,
              "Idnumber": IdNo,
              "EndorsementYn": veh.EndorsementYn,
              "VehicleId": veh.Vehicleid,
              "AcccessoriesSumInsured": vehicleDetails?.AcccessoriesSumInsured,
              "AccessoriesInformation": "",
              "AdditionalCircumstances": "",
              "AxelDistance": vehicleDetails?.AxelDistance,
              "Chassisnumber": vehicleDetails?.Chassisnumber,
              "Color": vehicleDetails?.Color,
              "CityLimit": vehicleDetails?.CityLimit,
              "CoverNoteNo": null,
              "OwnerCategory": vehicleDetails?.OwnerCategory,
              "CubicCapacity": vehicleDetails?.Grossweight,
              "CreatedBy": createdBy,
              "DrivenByDesc": this.drivenBy,
              "EngineNumber": vehicleDetails?.EngineNumber,
              "FuelType": vehicleDetails?.FuelType,
              "Gpstrackinginstalled": this.gpsYn,
              "Grossweight": vehicleDetails?.Grossweight,
              "HoldInsurancePolicy": "N",
              "Insurancetype": vehicleDetails?.Insurancetype,
              "InsuranceId": this.insuranceId,
              "InsuranceClass": vehicleDetails?.InsuranceClass,
              "InsurerSettlement": "",
              "InterestedCompanyDetails": "",
              "ManufactureYear": vehicleDetails?.ManufactureYear,
              "ModelNumber": null,
              "MotorCategory": vehicleDetails?.MotorCategory,
              "Motorusage": vehicleDetails?.Motorusage,
              "NcdYn": vehicleDetails?.NcdYn,
              "NoOfClaims": null,
              "NumberOfAxels": vehicleDetails?.NumberOfAxels,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "ProductId": this.productId,
              "SectionId": vehicleDetails?.Insurancetype,
              "PolicyType": IdType,
              "RadioOrCasseteplayer": null,
              "RegistrationYear": regYear,
              "Registrationnumber": vehicleDetails?.Registrationnumber,
              "RoofRack": null,
              "SeatingCapacity": vehicleDetails?.SeatingCapacity,
              "SpotFogLamp": null,
              "Stickerno": null,
              "SumInsured": vehicleDetails?.SumInsured,
              "Tareweight": vehicleDetails?.Tareweight,
              "TppdFreeLimit": null,
              "TppdIncreaeLimit": vehicleDetails?.TppdIncreaeLimit,
              "TrailerDetails": null,
              "Vehcilemodel": vehicleDetails?.Vehcilemodel,
              "VehicleType": vehicleDetails?.VehicleType,
              "Vehiclemake": vehicleDetails?.Vehiclemake,
              "WindScreenSumInsured": vehicleDetails?.WindScreenSumInsured,
              "Windscreencoverrequired": null,
              "accident": null,
              "periodOfInsurance": this.noOfDays,
              "PolicyStartDate": startDate,
              "PolicyEndDate": endDate,
              "Currency" : this.currencyCode,
              "ExchangeRate": this.exchangeRate,
              "HavePromoCode": this.havePromoCodeYN,
              "PromoCode" : this.promocode,
              "CollateralYn": vehicleDetails?.CollateralYn,
              "BorrowerType": vehicleDetails?.BorrowerType,
              "CollateralName": vehicleDetails?.CollateralName,
              "FirstLossPayee": vehicleDetails?.FirstLossPayee,
              "FleetOwnerYn": vehicleDetails?.FleetOwnerYn,
              "NoOfVehicles": vehicleDetails?.NoOfVehicles,
              "NoOfComprehensives": vehicleDetails?.NoOfComprehensives,
              "ClaimRatio": vehicleDetails?.ClaimRatio,
              "SavedFrom": vehicleDetails?.SavedFrom,
              "UserType": this.userType,
              "TiraCoverNoteNo": vehicleDetails?.TiraCoverNoteNo,
              "EndorsementDate":vehicleDetails?.EndorsementDate,
              "EndorsementEffectiveDate": vehicleDetails?.EndorsementEffectiveDate,
              "EndorsementRemarks": vehicleDetails?.EndorsementRemarks,
              "EndorsementType": vehicleDetails?.EndorsementType,
              "EndorsementTypeDesc": vehicleDetails?.EndorsementTypeDesc,
              "EndtCategoryDesc": vehicleDetails?.EndtCategoryDesc,
              "EndtCount":vehicleDetails?.EndtCount,
              "EndtPrevPolicyNo":vehicleDetails?.EndtPrevPolicyNo,
              "EndtPrevQuoteNo": vehicleDetails?.EndtPrevQuoteNo,
              "EndtStatus": vehicleDetails?.EndtStatus,
              "IsFinanceEndt": vehicleDetails?.IsFinanceEndt,
              "OrginalPolicyNo": vehicleDetails?.OrginalPolicyNo,
              "Scenarios": {
                  "ExchangeRateScenario": {
                    "OldAcccessoriesSumInsured": vehicleDetails.AcccessoriesSumInsured,
                    "OldCurrency": vehicleDetails.Currency,
                    "OldExchangeRate": vehicleDetails.ExchangeRate,
                    "OldSumInsured": vehicleDetails.SumInsured,
                    "OldTppdIncreaeLimit": vehicleDetails.TppdIncreaeLimit,
                    "OldWindScreenSumInsured": vehicleDetails.WindScreenSumInsured
                  }
                }
              }
              if(this.endorsementSection){
                if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status =='RP' && !this.adminSection)){
                  ReqObj['Status'] = 'E';
                }
                else{
                  ReqObj['Status'] = vehicleDetails?.Status;
                }
                ReqObj['PolicyNo'] = this.endorsePolicyNo
              }
              else{
                ReqObj['Status'] = 'Y';
              }
              let urlLink = `${this.motorApiUrl}api/savemotordetails`;
              this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
                (data: any) => {
                  let res:any = data;
                  if(data.ErrorMessage.length!=0){
                    if(res.ErrorMessage){
                      // for(let entry of res.ErrorMessage){
                      //   let type: NbComponentStatus = 'danger';
                      //   const config = {
                      //     status: type,
                      //     destroyByClick: true,
                      //     duration: 4000,
                      //     hasIcon: true,
                      //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                      //     preventDuplicates: false,
                      //   };
                      //   this.toastrService.show(
                      //     entry.Field,
                      //     entry.Message,
                      //     config);
                      // }
                    }
                  }
                  else{
                    this.quoteRefNo = data?.Result?.RequestReferenceNo;
                     sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
                     veh['InsuranceType'] = data?.Result?.SectionId;
                    veh['MSRefNo'] = data?.Result?.MSRefNo;
                    veh['VdRefNo'] = data?.Result?.VdRefNo;
                    veh['CdRefNo'] = data?.Result?.CdRefNo;
                    veh['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
                    veh['VehicleId'] = veh.Vehicleid
                    veh['Active'] = true;
                    console.log("Save Iterate",veh)
                    i+=1;
                    if(this.uwQuestionList.length!=0){
                      let j = 0;
                      let uwList:any[]=new Array();
                      for(let ques of this.uwQuestionList){
                        ques['BranchCode'] = this.branchCode;
                        let createdBy="";
                          let quoteStatus = sessionStorage.getItem('QuoteStatus');
                          if(quoteStatus=='AdminRP'){
                              createdBy = this.customerData[0].CreatedBy;
                          }
                          else{
                            createdBy = this.loginId;
                          }
                          let status = null,loading = null;
                          if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                            let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
                            console.log("Found Obj",ques,obj)
                            if(obj){
                              loading = obj.LoadingPercent
                              if(obj.ReferralYn=='Y') status = 'R';
                              else status = 'Y';
                            }
                            else status = 'Y';
                          }
                          else status = ques.Status;
                          let entry = {
                            "InsuranceId": this.insuranceId,
                            "ProductId": this.productId,
                            "UwQuestionId": ques.UwQuestionId,
                            "UwQuestionDesc": ques.UwQuestionDesc,
                            "QuestionType": ques.QuestionType,
                            "EffectiveDateStart": ques.EffectiveDateStart,
                            "Status": status,
                            "LoadingPercent": loading,
                            "MandatoryYn": ques.MandatoryYn,
                            "DataType": ques.DataType,
                            "CreatedBy": createdBy,
                            "UpdatedBy":  this.loginId,
                            "Value": ques.Value,
                            "BranchCode": this.branchCode,
                            "RequestReferenceNo": this.quoteRefNo,
                            "VehicleId": veh.Vehicleid
                          }
                          uwList.push(entry);
                        // if(ques.QuestionType == '01'){
                        //   ques['CreatedBy'] = createdBy;
                        //   ques['RequestReferenceNo'] = this.requestReferenceNo;
                        //   ques['UpdatedBy'] = this.loginId;
                        //   ques["VehicleId"] = this.vehicleId
                        //   let entry = new Object();
                        //   entry = ques;
                        //   delete entry['Options'];
                        //   uwList.push(entry);
                        // } 
                        // else if(ques.Value!=""){
                        //   ques['CreatedBy'] = createdBy;
                        //   ques['RequestReferenceNo'] = this.requestReferenceNo;
                        //   ques['UpdatedBy'] = this.loginId;
                        //   ques["VehicleId"] = this.vehicleId
                        //   let entry = new Object();
                        //   entry = ques;
                        //   delete entry['Options'];
                        //   uwList.push(entry);
                        // } 
                        j+=1;
                        //if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,veh,null,i);
                      }
                    }
                    else if(this.finalizeYN!='Y'){
                      this.getCalculationDetails(veh,null,i,'finalProceed');
                    }
                    else{
                      this.onFinalProceed();
                    }
                    
                    // sessionStorage.setItem('editVehicleId',this.vehicleId);
                    // sessionStorage.removeItem('vehicleDetails');
                    // sessionStorage.setItem('vehChassisNo',this.vehicleDetails?.Chassisnumber);

                    // this.getCalculationDetails(data?.Result);
                  }
                },
                (err) => { },
              );
            }
          },
          (err) => { },
        );
      }
      else{
        i+=1;
        this.getCalculationDetails(veh,null,i,'finalProceed');
        // i+=1;
        // if(i==this.customerData.length) this.onFinalProceed();
      }
    }
  }
  onCreateVehicle(){
    this.policyStartError=false;this.policyEndError = false;this.currencyCodeError=false;
      this.policyPassDate = false;
      
      let i=0;
      if(this.policyStartDate==null || this.policyStartDate=='' || this.policyStartDate==undefined){
        i+=1;
        this.policyStartError = true;
      }
      else{
        let dateList = String(this.policyStartDate).split('/');
        if(dateList.length>0){
          let date = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
          var firstRepaymentDate = new Date(date);
          var today = new Date();
           if( (this.productId=='5' || this.productId=='4' || this.productId=='46' || this.productId=='29') && (firstRepaymentDate.getTime() < today.setHours(0,0,0,0))){
              i+=1;
              this.policyPassDate = true;
          }
        }
      }
      
     
      if(this.policyEndDate==null || this.policyEndDate=='' || this.policyEndDate==undefined){
        i+=1;
        this.policyEndError = true;
      }
      if(this.currencyCode==null || this.currencyCode=='' || this.currencyCode==undefined){
        i+=1;
        this.currencyCodeError = false;
      }
      if(this.issuerSection){
        if(this.Code=='' || this.Code==null || this.Code==undefined){
          i+=1;
          this.sourceCodeError = true;
        }
        else{
          if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
            if(this.customerName=='' || this.customerName==undefined || this.customerName==null){
                this.customerCodeError = true;
                i+=1;
            }
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
              this.brokerCodeError = true;
              i+=1;
            }
            if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
              this.brokerBranchCodeError = true;
              i+=1;
            }
          }
        }
      }
      if(i==0){
      sessionStorage.setItem('editVehicleId',String(this.customerData.length+1));
      let startDate=null,endDate=null;
      let startDateList = String(this.policyStartDate).split('/');
      if(startDateList.length>1) startDate = this.policyStartDate
      else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
      let endDateList = String(this.policyEndDate).split('/');
      if(endDateList.length>1) endDate = this.policyEndDate
      else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
      let entry = {
        "policyStartDate": startDate,
        "policyEndDate": endDate,
        "currencyCode": this.currencyCode,
        "exchangeRate": this.exchangeRate,
        "promoCode": this.promocode,
        "BrokerCode": this.brokerCode,
        "SourceType": this.sourceType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BrokerBranchCode": this.brokerBranchCode,
        "SourceCode":this.Code,
      }
      sessionStorage.setItem('commonDetails',JSON.stringify(entry));
      sessionStorage.setItem('vehicleLength',String(this.customerData.length+1))
      sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.customerData));
      this.router.navigate(['/quotation/plan/motor-details'])
    }
  }
  showSidebar() {
    this.sidebarVisible = true;
  }
  checkActiveVehicles(){
    if(this.customerData.length==0) return false;
    else if(this.customerData.length==1) { return true;}
    else {
      var exist=this.customerData.some(ele=>ele?.MSRefNo==undefined || ele?.MSRefNo==null);
      console.log("Final Entry ",exist)
      return exist;
    }

  }
  onProceed(){
    if(this.checkDisableField()){
      
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    else if(this.customerData.length!=0){
      if(this.customerData.length==1 && this.finalizeYN!='Y'){
        
        this.onFormSubmit('proceedSave');
      }
      else{
        this.onFinalProceed();
      }
    }
  }
  onFormSubmit(type){
    sessionStorage.removeItem('loadingType');
    this.currentIndex = 1;
    if(this.finalizeYN!='Y'){
      if(this.checkDisableField()){
        if(this.currentIndex<this.customerData.length){
          this.collateralYN = "N";
          this.currentIndex = this.currentIndex+1;
            if(this.customerData[this.currentIndex-1]?.Active==true){
              if(this.endorsementSection && this.enableAddVehicle){
                if(this.customerData[this.currentIndex-1]?.EndorsementYn){
                  if(this.customerData[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                  else{ this.enableFieldsSection = false; }
                }
                else this.enableFieldsSection = false;
              } 
              this.vehicleId = String(this.customerData[this.currentIndex-1].Vehicleid);
              this.getEditVehicleDetails(this.vehicleId,'direct');
              this.customerData.length = this.customerData.length;
            }
            else{
                
              this.vehicleDetails = this.customerData[this.currentIndex-1];
              if(this.endorsementSection && this.enableAddVehicle){
                if(this.vehicleDetails?.EndorsementYn){
                  if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                  else this.enableFieldsSection = false;
                }
              } 
              this.vehicleDetails = this.customerData[this.currentIndex-1];
              this.customerData.length = this.customerData.length;
              this.setVehicleValues('direct');
            }
        }
      }
      else{
        if(this.insuranceId=='100004') this.typeValue = this.classValue;
        let createdBy="";
        let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
        if(this.vehicleSI==undefined) vehicleSI = null;
        else if(this.vehicleSI.includes(',')){ vehicleSI = this.vehicleSI.replace(/,/g, '') }
        else vehicleSI = this.vehicleSI;
        if(this.accessoriesSI==undefined) accSI = null;
        else if(this.accessoriesSI.includes(',')){ accSI = this.accessoriesSI.replace(/,/g, '') }
        else accSI = this.accessoriesSI
        if(this.windShieldSI==undefined) windSI = null;
        else if(this.windShieldSI.includes(',')){ windSI = this.windShieldSI.replace(/,/g, '') }
        else windSI = this.windShieldSI
        if(this.tppdSI==undefined) tppSI = null;
        else if(this.tppdSI.includes(',')){ tppSI = this.tppdSI.replace(/,/g, '') }
        else tppSI = this.tppdSI
        this.vehicleId = this.customerData[0]?.Vehicleid;
        if(this.policyStartDate){
          if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
             startDate = this.endorseEffectiveDate;
             const oneday = 24 * 60 * 60 * 1000;
              const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
              const formattedDate = moment(momentDate).format("YYYY-MM-DD");
              const formattedDatecurrent = new Date(startDate);
              console.log(formattedDate);
    
            console.log(formattedDatecurrent);
    
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          }
          else if(this.endorsementSection && this.vehicleDetails?.Status=='D'){
            startDate = this.vehicleDetails?.PolicyStartDate;
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.vehicleDetails?.PolicyStartDate);
            console.log(formattedDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          }
          else{
            let dateList = this.policyStartDate.split('/');
            if(dateList.length==1)  startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            else startDate = this.policyStartDate;
            // if(this.policyStartDate.includes('/')) startDate = this.policyStartDate;
            // else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            
            const oneday = 24 * 60 * 60 * 1000;
            
            const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.policyStartDate);
            
            console.log(formattedDate);
            this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
            
          }
        }
        if(this.policyEndDate){
          if(this.endorsementSection && this.vehicleDetails.Status=='D'){
            endDate = this.endorseEffectiveDate;
          }
          else{
            let dateList = this.policyEndDate.split('/');
            if(dateList.length==1)  endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            else endDate = this.policyEndDate;
          }
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.brokerCode,this.customerCode);
        
        let appId = "1",loginId="",brokerbranchCode="";
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          brokerbranchCode = this.customerData[0].BrokerBranchCode;
            createdBy = this.customerData[0].CreatedBy;
        }
        else{
          createdBy = this.loginId;
          if(this.userType!='Issuer'){
            this.brokerCode = this.agencyCode;
            appId = "1"; loginId=this.loginId;
            brokerbranchCode = this.brokerbranchCode;
          }
          else{
            appId = this.loginId;
            loginId = this.customerData[0].LoginId;
            brokerbranchCode = this.customerData[0].BrokerBranchCode;
          }
        }
        if(this.userType!='Broker' && this.userType!='User'){
          // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
          //   this.sourceType = this.vehicleDetails.SourceTypeId;
          //   this.bdmCode = this.vehicleDetails.BrokerCode;
          //   this.brokerCode = this.vehicleDetails.BrokerCode;
          //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
          //   this.customerCode = this.vehicleDetails.CustomerCode;
          //   this.customerName = this.vehicleDetails.CustomerName;
          // }
          // else{
          //   this.sourceType = this.updateComponent.sourceType;
          //   this.bdmCode = this.updateComponent.brokerCode;
          //   this.brokerCode = this.updateComponent.brokerCode;
          //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
          //   this.customerCode = this.updateComponent.CustomerCode;
          //   this.customerName = this.updateComponent.CustomerName;
          // }
          }
          else {
            this.sourceType = this.subuserType;
            this.customerCode = this.userDetails?.Result.CustomerCode;
          }
          if(this.customerName ==undefined) this.customerName = null;
        let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
        if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
          IdNo = this.customerDetails?.IdNumber;
          regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.brokerCode,this.customerCode);
      let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
        "AcExecutiveId": this.acExecutiveId,
        "CommissionType": this.commissionType,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BdmCode": this.customerCode,
        "BrokerCode": this.brokerCode,
        "LoginId": loginId,
        "SubUserType": this.subuserType,
        "ApplicationId": appId,
        "CustomerReferenceNo": refNo,
        "RequestReferenceNo": this.quoteRefNo,
        "Idnumber": IdNo,
        "VehicleId": this.vehicleId ,
        "AcccessoriesSumInsured": accSI,
        "AccessoriesInformation": "",
        "AdditionalCircumstances": "",
        "AxelDistance": this.vehicleDetails?.AxelDistance,
        "Chassisnumber": this.vehicleDetails?.Chassisnumber,
        "Color": this.vehicleDetails?.Color,
        "CityLimit": this.cityValue,
        "CoverNoteNo": null,
        "OwnerCategory": this.vehicleDetails?.OwnerCategory,
        "CubicCapacity": this.vehicleDetails?.Grossweight,
        "CreatedBy": createdBy,
        "DrivenByDesc": this.drivenBy,
        "EngineNumber": this.vehicleDetails?.EngineNumber,
        "FuelType": this.vehicleDetails?.FuelType,
        "Gpstrackinginstalled": this.gpsYn,
        "Grossweight": this.vehicleDetails?.Grossweight,
        "HoldInsurancePolicy": "N",
        "Insurancetype": this.typeValue,
        "InsuranceId": this.insuranceId,
        "InsuranceClass": this.classValue,
        "InsurerSettlement": "",
        "InterestedCompanyDetails": "",
        "ManufactureYear": this.vehicleDetails?.ManufactureYear,
        "ModelNumber": null,
        "MotorCategory": this.vehicleDetails?.MotorCategory,
        "Motorusage": this.motorUsageValue,
        "NcdYn": this.claimsYN,
        "NoOfClaims": null,
        "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "ProductId": this.productId,
        "SectionId": this.typeValue,
        "PolicyType": IdType,
        "RadioOrCasseteplayer": null,
        "RegistrationYear": regYear,
        "Registrationnumber": this.vehicleDetails?.Registrationnumber,
        "RoofRack": null,
        "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
        "SourceTypeId":this.Code,
        "SourceType" : this.sourceTypeDesc,
        "SpotFogLamp": null,
        "Stickerno": null,
        "SumInsured": vehicleSI,
        "Tareweight": this.vehicleDetails?.Tareweight,
        "TppdFreeLimit": null,
        "TppdIncreaeLimit": tppSI,
        "TrailerDetails": null,
        "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
        "VehicleType": this.bodyTypeValue,
        "Vehiclemake": this.vehicleDetails?.Vehiclemake,
        "WindScreenSumInsured": windSI,
        "Windscreencoverrequired": null,
        "accident": null,
        "periodOfInsurance": this.noOfDays,
        "PolicyStartDate": startDate,
        "PolicyEndDate": endDate,
        "Currency" : this.currencyCode,
        "ExchangeRate": this.exchangeRate,
        "HavePromoCode": this.havePromoCodeYN,
        "PromoCode" : this.promocode,
        "CollateralYn": this.collateralYN,
        "BorrowerType": this.borrowerValue,
        "CollateralName": this.collateralName,
        "FirstLossPayee": this.firstLossPayee,
        "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
        "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
        "NoOfComprehensives": this.noOfCompPolicy,
        "ClaimRatio": this.claimRatio,
        "SavedFrom": this.vehicleDetails?.SavedFrom,
        "UserType": this.userType,
        "TiraCoverNoteNo": this.tiraCoverNoteNo,
        "EndorsementYn": this.endorsementYn,
        "EndorsementDate":this.endorsementDate,
        "EndorsementEffectiveDate": this.endorsementEffectiveDate,
        "EndorsementRemarks": this.endorsementRemarks,
        "EndorsementType": this.endorsementType,
        "EndorsementTypeDesc": this.endorsementTypeDesc,
        "EndtCategoryDesc": this.endtCategoryDesc,
        "EndtCount":this.endtCount,
        "EndtPrevPolicyNo":this.endtPrevPolicyNo,
        "EndtPrevQuoteNo": this.endtPrevQuoteNo,
        "EndtStatus": this.endtStatus,
        "IsFinanceEndt": this.isFinanceEndt,
        "OrginalPolicyNo": this.orginalPolicyNo,
        "Scenarios": {
          "ExchangeRateScenario": {
            "OldAcccessoriesSumInsured": this.vehicleDetails.OldAcccessoriesSumInsured,
            "OldCurrency": this.vehicleDetails.OldCurrency,
            "OldExchangeRate": this.vehicleDetails.OldExchangeRate,
            "OldSumInsured": this.vehicleDetails.OldSumInsured,
            "OldTppdIncreaeLimit": this.vehicleDetails.OldTppdIncreaeLimit,
            "OldWindScreenSumInsured": this.vehicleDetails.OldWindScreenSumInsured
          }
        }
        }
        ReqObj['FleetOwnerYn'] = "N";
        if(this.endorsementSection){
          if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y' || (this.vehicleDetails?.Status =='RP' && !this.adminSection)){
            ReqObj['Status'] = 'E';
          }
          else{
            ReqObj['Status'] = this.vehicleDetails?.Status;
          }
          ReqObj['PolicyNo'] = this.endorsePolicyNo
        }
        else{
          ReqObj['Status'] = 'Y';
        }
        let urlLink = `${this.motorApiUrl}api/savemotordetails`;
        this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
          (data: any) => {
            let res:any = data;
            if(data.ErrorMessage.length!=0){
              if(res.ErrorMessage){
              }
            }
            else{
              let entry = this.customerData[this.currentIndex-1];
              entry['PolicyEndDate'] = endDate;
              entry['PolicyStartDate'] = startDate;
    
              entry['InsuranceType'] = data?.Result?.SectionId;
              entry['MSRefNo'] = data?.Result?.MSRefNo;
              entry['VdRefNo'] = data?.Result?.VdRefNo;
              entry['CdRefNo'] = data?.Result?.CdRefNo;
              entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
              entry['Active'] = true;
              entry['VehicleId'] = data.Result?.VehicleId;
              if(this.currentIndex<this.customerData.length){
                this.collateralYN = "N";
                sessionStorage.setItem('loadingType','load');
                this.currentIndex = this.currentIndex+1;
                  if(this.customerData[this.currentIndex-1]?.Active==true){
                    if(this.endorsementSection && this.enableAddVehicle){
                      if(this.customerData[this.currentIndex-1]?.EndorsementYn){
                        if(this.customerData[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                        else{ this.enableFieldsSection = false; }
                      }
                      else this.enableFieldsSection = false;
                    } 
                    this.vehicleId = String(this.customerData[this.currentIndex-1].Vehicleid);
                    this.getEditVehicleDetails(this.vehicleId,'direct');
                    this.customerData.length = this.customerData.length;
                  }
                  else{
                    this.vehicleDetails = this.customerData[this.currentIndex-1];
                    if(this.endorsementSection && this.enableAddVehicle){
                      if(this.vehicleDetails?.EndorsementYn){
                        if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                        else this.enableFieldsSection = false;
                      }
                    } 
                    this.vehicleDetails = this.customerData[this.currentIndex-1];
                    this.customerData.length = this.customerData.length;
                    this.setVehicleValues('direct');
                    //this.currencyValue = this.customerData[this.currentIndex-1].Currency;
                    //this.onCurrencyChange();
                  }
              }
              else{
                  if(this.currentIndex-1==this.customerData.length) this.onFinalProceed();
              }
              this.quoteRefNo = data?.Result?.RequestReferenceNo;
               sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
              
              if(type=='proceedSave'){
               
                if(this.uwQuestionList.length!=0 && this.changeUwSection){
                  let j = 0;
                  let uwList:any[]=new Array();
                  for(let ques of this.uwQuestionList){
                    ques['BranchCode'] = this.branchCode;
                    let createdBy="";
                      let quoteStatus = sessionStorage.getItem('QuoteStatus');
                      if(quoteStatus=='AdminRP'){
                          createdBy = this.customerData[0].CreatedBy;
                      }
                      else{
                        createdBy = this.loginId;
                      }
                      let status = null,loading = null;
                      if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                        let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
                        console.log("Found Obj",ques,obj)
                        if(obj){
                          loading = obj.LoadingPercent
                          if(obj.ReferralYn=='Y') status = 'R';
                          else status = 'Y';
                        }
                        else status = 'Y';
                      }
                      else status = ques.Status;
                      let entry = {
                        "InsuranceId": this.insuranceId,
                        "ProductId": this.productId,
                        "UwQuestionId": ques.UwQuestionId,
                        "UwQuestionDesc": ques.UwQuestionDesc,
                        "QuestionType": ques.QuestionType,
                        "EffectiveDateStart": ques.EffectiveDateStart,
                        "Status": status,
                        "LoadingPercent": loading,
                        "MandatoryYn": ques.MandatoryYn,
                        "DataType": ques.DataType,
                        "CreatedBy": createdBy,
                        "UpdatedBy":  this.loginId,
                        "Value": ques.Value,
                        "BranchCode": this.branchCode,
                        "RequestReferenceNo": this.quoteRefNo,
                        "VehicleId": this.vehicleId
                      }
                      uwList.push(entry);
                    j+=1;
                    if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
                  }
                }
                else if(this.finalizeYN!='Y'){
                  this.getCalculationDetails(entry,type,this.currentIndex-1,'proceedSave');
                }
                else{
                  if(type=='save'){

                  }
                  else if(type=='proceedSave'){
                    
                    this.onFinalProceed();
                  }
                  else if(type=='finalProceed'){
                    if(this.currentIndex-1==this.customerData.length) this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                  }
                  else{
                    if(type==null){
                      if(this.currentIndex-1==this.customerData.length) this.onFinalProceed();
                    }
                    
                    
                  }
                }
              }
              else this.getCalculationDetails(entry,type,null,'proceedSave');
              
            }
          },
          (err) => { },
        );
      }
    }
    else{
      if(this.currentIndex<this.customerData.length){
        this.collateralYN = "N";
        this.currentIndex = this.currentIndex+1;
          if(this.customerData[this.currentIndex-1]?.Active==true){
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.customerData[this.currentIndex-1]?.EndorsementYn){
                if(this.customerData[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                else{ this.enableFieldsSection = false; }
              }
              else this.enableFieldsSection = false;
            } 
            this.vehicleId = String(this.customerData[this.currentIndex-1].Vehicleid);
            this.getEditVehicleDetails(this.vehicleId,'direct');
            this.customerData.length = this.customerData.length;
          }
          else{
              
            this.vehicleDetails = this.customerData[this.currentIndex-1];
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.vehicleDetails?.EndorsementYn){
                if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                else this.enableFieldsSection = false;
              }
            } 
            this.vehicleDetails = this.customerData[this.currentIndex-1];
            this.customerData.length = this.customerData.length;
            this.setVehicleValues('direct');
          }
      }
      else{
          this.onFinalProceed();
      }
    }
  }
  getEditVehicleDetails(vehicleId,type){
    let ReqObj =  {
      "RequestReferenceNo": this.quoteRefNo,
       "Idnumber": this.customerDetails?.IdNumber,
      "Vehicleid": vehicleId
     }
     let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.vehicleDetails = data.Result;
          this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
          this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
          this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
          this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
          this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
          this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
          //this.updateComponent.vehicleDetails = this.vehicleDetails;
          if(type!='save'){
            this.setVehicleValues('edit');
          }
          else{
            this.onFormSubmit('save');
          }
        }
      },
      (err) => { },
    );
  }
  setVehicleValues(type){
    console.log("Vehicle Details",this.vehicleDetails);
    this.vehicleId = String(this.vehicleDetails?.Vehicleid);
    console.log("Vehicle Id Setted",this.vehicleId);
    this.endorsementYn = this.vehicleDetails?.EndorsementYn;
    this.typeValue = this.vehicleDetails?.Insurancetype;
    this.classValue = this.vehicleDetails?.InsuranceClass;
    if(this.endorsementSection){
      if(this.vehicleDetails?.EndorsementDate){
        this.endorsementDate = this.vehicleDetails?.EndorsementDate;
        this.endorsementEffectiveDate = this.vehicleDetails?.EndorsementEffectiveDate;
        this.endorsementRemarks = this.vehicleDetails?.EndorsementRemarks;
        this.endorsementType = this.vehicleDetails?.EndorsementType;
        this.endorsementTypeDesc = this.vehicleDetails?.EndorsementTypeDesc;
        this.endtCategoryDesc = this.vehicleDetails?.EndtCategoryDesc;
        this.endtCount = this.vehicleDetails?.EndtCount;
        this.endtPrevQuoteNo = this.vehicleDetails?.EndtPrevQuoteNo;
        this.endtStatus = this.vehicleDetails?.EndtStatus;
        this.endtPrevPolicyNo = this.vehicleDetails?.EndtPrevPolicyNo;
        this.isFinanceEndt = this.vehicleDetails?.IsFinanceEndt;
        this.orginalPolicyNo = this.vehicleDetails?.OrginalPolicyNo;
      }
      else{
        let entry = this.customerData.filter(ele=>ele?.EndorsementDate!=undefined)
        if(entry){
          let details = entry[0];
          console.log("Filtered Endorsement Set",entry)
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceEndt;
        }
        
      }
    }
    else{
      this.endorsementDate = null;
      this.endorsementEffectiveDate = null;
      this.endorsementRemarks = null;
      this.endorsementType = null;
      this.endorsementTypeDesc = null;
      this.endtCategoryDesc = null;
      this.endtCount = null;
      this.endtPrevQuoteNo = null;
      this.endtStatus = null;this.orginalPolicyNo = null;
      this.endtPrevPolicyNo = null;this.isFinanceEndt = null;
    }
    if(type=='edit'){
      if(this.insuranceId!='100004') this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
      else{this.motorUsageValue=this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct');}
      this.bodyTypeValue = this.vehicleDetails?.VehicleType;
      this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.motorUsageValue = this.vehicleDetails?.Motorusage;
      this.collateralYN = this.vehicleDetails?.CollateralYn;
      if(this.collateralYN=='Y'){
        this.collateralValue = true;
        this.collateralName = this.vehicleDetails?.CollateralName;
        this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
        this.borrowerValue = this.vehicleDetails?.BorrowerType;
      }
      if(this.vehicleDetails?.FleetOwnerYn){
        if(this.fleetYN!='')
        this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
        if(this.fleetYN=='Y'){
          this.fleetValue = true;
          this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
          this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
          this.claimRatio = this.vehicleDetails?.ClaimRatio
        }
      }
    }
    else{

    }
    this.cityValue = this.vehicleDetails?.CityLimit;
    if(this.policyStartDate==null || this.policyStartDate == '' || this.policyStartDate == undefined){
      console.log("Vehicle Details on Edit",this.policyStartDate,this.vehicleDetails)
      if(this.vehicleDetails?.PolicyStartDate != null ){
        var dateParts = this.vehicleDetails?.PolicyStartDate.split("/");
  
        // month is 0-based, that's why we need dataParts[1] - 1
        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        console.log("Policy Start",this.policyStartDate)
        //this.policyStartDate = dateObject.toString()
      }
      if(this.vehicleDetails?.PolicyEndDate != null ){
        var dateParts = this.vehicleDetails?.PolicyEndDate.split("/");
  
  // month is 0-based, that's why we need dataParts[1] - 1
        this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.onChangeEndDate();
      }
    }
   
    if(type=='edit'){
      if(this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
      else this.claimsYN = 'N';
      if(this.vehicleDetails?.Gpstrackinginstalled) this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
      else this.gpsYn = 'N';
      this.vehicleSI = String(this.vehicleDetails?.SumInsured);
      this.CommaFormatted();
      this.windShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
      this.WindSICommaFormatted();
      this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
      this.TppdCommaFormatted();
      this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
      this.accessoriesCommaFormatted();
      //this.getVehicleDetails(this.vehicleDetails?.Registrationnumber,this.vehicleDetails?.SavedFrom);
    }
    

  }
  onSaveUWQues(uwList,entry,type,index){

  }
  checkDisableField(){
    let status = sessionStorage.getItem('QuoteStatus');
    return ((this.adminSection && (status=='AdminRP' || status=='AdminRA')) || (this.finalizeYN=='Y'))
  }
  navigateTo(location) {
    if(location=='back'){
      if(this.tabIndex==0) this.router.navigate(['/quotation']);
      else if(this.tabIndex!=0){
        this.tabIndex-=1;
        this.getMotorDetails(this.tabIndex);
      }
      
    }
    else if(location == 'quote-plan'){
      this.policyStartError=false;this.policyEndError = false;this.currencyCodeError=false;
      this.policyPassDate = false;
      
      let i=0;
      if(this.policyStartDate==null || this.policyStartDate=='' || this.policyStartDate==undefined){
        i+=1;
        this.policyStartError = true;
      }
      else{
        let dateList = String(this.policyStartDate).split('/');
        if(dateList.length>0){
          let date = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
          var firstRepaymentDate = new Date(date);
          var today = new Date();
           if( (this.productId=='5' || this.productId=='4' || this.productId=='46' || this.productId=='29') && (firstRepaymentDate.getTime() < today.setHours(0,0,0,0))){
              i+=1;
              this.policyPassDate = true;
          }
        }
      }
      
     
      if(this.policyEndDate==null || this.policyEndDate=='' || this.policyEndDate==undefined){
        i+=1;
        this.policyEndError = true;
      }
      if(this.currencyCode==null || this.currencyCode=='' || this.currencyCode==undefined){
        i+=1;
        this.currencyCodeError = false;
      }
      if(this.issuerSection){
        if(this.Code=='' || this.Code==null || this.Code==undefined){
          i+=1;
          this.sourceCodeError = true;
        }
        else{
          if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
            if(this.customerName=='' || this.customerName==undefined || this.customerName==null){
                this.customerCodeError = true;
                i+=1;
            }
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
              this.brokerCodeError = true;
              i+=1;
            }
            if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
              this.brokerBranchCodeError = true;
              i+=1;
            }
          }
        }
      }
      if(i==0){
        let startDate=null,endDate=null;
        let startDateList = String(this.policyStartDate).split('/');
        if(startDateList.length>1) startDate = this.policyStartDate
        else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
        let endDateList = String(this.policyEndDate).split('/');
        if(endDateList.length>1) endDate = this.policyEndDate
        else endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
        let entry = {
          "policyStartDate": startDate,
          "policyEndDate": endDate,
        "currencyCode": this.currencyCode,
        "exchangeRate": this.exchangeRate,
        "promoCode": this.promocode,
        "BrokerCode": this.brokerCode,
        "SourceType": this.sourceType,
        "SourceCode":this.Code,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "BrokerBranchCode": this.brokerBranchCode,
        
      }
          sessionStorage.setItem('commonDetails',JSON.stringify(entry));
          if(this.tabIndex==0){this.tabIndex+=1;this.getMotorDetails(this.tabIndex-1)}
          else if(this.customerData.length==this.tabIndex){this.saveMotorDetails(this.tabIndex)}
          else{this.saveMotorDetails(this.tabIndex);}
      }
      // else{
      
      // }
      
    } 
  }
}
