import { Component } from '@angular/core';
import { ProductData } from '../../../customer/customer-create-form/product';
import * as Mydatas from '../../../../../app-config.json';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/demo/service/shared.service';
import Swal from 'sweetalert2';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ShortTermVehicle } from '../../../quotation/quotation-plan/models/ShortTermVehicle';
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent {

  currentCustomerType:string = 'personal';
  ownerCategoryOptions: any[] | undefined;
  selectedOwnerCategory: any | undefined;
  statusOptions: string = '';maxTextLen:any='10';
  date: Date | undefined;
  userDetails:any=null;maxDate:any=null;
  maxDobDate:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  loginType:any=null;userType:any=null;quoteNo:any=null;
  brokerbranchCode:any=null;typeValue:any=null;
  statusList:any[]=[];notificationList:any[]=[];
  taxExcemptedList:any[]=[];policyHolderList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  customerReferenceNo:any=null;titleList:any[]=[];
  regionList:any[]=[];stateList:any[]=[];enableFieldsList:any[]=[];
  countryList:any[]=[];genderList:any[]=[];
  occupationList:any[]=[];mobileCodeList:any[]=[];
  businessTypeList:any[]=[];productItem:any=null;endorsementName:any=null;
  policyHolderTypeList:any[]=[];dob:any=null;stateOptions: any[]=[];
  value1: string = 'en';final1: boolean=false;final2: any=false;final3: any=false;final4: any=false;final5: any=false;
  final6: any=false;final7: any=false;endorseCategory:any=null;
  shows: boolean=false;final:boolean=false;endorsementId:any=null;
	Idnumber: any;shortQuoteYN:boolean=false;enableCustomerDetails:boolean=false;
	Idnumber1: any;endorsementSection:boolean=false;
	Idnumber2: any;lang:any=null;
  minDate: Date;
  policyStartDate: any;
  vehicleDetailsList: any[]=[];
  IndustryId: string;
  industryError: boolean;
  brokerLoginId: null;
  brokerCode: null;
  customerCodeError: boolean;
  customerName: string;
  policyStartError: boolean;
  policyEndError: boolean;
  currencyCodeError: boolean;
  policyPassDate: boolean;
  currencyCode: null;
  issuerSection: any;
  Code: string;
  sourceCodeError: boolean;
  quoteRefNo: null;
  currencyList: any;
  exchangeRate: any;
  minCurrencyRate: any;
  maxCurrencyRate: any;
  promocode:any;
  vehicleId: any;
  makeList: any;
  bodyTypeList: any;
  colorList: any;
  fuelTypeList: any;
  usageList: any;
  motorCategoryList: any;
  modelList: any;
  commonDetails: any;
  subuserType: string;
  customerDetails: any;
  vehicleDetails: { BrokerBranchCode: string; AcExecutiveId: any; CommissionType: any; CustomerCode: any; CustomerName: string; BdmCode: any; BrokerCode: null; LoginId: string; SubUserType: any; ApplicationId: string; CustomerReferenceNo: string; RequestReferenceNo: any; Idnumber: string; VehicleId: any; AxelDistance: string; Chassisnumber: string; Color: any; ColorDesc: string; OwnerCategory: any; CubicCapacity: string; CreatedBy: string; DrivenByDesc: string; EngineNumber: any; EngineCapacity: any; FuelType: any; FuelTypeDesc: string; Grossweight: string; HoldInsurancePolicy: string; Insurancetype: string[]; InsuranceId: any; InsuranceClass: string; ModelNumber: any; NcdYn: string; NoOfClaims: any; NumberOfAxels: string; BranchCode: any; AgencyCode: any; ProductId: any; SectionId: string; PolicyType: string; RadioOrCasseteplayer: any; RegistrationYear: string; SourceTypeId: any; SpotFogLamp: any; Stickerno: any; SumInsured: any; Tareweight: string; TppdFreeLimit: any; TppdIncreaeLimit: any; TrailerDetails: any; Windscreencoverrequired: any; accident: any; periodOfInsurance: string; PolicyStartDate: string; PolicyEndDate: string; Currency: null; ExchangeRate: any; HavePromoCode: any; PromoCode: any; CollateralYn: string; BorrowerType: any; CollateralName: any; FirstLossPayee: any; FleetOwnerYn: string; NoOfVehicles: string; NoOfComprehensives: any; ClaimRatio: any; SavedFrom: string; UserType: any; SearchFromApi: boolean; TiraCoverNoteNo: any; EndorsementYn: string; EndorsementDate: any; EndorsementEffectiveDate: any; EndorsementRemarks: any; EndorsementType: any; EndorsementTypeDesc: any; EndtCategoryDesc: any; EndtCount: any; EndtPrevPolicyNo: any; EndtPrevQuoteNo: any; EndtStatus: any; IsFinanceEndt: any; OrginalPolicyNo: any; Ncb: string; DefenceValue: any; PurchaseDate: any; RegistrationDate: any; Scenarios: { ExchangeRateScenario: { OldAcccessoriesSumInsured: any; OldCurrency: any; OldExchangeRate: any; OldSumInsured: any; OldTppdIncreaeLimit: any; OldWindScreenSumInsured: any; }; }; AcccessoriesSumInsured: any; AccessoriesInformation: any; AdditionalCircumstances: any; CityLimit: any; CoverNoteNo: any; Gpstrackinginstalled: string; InsurerSettlement: string; InterestedCompanyDetails: string; MotorCategory: any; RoofRack: any; WindScreenSumInsured: any; SaveOrSubmit: string; };
  commissionType: any;
  requestReferenceNo: any;
  endorsementDate: any;
  endorsementEffectiveDate: any;
  endorsementRemarks: any;
  endorsementType: any;
  endorsementTypeDesc: any;
  endtCategoryDesc: any;
  endtCount: any;
  endtPrevPolicyNo: any;
  endtPrevQuoteNo: any;
  endtStatus: any;
  isFinanceEndt: any;
  orginalPolicyNo: any;
  motorDetails: null;
  currentIndex: number;
  totalIndex: number;
  customerCode: any;
  sourceType: string;
  currentGroupIndex: number;
  fields: any[]=[];
  constructor( private sharedService: SharedService,private datePipe: DatePipe,
    private router: Router, ) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
	  let type = sessionStorage.getItem('QuoteType')
	  if(type) this.shortQuoteYN = true;
    this.minDate = new Date();
    	this.maxDate = new Date();
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		// this.appComp.getLanguage().subscribe((res:any)=>{  
		// 	this.lang=res;
		// 	translate.setDefaultLang(res);
		//  });
		//  if(!this.lang){this.lang='en';translate.setDefaultLang('en');}
     	this.maxDobDate = new Date(year - 18,month, day );
		this.loginId = this.userDetails.Result.LoginId;
		this.agencyCode = this.userDetails.Result.OaCode;
		this.branchCode = this.userDetails.Result.BranchCode;
		this.productId = this.userDetails.Result.ProductId;
		this.insuranceId = this.userDetails.Result.InsuranceId;
		this.loginType = this.userDetails.Result.LoginType;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue')
		this.stateOptions = [
			{ label: 'English', value: 'en' },
			{ label: 'Portugese', value: 'po' },
			// { label: 'French', value: 'fr' },
			// { label: 'Telugu', value: 'te' },
			// { label: 'Urdu', value: 'ur' },
		  ];
		  // this language will be used as a fallback when a translation isn't found in the current language
	
    let refNo = sessionStorage.getItem('customerReferenceNo');
		if (refNo) {
			 this.productItem = new ProductData()
			this.customerReferenceNo = refNo;
		}
		else {
			
			this.customerReferenceNo = null;
			this.productItem = new ProductData()
			this.productItem.IdType='1';
		}
      this.getTitleList();
      this.getCurrencyList();
   //this.getCountryList();
      // this.getGenderList();
      // //this.getOccupationList();
      // this.getBusinessTypeList();
      this.getMobileCodeList();
      this.getPolicyHolderList('change');
	  // if(this.insuranceId=='100004'){
		// this.getType3('direct');
	
	
		//	this.getTitleList();
		let fireData = new ShortTermVehicle();
      let entry = [];
      this.fields[0] = fireData?.fields;
      // let bodyTypeHooks = { onInit: (field: FormlyFieldConfig) => {
      //   field.formControl.valueChanges.subscribe(() => {
      //         this.onBodyTypeChange('change');
      //   });
      // } }
      // let makeHooks ={ onInit: (field: FormlyFieldConfig) => {
      //   field.formControl.valueChanges.subscribe(() => {
      //     this.onMakeChange('change')
      //   });
      // } }
      // let modelHooks ={ onInit: (field: FormlyFieldConfig) => {
      //   field.formControl.valueChanges.subscribe(() => {
      //     this.onModelChange('change')
      //   });
      // } }
      // this.fields[0].fieldGroup[0].fieldGroup[0].hooks = bodyTypeHooks;
      // this.fields[0].fieldGroup[0].fieldGroup[1].hooks = makeHooks;
      // this.fields[0].fieldGroup[0].fieldGroup[2].hooks = modelHooks;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.vehicleDetailsList =[];this.vehicleId = null;
        // this.getMotorDetails('direct');
        //this.setCommonFormValues();
      }
    }
	
  setPolicyType(){
    let value = this.productItem.IdType;
   if(value==2 || value=='2'){
     this.productItem.Gender = '';
   }
//    this.getPolicyIdTypeList('change');
//  this.getOccupationLists('change');
// if(this.insuranceId=='100004'){
//  this.getType3('change');
 
//}
 }
 getDisplayName(){
   return 'CodeDesc';
}

