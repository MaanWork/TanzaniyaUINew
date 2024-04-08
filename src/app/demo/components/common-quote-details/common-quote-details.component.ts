import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductData } from '../quotation/quotation-plan/models/product';
import { MotorVehicleSanlam } from '../quotation/quotation-plan/models/sanlam/MotorVehicleSanlam';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MotorVehicleEagle } from '../quotation/quotation-plan/models/Eagle/MotorVehicleEagle';
import { MotorVehicleKenya } from '../quotation/quotation-plan/models/Kenya/MotorVehicleKenya';
import { MotorVehicleTanzaniya } from '../quotation/quotation-plan/models/Tanzaniya/MotorVehicleTanzaniya';
import { MotorVehicleOromia } from '../quotation/quotation-plan/models/Oromia/MotorVehicleOromia';
import { MotorVehicleUganda } from '../quotation/quotation-plan/models/Uganda/MotorVehicleUganda';
import { MotorVehicleMadison } from '../quotation/quotation-plan/models/Madison/MotorVehicleMadison';
declare var $:any;
interface Plan {
  title:string;
  excess:number;
  totalSum:number;
  year:number;
  discount:number
}
export class ForceLengthValidators {
  static maxLength(maxLength: number) {
    return (control: FormControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }

      if (control.value.length > maxLength) {
        //force the length to 
        control.setValue(control.value.substring(0, maxLength));
      }

      return null;
    };
  }
  static min(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {

      let val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { 'min': true };
    }
  }
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
  customerFilterSuggestions:any[] = [];cityList:any[]=[];
  exchangeRate:any=null;minDate:any=null;countryId:any=null;
  sidebarVisible:boolean = false;userType:any=null;
  userDetails:any=null;loginId:any=null;branchCode:any=null;
  brokerbranchCode:any=null;productId:any=null;PackageYn:any=null;
  insuranceId:any=null;branchList:any[]=[];loginType:any=null;
  referenceNo:any=null;customerDetails:any;regNo:any=null;individualCalcIndex:any=0;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  vehicleDetails: any;customerData:any[]=[];licenseNo:any=null;
  havePromoCodeYN: any=null;typeList:any[]=[];
  noOfDays: any=null;industryList:any[]=[];
  sourceType: any=null;IndustryId:any=null;
  sourceTypeDesc: any=null;subuserType: any=null;subUrbanCode:any=null;
  brokerCode: any=null;brokerBranchCode: any=null;cityCode:any=null;
  customerCode: any=null;endorsementDate: any=null;districtList:any[]=[];
  endorsementEffectiveDate: any=null;endorsementRemarks: any=null;
  endorsementType: any=null;endorsementTypeDesc: any=null;
  endtCategoryDesc: any=null;endtCount: any=null;
  endtPrevQuoteNo: any=null;endtStatus: any=null;subUrbanList:any[]=[];
  endtPrevPolicyNo: any=null;orginalPolicyNo: any=null;
  isFinanceEndt: any=null;endorsementSection: boolean=false;
  customerName: any=null;quoteRefNo: any=null;endorsePolicyNo: any;
  finalizeYN: any='N';acExecutiveId: any=null;
  commissionType: any=null;messages: Message[] = [];
  endMinDate: Date;endMaxDate: Date;selectedCustomer:any=null;
  minCurrencyRate: any=null;licenseIssuedDate:any=null;
  maxCurrencyRate: any;typeValue:any=null;
  motorTypeList: any[]=[]; drivenBy:any="D";
  cityValue: any=null;bodyTypeValue: any=null;stateValue:any=null;
  motorUsageList: any[]=[]; borrowerList:any[]=[];motorUsageValue: any=null;
  classList: any[]=[];classValue:any=null;
  vehicleSI: any=null;accessoriesSI: any=null;windShieldSI: any=null;
  tppdSI: any=null;tiraCoverNoteNo:any=null;
  enableAddVehicle: boolean=false;stateList:any[]=[];
  endorsementYn: any=null;endorseEffectiveDate: any=null;
  collateralYN: any='N';buildingOwnerYN: any = 'N';
  borrowerValue: any=null;collateralName: any=null;
  firstLossPayee: any=null;endorseCoverModification:any=null;
  isSearchFormVisible = false;enableRemoveVehicle: boolean;
  adminSection: boolean=false;changeUwSection: boolean=false;
  uwQuestionList: any[]=[];vehicleId: string;
  applicationId: string;noOfCompPolicy: any;driverDob:any=null;
  claimRatio: any;enableFieldsSection: boolean=false;martialStatus:any=null;
  customers:any[]=[];currentIndex: number;PurchaseDate:any=null;driverName:any=null;
  collateralValue: boolean=false;fleetYN: any='';fleetValue: boolean = false;
  noOfVehicles: any=null;policyStartError: boolean=false;policyEndError: boolean=false;
  currencyCodeError: boolean=false;policyPassDate: boolean=false;customerCodeError:boolean=false;
  sourceTypeList: any[]=[];premiumList:any[]=[];modifiedYN: any='N';brokerBranchCodeError:boolean=false;
  Code: any;brokerList: any[]=[];sourceCodeDesc: any;gender:any='M';driverType:any='1';
  brokerLoginId: null;backDays: any;brokerBranchList: any[]=[];customerList:any[]=[];
  commonSection: boolean=false;showCustomerList: boolean=false;issuerSection: boolean=false;
  commissionValue: any;vehicleValue:any='';executiveValue: any;deductibleList:any[]=[];
  noOfDaysVlaue: string;sourceCodeError:boolean=false;brokerCodeError: boolean;endorsementId:any=null;
  showSectionSeltion: boolean=false;industryError:boolean=false;bankList:any[]=[];
  executiveSection: boolean=false;deductibleValue:any='';fields:any[]=[];driveExperience:any=null;
  endorsementDetails: any=null;vehicleValueList:any[]=[];inflationValue:any=null;
  currentStatus: any='Y';extendedTppdList:any[]=[];extendedTppdValue:any='';customerColumn:any[]=[];
  commonData: any=null;pACoversList:any[]=[];pACoverValue:any='';productItem:any=null;martialList:any[]=[];
  claimTypeValue: any=null;vehicleDetailsList:any[]=[];defenceCostValue:any=null;claimTypeList:any[]=[];
  vehicleClassValue: any=null;motorDetails:any=null;defencecostList:any[]=[];minDobDate:any;vehicleClassList:any[]=[];
  vehicleTypeList: any[]=[];alarmYN:any='Y';deductiblesList:any[]=[];collateralChecked:boolean=false;
  regNoError: boolean;driverOptions:any[]=[];genderOptions:any[]=[];searchValue:any=[];clearSearchSection:boolean=false;
  duplicateRegister: boolean=false;
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
    this.driverOptions = [
      {"label":'Driver',"value":'2'},
      {"label":'Owner',"value":'1'},
    ];
    this.genderOptions = [
      {"label":'Male',"value":'M'},
      {"label":'Female',"value":'F'},
    ];
    this.vehicleValueList = [
      {"Code":"","CodeDesc":"---Select---"},
      {"Code":"1","CodeDesc":"Market"},
      {"Code":"2","CodeDesc":"Agreed"},
    ];
    this.extendedTppdList = [
      {"Code":"","CodeDesc":"---Select---"},
      {"Code":"1","CodeDesc":"10,000 - 25,000"},
      {"Code":"2","CodeDesc":"25,001 - 50,000"},
      {"Code":"2","CodeDesc":"50,001 - 1,00,000"},
    ]
    this.pACoversList=[
      {"Code":"","CodeDesc":"---Select---"},
      {"Code":"1","CodeDesc":"Driver"},
      {"Code":"2","CodeDesc":"Famiy With Driver"},
      {"Code":"3","CodeDesc":"Famiy Without Driver"},
      {"Code":"4","CodeDesc":"All Occupant"}
    ]
    this.getSourceList();
    this.getCurrencyList();
    this.productItem = new ProductData();
    if(this.insuranceId=='100027'){
      let fireData = new MotorVehicleSanlam();
      this.fields[0] = fireData?.fields;
    }
    this.getBorrowerList();
    this.getBankList();
    //this.getUWDetails();
    this.getCityLimitList();
    if(this.insuranceId=='100020' || this.insuranceId=='100028'){
      if(this.insuranceId=='100020') this.getVehicleClassList();
      this.getMartialList();
      this.getStateList();
      if(this.insuranceId=='100028') this.getClaimTypeList();
    }
  }
  ngOnInit() {
    
    if(this.productId=='5'){
      this.getInsuranceTypeList();
      this.getInsuranceClassList();
    }
    else if(this.productId=='6' || this.productId=='13' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21' || this.productId=='26' || this.productId == '25' || this.productId=='57'){this.getIndustryList()}
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
    this.customerColumn = [ 'Select','Reference No','Customer Name',  'Customer Type','ID Number'];
    var d= new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.minDobDate = new Date(year - 18,month, day );
    this.years = [{label: '1 Year'}, {label: '2 Year'}];
    this.vehicles = [{label: 'Vehicle 1'}, {label: 'Vehicle 2'}];
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      this.adminSection = true;this.issuerSection = false;
    }
    else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
    else this.issuerSection = false
     this.currencyCode = this.userDetails?.Result?.CurrencyId;
     this.setCustomerValues(null);
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }
    else{
      this.showSearchForm('direct');
    }
    // let s = sessionStorage.getItem('Addnew');
    // if(s='Addnew'){
    //   console.log('Half page',s)
    //   this.showSearchForm();
    // }
    // else{
    //   console.log('End page',s)
    //   this.hideSearchForm();
    // }
  }
  getIndustryList(){
    this.industryList = [];
    let ReqObj = {
      "CategoryId": null,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
        this.industryList = defaultObj.concat(data.Result);
      },
      (err) => { },
    );
  }
  getCityLimitList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/citylimit`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.cityList = data.Result;
        }
      })
  }
  getVehicleClassList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/vehicleclasses`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleClassList = data.Result;
            if(this.vehicleClassList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.vehicleClassList.length; i++) {
                this.vehicleClassList[i].label = this.vehicleClassList[i]['CodeDesc'];
                this.vehicleClassList[i].value = this.vehicleClassList[i]['Code'];
                if (i == this.vehicleClassList.length - 1) {
                    console.log("Dropdown List",this.fields)
                    this.fields[0].fieldGroup[0].fieldGroup[10].props.options = defaultObj.concat(this.vehicleClassList);
                    
                }
              }
            }
        }
      },
      (err) => { },
    );
  }
  getMartialList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/maritalstatus`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.martialList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getStateList(){
    let ReqObj = {
      "CountryId": this.countryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/stategroups`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
              this.stateList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getClaimTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/claimtype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
              this.claimTypeList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getDistrictList(type,cityValue,subUrban){
    let ReqObj = {
      "CountryId": this.countryId,
      "StateId" : this.stateValue
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/citygroups`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.districtList = data?.Result;
            if(type=='change'){
              this.cityCode = null;
              this.subUrbanCode = null;
              this.subUrbanList = [];
            }
            else{
              this.cityCode = cityValue;
                this.getSubUrbanList('direct');
                this.subUrbanCode = subUrban;
            }
        }
      },
      (err) => { },
    );
  }
  getSubUrbanList(type){
    if(this.cityCode!=null && this.cityCode!='' && this.cityCode!=undefined){
        let entry = this.districtList.find(ele=>ele.Code == this.cityCode);
        if(entry){
          this.subUrbanList = entry?.SubUrbDetails;
          if(type=='change') this.subUrbanCode = null;
        }
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
    console.log("Search",code);
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
                if(data.Result.length!=0){
                  
                }
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
          this.brokerLoginId = name;
          this.commonSection = true;
      }
      if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.modifiedYN = 'Y'}
  }
  setCustomerValues(customerDetails){
    if(this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId=='14' || this.productId=='32'  || this.productId=='1'){
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
        this.getExistingBuildingList();
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
           if(this.productId=='5' || this.productId=='46' || this.productId=='29') this.getExistingVehiclesList('direct');
           if(this.productId!='5' && this.productId!='4' && this.productId!='46' && this.productId!='29') this.getExistingBuildingList();
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
         if(this.productId=='5' || this.productId=='46' || this.productId=='29') this.getExistingVehiclesList('direct');
         if(this.productId!='5' && this.productId!='4' && this.productId!='46' && this.productId!='29') this.getExistingBuildingList();
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
  getExistingBuildingList(){
    let urlLink:any;
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "RiskId":"1",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    //if(this.productId=='3') urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='13'  || this.productId=='19' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId=='21' || this.productId == '25' || this.productId=='42' || this.productId=='3' || this.productId=='24') urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
    else urlLink =  `${this.motorApiUrl}api/geteservicebyriskid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.commonData = data.Result;
              let entry:any;
              //if(this.productId=='3') entry = this.vehicleDetailsList[0];
               entry = this.commonData
               if(entry?.FinalizeYn!=null){
                this.finalizeYN== entry?.FinalizeYn;
                sessionStorage.setItem('FinalizeYN',this.finalizeYN);
               }
               else this.finalizeYN='N';
                if(entry?.EndorsementDate!=null){
                  this.endorsementDetails['EndorsementDate'] = entry?.EndorsementDate;
                  this.endorsementDetails['EndorsementEffectiveDate'] = entry?.EndorsementEffectiveDate;
                  this.endorsementDetails['EndorsementRemarks'] = entry?.EndorsementRemarks;
                  this.endorsementDetails['EndorsementType'] = entry?.EndorsementType;
                  this.endorsementDetails['EndorsementTypeDesc'] = entry?.EndorsementTypeDesc;
                  this.endorsementDetails['EndtCategoryDesc'] = entry?.EndtCategoryDesc;
                  this.endorsementDetails['EndtCount'] = entry?.EndtCount;
                  this.endorsementDetails['EndtPrevPolicyNo'] = entry?.EndtPrevPolicyNo;
                  this.endorsementDetails['EndtPrevQuoteNo'] = entry?.EndtPrevQuoteNo;
                  this.endorsementDetails['EndtStatus'] = entry?.EndtStatus;
                  this.endorsementDetails['IsFinanceEndt'] = entry?.IsFinanceEndt;
                  this.endorsementDetails['OrginalPolicyNo'] = entry?.OrginalPolicyNo;
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(this.endorsementDetails));
                }
              this.applicationId = entry.ApplicationId;
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
              //this.executiveValue = entry?.AcExecutiveId;
              this.currencyCode = entry?.Currency;
              this.onCurrencyChange('direct');
              this.exchangeRate = entry?.ExchangeRate;
              this.IndustryId = entry?.IndustryId;
              this.executiveValue= entry?.AcExecutiveId;
              this.havePromoCodeYN=entry?.Havepromocode;
              if(entry.BuildingOwnerYn!=null && entry?.BuildingOwnerYn!='') this.buildingOwnerYN = entry?.BuildingOwnerYn;
              this.promocode=entry?.Promocode;
              if(entry.SourceTypeId!=null) this.Code = entry?.SourceTypeId;
              this.branchCode = entry?.BranchCode;
              this.brokerBranchCode = entry?.BrokerBranchCode;
              this.customerCode = entry?.CustomerCode;
              this.brokerCode = entry?.BrokerCode;
              this.currentStatus = entry?.Status;
              this.onSourceTypeChange('direct');
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                this.adminSection = true;this.issuerSection = false;
              }
              else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
              else this.issuerSection = false
            }
            console.log(
              "Code",this.Code,this.branchCode,this.brokerBranchCode,this.customerCode,this.brokerCode
            )
            //this.onGetCustomerList('direct',this.customerCode);
          
      },
      (err) => { },
    );
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
    this.vehicleDetailsList = [];
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
          if(vehicle.Active){  this.vehicleDetailsList.push(vehicle); }
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
            if(this.typeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.typeList.length; i++) {
                this.typeList[i].label = this.typeList[i]['CodeDesc'];
                this.typeList[i].value = this.typeList[i]['Code'];
                if (i == this.typeList.length - 1) {
                  if(this.fields.length!=0)  this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.typeList);
                    
                }
              }
            }
        }

      },
      (err) => { },
    );
  }
  getType1(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEDUCTIBLES"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.deductiblesList = data.Result;
            if(this.deductiblesList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.deductiblesList.length; i++) {
                this.deductiblesList[i].label = this.deductiblesList[i]['CodeDesc'];
                this.deductiblesList[i].value = this.deductiblesList[i]['Code'];
                if (i == this.deductiblesList.length - 1) {
                    console.log("Dropdown List",this.fields)
                    this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.deductiblesList);
                }
              }
            }
        }
      },
      (err) => { },
    );
  }

  getType2(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "DEFENCE_COST"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.defencecostList = data.Result;
            if(this.defencecostList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.defencecostList.length; i++) {
                this.defencecostList[i].label = this.defencecostList[i]['CodeDesc'];
                this.defencecostList[i].value = this.defencecostList[i]['Code'];
                if (i == this.defencecostList.length - 1) {
                  let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='DefenceCost'){
                        field.props.options = defaultObj.concat(this.defencecostList);
                      }
                    }
                }
              }
              // if(this.extendedTppdList.length!=0){
              //   for (let i = 0; i < this.extendedTppdList.length; i++) {
              //     this.extendedTppdList[i].label = this.extendedTppdList[i]['CodeDesc'];
              //     this.extendedTppdList[i].value = this.extendedTppdList[i]['Code'];
              //     if (i == this.extendedTppdList.length - 1) {
              //         console.log("Dropdown List",this.fields)
              //         this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.extendedTppdList);
              //     }
              //   }
              // }
            }
        }
      },
      (err) => { },
    );
  }

  getType3(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ItemType": "VEHICLE_VALUE_TYPE"
    }
    let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleTypeList = data.Result; 
            if(this.vehicleTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.vehicleTypeList.length; i++) {
                this.vehicleTypeList[i].label = this.vehicleTypeList[i]['CodeDesc'];
                this.vehicleTypeList[i].value = this.vehicleTypeList[i]['Code'];
                if (i == this.vehicleTypeList.length - 1) {
                    console.log("Dropdown List",this.fields)
                    this.fields[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.vehicleTypeList);
                }
              }
            }
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
      loginId=this.loginId
        if(this.vehicleDetailsList.length!=0) loginId = this.vehicleDetailsList[0].LoginId;
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
            if(this.insuranceId!='100027'){
              if(this.classList.length!=0){
                let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
                for (let i = 0; i < this.classList.length; i++) {
                  this.classList[i].label = this.classList[i]['CodeDesc'];
                  this.classList[i].value = this.classList[i]['Code'];
                  if (i == this.classList.length-1) {
                   
                      console.log("Dropdown List",this.fields)
                      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004'){
                        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fieldList){
                          console.log('Field ',field)
                          if(field.key=='InsuranceClass'){
                                field.props.options= defaultObj.concat(this.classList);;
                          }
                        }
                      }
                  }
                }
              }
            }
            
        }
      },
      (err) => { },
    );
  }
  onChangeClassType(){
    this.vehicleSI ="0";this.accessoriesSI="0",this.windShieldSI="0";this.tppdSI = "0";
  }
  getMotorTypeList(type,motorValue,vehicleUsage){
    if(this.insuranceId=='100027' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.typeValue=='100020') this.typeValue = this.productItem.InsuranceType;
    let typeValue = null;
    if(this.insuranceId!='100028') typeValue = null;
    else{
     if(Array.isArray(this.typeValue)) typeValue = null;
     else typeValue = this.typeValue;
    } 
    let ReqObj = {
      "SectionId": typeValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(type=='change'){
            this.cityValue = null;
            if(this.insuranceId=='100027' || this.insuranceId=='100028'){
              this.productItem.InsuranceClass = this.productItem?.InsuranceType
              this.classValue = this.typeValue;
            } 
          } 
            this.motorTypeList = data.Result;
            
            if(type=='direct'){ this.bodyTypeValue = motorValue; this.productItem.BodyType = motorValue}
            else if(this.insuranceId!='100027') this.bodyTypeValue = motorValue;
            if(this.vehicleDetails && this.motorTypeList.length!=0 && this.bodyTypeValue==null){
              let value = this.motorTypeList.find(ele=>ele.Code == this.vehicleDetails?.VehicleType);
              if(value){ this.bodyTypeValue = value.Code;}
            }
            this.getMotorUsageList(vehicleUsage);
            if(this.motorTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorTypeList.length; i++) {
                this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
                this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
                if (i == this.motorTypeList.length - 1) {
                  if(this.insuranceId=='100027' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020'){
                    console.log(this.fields);
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
                        if(this.insuranceId=='100027'){
                          if(this.productItem.InsuranceType=='102' || this.productItem.InsuranceType=='95'){
                            field.hideExpression = true;field.hide=true;
                          }
                          else{field.hideExpression = false;field.hide=false;}
                        }
                        else if(this.insuranceId=='100028'){
                          if(this.vehicleDetailsList.length==1){
                            field.hideExpression = false;field.hide=false;
                          }
                          else if(this.productItem.InsuranceType=='104'){
                              field.hideExpression = false;field.hide=false;
                          }
                          else{field.hideExpression = true;field.hide=true;}
                        }
                      }
                      if(field.key=='BodyType'){
                        field.props.options = defaultObj.concat(this.motorTypeList);
                      }
                    }
                  }
                    //this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.motorTypeList);
                    
                }
              }
            }
            
            
        }

      },
      (err) => { },
    );
  }
  onChangeBodyType(){
    if(this.bodyTypeValue=='7') this.cityValue='';
  }
  getMotorUsageList(vehicleValue){
    let sectionId = null;
    this.motorUsageList =[];
    if(this.insuranceId=='100027') sectionId='91';
    else{
      if(Array.isArray(this.productItem?.InsuranceType)) sectionId = null;
     else sectionId = this.productItem?.InsuranceType;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SectionId": sectionId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            if(this.motorUsageList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorUsageList.length; i++) {
                this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
                this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
                if (i == this.motorUsageList.length - 1) {
                        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fieldList){
                          if(field.key=='MotorUsage'){
                                field.props.options= defaultObj.concat(this.motorUsageList);
                          }
                        }
                }
              }
            }
            this.motorUsageValue = vehicleValue;
            if(this.insuranceId!='100028') this.productItem.MotorUsage = vehicleValue;
            if(this.vehicleDetails && this.motorUsageList.length!=0 && this.motorUsageValue==null){
              let value = this.motorUsageList.find(ele=>ele.CodeDesc == this.vehicleDetails?.Motorusage || ele.Code==this.vehicleDetails?.Motorusage);
              if(value){ this.motorUsageValue = value.Code;this.productItem.MotorUsage = value.Code;}
              else this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
              
            }
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
  onDelete(rowData){
    if(rowData.Active){
      Swal.fire({
          title: '<strong> &nbsp;Delete Vehicle!</strong>',
          iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            Are You Sure Want to Delete this Vehicle Details?
        </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Delete!',
      })
      .then((result) => {
        if (result.isConfirmed) {
              this.proceedDeleteVehicle(rowData);
        }
      });
    }
  }
  proceedDeleteVehicle(rowData){
    let endtType = null;
    if(this.endorsementSection){
      endtType = this.endorsementId
    }
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "Vehicleid": rowData.Vehicleid,
      "EndtType": endtType
    }
    let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
             if(this.endorsementSection){
              Swal.fire({
                title: '<strong> &nbsp;Delete Vehicle!</strong>',
                iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
                icon: 'success',
                html:
                  `<ul class="list-group errorlist">
                      Your Vehicle Delete Entry Stored Successfully,Proceed Further to Confirm
                  </ul>`,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton:false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Okay',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    
                    this.getExistingVehiclesList('delete');
                  }
                });
             }
             else{
              
              this.getExistingVehiclesList('delete');
             }
        }
      },
      (err) => { },
    );
  }
  EditData(rowData){
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
      sessionStorage.setItem('editVehicleId',String(this.vehicleDetailsList.length+1));
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
      console.log("Row Data",rowData)
      sessionStorage.setItem('EditCarDetails',JSON.stringify(rowData));
      sessionStorage.setItem('vehicleLength',String(rowData.Vehicleid))
      sessionStorage.setItem('Editcars','SavedFroms');
      sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));
      this.router.navigate(['/quotation/plan/motor-details'])
    }
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
      if(this.vehicleDetailsList.length!=0){
        for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
  }
  getBorrowerList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/borrowertype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.borrowerList = data.Result;
           
        }

      },
      (err) => { },
    );
  }
  getBankList(){
    let branchCode = '';
    if(this.adminSection || (this.userType!='Broker' && this.userType!='User')){
      branchCode = this.branchCode
    }
    else{
      branchCode = this.brokerbranchCode
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bankList = data.Result;
           
        }

      },
      (err) => { },
    );
  }
  onCommonDetailsChange(){
   if(this.vehicleDetailsList.length!=0){
      for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
    }
  }
  onChangeCustomer(value){
    console.log("Entry",value);
    this.customerCode=value?.CustomerCode;
    if(this.customerCode!=null){
      let entry = this.customerList.find(ele=>ele.CustomerCode==this.customerCode);
      this.customerName = entry?.CustomerName;
      console.log("Entry",entry);
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
          console.log('customerDatacustomerDatacustomerData',this.vehicleDetailsList)
        }

      });
  }
  onTabClicked(event){
    let index = event.index;
    this.tabIndex = index;
    if(index!=0){
      this.productItem = new ProductData();
      this.driverName = null;this.driverType='1';this.gender='M';this.licenseNo=null;
      this.driverDob=null;this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
      this.claimTypeValue=null;
      
      this.getMotorDetails(index-1);
    }

    console.log('Tab event',event);
  }
  checMandatories(){
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
        this.sourceCodeError = false;
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
    if(this.productId=='6' || this.productId=='13' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21' || this.productId=='26' || this.productId == '25' || this.productId=='57'){
      if(this.IndustryId=='' || this.IndustryId==null || this.IndustryId==undefined){
        i+=1;
        this.industryError = true;
      }
      else this.industryError=false;
    }
   
      return i==0;

  }
  getMotorDetails(index){
        let vehicleDetails = this.vehicleDetailsList[index];
        this.vehicleId = vehicleDetails?.Vehicleid;
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
              this.tabIndex = index+1;
              if(this.vehicleDetails.Grossweight) this.vehicleDetails.Grossweight = String(this.vehicleDetails.Grossweight)
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
                if(this.insuranceId!='100004') this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
                else{this.motorUsageValue=this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct');}
                this.bodyTypeValue = this.vehicleDetails?.VehicleType;
                this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
                this.motorUsageValue = this.vehicleDetails?.Motorusage;
                this.collateralYN = this.vehicleDetails?.CollateralYn;
                if(this.collateralYN=='Y') this.collateralValue = true;
                else this.collateralValue = false;
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
                
                this.setVehicleValues('direct');
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
            if(this.motorTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorTypeList.length; i++) {
                this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
                this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
                if (i == this.motorTypeList.length - 1) {
                    if(this.insuranceId!='100004') this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.motorTypeList);
                    else this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.motorTypeList);
                }
              }
            }
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
      if(this.vehicleDetailsList.length!=0){
        for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
  }
  onCollateralChange(){
    if(this.collateralValue) this.collateralYN = "Y";
    else this.collateralYN = "N";
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
    let entry = this.checMandatories()
    this.regNoError = false;
    if(this.regNo==null || this.regNo==undefined || this.regNo=='') this.regNoError = true;
    if(!this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo)){
      if(this.regNo!=null && this.regNo!=undefined && this.regNo!='' && entry){
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
                if(this.vehicleDetailsList.length!=0){
                    let entry = this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo);
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
    else{
      this.duplicateRegister = true;
      setTimeout(() => 
        {
         this.duplicateRegister = false;
      }, (4*1000));
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
          loginId=this.brokerLoginId;
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
      this.vehicleDetails['Vehicleid'] = String(this.vehicleDetailsList.length+1)
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      if(this.endorsementSection){
        let entry = this.vehicleDetailsList.filter(ele=>ele?.EndorsementDate!=undefined)
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
          let dateList = String(this.policyStartDate).split('/');
          if(dateList.length>1) startDate = this.policyStartDate;
          else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
      if(this.policyEndDate!=null && this.policyEndDate!='' && this.policyEndDate!=undefined){
        let dateList = String(this.policyEndDate).split('/');
        if(dateList.length>1) endDate = this.policyEndDate;
        else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
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
      "PolicyRenewalYn": 'N',
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
            if(data.Result?.length!=0){
              // let entry = this.vehicleDetailsList[this.currentIndex-1];
              // entry['PolicyEndDate'] = endDate;
              // entry['PolicyStartDate'] = startDate;
                this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
                this.regNo = null;
                this.tabIndex = 0;
                this.getExistingVehiclesList('saveSearch');
            }
            // else if(data.Result){
            // this.quoteRefNo = data?.Result?.RequestReferenceNo;
            //   sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
            //   this.vehicleDetails = null;
            //   this.regNo=null;
              
            //   this.getExistingVehiclesList();
            // }
          }
        },
        (err) => { },
      );
  }
  getExistingVehiclesList(type){
    this.vehicleDetailsList = [];
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          
            this.vehicleDetailsList = data.Result;
            if(this.vehicleDetailsList.length!=0){
              if(this.vehicleDetailsList[0]?.FinalizeYn!=null){
                this.finalizeYN = this.vehicleDetailsList[0]?.FinalizeYn;
                sessionStorage.setItem('FinalizeYN',this.vehicleDetailsList[0]?.FinalizeYn)
              }
              else this.finalizeYN = 'N';
              //this.updateComponent.CurrencyCode = this.vehicleDetailsList[0].Currency;
              this.currencyCode = this.vehicleDetailsList[0].Currency;
              this.exchangeRate = this.vehicleDetailsList[0].ExchangeRate;
              let entry = this.vehicleDetailsList.find(ele=>ele.Status!='D');
              if(entry){
                this.policyStartDate =entry.PolicyStartDate;
                this.policyEndDate = entry.PolicyEndDate;
              }
              
              this.havePromoCodeYN = this.vehicleDetailsList[0].HavePromoCode;
              this.promocode = this.vehicleDetailsList[0].PromoCode;
              this.acExecutiveId = this.vehicleDetailsList[0].AcExecutiveId;
              this.commissionType = this.vehicleDetailsList[0].CommissionType;
              //this.updateComponent.setCommonValues(this.vehicleDetailsList[0]);
              for(let veh of this.vehicleDetailsList){
                veh['Active'] = true;
              }
              this.getInsuranceClassList();
              if(type=='direct'){
                this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                if(this.vehicleId==null || this.vehicleId==undefined || this.vehicleId=='') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                this.getEditVehicleDetails(this.vehicleId,'direct')
                this.currentIndex = 1;
              }
              else if(type=='saveSearch'){
                
                //this.tabIndex = this.vehicleDetailsList.length;
                this.vehicleId = this.vehicleDetailsList[this.vehicleDetailsList.length-1].Vehicleid;
                if(this.vehicleId==null || this.vehicleId==undefined || this.vehicleId=='') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                  this.getEditVehicleDetails(this.vehicleId,'direct')
                 this.currentIndex = 1;
              }
              else if(type=='delete'){
                if(this.vehicleDetailsList.length!=0){
                  this.tabIndex =0;
                  this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
                  this.getEditVehicleDetails(this.vehicleId,'direct')
                  this.currentIndex = 1;
                }
              }
              
            }
        }
      },
      (err) => { },
    );
  }
  checActiveIndex(){
    return Number(this.tabIndex);
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
              if(String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
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
              if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
              else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        
        let appId = "1",loginId="",brokerbranchCode="";
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
            createdBy = this.vehicleDetailsList[0].CreatedBy;
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
            loginId = this.vehicleDetails?.LoginId;
            brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
          //   brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
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
          let deductibles = null;
        if(this.productItem.Deductibles!='' && this.productItem.Deductibles!=undefined) deductibles = this.productItem.Deductibles;
        let insuranceType = [];
        if(this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
            //if(this.typeValue==null || this.typeValue==undefined){
              for(let entry of this.typeList){
                insuranceType.push(entry.Code);
              }
            // }
            // else insuranceType.push(this.typeValue)
        }
        else{
          if(this.typeValue==null || this.typeValue==undefined){

          }
          else{
            if(this.insuranceId=='100004'){this.productItem.InsuranceType = this.productItem.InsuranceClass;}
            if(Array.isArray(this.productItem.InsuranceType)) insuranceType = this.productItem.InsuranceType;
            else insuranceType.push(this.productItem.InsuranceType);
          }
        }
        if(this.insuranceId=='100027' || this.insuranceId=='100028'){
          if(Array.isArray(insuranceType)){
            if(insuranceType.length!=0) this.productItem.InsuranceClass = insuranceType[0];
          }
          else this.productItem.InsuranceClass = insuranceType
          this.classValue = this.typeValue;
        } 
        let PurchaseDate= null;
        if(this.productItem.PurchaseDate!=null && this.productItem.PurchaseDate!='' && this.productItem.PurchaseDate!=undefined){
         if(String(this.productItem.PurchaseDate).includes('/')){
            PurchaseDate = this.productItem.PurchaseDate;
          }
          else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate,'dd/MM/yyyy');
        }
          let ReqObj = {
            "ExcessLimit": null,
            "Deductibles": deductibles,
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
            "VehicleId": this.vehicleId,
            "AcccessoriesSumInsured": this.productItem.AccessoriesSI,
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
            "Insurancetype": insuranceType,
            "InsuranceId": this.insuranceId,
            "InsuranceClass": this.productItem.InsuranceClass,
            "InsurerSettlement": "",
            "InterestedCompanyDetails": "",
            "ManufactureYear": this.vehicleDetails?.ManufactureYear,
            "ModelNumber": null,
            "MotorCategory": this.vehicleDetails?.MotorCategory,
            "Motorusage": this.productItem.MotorUsage,
            "NcdYn": this.productItem.ClaimsYN,
            "PolicyRenewalYn": this.productItem.RenewalYn,
            "NoOfClaims": null,
            "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
            "BranchCode": this.branchCode,
            "AgencyCode": this.agencyCode,
            "ProductId": this.productId,
            "SectionId": this.productItem.InsuranceType,
            "PolicyType": IdType,
            "RadioOrCasseteplayer": null,
            "RegistrationYear": regYear,
            "Registrationnumber": this.vehicleDetails?.Registrationnumber,
            "RoofRack": null,
            "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
            "SourceTypeId":this.sourceType,
            "SpotFogLamp": null,
            "Stickerno": null,
            "SumInsured": this.productItem.VehicleSI,
            "Tareweight": this.vehicleDetails?.Tareweight,
            "TppdFreeLimit": null,
            "TppdIncreaeLimit": this.productItem.ExtendedTPPDSI,
            "TrailerDetails": null,
            "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
            "VehicleType": this.productItem.BodyType,
            "Vehiclemake": this.vehicleDetails?.Vehiclemake,
            "WindScreenSumInsured": this.productItem.WindShieldSI,
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
            "SavedFrom": this.motorDetails?.SavedFrom,
            "UserType": this.userType,
            "TiraCoverNoteNo": this.productItem.TiraCoverNoteNo,
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
            "ClaimType": this.claimTypeValue,
            "VehicleValueType": this.productItem.VehicleValue,
            "Inflation": this.productItem.Inflation,
            "Ncb":"0",
            "DefenceValue":this.productItem.DefenceCost,
            "PurchaseDate":PurchaseDate,
            "RegistrationDate": this.vehicleDetails?.RegistrationDate,
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
            // if(this.PurchaseDate!=null){
            //   ReqObj['PurchaseDate'] = this.datePipe.transform(this.PurchaseDate, "dd/MM/yyyy");
            // }
            // else{
            //   ReqObj['PurchaseDate'] = '';
            // }
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
            if(this.insuranceId=='100020' || this.insuranceId=='100028'){
              let dob = null,licenseDate=null,quoteNo = null;
              if(this.licenseIssuedDate!=null && this.licenseIssuedDate!='' && this.licenseIssuedDate!=undefined){
                licenseDate = this.datePipe.transform(this.licenseIssuedDate, "dd/MM/yyyy");
              }
              if(this.driverDob!=null && this.driverDob!='' && this.driverDob!=undefined){
                dob = this.datePipe.transform(this.driverDob, "dd/MM/yyyy");
              }
              if(sessionStorage.getItem('quoteNo')) quoteNo = sessionStorage.getItem('quoteNo');
              let areaGroup=null; 
              if(this.subUrbanCode!=null && this.subUrbanCode!='' && this.subUrbanCode!=undefined){
                areaGroup = this.districtList.find(ele=>ele.Code==this.subUrbanCode)?.AreaGroup;
              }
              if(this.insuranceId=='100028'){this.stateValue=null;this.cityCode=null;this.subUrbanCode=null; areaGroup=null;}
                ReqObj['DriverDetails']={
                  'DriverName':this.driverName,
                  'DriverType':this.driverType,
                  'Gender' : this.gender,
                  'LicenseNo' :this.licenseNo,
                  'MaritalStatus' : this.martialStatus,
                  'CountryId':this.countryId,
                  'StateId':this.stateValue,
                  'CityId':this.cityCode,
                  'AreaGroup' : areaGroup,
                  "SuburbId": this.subUrbanCode,
                  'DriverExperience' : this.driveExperience,
                  "CreatedBy": createdBy,
                  "DriverDob": dob,
                  "QuoteNo": quoteNo,
                  "RequestReferenceNo": this.quoteRefNo,
                  "RiskId": this.vehicleId,
                  "InsuranceId": this.insuranceId,
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
                  "VehicleValueType": this.productItem.VehicleValue,
                  "Inflation": this.productItem.Inflation,
                  "Ncb":"0",
                  "DefenceValue":this.productItem.DefenceCost,
                  "PurchaseDate":this.productItem.PurchaseDate,
                  "RegistrationDate": this.vehicleDetails?.RegistrationDate,
                  "ExcessLimit": null,
                  "Deductibles": deductibles,
              }
            }
            else ReqObj['DriverDetails'] = null;
            if(this.insuranceId=='100019') ReqObj['CarAlarmYn'] = this.alarmYN;
            if(this.insuranceId=='100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass
          let urlLink = `${this.motorApiUrl}api/savemotordetails`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              if(data.ErrorMessage.length!=0){
                if(res.ErrorMessage){
                }
              }
              else{
                if(data.Result?.length!=0){
                  let entry = this.vehicleDetailsList[index-1];
                  entry['PolicyEndDate'] = endDate;
                  entry['PolicyStartDate'] = startDate;
                  this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                    sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
                  let i=0;this.individualCalcIndex=0;
                  for(let veh of data.Result){
                    entry['MSRefNo'] = data?.Result[0].MSRefNo;
                    entry['VdRefNo'] = data?.Result[0].VdRefNo;
                    entry['CdRefNo'] = data?.Result[0].CdRefNo;
                    entry['Active'] = true;
                    entry['VehicleId'] = data.Result[0].VehicleId;
                    this.onCalculateVehDetails(veh,'proceedSave',i,data.Result.length,insuranceType.length);
                    i+=1;
                  }
                }
               
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
              createdBy = this.vehicleDetailsList[0].CreatedBy;
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
              "DdRefNo": vehicleDetails?.DdRefNo,
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
                if(index==this.vehicleDetailsList.length-1){
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
    for(let veh of this.vehicleDetailsList){
      let refNo = veh?.MSRefNo;
      if(((refNo==undefined && (veh.modifiedYN=='Y' || this.quoteRefNo==null || this.quoteRefNo==undefined || this.endorsementSection || this.changeUwSection)) && (this.finalizeYN!='Y'))){
        i+=1;
      }
      j+=1;
      if(j==this.vehicleDetailsList.length){
        console.log("Final I",i,this.vehicleDetailsList)
        if(i==0){
          sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));
          // if(this.uwQuestionList.length!=0){
          //   let i = 0;
          //   let uwList:any[]=new Array();
          //   for(let ques of this.uwQuestionList){
          //     ques['BranchCode'] = this.branchCode;
          //     let createdBy="";
          //       let quoteStatus = sessionStorage.getItem('QuoteStatus');
          //       if(quoteStatus=='AdminRP'){
          //           createdBy = this.vehicleDetailsList[0].CreatedBy;
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
            if(this.tabIndex!=this.vehicleDetailsList.length){
               this.tabIndex+=1;
               this.getMotorDetails(this.tabIndex-1);
            }
            else {
              this.router.navigate(['/quotation/plan/premium-details']);
            }
            
          //}
          
        }
        else{
          this.saveExistData();
        }
      }
    }
  }
  
  customerSearch(event) {
    this.customerFilterSuggestions = [{'name':'Customer 1'}, {'name':'Customer 2'}];
  }
  saveExistData(){
    let i = 0,calcIndex=0;
    for(let veh of this.vehicleDetailsList){
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
                  createdBy = this.vehicleDetailsList[0].CreatedBy;
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
                brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                  createdBy = this.vehicleDetailsList[0].CreatedBy;
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
                  if(this.vehicleDetailsList.length!=0){
                    loginId = this.vehicleDetailsList[0].LoginId;
                    brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                  }
                  else{
                    loginId = this.brokerLoginId;
                    brokerbranchCode = this.branchCode;
                  }
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
              "PolicyRenewalYn": vehicleDetails?.PolicyRenewalYn,
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
                              createdBy = this.vehicleDetailsList[0].CreatedBy;
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
        // if(i==this.vehicleDetailsList.length) this.onFinalProceed();
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
                this.brokerCode = null;
                this.brokerBranchCode = null;
                this.brokerLoginId = null;
                i+=1;
            }
            
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
      sessionStorage.setItem('editVehicleId',String(this.vehicleDetailsList.length+1));
      sessionStorage.removeItem('EditCarDetails');
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
      sessionStorage.setItem('vehicleLength',String(this.vehicleDetailsList.length+1))
      sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));
      this.router.navigate(['/quotation/plan/motor-details'])
    }
  }
  showSidebar() {
    this.sidebarVisible = true;
  }

  showSearchForm(type) {
    if(type=='direct'){
      sessionStorage.removeItem('QuoteStatus');
      sessionStorage.removeItem('vehicleDetailsList');
      sessionStorage.removeItem('customerReferenceNo');
      sessionStorage.removeItem('quoteReferenceNo');
      sessionStorage.removeItem('TravelQuoteRefNo')
      sessionStorage.removeItem('endorsePolicyNo');
    }
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
            this.searchValue = [];
            this.clearSearchSection = false;
            this.isSearchFormVisible = true;
        }
      });
  }
  hideSearchForm() {
    if(this.customerDetails==null || this.customerDetails==undefined){
      this.isSearchFormVisible = true;
    }
    else{
      this.isSearchFormVisible = false;
      this.selectedCustomer=null;
    }
  }
  onSelectCustomer(rowData){
    this.selectedCustomer = rowData.CustomerReferenceNo;
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
  }
  onCreateCustomer(){
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('endorsePolicyNo');
    this.router.navigate(['/customer/create'])
  }
  navigateToCustomerDetail() {
    sessionStorage.setItem('customerReferenceNo',this.selectedCustomer);
 this.isSearchFormVisible = false;
 this.getCustomerDetails(this.selectedCustomer);
    // this.router.navigate(['/policyDetails']);
  }
  checkActiveVehicles(){
    if(this.vehicleDetailsList.length==0) return false;
    else if(this.vehicleDetailsList.length==1) { return true;}
    else {
      var exist=this.vehicleDetailsList.some(ele=>ele?.MSRefNo==undefined || ele?.MSRefNo==null);
      console.log("Final Entry ",exist)
      return !exist;
    }

  }
  onProceed(type){
    
    if(this.checkDisableField()){
      
      this.router.navigate(['/quotation/plan/premium-details']);
    }
    else if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList.length==1 && this.finalizeYN!='Y'){
        this.onFormSubmit('proceedSave');
      }
      else{
        if(type=='save'){ this.onFormSubmit('proceedSave');}
        else this.onFinalProceed();
      }
    }
  }
  onFormSubmit(type){
    sessionStorage.removeItem('loadingType');
    this.currentIndex = 1;
    if(this.finalizeYN!='Y'){
      if(this.checkDisableField()){
        if(this.currentIndex<this.vehicleDetailsList.length){
          this.collateralYN = "N";
          if(this.collateralYN=='Y') this.collateralValue = true;
          else this.collateralValue = false;
          this.currentIndex = this.currentIndex+1;
            if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
              if(this.endorsementSection && this.enableAddVehicle){
                if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
                  if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                  else{ this.enableFieldsSection = false; }
                }
                else this.enableFieldsSection = false;
              } 
              this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
              this.getEditVehicleDetails(this.vehicleId,'direct');
              this.vehicleDetailsList.length = this.vehicleDetailsList.length;
            }
            else{
                
              this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              if(this.endorsementSection && this.enableAddVehicle){
                if(this.vehicleDetails?.EndorsementYn){
                  if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                  else this.enableFieldsSection = false;
                }
              } 
              this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              this.vehicleDetailsList.length = this.vehicleDetailsList.length;
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
        this.vehicleId = this.vehicleDetails?.Vehicleid;
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
            let dateList = String(this.policyStartDate).split('/');
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
            let dateList = String(this.policyEndDate).split('/');
            if(dateList.length==1)  endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            else endDate = this.policyEndDate;
          }
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        this.subuserType = sessionStorage.getItem('typeValue');
        console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.brokerCode,this.customerCode);
        
        let appId = "1",loginId="",brokerbranchCode="";
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
            createdBy = this.vehicleDetailsList[0].CreatedBy;
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
            loginId = this.vehicleDetails?.LoginId;
            brokerbranchCode = this.vehicleDetails?.BrokerBranchCode;
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
          let deductibles = null;
          if(this.productItem.Deductibles!='' && this.productItem.Deductibles!=undefined) deductibles = this.productItem.Deductibles;
          let insuranceType = [];
          if(this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
              //if(this.typeValue==null || this.typeValue==undefined){
                for(let entry of this.typeList){
                  insuranceType.push(entry.Code);
                }
              // }
              // else insuranceType.push(this.typeValue)
          }
          else{
            if(this.typeValue==null || this.typeValue==undefined){

            }
            else{
              if(this.insuranceId=='100004'){this.productItem.InsuranceType = this.productItem.InsuranceClass;}
              if(Array.isArray(this.productItem.InsuranceType)) insuranceType = this.productItem.InsuranceType;
              else insuranceType.push(this.productItem.InsuranceType);
            }
          }
          if(this.insuranceId=='100027' || this.insuranceId=='100028'){
            if(Array.isArray(insuranceType)){
              if(insuranceType.length!=0) this.productItem.InsuranceClass = insuranceType[0];
            }
            else this.productItem.InsuranceClass = insuranceType
            this.classValue = this.typeValue;
          }
          let PurchaseDate= null;
          if(this.productItem.PurchaseDate!=null && this.productItem.PurchaseDate!='' && this.productItem.PurchaseDate!=undefined){
            if(String(this.productItem.PurchaseDate).includes('/')){
              PurchaseDate = this.productItem.PurchaseDate;
            }
            else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate,'dd/MM/yyyy');
          }
          let ReqObj = {
            "ExcessLimit": null,
            "Deductibles": deductibles,
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
            "VehicleId": this.vehicleId,
            "AcccessoriesSumInsured": this.productItem.AccessoriesSI,
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
            "Insurancetype": insuranceType,
            "InsuranceId": this.insuranceId,
            "InsuranceClass": this.productItem.InsuranceClass,
            "InsurerSettlement": "",
            "InterestedCompanyDetails": "",
            "ManufactureYear": this.vehicleDetails?.ManufactureYear,
            "ModelNumber": null,
            "MotorCategory": this.vehicleDetails?.MotorCategory,
            "Motorusage": this.productItem.MotorUsage,
            "NcdYn": this.productItem.ClaimsYN,
            "PolicyRenewalYn": this.productItem.RenewalYn,
            "NoOfClaims": null,
            "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
            "BranchCode": this.branchCode,
            "AgencyCode": this.agencyCode,
            "ProductId": this.productId,
            "SectionId": this.productItem.InsuranceType,
            "PolicyType": IdType,
            "RadioOrCasseteplayer": null,
            "RegistrationYear": regYear,
            "Registrationnumber": this.vehicleDetails?.Registrationnumber,
            "RoofRack": null,
            "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
            "SourceTypeId":this.sourceType,
            "SpotFogLamp": null,
            "Stickerno": null,
            "SumInsured": this.productItem.VehicleSI,
            "Tareweight": this.vehicleDetails?.Tareweight,
            "TppdFreeLimit": null,
            "TppdIncreaeLimit": this.productItem.ExtendedTPPDSI,
            "TrailerDetails": null,
            "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
            "VehicleType": this.productItem.BodyType,
            "Vehiclemake": this.vehicleDetails?.Vehiclemake,
            "WindScreenSumInsured": this.productItem.WindShieldSI,
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
            "SavedFrom": this.motorDetails?.SavedFrom,
            "UserType": this.userType,
            "TiraCoverNoteNo": this.productItem.TiraCoverNoteNo,
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
            "ClaimType": this.claimTypeValue,
            "VehicleValueType": this.productItem.VehicleValue,
            "Inflation": this.productItem.Inflation,
            "Ncb":"0",
            "DefenceValue":this.productItem.DefenceCost,
            "PurchaseDate":PurchaseDate,
            "RegistrationDate": this.vehicleDetails?.RegistrationDate,
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
            // if(this.PurchaseDate!=null){
            //   ReqObj['PurchaseDate'] = this.datePipe.transform(this.PurchaseDate, "dd/MM/yyyy");
            // }
            // else{
            //   ReqObj['PurchaseDate'] = '';
            // }
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
            if(this.insuranceId=='100020' || this.insuranceId=='100028'){
              let dob = null,licenseDate=null,quoteNo = null;
              if(this.licenseIssuedDate!=null && this.licenseIssuedDate!='' && this.licenseIssuedDate!=undefined){
                licenseDate = this.datePipe.transform(this.licenseIssuedDate, "dd/MM/yyyy");
              }
              if(this.driverDob!=null && this.driverDob!='' && this.driverDob!=undefined){
               if((String(this.driverDob)).includes('/')) dob = this.driverDob;
                else dob = this.datePipe.transform(this.driverDob,'dd/MM/yyyy');
              }
              if(sessionStorage.getItem('quoteNo')) quoteNo = sessionStorage.getItem('quoteNo');
              let areaGroup=null; 
              if(this.subUrbanCode!=null && this.subUrbanCode!='' && this.subUrbanCode!=undefined){
                areaGroup = this.districtList.find(ele=>ele.Code==this.subUrbanCode)?.AreaGroup;
              }
              if(this.insuranceId=='100028'){this.stateValue=null;this.cityCode=null;this.subUrbanCode=null; areaGroup=null;}
                ReqObj['DriverDetails']={
                  'DriverName':this.driverName,
                  'DriverType':this.driverType,
                  'Gender' : this.gender,
                  'LicenseNo' :this.licenseNo,
                  'MaritalStatus' : this.martialStatus,
                  'CountryId':this.countryId,
                  'StateId':this.stateValue,
                  'CityId':this.cityCode,
                  'AreaGroup' : areaGroup,
                  "SuburbId": this.subUrbanCode,
                  'DriverExperience' : this.driveExperience,
                  "CreatedBy": createdBy,
                  "DriverDob": dob,
                  "QuoteNo": quoteNo,
                  "RequestReferenceNo": this.quoteRefNo,
                  "RiskId": this.vehicleId,
                  "InsuranceId": this.insuranceId,
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
                  "VehicleValueType": this.productItem.VehicleValue,
                  "Inflation": this.productItem.Inflation,
                  "Ncb":"0",
                  "DefenceValue":this.productItem.DefenceCost,
                  "PurchaseDate":this.productItem.PurchaseDate,
                  "RegistrationDate": this.vehicleDetails?.RegistrationDate,
                  "ExcessLimit": null,
                  "Deductibles": deductibles,
                }
            }
            else ReqObj['DriverDetails'] = null;
            if(this.insuranceId=='100019') ReqObj['CarAlarmYn'] = this.alarmYN;
            if(this.insuranceId=='100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass
        let urlLink = `${this.motorApiUrl}api/savemotordetails`;
        this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
          (data: any) => {
            let res:any = data;
            if(data.ErrorMessage.length!=0){
              if(res.ErrorMessage){
              }
            }
            else{
              if(data.Result?.length!=0){
                this.currentIndex = Number(this.vehicleId);
                let entry = this.vehicleDetailsList.find(ele=>ele.Vehicleid==this.vehicleId);
                entry['PolicyEndDate'] = endDate;
                entry['PolicyStartDate'] = startDate;
                this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
                let i=0;this.individualCalcIndex=0;
                for(let veh of data.Result){
                  if(type=='proceedSave'){
                        
                    // if(this.uwQuestionList.length!=0 && this.changeUwSection){
                    //   let j = 0;
                    //   let uwList:any[]=new Array();
                    //   for(let ques of this.uwQuestionList){
                    //     ques['BranchCode'] = this.branchCode;
                    //     let createdBy="";
                    //       let quoteStatus = sessionStorage.getItem('QuoteStatus');
                    //       if(quoteStatus=='AdminRP'){
                    //           createdBy = this.vehicleDetailsList[0].CreatedBy;
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
                    //     j+=1;
                    //     if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
                    //   }
                    // }
                    // else 
                    if(this.finalizeYN!='Y'){
                   
                        entry['MSRefNo'] = data?.Result[0].MSRefNo;
                        entry['VdRefNo'] = data?.Result[0].VdRefNo;
                        entry['CdRefNo'] = data?.Result[0].CdRefNo;
                        entry['Active'] = true;
                        entry['VehicleId'] = data.Result[0].VehicleId;
                        this.onCalculateVehDetails(veh,type,i,data.Result.length,insuranceType.length);
                        i+=1;
                      //this.getCalculationDetails(veh,type,this.currentIndex-1,'proceedSave');
                    }
                    else{
                      if(type=='save'){
    
                      }
                      else if(type=='proceedSave'){
                        
                        this.onFinalProceed();
                      }
                      else if(type=='finalProceed'){
                        if(this.currentIndex-1==this.vehicleDetailsList.length){
                          if(this.insuranceId=='100002' && this.vehicleDetailsList.length>1) this.saveFleetDetails();
                          else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
                        }
                      }
                      else{
                        if(type==null){
                          
                          if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
                        }
                        
                        
                      }
                    }
                  }
                  else{
                    entry['MSRefNo'] = data?.Result[0].MSRefNo;
                    entry['VdRefNo'] = data?.Result[0].VdRefNo;
                    entry['CdRefNo'] = data?.Result[0].CdRefNo;
                    entry['Active'] = true;
                    entry['VehicleId'] = data.Result[0].VehicleId;
                    this.onCalculateVehDetails(veh,type,i,data.Result.length,insuranceType.length)
                    i+=1;
                  }
                }
              }
              // else if(data.Result){
              //     let entry = this.vehicleDetailsList[this.currentIndex-1];
              //     entry['PolicyEndDate'] = endDate;
              //     entry['PolicyStartDate'] = startDate;
        
              //     entry['InsuranceType'] = data?.Result?.SectionId;
              //     entry['MSRefNo'] = data?.Result?.MSRefNo;
              //     entry['VdRefNo'] = data?.Result?.VdRefNo;
              //     entry['CdRefNo'] = data?.Result?.CdRefNo;
              //     entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
              //     entry['Active'] = true;
              //     entry['VehicleId'] = data.Result?.VehicleId;
              //     if(this.currentIndex<this.vehicleDetailsList.length){
              //       this.collateralYN = "N";
              //       //sessionStorage.setItem('loadingType','load');
              //       this.currentIndex = this.currentIndex+1;
              //         if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
              //           if(this.endorsementSection && this.enableAddVehicle){
              //             if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
              //               if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
              //               else{ this.enableFieldsSection = false; }
              //             }
              //             else this.enableFieldsSection = false;
              //           } 
              //           this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
              //           this.getEditVehicleDetails(this.vehicleId,'direct');
              //           this.vehicleDetailsList.length = this.vehicleDetailsList.length;
              //         }
              //         else{
              //           this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              //           if(this.endorsementSection && this.enableAddVehicle){
              //             if(this.vehicleDetails?.EndorsementYn){
              //               if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
              //               else this.enableFieldsSection = false;
              //             }
              //           } 
              //           this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
              //           this.vehicleDetailsList.length = this.vehicleDetailsList.length;
              //           this.setVehicleValues('direct');
              //           //this.currencyValue = this.vehicleDetailsList[this.currentIndex-1].Currency;
              //           //this.onCurrencyChange();
              //         }
              //     }
              //     else{
              //         if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
              //     }
              //     this.quoteRefNo = data?.Result?.RequestReferenceNo;
              //     sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
                  
              //     if(type=='proceedSave'){
                  
              //       if(this.uwQuestionList.length!=0 && this.changeUwSection){
              //         let j = 0;
              //         let uwList:any[]=new Array();
              //         for(let ques of this.uwQuestionList){
              //           ques['BranchCode'] = this.branchCode;
              //           let createdBy="";
              //             let quoteStatus = sessionStorage.getItem('QuoteStatus');
              //             if(quoteStatus=='AdminRP'){
              //                 createdBy = this.vehicleDetailsList[0].CreatedBy;
              //             }
              //             else{
              //               createdBy = this.loginId;
              //             }
              //             let status = null,loading = null;
              //             if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
              //               let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
              //               console.log("Found Obj",ques,obj)
              //               if(obj){
              //                 loading = obj.LoadingPercent
              //                 if(obj.ReferralYn=='Y') status = 'R';
              //                 else status = 'Y';
              //               }
              //               else status = 'Y';
              //             }
              //             else status = ques.Status;
              //             let entry = {
              //               "InsuranceId": this.insuranceId,
              //               "ProductId": this.productId,
              //               "UwQuestionId": ques.UwQuestionId,
              //               "UwQuestionDesc": ques.UwQuestionDesc,
              //               "QuestionType": ques.QuestionType,
              //               "EffectiveDateStart": ques.EffectiveDateStart,
              //               "Status": status,
              //               "LoadingPercent": loading,
              //               "MandatoryYn": ques.MandatoryYn,
              //               "DataType": ques.DataType,
              //               "CreatedBy": createdBy,
              //               "UpdatedBy":  this.loginId,
              //               "Value": ques.Value,
              //               "BranchCode": this.branchCode,
              //               "RequestReferenceNo": this.quoteRefNo,
              //               "VehicleId": this.vehicleId
              //             }
              //             uwList.push(entry);
              //           j+=1;
              //           if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
              //         }
              //       }
              //       else if(this.finalizeYN!='Y'){
              //         this.getCalculationDetails(entry,type,this.currentIndex-1,'proceedSave');
              //       }
              //       else{
              //         if(type=='save'){

              //         }
              //         else if(type=='proceedSave'){
                        
              //           this.onFinalProceed();
              //         }
              //         else if(type=='finalProceed'){
              //           if(this.currentIndex-1==this.vehicleDetailsList.length) this.router.navigate(['/quotation/plan/premium-details']);
              //         }
              //         else{
              //           if(type==null){
              //             if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
              //           }
                        
                        
              //         }
              //       }
              //     }
              //     else this.getCalculationDetails(entry,type,null,'proceedSave');
              //   }
              
            }
          },
          (err) => { },
        );
      }
    }
    else{
      if(this.currentIndex<this.vehicleDetailsList.length){
        this.collateralYN = "N";
        this.currentIndex = this.currentIndex+1;
          if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
                if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                else{ this.enableFieldsSection = false; }
              }
              else this.enableFieldsSection = false;
            } 
            this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
            this.getEditVehicleDetails(this.vehicleId,'direct');
            this.vehicleDetailsList.length = this.vehicleDetailsList.length;
          }
          else{
              
            this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.vehicleDetails?.EndorsementYn){
                if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                else this.enableFieldsSection = false;
              }
            } 
            this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
            this.vehicleDetailsList.length = this.vehicleDetailsList.length;
            this.setVehicleValues('direct');
          }
      }
      else{
          this.onFinalProceed();
      }
    }
  }
  saveFleetDetails(){
    let Reqobj={
      "RequestReferenceNo": this.quoteRefNo,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/savefleetdetails`;
      this.sharedService.onPostMethodSync(urlLink, Reqobj).subscribe(
        (data: any) => {
          if(data.Result){
            this.getFleetCalc(data.Result);
              
          }
        })
  }
  getFleetCalc(res){
    let startDate = "",endDate = ""
    //this.updateComponent.vehicleDetails = this.vehicleDetails;
     if(this.policyStartDate){
      let veh = this.vehicleDetailsList[0];
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
      if(String(this.policyStartDate).includes('/')) startDate = this.policyStartDate;
      else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      const oneday = 24 * 60 * 60 * 1000;
      const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");
      const formattedDatecurrent = new Date(this.policyStartDate);
      console.log(formattedDate);
      this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    }
      
      
    }
    if(this.policyEndDate){
      if(this.endorsementSection && this.enableRemoveVehicle){
        endDate = this.endorseEffectiveDate;
      }
      // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
      //   coverModificationYN = 'N';
      // }
      else{
        if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
        else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
    }
    let effectiveDate=null;
    if(this.endorsementSection){
        effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if(this.policyStartDate){
        if(String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
        else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
    }
    let ReqObj={
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": res?.SectionId,
      "ProductId": this.productId,
      "MSRefNo": res?.MSRefNo,
      "VehicleId": res?.VehicleId,
      "CdRefNo": res?.CdRefNo,
      "DdRefNo": res?.DdRefNo,
      "VdRefNo": res?.VdRefNo,
      "CreatedBy": res?.CreatedBy,
      "productId": this.productId,
      "sectionId": res?.SectionId,
      "RequestReferenceNo": this.quoteRefNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": endDate,
      "CoverModification": "N",
      "PDRefNo":res?.PDRefNo
    }
    let urlLink = `${this.CommonApiUrl}calculator/policy/calc`;
    if(this.insuranceId!='100028' && this.insuranceId!='100027' && this.insuranceId!='100019'){
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.CoverList){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        });
    }
    else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    // 
  }
  onCalculateVehDetails(vehicleDetails,type,entry,totalCount,sectionCount){
    console.log(this.individualCalcIndex,totalCount)
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
              createdBy = this.vehicleDetailsList[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
         
          let endDate:any = null;
          if(this.endorsementSection && vehicleDetails?.Status=='D'){
            coverModificationYN = 'Y';
            endDate = this.endorseEffectiveDate;
          }
          // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
          //   coverModificationYN = 'N';
          // }
          else{
            if(this.policyEndDate){
              if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
              else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
          }
          let effectiveDate=null;
          if(this.endorsementSection){
              effectiveDate = this.endorseEffectiveDate;
          }
          else {
            if(this.policyStartDate){
              if(String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
              else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            }
          }
          let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "SectionId": vehicleDetails?.SectionId,
              "ProductId": this.productId,
              "MSRefNo": vehicleDetails?.MSRefNo,
              "VehicleId": vehicleDetails?.VehicleId,
              "CdRefNo": vehicleDetails?.CdRefNo,
              "DdRefNo": vehicleDetails?.DdRefNo,
              "VdRefNo": vehicleDetails?.VdRefNo,
              "CreatedBy": createdBy,
              "productId": this.productId,
              "sectionId": vehicleDetails?.SectionId,
              "RequestReferenceNo": this.quoteRefNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": endDate,
              "CoverModification": coverModificationYN
          }
          let urlLink = `${this.CommonApiUrl}calculator/calc`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              this.individualCalcIndex +=1;
                  if(this.individualCalcIndex==totalCount){ 
                    if(type=='ProceedSave'){
                     
                      console.log('Vehicle Details',this.vehicleDetailsList);
                      this.onFinalProceed();
                    }
                    else if(this.currentIndex<this.vehicleDetailsList.length){
                      this.collateralYN = "N";
                      this.currentIndex = this.currentIndex+1;
                        //this.finalSection = false;
                        if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
                          if(this.endorsementSection && this.enableAddVehicle){
                            if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
                              if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                              else{ this.enableFieldsSection = false; }
                            }
                            else this.enableFieldsSection = false;
                          } 
                          this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
                          this.productItem=new ProductData();
                          this.driverName = null;this.driverType='1';this.gender='M';this.licenseNo=null;
                          this.driverDob=null;this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
                          this.claimTypeValue=null;
                          if(this.vehicleDetailsList.length!=this.tabIndex) this.tabIndex+=1;
                          this.getEditVehicleDetails(this.vehicleId,'direct');
                          //this.totalCount = this.vehicleDetailsList.length;
                          $('#slider_0').removeClass('active w3-animate-left');
                          $('#slider_0').removeClass('active w3-animate-right');
                          $('#slider_0').addClass('active w3-animate-right');
                        }
                        else{
                          this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
                          if(this.endorsementSection && this.enableAddVehicle){
                            if(this.vehicleDetails?.EndorsementYn){
                              if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                              else this.enableFieldsSection = false;
                            }
                          } 
                          this.motorDetails = this.vehicleDetailsList[this.currentIndex-1];
                          //this.totalCount = this.vehicleDetailsList.length;
                          console.log("Motor Details",this.motorDetails);
                          this.setVehicleValues('direct');
                          $('#slider_0').removeClass('active w3-animate-left');
                          $('#slider_0').removeClass('active w3-animate-right');
                          $('#slider_0').addClass('active w3-animate-right');
                        }
                    }
                    else{ 
                        this.onFinalProceed();
                    }
                  }
            });
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
          this.productItem = new ProductData();
          this.driverName = null;this.driverDob = null;this.licenseNo=null; this.martialStatus =null;
          this.gender='M';this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
          this.driveExperience = null;this.licenseIssuedDate = null;
          this.vehicleDetails = data.Result;
          this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
          this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
          this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
          this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
          this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
          this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
          //this.updateComponent.vehicleDetails = this.vehicleDetails;
          if(this.insuranceId=='100020' || this.insuranceId=='100028'){
            //this.getDriverDetails(type,this.vehicleDetails);
            let entry = this.vehicleDetails.DriverDetails;
            if(entry){
              this.driverName = entry?.DriverName;
              this.licenseNo = entry?.LicenseNo;
              if(entry.Gender) this.gender = entry?.Gender;
              else this.gender = 'M';
              this.martialStatus = entry?.MaritalStatus;
              this.stateValue = entry?.StateId;
              this.getDistrictList('direct',entry?.CityId,entry?.SuburbId);
              
              this.driveExperience = entry?.DriverExperience;
              if(entry?.LicenseIssueDt){
                let dateList = entry?.LicenseIssueDt.split('/');
                if(dateList.length>1) this.licenseIssuedDate = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
              }
              if(entry?.DriverDob){
                this.driverDob = entry?.DriverDob;
                // let dateList = entry?.DriverDob.split('/');
                // if(dateList.length>1) this.driverDob = dateList[2]+'-'+dateList[1]+'-'+dateList[0];
              }
              if(type!='save'){
            
                this.setVehicleValues('edit');
              }
              else{
                this.onFormSubmit('save');
              }
            }
            else{
              this.driverName = null;this.driverDob = null;this.licenseNo=null; this.martialStatus =null;
                this.gender='M';this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
                this.driveExperience = null;this.licenseIssuedDate = null;
                if(type!='save'){
                  this.setVehicleValues('edit');
                }
                else{
                  this.onFormSubmit('save');
                }
            }
          }
          else{
              if(type!='save'){
                this.setVehicleValues('edit');
              }
              else{
                this.onFormSubmit('save');
              }
          }
          
        }
      },
      (err) => { },
    );
  }
  setVehicleValues(type){
    this.vehicleId = String(this.vehicleDetails?.Vehicleid);
    console.log("Vehicle Id Setted",this.vehicleId);
    this.endorsementYn = this.vehicleDetails?.EndorsementYn;
    //this.productItem = new ProductData();
    let fireData:any=null;
    if(this.insuranceId=='100027' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004'){
      if(this.insuranceId=='100027')  fireData = new MotorVehicleSanlam();
      else if(this.insuranceId=='100002') { fireData = new MotorVehicleTanzaniya(); this.getInsuranceClassList()}
      else if(this.insuranceId=='100028'){ fireData = new MotorVehicleEagle(); }
      else if(this.insuranceId=='100018'){ fireData = new MotorVehicleOromia();this.getInsuranceClassList()}
      else if(this.insuranceId=='100019'){ fireData = new MotorVehicleUganda();this.getInsuranceClassList()}
      else if(this.insuranceId=='100004'){ fireData = new MotorVehicleMadison();this.getInsuranceClassList()}
      else if(this.insuranceId=='100020'){ fireData = new MotorVehicleKenya();this.getInsuranceClassList();this.getVehicleClassList()}
      this.fields[0] = fireData?.fields;
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.getMotorTypeList('change',null,null)
        });
      } }
      console.log('Entered Vehicle',this.fields);
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks;
      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004' || this.insuranceId=='100028'){
        let regionHooks2 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onChangeInsuranceClass('change')
          });
        } 
       }
        if(this.insuranceId!='100004') {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          for(let field of fieldList){
            if(field.Key=='InsuranceType' && this.insuranceId=='100028'){
              field.hooks = regionHooks2;
            }
            else if(field.key=='InsuranceClass'  && this.insuranceId!='100028') field.hooks = regionHooks2;
          }
        }
        else this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks2;
      }
      if(this.vehicleDetails?.Insurancetype!=null && this.vehicleDetails?.Insurancetype!=''){
        if(Array.isArray(this.vehicleDetails?.Insurancetype)){
          if(this.vehicleDetails?.Insurancetype.length!=0) this.productItem.InsuranceType = this.vehicleDetails.Insurancetype[0]; 
        }
        // if(this.vehicleDetails?.Insurancetype.length!=0){
        //   this.productItem.InsuranceType = this.vehicleDetails?.Insurancetype;
        // }
      }
      //this.productItem.InsuranceType = this.vehicleDetails?.Insurancetype;
      if(this.issuerSection){
        this.Code = this.vehicleDetails?.SourceTypeId;
        this.sourceType = this.vehicleDetails?.SourceType;
        this.onSourceTypeChange('direct');
        this.setCustomerValue(this.vehicleDetails?.CustomerCode,this.vehicleDetails?.CustomerName,'direct')
      }
      this.productItem.InsuranceClass = this.vehicleDetails?.InsuranceClass;
      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004' || this.insuranceId=='100028'){this.onChangeInsuranceClass('direct');}
      this.productItem.ClaimType = this.vehicleDetails?.ClaimType;
      if(this.vehicleDetails?.CarAlarmYn!=null && this.vehicleDetails?.CarAlarmYn!='') {
          this.productItem.CarAlarmYn = this.vehicleDetails?.CarAlarmYn;
      }
      this.productItem.BodyType = this.vehicleDetails?.VehicleType;
      if(this.vehicleDetails?.VehicleType==null || this.vehicleDetails?.VehicleType==''){
        this.productItem.BodyType = this.vehicleDetails?.TiraBodyType;
      }
      this.productItem.TiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.productItem.PurchaseDate = this.onDateFormatInEdit(this.vehicleDetails?.PurchaseDate);
      this.productItem.Deductibles = this.vehicleDetails?.Deductibles;
      this.productItem.VehicleValue = this.vehicleDetails?.VehicleValueType;
      this.productItem.Inflation = this.vehicleDetails?.Inflation;
      this.productItem.DefenceCost = this.vehicleDetails?.DefenceValue;
      if(this.vehicleDetails?.NcdYn) this.productItem.ClaimsYN = this.vehicleDetails?.NcdYn;
      else this.productItem.ClaimsYN = 'N';
      if(this.vehicleDetails?.Gpstrackinginstalled) this.productItem.GpsYN = this.vehicleDetails?.Gpstrackinginstalled;
      else this.productItem.GpsYN = 'N';
      this.productItem.VehicleSI = this.vehicleDetails?.SumInsured;
      this.productItem.WindShieldSI = this.vehicleDetails?.WindScreenSumInsured;
      this.productItem.ExtendedTPPDSI = this.vehicleDetails?.TppdIncreaeLimit;
      this.productItem.AccessoriesSI = this.vehicleDetails?.AcccessoriesSumInsured;
      this.productItem.VehicleClass = this.vehicleDetails?.VehicleClass;
    }
    if(this.insuranceId!='100004') this.getInsuranceTypeList();
    else{this.getMotorUsageAltList();}
    //if(this.insuranceId=='100027') this.getMotorTypeList('direct',null,null)
    this.getType1();
    this.getType2();
    this.getType3();
    this.typeValue = this.vehicleDetails?.Insurancetype;
    this.classValue = this.vehicleDetails?.InsuranceClass;
    this.claimTypeValue = this.vehicleDetails?.ClaimType;
    if(this.vehicleDetails?.CarAlarmYn!=null && this.vehicleDetails?.CarAlarmYn!='') this.alarmYN = this.vehicleDetails?.CarAlarmYn;
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
        let entry = this.vehicleDetailsList.filter(ele=>ele?.EndorsementDate!=undefined)
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
      else{this.motorUsageValue=this.vehicleDetails?.Motorusage;this.productItem.MotorUsage = this.vehicleDetails?.Motorusage;  this.getMotorTypeAltList('direct');}
      
      this.bodyTypeValue = this.vehicleDetails?.VehicleType;
      if(this.vehicleDetails?.VehicleType==null || this.vehicleDetails?.VehicleType==''){
        this.bodyTypeValue = this.vehicleDetails?.TiraBodyType;
      }
      this.productItem.MotorUsage = this.vehicleDetails?.Motorusage;
      this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.motorUsageValue = this.vehicleDetails?.Motorusage;
      if(this.insuranceId!='100004') this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
      else{this.motorUsageValue=this.vehicleDetails?.Motorusage; this.getMotorTypeAltList('direct');}
      this.bodyTypeValue = this.vehicleDetails?.VehicleType;
      this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.motorUsageValue = this.vehicleDetails?.Motorusage;
      this.collateralYN = this.vehicleDetails?.CollateralYn;
      if(this.collateralYN=='Y') this.collateralValue = true;
      else this.collateralValue = false;
      this.PurchaseDate = this.onDateFormatInEdit(this.vehicleDetails?.PurchaseDate);
      this.deductibleValue = this.vehicleDetails?.Deductibles;
      this.vehicleValue = this.vehicleDetails?.VehicleValueType;
      this.inflationValue = this.vehicleDetails?.Inflation;
      this.defenceCostValue = this.vehicleDetails?.DefenceValue;
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
        if(this.vehicleDetails.Status!='D'){
          var dateParts = this.vehicleDetails?.PolicyStartDate.split("/");
  
          // month is 0-based, that's why we need dataParts[1] - 1
          this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        }
        if(this.vehicleDetails?.PolicyEndDate != null ){
          var dateParts = this.vehicleDetails?.PolicyEndDate.split("/");
    
        // month is 0-based, that's why we need dataParts[1] - 1
          this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
          this.onChangeEndDate();
        }
        console.log("Policy Start",this.policyStartDate)
        //this.policyStartDate = dateObject.toString()
      }
     
    }
   
    if(type=='edit'){
      if(this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
      else this.claimsYN = 'N';
      if(this.vehicleDetails?.PolicyRenewalYn) this.productItem.RenewalYn = this.vehicleDetails?.PolicyRenewalYn;
      else this.productItem.RenewalYn = 'N';
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
      this.motorDetails = this.vehicleDetails;
      //this.getVehicleDetails(this.vehicleDetails?.Registrationnumber,this.vehicleDetails?.SavedFrom);
    }
    if(this.insuranceId=='100020' || this.insuranceId=='100028'){
      this.vehicleClassValue = this.vehicleDetails?.VehicleClass;
      this.productItem.VehicleClass = this.vehicleDetails?.VehicleClass;
    } 

  }

  onChangeInsuranceClass(type){
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='GpsYN'){
        if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
          if(this.productItem.InsuranceClass=='1'){
            field.hideExpression = false;field.hide=false;  
          }
          else{ field.hideExpression = true;field.hide=true;}
        }
      }
      if(field.key=='InsuranceType' && this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
        field.hideExpression = true;field.hide=true;
      }
      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
        if(this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
          field.hideExpression = false;field.hide=false;
        }
        else if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
            if(this.productItem.InsuranceClass=='1' || this.productItem.InsuranceClass=='2'){
              field.hideExpression = false;field.hide=false;
            }
            else{ 
              this.productItem.VehicleSI = null;
              this.productItem.WindShieldSI = null;
              this.productItem.Accessories 
              field.hideExpression = true;field.hide=true;}
        }
      }
    }
  }
  getMotorUsageAltList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            if(this.motorUsageList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorUsageList.length; i++) {
                this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
                this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
                if (i == this.motorUsageList.length - 1) {
                        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fieldList){
                          if(field.key=='MotorUsage'){
                                field.props.options= this.motorUsageList;
                          }
                        }
                }
              }
            }
        }
      },
      (err) => { },
    );
  }
  onSaveUWQues(uwList,entry,type,index){

  }
  checkDisableField(){
    let status = sessionStorage.getItem('QuoteStatus');
    return ((this.adminSection && (status=='AdminRP' || status=='AdminRA')) || (this.finalizeYN=='Y'))
  }
  onResetTabIndex(){
    this.tabIndex=0;
    this.navigateTo('quote-plan')
  }
  navigateTo(location) {
    if(location=='back'){
      if(this.tabIndex==0) this.router.navigate(['/quotation']);
      else if(this.tabIndex!=0){
        this.tabIndex-=1;
        this.productItem=new ProductData();
        this.driverName = null;this.driverType='1';this.gender='M';this.licenseNo=null;
        this.driverDob=null;this.stateValue=null;this.cityCode=null;this.subUrbanCode=null;
        this.claimTypeValue=null;
        if(this.tabIndex!=0) this.getEditVehicleDetails(this.tabIndex,'direct');
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
          this.sourceCodeError = false;
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
      if(this.productId=='6' || this.productId=='13' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21' || this.productId=='26' || this.productId == '25' || this.productId=='57'){
        if(this.IndustryId=='' || this.IndustryId==null || this.IndustryId==undefined){
          i+=1;
          this.industryError = true;
        }
        else this.industryError=false;
      }
      if(i==0){
        let startDate=null,endDate=null;
        let startDateList = String(this.policyStartDate).split('/');
        if(startDateList.length>1) startDate = this.policyStartDate
        else startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
        let endDateList = String(this.policyEndDate).split('/');
        if(endDateList.length>1) endDate = this.policyEndDate;
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
          "IndustryId": this.IndustryId
        
      }
          if(this.productId=='5'){
           
            sessionStorage.setItem('commonDetails',JSON.stringify(entry));
            if(this.tabIndex==0){this.tabIndex+=1;this.getMotorDetails(this.tabIndex-1)}
            else if(this.vehicleDetailsList.length==this.tabIndex){this.saveMotorDetails(this.tabIndex)}
            else{this.saveMotorDetails(this.tabIndex);}
          }
          else if(this.productId=='3' || this.productId=='19'){
            this.showSectionSeltion = true;
          }
          else{
            let vehicle = {};
            if(this.executiveSection){
              vehicle['AcExecutiveId'] = this.executiveValue;
              vehicle['CommissionType'] = this.commissionValue;
            }
            else{
              vehicle['AcExecutiveId'] = null;
              vehicle['CommissionType'] = null;
            }
            if(this.issuerSection){
              vehicle['SourceType'] = this.Code;
              vehicle['BrokerCode'] = this.brokerCode;
              vehicle['BranchCode'] = this.branchCode;
              vehicle['BrokerBranchCode'] = this.brokerBranchCode;
              vehicle['CustomerCode'] = this.customerCode;
              vehicle['CustomerName'] = this.customerName;
              vehicle['LoginId'] = this.brokerLoginId;
            }
            else{
              vehicle['SourceType'] = 'Agent';
              vehicle['BrokerCode'] = this.brokerCode;
              vehicle['BranchCode'] = this.branchCode;
              vehicle['BrokerBranchCode'] = this.brokerBranchCode;
              vehicle['CustomerCode'] = this.customerCode;
              vehicle['CustomerName'] = this.customerName;
              vehicle['LoginId'] = this.loginId;
            }
            vehicle['modifiedYN'] = this.modifiedYN;
            vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            vehicle['PolicyPeriod'] = this.noOfDays;
            vehicle['Currency'] = this.currencyCode;
            vehicle['HavePromoCode'] = null;
            vehicle['PromoCode'] = this.promocode;
            vehicle['ExchangeRate'] = this.exchangeRate;
            vehicle['RiskId'] = String(1);
            vehicle['Active'] = false;
            sessionStorage.setItem('homeCommonDetails',JSON.stringify([vehicle]));
            if(this.productId=='19' || this.productId=='3' || this.productId=='24'){
              let loginType = this.loginType;
              if(loginType){
                // if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
                //   let i=0;
                //   this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
                //   this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
                //     if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
                //     if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
                //     if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
                //     if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
                //     if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
                //     if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
                //     if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
                //     if(i>0) this.errorSection = true;
                //     if(i==0){
                //       let customerObj = {
                //         "Title":this.updateComponent.Title,
                //         "ClientName":this.updateComponent.UserName,
                //         "MobileCode":this.updateComponent.MobileCode,
                //         "MobileNo":this.updateComponent.MobileNo,
                //         "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
                //         "IdNumber":this.updateComponent.IdNumber,
                //         "IdType": this.updateComponent.CustomerType,
                //         "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
                //         "EmailId":this.updateComponent.EmailId,
                //         "PreferredNotification": this.updateComponent.PreferredNotification
                        
                //       }
                //       sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
                //       // this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
                //       // if(this.modifiedCustomer){
                //       //     this.saveCustomerDetails(customerObj,'proceed');
                //       // }
                //       // else{
                //           this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
                //       //}
                //     }
                //   }
                //   else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']); 
              }
              else{
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
              }
            }
            else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21'  || this.productId=='26' || this.productId == '25' || this.productId=='43' || this.productId=='13' || this.productId=='27' || this.productId=='57') this.saveCommonDetails([vehicle]); 
            else{
              
              let loginType = this.loginType;
                  if(loginType){
                    // if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
                    //   let i=0;
                    //   this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
                    //   this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
                    //     if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
                    //     if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
                    //     if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
                    //     if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
                    //     if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
                    //     if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
                    //     if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
                    //     if(i>0) this.errorSection = true;
                    //     if(i==0){
                    //       let customerObj = {
                    //         "Title":this.updateComponent.Title,
                    //         "ClientName":this.updateComponent.UserName,
                    //         "MobileCode":this.updateComponent.MobileCode,
                    //         "MobileNo":this.updateComponent.MobileNo,
                    //         "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
                    //         "IdNumber":this.updateComponent.IdNumber,
                    //         "IdType": this.updateComponent.CustomerType,
                    //         "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
                    //         "EmailId":this.updateComponent.EmailId,
                    //         "PreferredNotification": this.updateComponent.PreferredNotification
                            
                    //       }
                    //       sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
                    //       // this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
                    //       // if(this.modifiedCustomer){
                    //       //     this.saveCustomerDetails(customerObj,'proceed');
                    //       // }
                    //       // else{
                    //           this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                    //       //}
                    //     }
                    //   }
                     // else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                     this.router.navigate(['/quotation/plan/personal-quote-details'])
                  }
                  else{
                    this.router.navigate(['/quotation/plan/personal-quote-details'])
                  }
            }
          }
      }
      // else{
      
      // }
      
    } 
  }
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }
  saveCommonDetails(commonDetails){
    let sourcecode:any;
    let endorsementDate=null,EndorsementEffectiveDate=null,EndorsementRemarks=null,
    EndorsementType=null,EndorsementTypeDesc=null,EndtCategoryDesc=null,EndtCount=null,
    EndtPrevPolicyNo=null,EndtPrevQuoteNo=null,EndtStatus=null,IsFinanceEndt=null,OrginalPolicyNo=null;
    if(this.endorsementDetails){
      endorsementDate = this.endorsementDetails['EndorsementDate'];
      EndorsementEffectiveDate = this.endorsementDetails['EndorsementEffectiveDate'];
      EndorsementRemarks = this.endorsementDetails['EndorsementRemarks'];
      EndorsementType = this.endorsementDetails['EndorsementType'];
      EndorsementTypeDesc = this.endorsementDetails['EndorsementTypeDesc'];
      EndtCategoryDesc = this.endorsementDetails['EndtCategoryDesc'];
      EndtCount = this.endorsementDetails['EndtCount'];
      EndtPrevPolicyNo = this.endorsementDetails['EndtPrevPolicyNo'];
      EndtPrevQuoteNo = this.endorsementDetails['EndtPrevQuoteNo'];
      EndtStatus = this.endorsementDetails['EndtStatus'];
      IsFinanceEndt = this.endorsementDetails['IsFinanceEndt'];
      OrginalPolicyNo = this.endorsementDetails['OrginalPolicyNo'];
    }
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      }
      else this.quoteRefNo = null;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = this.brokerLoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { 
      brokerbranchCode =  commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
     }
    else{ this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if(this.userType!= 'Broker' && this.userType != 'User'){
      sourcecode=this.Code
    }
    else{
      sourcecode=sessionStorage.getItem('typeValue')
    }
    if(this.promocode!=null && this.promocode!='' && this.promocode!=undefined) this.havePromoCodeYN = 'Y';
    else this.havePromoCodeYN = 'N';
    let section = [];
    if(this.productId=='6'){section.push('40');};
    if(this.productId=='39'){section.push('41'); };
    if(this.productId=='16'){section.push('42');};
    if(this.productId=='14'){section.push('45');};
    if(this.productId=='32'){section.push('43');};
    if(this.productId=='1'){section.push('52');};
    if(this.productId=='21'){section.push('3');};
    if(this.productId=='26'){section.push('3');};
    if(this.productId=='25'){section.push('39');};
    if(this.productId=='13'){section.push('35');};
    // if(this.productId=='56'){section.push('82');this.IndustryId='99999'};
    if( this.productId=='57'){section.push('50')};
    if(this.productId=='43'){section.push('70');this.IndustryId='44'};
    if( this.productId=='27'){section.push('54');this.IndustryId='44'};
    let ReqObj = { 
        "AcexecutiveId": "",
        "PolicyNo": this.endorsePolicyNo,
        "ProductId": this.productId,
        "ProductType": null,
        "TiraCoverNoteNo": null,
        "RequestReferenceNo": this.quoteRefNo,
        "AgencyCode": this.agencyCode,
        "ApplicationId": this.applicationId,
        "BdmCode": this.customerCode,
        "BranchCode": this.branchCode,
        "BrokerBranchCode": brokerbranchCode,
        "BrokerCode": this.brokerCode,
        "BuildingOwnerYn": this.buildingOwnerYN,
        "Createdby": this.loginId,
        "SourceTypeId":sourcecode,//this.Code
        "Currency": this.currencyCode,
        "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "ExchangeRate": this.exchangeRate,
        "Havepromocode": this.havePromoCodeYN,
        "Promocode": this.promocode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "UserType": this.userType,
        "PolicyEndDate": this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy"),
        "PolicyStartDate": this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy"),
        "SectionIds": section,
        "SubUsertype": sessionStorage.getItem('typeValue'),
        "RiskId":"1",
        "IndustryId": this.IndustryId,
        "EndorsementDate": endorsementDate,
        "EndorsementEffectiveDate": EndorsementEffectiveDate,
        "EndorsementRemarks": EndorsementRemarks,
        "EndorsementType": EndorsementType,
        "EndorsementTypeDesc": EndorsementTypeDesc,
        "EndtCategoryDesc": EndtCategoryDesc,
        "EndtCount": EndtCount,
        "EndtPrevPolicyNo": EndtPrevPolicyNo,
        "EndtPrevQuoteNo": EndtPrevQuoteNo,
        "EndtStatus": EndtStatus,
        "IsFinanceEndt": IsFinanceEndt,
        "OrginalPolicyNo": OrginalPolicyNo,
        "Status": "Y"
    }
    if (this.endorsementSection) {
      if (this.currentStatus == undefined || this.currentStatus == null || this.currentStatus == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.currentStatus;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
                let sections = data.Result?.SectionIds;
                let refNo = data.Result?.RequestReferenceNo;
                this.referenceNo = data.Result?.RequestReferenceNo;
                // this.updateComponent.referenceNo = data.Result?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
                let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if (homeDetails) {
                    if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
                    else homeDetails[0].SectionId = sections;
                    if(this.IndustryId && this.industryList!=null)
                    homeDetails[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    let loginType = this.loginType;
                    // if(loginType){
                    //   if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
                    //     let i=0;
                    //     this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
                    //     this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
                    //       if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
                    //       if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
                    //       if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
                    //       if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
                    //       if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
                    //       if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
                    //       if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
                    //       if(i>0) this.errorSection = true;
                    //       if(i==0){
                    //         let customerObj = {
                    //           "Title":this.updateComponent.Title,
                    //           "ClientName":this.updateComponent.UserName,
                    //           "MobileCode":this.updateComponent.MobileCode,
                    //           "MobileNo":this.updateComponent.MobileNo,
                    //           "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
                    //           "IdNumber":this.updateComponent.IdNumber,
                    //           "IdType": this.updateComponent.CustomerType,
                    //           "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
                    //           "EmailId":this.updateComponent.EmailId,
                    //           "PreferredNotification": this.updateComponent.PreferredNotification
                              
                    //         }
                    //         sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
                    //         this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
                    //         if(this.modifiedCustomer){
                    //             this.saveCustomerDetails(customerObj,'proceed');
                    //         }
                    //         else{
                    //             this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                    //         }
                    //       }
                    //     }
                    //     else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                    // }
                    // else{
                      this.router.navigate(['/quotation/plan/personal-quote-details'])
                    //}
                }
        }
      },
      (err) => { },
    );
  }
}