onStartDateChange(type){
  if(this.productId!='4'){
    // if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    var d = this.policyStartDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
  //   if(this.productId=='46'){
  //     //this.endMinDate = new Date(this.policyStartDate);
  //     // this.policyEndDate = new Date(year, month, day+29);
  //     // this.endMaxDate = new Date(year, month, day+30);
  //     //this.updateComponent.policyEndDate = this.policyEndDate;
  //     this.onChangeEndDate();
  //   }
  //   else {
  //     this.endMinDate = new Date(this.policyStartDate);
  //     this.policyEndDate = new Date(year + 1, month, day-1);
  //     this.endMaxDate = new Date(year + 2, month, day-1);
  //     this.onChangeEndDate();
  //   }
  }
  else{
   
  }
  if(type=='change') {
    if(this.vehicleDetailsList.length!=0){
      for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
    }
  }
}
getTitleList(){
  let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/title`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ "Code": '', "CodeDesc": "-Select-", 'CodeDescLocal':'-Selecione-' }]
          this.titleList = obj.concat(data.Result);
          
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
      //this.sourceCodeError = false;
      //if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
        if(this.customerName=='' || this.customerName==undefined || this.customerName==null){
            this.customerCodeError = true;
            i+=1;
        }
        this.brokerCode = null;
        this.brokerbranchCode = null;
        this.brokerLoginId = null;
      // }
      // else{
      //   if(this.brokerCode=='' || this.brokerCode==undefined || this.brokerCode==null){
      //     this.brokerCodeError = true;
      //     i+=1;
      //   }
      //   if(this.brokerBranchCode=='' && this.brokerBranchCode==undefined && this.brokerBranchCode==null){
      //     this.brokerBranchCodeError = true;
      //     i+=1;
      //   }
      // }
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
getPolicyHolderList(type){
  let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }

    let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.policyHolderList = data.Result;
              let defaultRow = []
              this.policyHolderList = defaultRow.concat(this.policyHolderList);
    }
  });  
}
onTitleChange(type){
  let title = this.productItem.Title;
  if(title!='' && title!=null && title!=undefined){
      if(title=='2') this.productItem.IdType = '2';
      else this.productItem.IdType = '1';
      if(title=='1') this.productItem.Gender = 'M';
      else this.productItem.Gender = 'F';
     // if(type!='direct') this.getPolicyIdTypeList(null);
  }
  else{
    this.productItem.IdType = '';
  }
}
onsavedatas(type,data){

	// console.log('GGGGGGG',type)
	// if(type=='Address'){
	// 	this.Adressvalidate();
	// }
	// else if(type=='IdValue'){
	// 	this.idfieldvalidate();
	// }
	// else if(type=='Email'){
	// 	this.Emailvalidate();
	// }
	// else if(type=='Mobile'){
	// 	this.Mobilevalidate();
	// }
	// else if(type=='Occupation'){
	// 	this.occupationchange();
	// }
	// else if(type=='Status'){
	// 	this.StatusChange();
	// }
	if(type=='Customer'){
		this.Customervalidate();
	}
	// else if(type=='direct' && !this.final){
	// 	//this.blankvalidationcheck(data);
	// 	this.onSubmit(data);
	// }
	else if(type=='direct' && this.final){
  //  if(this.final1)this.idfieldvalidate();
  //  if(this.final2) this.Adressvalidate();
  //  if(this.final3) this.occupationchange();
  //  if(this.final4) this.StatusChange();
   if(this.final5) this.Customervalidate();
  //  if(this.final6) this.Emailvalidate();
  //  if(this.final7) this.Mobilevalidate();
	}
}
getMobileCodeList() {
  let ReqObj = { "InsuranceId": this.insuranceId }
  let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {

        let obj = [{ "Code": '', "CodeDesc": "-Select-", 'CodeDescLocal':'-Selecione-' }]
        this.mobileCodeList = obj.concat(data.Result);
            if (this.customerReferenceNo) {
              this.setValues();
            }
            else {
              this.productItem = new ProductData();
              this.productItem.Clientstatus = 'Y';
              this.productItem.isTaxExempted = 'N'; 
              this.productItem.PreferredNotification = 'Sms';
              this.productItem.Gender = '';
              this.productItem.PolicyHolderTypeid = '';
              this.productItem.IdType = '1';
              if(this.mobileCodeList.length!=0 && this.mobileCodeList.length>1){
                this.productItem.MobileCode = this.mobileCodeList[1].Code;
              }
              if(this.countryList.length!=0 && this.countryList.length>1){
                this.productItem.Country = this.countryList[1].Code;
                 // this.getRegionList('change');
              }
              this.productItem.state = '';
              this.productItem.CityName = '';
              this.productItem.Occupation = '';
              this.productItem.BusinessType='';
              this.productItem.Title='';
              if(sessionStorage.getItem('VechileDetails')){
                let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
                this.productItem.ClientName = motorDetails.ResOwnerName;
                this.productItem.Title = '1';
                this.onTitleChange('direct');
              }
            }

      }
    },
    (err) => { },
  );
}

Customervalidate(){	
  let urlLink = `${this.CommonApiUrl}api/validateCustomerName?name=${this.productItem.ClientName}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Message== "Success") {
        this.final5=false;
        this.final=false;
      }
      else {
        this.final5=true;
        this.final=true;
      }
    },
    (err) => { },
  );
}

setValues() {
  let ReqObj = {
    "CustomerReferenceNo": this.customerReferenceNo
  }
  let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let customerDetails = data.Result;
        this.productItem = new ProductData();
        this.productItem.ClientName = customerDetails.ClientName;
        this.productItem.MiddleName = customerDetails.MiddleName;
        this.productItem.LastName = customerDetails.LastName;
        // if(customerDetails.AppointmentDate!=null && customerDetails.AppointmentDate!=undefined){
        // 	var dateParts = customerDetails.AppointmentDate.split("/");
        // 	 this.productItem.AppointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        // }
        this.productItem.Address1 = customerDetails.Address1;
        this.productItem.Address2 = customerDetails.Address2;
        this.productItem.BusinessType = customerDetails.BusinessType;
        this.productItem.CityName = customerDetails.CityCode;
        if(this.productItem.CityName==null) this.productItem.CityName = '';
        this.productItem.districtcode = customerDetails.CityName;
        if(customerDetails.Clientstatus) this.productItem.Clientstatus = customerDetails.Clientstatus;
        else this.productItem.Clientstatus = 'Y';
        this.productItem.EmailId = customerDetails.Email1;
        this.productItem.occupationdesc = customerDetails?.OtherOccupation;
        if(customerDetails.Nationality!=null){
          this.productItem.Country = customerDetails.Nationality;
        }
        else if(this.countryList.length!=0 && this.countryList.length>1){
          this.productItem.Country = this.countryList[1].Code;
            
        }
        if(this.productItem.Country==null) this.productItem.Country='';
        this.productItem.PinCode = customerDetails.PinCode;
        this.productItem.Gender = customerDetails.Gender;
        //this.productItem.IdNumber = customerDetails.IdNumber;
        if(customerDetails.PolicyHolderType!=null && customerDetails.PolicyHolderType!=''){
          this.productItem.IdType = customerDetails.PolicyHolderType;
        }
       // this.getPolicyIdTypeList(null);
        this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
        if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
        this.productItem.MobileNo = customerDetails.MobileNo1;
        this.productItem.MobileCode = customerDetails.MobileCode1;
        this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

        this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
        if(this.productItem.PolicyHolderTypeid =='1'){
          this.shows=true;
          if(customerDetails.IdNumber!='NA'){
            this.Idnumber= customerDetails.IdNumber.substr(0, 5);
            this.Idnumber1= customerDetails.IdNumber.substr(5, 3);
            this.Idnumber2= customerDetails.IdNumber.substr(8, 1);
          }
          
        }
        else{
          this.shows=false;
          if(customerDetails.IdNumber!='NA') this.productItem.IdNumber = customerDetails.IdNumber;
        }
        this.productItem.PreferredNotification = customerDetails.PreferredNotification;
        if(this.productItem.PreferredNotification==null) this.productItem.PreferredNotification='Sms';
        this.productItem.state = customerDetails.StateCode;
        if(this.productItem.state==null){
          this.productItem.state = '';
          
        }
        // this.getStateList(null);
        // this.getRegionList(null);
        if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
          if(new Date(this.maxDobDate).setHours(0,0,0,0) >= (new Date(customerDetails.DobOrRegDate)).setHours(0,0,0,0) ){
            var dateParts = customerDetails.DobOrRegDate.split("/");
            this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
          }
          else{
            var dateParts = customerDetails.DobOrRegDate.split("/");
            this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
          }
        }
        this.productItem.Street = customerDetails.Street;
        this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
        if(this.shortQuoteYN && customerDetails.Occupation=='99999') this.productItem.Occupation = '';
        else this.productItem.Occupation = customerDetails.Occupation;
        this.productItem.Title = customerDetails.Title;
        this.productItem.vrngst = customerDetails.VrTinNo;
        if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
          if(this.productItem.Address1==null || this.productItem.Address1==''){
            this.productItem.Occupation = '';
            if(this.productItem.Title=='1') this.productItem.Gender = 'M';
            else this.productItem.Gender = 'F';
          }
        }
        console.log("Final Edit Data", this.productItem)
      }
    },
    (err) => { },
  );
}
onCreateVehicle(){
  this.vehicleId = this.vehicleDetailsList.length+1;
  let make = "",color='',fuel='',usageDesc='',bodyType='',motorCategoryDesc='';
    let insuranceType = ['73'];
    if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
      make = entry.label;

    }
    if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
      let entry = this.bodyTypeList.find(ele=>ele.Code==this.productItem.BodyType);
      bodyType = entry.label;
    }
    if(this.productItem.Color!='' && this.productItem.Color!=undefined && this.productItem.Color!=null){
      let entry = this.colorList.find(ele=>ele.Code==this.productItem.Color);
      color = entry.label;
    }
    if(this.productItem.FuelType!='' && this.productItem.FuelType!=undefined && this.productItem.FuelType!=null){
      let entry = this.fuelTypeList.find(ele=>ele.Code==this.productItem.FuelType);
      fuel = entry.label;
    }
    if(this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined && this.productItem.MotorUsage!=null){
      let entry = this.usageList.find(ele=>ele.Code==this.productItem.MotorUsage);
      usageDesc = entry.label;
    }
    if(this.productItem.MotorCategory!='' && this.productItem.MotorCategory!=undefined && this.productItem.MotorCategory!=null){
      let entry = this.motorCategoryList.find(ele=>ele.Code==this.productItem.MotorCategory);
      motorCategoryDesc = entry.label;
    }
    let model=null,modelDesc = null;
    if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
      let bodyType = this.productItem.BodyType
        if(bodyType=='1' || bodyType=='2' || bodyType=='3' || bodyType=='4' || bodyType=='5'){
          if(this.productItem.Model!='' && this.productItem.Model!=null){
            if(this.productItem.Model=='99999'){
              modelDesc = this.productItem.OtherModelDesc;
              model = this.productItem.Model;
            }
            else{
              let entry = this.modelList.find(ele=>ele.Code==this.productItem.Model);
              modelDesc = entry.label;
              model = this.productItem.Model;
            }
            
          }
        }
        else{
          model = '99999';
          modelDesc = this.productItem.ModelDesc;
        }
    }
    let regNo = null;
    if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
      regNo = this.productItem.ChassisNo;
    }
    else regNo = this.productItem.RegistrationNo;
    let createdBy="";
        let startDate = "",endDate = "",vehicleSI="0",accSI="",windSI="0",tppSI="0";
        startDate = this.commonDetails[0].PolicyStartDate;
        endDate = this.commonDetails[0].PolicyEndDate;
        if(this.policyStartDate){
          // if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
          //    startDate = this.endorseEffectiveDate;
          //    const oneday = 24 * 60 * 60 * 1000;
          //     const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
          //     const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          //     const formattedDatecurrent = new Date(startDate);
          //     console.log(formattedDate);
    
          //   console.log(formattedDatecurrent);
    
          //   this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          // }
        }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.subuserType = sessionStorage.getItem('typeValue');
      console.log("AcExecutive",this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
      
      let appId = "1",loginId="",brokerbranchCode="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
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
          loginId = this.commonDetails[0].LoginId;
          //loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
          
        //   this.sourceType = this.commonDetails[0].SourceType;
        //   this.bdmCode = this.commonDetails[0].BrokerCode;
        //   this.brokerCode = this.commonDetails[0].BrokerCode;
        //   brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
        //   this.customerCode = this.commonDetails[0].CustomerCode;
        //   this.customerName = this.commonDetails[0].CustomerName;
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
        if(this.customerName ==undefined) this.customerName = null;
        if(this.vehicleId==null || this.vehicleId==undefined) this.vehicleId = '1';
    this.vehicleDetails = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": null,
      "CommissionType": this.commissionType,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.requestReferenceNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleId,
      "AxelDistance": '01',
      "Chassisnumber": '99999',
      "Color": null,
      "ColorDesc": color,
      "OwnerCategory": null,
      "CubicCapacity": "100",
      "CreatedBy": createdBy,
      "DrivenByDesc": 'Driver',
      "EngineNumber": null,
      "EngineCapacity": null,
      "FuelType": null,
      "FuelTypeDesc": fuel,
      "Grossweight": "100",
      "HoldInsurancePolicy": "N",
      "Insurancetype": insuranceType,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": "3",
      "ModelNumber": null,
      "NcdYn": 'N',
      "NoOfClaims": null,
      "NumberOfAxels": "1",
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": '73',
      "PolicyType": IdType,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "SourceTypeId":this.sourceType,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": null,
      "Tareweight": '100',
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": null,
      "TrailerDetails": null,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": "30",
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency" : this.currencyCode,
      "ExchangeRate": this.commonDetails[0].ExchangeRate,
      "HavePromoCode": this.commonDetails[0].HavePromoCode,
      "PromoCode" : this.commonDetails[0].PromoCode,
      "CollateralYn": 'N',
      "BorrowerType": null,
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": 'N',
      "NoOfVehicles": "1",
      "NoOfComprehensives": null,
      "ClaimRatio": null,
      "SavedFrom": "Owner",
      "UserType": this.userType,
      "SearchFromApi":false,
      "TiraCoverNoteNo": null,
      "EndorsementYn": 'N',
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
      "Ncb":"0",
      "DefenceValue":null,
      "PurchaseDate":null,
      "RegistrationDate": null,
      "Scenarios": {
        "ExchangeRateScenario": {
          "OldAcccessoriesSumInsured": null,
          "OldCurrency": null,
          "OldExchangeRate": null,
          "OldSumInsured": null,
          "OldTppdIncreaeLimit": null,
          "OldWindScreenSumInsured": null
        }
      },
      "AcccessoriesSumInsured": null,
      "AccessoriesInformation": null,
      "AdditionalCircumstances": null,
      "CityLimit": null,
      "CoverNoteNo": null,
      "Gpstrackinginstalled": 'N',
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "MotorCategory": null,
      "RoofRack": null,
      "WindScreenSumInsured": null,
      "SaveOrSubmit": "Save"
    }
    this.vehicleDetails['FleetOwnerYn'] = "N";
    this.vehicleDetails['Active'] = false;
    this.vehicleDetailsList.push(this.vehicleDetails);
    this.motorDetails = null;
    this.productItem=new ProductData();
    this.currentIndex = this.vehicleDetailsList.length;
    this.totalIndex = this.vehicleDetailsList.length;
}
  bdmCode(arg0: string, sourceType: string, bdmCode: any, brokerCode: null, customerCode: any) {
    throw new Error('Method not implemented.');
  }
  onDeleteVehicle(){
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
          let entry = this.vehicleDetailsList[this.currentIndex-1];
          if(entry?.Active!=undefined){
            if(entry.Active==false){
              this.vehicleDetailsList.splice(this.currentGroupIndex-1,1);
              this.currentIndex=1;
              this.totalIndex = this.vehicleDetailsList.length;
              this.motorDetails = null;
              this.productItem=new ProductData();
              this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
             // this.setCommonFormValues();
            }
            else{
              this.onDelete(entry);
            }
          }
          else{
            this.onDelete(entry);
          }
        }
      });
  }
  onDelete(rowData){
    console.log("Entry",rowData)
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "Vehicleid": rowData.Vehicleid,
      "EndtType": null
    }
    let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.vehicleId=null;
          this.motorDetails = null;
            this.getMotorDetails('direct');
        }
      });           
  }
  getMotorDetails(type){
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleDetailsList = data.Result;
            if(data.Result.length!=0){
              for(let veh of data.Result){
                veh['Active'] = true;
              }
              let vehicleDetails = data.Result;
              this.commonDetails = data.Result;
              this.currencyCode = vehicleDetails[0].Currency;
              
              
              
              if(type!='proceedNext'){
                if(this.vehicleId ==null || this.vehicleId==undefined){
                  this.policyStartDate = vehicleDetails[0].PolicyStartDate;
                 // this.policyEndDate = vehicleDetails[0].PolicyEndDate;
                  this.sourceType = vehicleDetails[0]?.SourceTypeId;

                  this.vehicleId = vehicleDetails[0].Vehicleid;
                }
                this.totalIndex = this.vehicleDetailsList.length;
                let index = this.vehicleDetailsList.findIndex(ele=>ele.Vehicleid==this.vehicleId);
                if(index!=null && index!=undefined) this.currentIndex = index+1;
                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
                this.commonDetails = data.Result;
                //this.setCommonFormValues();
              }
              else{
                this.onCreateVehicle();
              }
              
            }
        }
      });
  }
}
