import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent {
  tableData:any[]=[];
  brokerDialogVisible:boolean=false;
  visibleBrokerDetails:boolean=false;
  ChangePass:boolean=false;
  branchPopup:boolean=false;
  coverPopup:boolean=false;
  depositPopup:boolean=false;
  paymentTypesPopup:boolean=false;
  paymentTypesDetailPopup:boolean=false;
  productPopup: boolean=false;
  branchDetailsPopup:boolean=false;
  addProduct:boolean=false;
  existingProduct:boolean=true;
  paymentTable:boolean=true;
  paymentTableAdd:boolean=false;
  ExistingPaymentAddPopup:boolean=false;
  brokerHeader:any[]=[];
  brokerData:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  companyList: any;loginId:any;
  insuranceId: any;channelId:any="broker";
  productId: string;
  userDetails: any;
  subUserType: string;
  channelList: any[]=[];
  editsSection: boolean=false;
  loginInformation: any;
  PersonalInformation: any;
  CbcDeposit: any[]=[];
  designation: any;
  contactPersonName: any;
  coreAppBrokerCode: any;
  regulatoryCode: any;
  custConfirmYN: any='Y';
  makerYN: any='Y';
  mobileCode: any;
  pobox: any;
  remarks: any;
  userMail: any;
  userMobile: any;
  userName: any;
  brokerLoginId: any;
  whatsAppCode: any;
  whatsAppNo: any;
  vatRegNo: any=null;
  countryCode: any;
  cityCode: any;
  cityName: any;
  customerCode: any;
  address1: any;
  address2: any;
  companyName: any;
  stateName: any;
  stateCode: any;
  creditLimit: any;
  newList: any[]=[];
  newslist: any[]=[];
  brokerProductList: any[]=[];
  mobileCodeList: any[]=[];
  countryList:any[]=[];
  editSection: boolean=false;
  stateList: any;
  cityList: any;
  agencyCode: any=null;
  brokerCompanyYn: any;
  taxExcemptedYN: any='N';
  taxExcemptedCode: any;
  companyCode: any;
  commissionVatYN: any='N';
  checkerYN: any='Y';
  cbcno: any=null;
  password: any = null;
  statusValue: String='Y';
  Status: String='Y'
  effectiveDate: any;
  changePasswordYN: string='N';
  repassword:  any = null;
  bankCode: null;
  subUser: string;
  branchData: any[]=[];
  AddUserPopup: boolean=false;
  userDataList: any[]=[];
  branchName: any;
  brokerBranchName: any;
  branchType: any;
  salePointCode: any;
  email: any;
  mobile: any;
  subInsuranceId: any=null;
  subSourceId: any;
  DepartmentCode: any;
  AttachedBranchCode: any;
  BranchCode: any;
  BrokerBranchCode: any;
  selectedProductList: any[]=[];
  productData: any[];
  customerSearchvisible:boolean=false;
  position: string = 'top';
  userNameError: boolean=false;
  customerCodeError: boolean=false;
  stateCodeError: boolean=false;
cityCodeError: boolean=false;
userMailError: boolean=false;
mobileCodeError: boolean=false;
userMobileError: boolean=false;
coreAppBrokerCodeError: boolean=false;
regulatoryCodeError: boolean=false;
creditLimitError: boolean=false;
brokerLoginIdError: boolean=false;
effectiveDateError: boolean=false;
remarksError: boolean=false;
  searchList: any[]=[];
  searchLengthSection: boolean=false;
  sampleCustomerCode: any=null;
  searchValue:any;
  sampleCustomerName: any;
 
  
  constructor(private router:Router,
   private sharedService:SharedService,public datePipe:DatePipe) {
    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.brokerProductList=user.BrokerCompanyProducts;

    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = user.LoginId;
    this.subUser = sessionStorage.getItem('typeValue');
    let channelId =  sessionStorage.getItem('brokerChannelId');
    //this.insuranceId= sessionStorage.getItem('InsuranceId');
    this.subUserType=channelId;
    if(channelId) this.channelId = channelId;
    this.getCompanyList();
    this.getChannelList();
  }

  ngOnInit(){
    this.getMobileCodeList();
    this.getCountryList();
    
    let com = sessionStorage.getItem('editBroker');
    if (com) {
      this.editsSection = false;
      
    }
    else {
      let channelId =  sessionStorage.getItem('brokerChannelId');
      if(channelId) this.subUserType = channelId;
      this.editsSection = true;
    }
  }
  getChannelList() {
    let ReqObj = {
      "UserType": "Broker"
    }
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.channelList = data.Result;
          

        }
      },
      (err) => { },
    );
  }
  showDialogBrokerDetails(type){
    if(type=='AddBroker'){
      this.brokerDialogVisible=true;
      // this.formRest()
      this.editsSection;
    }
    else if(type=='AddUser'){
      this.AddUserPopup=true;
     
    }
    else if(type=='branchDetail'){
      this.branchDetailsPopup=true;
     
    }
    else if(type=='AddProduct'){
      this.addProduct=true;
      this.existingProduct=false;
    }
    else if(type=='ProductCancel'){
      this.addProduct=false;
      this.existingProduct=true;

    }
    else if(type=='DepositAdd'){
      this.paymentTable=false;
      this.paymentTableAdd=true;

    }
    
    else if(type=='PaymentAddCancel'){
      this.paymentTable=true;
      this.paymentTableAdd=false;

    }
    else if(type=='paymentTableAdd'){
      this.ExistingPaymentAddPopup=true
    }
    else if(type=='paymentTableAdd'){
      this.ExistingPaymentAddPopup=true
    }
    else if(type=='paymentTableAddCancel'){
      this.ExistingPaymentAddPopup=false;
    }
  }
  brokerDetailsView(loginId){
    this.visibleBrokerDetails=true;
    this.getEditBrokerDetails(loginId);
    this.editSection = true;
  }
  passwordField(){
this.ChangePass=true;
  }
  passChanged(){
    this.ChangePass=false;
  }
  ConfigPopUp(type){
    if(type=='Cover'){
      this.coverPopup=true;
    }
    else if (type=='Deposit'){
      this.depositPopup=true;
    }
    else if (type=='PaymentTypes'){
      this.paymentTypesPopup=true;
    }
    else if (type=='paymentDetail'){
      this.paymentTypesDetailPopup=true;
    }
    else if (type=='paymentDetailCancel'){
      this.paymentTypesDetailPopup=false;
    }
  }
  changebroker(){
    if(this.channelId!=null && this.channelId!=undefined && this.channelId!=''){
      this.getBrokerList();
    }
  }
  EditDetailsView(login){
    this.brokerDialogVisible=true;
    this.getEditBrokerDetails(login);
  }
  getMobileCodeList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.mobileCodeList = data.Result;
          

        }
      },
      (err) => { },
    );
  }
  
  getCompanyList(){
    let ReqObj ={
      "LoginId": this.loginId
      }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.companyList = data.Result;
            if(this.companyList.length!=0){
              this.insuranceId = this.companyList[0].Code;
              if(this.channelId) this.getBrokerList();
            }
        }
      },
      (err) => { },
    );
   }
   getBrokerList(){
    if(this.insuranceId!=null && this.channelId!=null){
      sessionStorage.setItem('brokerChannelId',this.channelId);
      let ReqObj = {
        "UserType": "Broker",
        "SubUserType":this.channelId,
        "Limit":"0",
        "Offset":"1000",
        "InsuranceId":this.insuranceId
        }
        let urlLink = `${this.CommonApiUrl}admin/getallbrokers`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result){
              this.brokerData = data.Result;
             
            }
          },
          (err) => { },
        );
    }
    
  }
  getEditBrokerDetails(brokerId) {
    let ReqObj = { "LoginId": brokerId }
    let urlLink = `${this.CommonApiUrl}admin/getbrokerbyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.cityList = data.Result;
          this.editSection = true;
          this.loginInformation = data.Result.LoginInformation;
          this.PersonalInformation = data.Result.PersonalInformation;
          this.CbcDeposit= data.Result.DepositCbc;
           this.designation = this.PersonalInformation.Designation;
          this.contactPersonName = this.PersonalInformation.ContactPersonName;
          this.coreAppBrokerCode = this.PersonalInformation.CoreAppBrokerCode;
          this.regulatoryCode = this.PersonalInformation.RegulatoryCode;
          //this.cityCode = PersonalInformation?.CityName;
          this.custConfirmYN = this.PersonalInformation.CustConfirmYn;
          this.makerYN = this.PersonalInformation.MakerYn;
          this.mobileCode = this.PersonalInformation.MobileCode;
          this.pobox = this.PersonalInformation.Pobox;
          this.remarks = this.PersonalInformation.Remarks;
          this.userMail = this.PersonalInformation.UserMail;
          this.userMobile = this.PersonalInformation.UserMobile;
          this.userName = this.PersonalInformation.UserName;
          this.brokerLoginId = this.loginInformation.LoginId;
          this.whatsAppCode = this.PersonalInformation.WhatsappCode;
          this.whatsAppNo = this.PersonalInformation.WhatsappNo;
          this.vatRegNo = this.PersonalInformation.VatRegNo;
          this.countryCode = this.PersonalInformation.CountryCode;
          this.cityCode = this.PersonalInformation.CityCode;
          this.cityName = this.PersonalInformation.CityName;
          this.customerCode = this.PersonalInformation.CustomerCode;
          this.address1 = this.PersonalInformation?.Address1;
           this.address2 = this.PersonalInformation?.Address2;
           this.companyName=this.PersonalInformation?.CompanyName;
           this.stateCode = this.PersonalInformation?.StateCode;
           this.stateName= this.PersonalInformation?.StateName;
           this.Status= this.loginInformation.Status;
           this.creditLimit= this.PersonalInformation?.CreditLimit;
           this.effectiveDate= this.loginInformation?.EffectiveDateStart;
          
      if(this.stateCode && this.cityCode)
           this.onCountryChange(this.stateCode);
        }
      },
      (err) => { },
    );
  }
  getCountryList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.countryList = data.Result;
          let brokerId = sessionStorage.getItem('editBroker');
          if (brokerId) {
           // this.getEditBrokerDetails(brokerId);
            this.editSection = true;
          }
          else {
            // this.getInsuranceList('change', this.insuranceId);
            // this.getBankList();
            if(this.countryList.length!=0){
              if(this.countryList.find(ele=>ele.Code=='TZS')){
                this.countryCode = this.countryList.find(ele=>ele.Code=='TZS')?.Code;
              }
              else this.countryCode = this.countryList[0].Code;
              this.onCountryChange('change');
            }
            this.mobileCode = '255';
            this.whatsAppCode = '255';
            this.editSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  onCountryChange(type) {
    let ReqObj = {
      "CountryId": this.countryCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if (type == 'change') {
          this.stateCode = null;
          this.cityCode = null;
        }
        else {
          this.onStateChange('direct');
        }
      },
      (err) => { },
    );
  }
  onStateChange(type) {
    let ReqObj = {
      "CountryId": this.countryCode,
      "RegionCode": this.stateCode
    }
    let urlLink:any=null;
    if(this.insuranceId!='100020') urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
    else urlLink = `${this.CommonApiUrl}master/dropdown/stategroups`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.cityList = data?.Result;
        if (type == 'change') {
          this.cityCode = null;
        }
        else if(this.cityCode!=null){
          let entry = this.cityList.find(ele=>ele.Code==this.cityCode);
          if(!entry) this.cityCode = null;
        }
      },
      (err) => { },
    );
  }
  onProceed() {
    
    if (this.editSection && this.changePasswordYN=='N') {
     alert("if")
     let entry = this.checkValidation();
     if(entry){
      this.onSubmit();
     }
      
    }
    else {
      let entry = this.checkValidation();
      if(entry){
      if (this.password == null || this.password == "" || this.password == undefined) {
               Swal.fire({
                  title: '<strong>Password Details</strong>',
                  icon: 'error',
                  html:
                    `Please enter Password`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Error!',
                })
        // this.Toaster.open({
        //   text: 'Please enter Password',
        //   caption: 'password Details',
        //   type: 'danger',
        // });
      }
      else if (this.repassword == null || this.repassword == "" || this.repassword == undefined) {
          Swal.fire({
            title: '<strong>Password Details</strong>',
            icon: 'error',
            html:
              `Please enter Re-Password`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton:false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Error!',
          })
      }

      else if (this.password != undefined || this.password != null || this.password != "") {
        if (this.repassword != undefined || this.repassword != null || this.repassword != "") {
          if (this.password != this.repassword) {
            Swal.fire({
              title: '<strong>Password Details</strong>',
              icon: 'error',
              html:
                `Passwords are MisMatching`,
              showCloseButton: true,
              focusConfirm: false,
              showCancelButton:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Error!',
            })
            // this.Toaster.open({
            //   text: 'Passwords are MisMatching',
            //   caption: 'password Details',
            //   type: 'danger',
            // });
          }
        }
          else {
            this.onSubmit();
            console.log('gggggggg', this.brokerLoginId)

          }
        }

      }



    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }
  onSubmit() {

    if (this.commissionVatYN == 'N') this.vatRegNo = null;
    let bankCode = null;
    if (this.subUserType == 'bank' && this.bankCode != null && this.bankCode != undefined) bankCode = this.bankCode
    let creditLimit = null;
    if(this.creditLimit){
      if(this.creditLimit.includes(',')) {//creditLimit = this.creditLimit.replace(',',''); 
        creditLimit = this.creditLimit.replace(/,/g, '');
      console.log('KKKKKKKKKKKKKKK',this.creditLimit);
    }
      else {creditLimit = this.creditLimit;}
    }
    console.log('this', this.brokerCompanyYn)
    if (this.brokerCompanyYn == null || this.brokerCompanyYn == '' || this.brokerCompanyYn == undefined) {
      this.brokerCompanyYn = 'N';

      console.log('bbbbbbbbb', this.brokerCompanyYn)
    }
    let cityName = null;
    if(this.cityCode!=null && this.cityCode!=''){
      let entry = this.cityList.find(ele=>ele.Code==this.cityCode);
      if(entry) cityName = entry.CodeDesc;
    }
    if(this.taxExcemptedYN=='N') this.taxExcemptedCode=null;
   
    let ReqObj = {
      "LoginInformation": {
        "AgencyCode": this.agencyCode,
        "BankCode": bankCode,
        "BrokerCompanyYn": this.brokerCompanyYn,
        "Createdby": this.loginId,
        "EffectiveDateStart": this.effectiveDate,
        "InsuranceId": this.insuranceId,
        "LoginId": this.brokerLoginId,
        "OaCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
        "SubUserType": this.subUserType,
        "UserType": "Broker",
        "CbcNo":this.cbcno
      },
      "PersonalInformation": {
        "AcExecutiveId": "5",
        "Address1": this.address1,
        "Address2": this.address2,
        "Address3": "None",
        "ApprovedPreparedBy": this.loginId,
        "CheckerYn": this.checkerYN,
        "CityCode": this.cityCode,
        "CityName": cityName,
        "StateCode": this.stateCode,
        "CommissionVatYn": this.commissionVatYN,
        "CompanyName": this.companyCode,
        "ContactPersonName": this.contactPersonName,
        "CoreAppBrokerCode": this.coreAppBrokerCode,
        "RegulatoryCode": this.regulatoryCode,
        "CountryCode": this.countryCode,
        "CustConfirmYn": this.custConfirmYN,
        "Designation": this.designation,
        "Fax": "0",
        "MakerYn": this.makerYN,
        "CreditLimit": creditLimit,
        "TaxExemptedYn": this.taxExcemptedYN,
        "TaxExemptedCode": this.taxExcemptedCode,
        "Pobox": this.pobox,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "MobileCode": this.mobileCode,
        "WhatsappCode": this.whatsAppCode,
        "WhatsappNo": this.whatsAppNo,
        "VatRegNo": this.vatRegNo,
        "CustomerCode":this.customerCode
      }
    }
    if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      ReqObj.LoginInformation['EffectiveDateStart'] = this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let doc = null;
    let urlLink = `${this.CommonApiUrl}admin/createbroker`;
    this.sharedService.onPostBrokerDocumentMethodSync(urlLink, ReqObj,doc).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          console.log('HHHHHHHHHHHHHHH',data.Result);
          sessionStorage.setItem('editBroker',this.brokerLoginId);
          sessionStorage.setItem('editBrokerAgencyCode', data.Result.AgencyCode);
          let entry = {
            "loginId": this.brokerLoginId,
            "brokerId": this.agencyCode,
            "insuranceId": this.insuranceId,
            "brokerCompanyYN": this.brokerCompanyYn,
            "UserType": "Broker",
            "RegulatoryCode": this.regulatoryCode,
            "SubUserType": this.subUserType,
            "CustomerCode": this.customerCode
          }
          sessionStorage.setItem('brokerConfigureDetails', JSON.stringify(entry));
          this.formRest()
          this.brokerDialogVisible=false;
          
        }
        else if (data.ErrorMessage) {
          for (let entry of data.ErrorMessage) {
          }
          console.log("Error Iterate", data.ErrorMessage)
        }
      },
      (err) => { },
    );
  }
  checkValidation(){
    alert();
    let i=0
    if(this.customerCode!=null && this.customerCode!='' && this.customerCode!=undefined) {i+=1;this.customerCodeError=false;}
    else this.customerCodeError=true;
    if(this.userName!=null && this.userName!='' && this.userName!=undefined) {i+=1;this.userNameError=false;}
    else this.userNameError=true;
    if(this.stateCode!=null && this.stateCode!='' && this.stateCode!=undefined) {i+=1;this.stateCodeError=false;}
    else this.stateCodeError=true;
    if(this.cityCode!=null && this.cityCode!='' && this.cityCode!=undefined) {i+=1;this.cityCodeError=false;}
    else this.cityCodeError=true;

    if(this.userMail!=null && this.userMail!='' && this.userMail!=undefined) {i+=1;this.userMailError=false;}
    else this.userMailError=true; 
    if(this.mobileCode!=null && this.mobileCode!='' && this.mobileCode!=undefined) {i+=1;this.mobileCodeError=false;}
    else this.mobileCodeError=true;
    if(this.userMobile!=null && this.userMobile!='' && this.userMobile!=undefined) {i+=1;this.userMobileError=false;}
    else this.userMobileError=true;
    if(this.coreAppBrokerCode!=null && this.coreAppBrokerCode!='' && this.coreAppBrokerCode!=undefined) {i+=1;this.coreAppBrokerCodeError=false;}
    else this.coreAppBrokerCodeError=true;
    if(this.regulatoryCode!=null && this.regulatoryCode!='' && this.regulatoryCode!=undefined) {i+=1;this.regulatoryCodeError=false;}
    else this.regulatoryCodeError=true;
    if(this.creditLimit!=null && this.creditLimit!='' && this.creditLimit!=undefined) {i+=1;this.creditLimitError=false;}
    else this.creditLimitError=true;
    if(this.brokerLoginId!=null && this.brokerLoginId!='' && this.brokerLoginId!=undefined) {i+=1;this.brokerLoginIdError=false;}
    else this.brokerLoginIdError=true;
    if(this.effectiveDate!=null && this.effectiveDate!='' && this.effectiveDate!=undefined) {i+=1;this.effectiveDateError=false;}
    else this.effectiveDateError=true;
    if(this.remarks!=null && this.remarks!='' && this.remarks!=undefined) {i+=1;this.remarksError=false;}
    else this.remarksError=true;
    return i==0;
  }
  formRest(){
        this.customerCode=''
        this.regulatoryCode=''
        this.insuranceId=''
        this.brokerLoginId=''
        this.whatsAppNo=''
        this.whatsAppCode=''
        this.mobileCode=''
        this.userName=''
        this.userMobile=''
        this.userMail=''
        this.remarks=''
        this.pobox=''
        this.creditLimit=''
        this.taxExcemptedCode=''
        this.taxExcemptedYN=''
        this.designation=''
        this.countryCode=''
        this.coreAppBrokerCode=''
        this.contactPersonName=''
        this.companyCode=''
        this.stateCode=''
        this.cityName=''
        this.cityCode=''
        this.loginId=''
        this.address2=''
        this.address1=''
        this.subUserType=''
        this.statusValue=''
        this.effectiveDate=''
        this.brokerCompanyYn=''
        this.cbcno=''
  }

  getBrokerBranchList(LoginId){
    this.getEditBrokerDetails(LoginId);
    //let brokerLoginId =sessionStorage.getItem('brokerLoginId')
    let ReqObj = {
      "LoginId": LoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.branchData = data?.Result;
          console.log(this.branchData,this.branchData)
        }
      },
      (err) => { },
    );

  }
  branchDataList(value){
    //sessionStorage.setItem('brokerLoginId',value)
    this.branchPopup=true;
    this.getBrokerBranchList(value);
  }
  ProductDataList(value){
    //sessionStorage.setItem('brokerLoginId',value)
    this.productPopup=true;
    this.getOptedProductDetails(value);
  }

  editBranch(value){
    this.branchDetailsPopup=true;
      this.brokerBranchName=value.BrokerBranchName;
      this.branchName=value.BranchName;
      this.branchType=value.BranchType;
      this.salePointCode=value.SalePointCode;
      this.address1=value.Address1;
      this.address2=value.Address2;
      this.email=value.Email;
      this.mobile=value.Mobile;
      this.effectiveDate=value.EffectiveDateStart;
      this.remarks=value.Remarks;
      this.Status=value.Status;
      this.subSourceId = value.SourceType;
      this.DepartmentCode="11";
      this.AttachedBranchCode=value.AttachedBranchCode;
      this.BranchCode=value.BranchCode;
      this.BrokerBranchCode=value.BrokerBranchCode;
      
  }
  onFormSubmit(){
    console.log('kkkkkkkkkk',this.customerCode);
    let ReqObj = {
      "Address1": this.address1,
      "Address2": this.address2,
      "BranchCode": this.BranchCode,
      "AttachedCompany": this.subInsuranceId,
      "BrokerBranchCode": this.BrokerBranchCode,
      "BranchType":this.branchType,
      "BrokerBranchName": this.branchName,
      "CreatedBy": this.loginId,
      "Email": this.email,
      "EffectiveDateStart": this.effectiveDate,
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId,
      "Mobile": this.mobile,
      "Remarks": this.remarks,
      "Status": this.Status,
      "SourceType":this.subSourceId,
      "DepartmentCode":this.DepartmentCode,
      "SalePointCode":this.salePointCode,
      "AttachedBranchCode":this.AttachedBranchCode
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/attachbranches`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
         
          this.branchDetailsPopup=false;
          this.branchPopup=false;
      
        }
        else if(data.ErrorMessage){
         
          console.log("Error Iterate",data.ErrorMessage)
         
      }
      },
      (err) => { },
    );
  }
  getOptedProductDetails(LoginId){
    this.newList =[];
    this.newslist=[];
    let ReqObj = {
      "LoginId": LoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit":"0",
      "Offset":"100000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanylistproduct`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
              let selectedList = data.Result;
              this.newList =[];
              this.newslist=[];
              console.log('KKKKKKKKKK',selectedList);
              if(selectedList.length!=0){
                let i=0;
                 
                  for(let product of selectedList){
                      // product['SelectedYN'] = 'Y';
                      if(product?.CreditYn==null) product.CreditYn = 'N';
                      if(product?.CheckerYn==null) product.CheckerYn = 'N';
                      if(product?.SumInsuredEnd!=null){product.SumInsuredEnd =String(product?.SumInsuredEnd).split('.')[0]; this.CommaFormatted(product);}
                      if (product?.EffectiveDateStart != null) {
                        product['EffectiveDate'] = this.newList;
                        this.newslist;(product?.EffectiveDateStart)
                      }
                      // if(product.SelectedYn=='Y'){
                      //   this.newList = selectedList;
                      // }
                      if(product.SelectedYn!='Y'){
                        this.newslist.push(product);
                        // this.newslist=this.selectedList[i];
                        console.log('MMMMMMMMMM',this.newslist);
                      }
                      else{
                        this.newList.push(product);
                        //this.newList=this.selectedList[i];
                        console.log('RRRRRRRRRRR',this.newList);
                      }
                    
                      i+=1;
                      if(i==selectedList.length){
                        this.selectedProductList= this.newslist;
                        // this.dataSource = new MatTableDataSource(this.selectedProductList);
                        // this.dataSource.sort = this.sort;
                        // this.dataSource.paginator = this.paginator;
                        // console.log('Paginatorsss',this.dataSource.paginator);
                        // this.applyFilter(this.filterValue);
                        // console.log('OOOOOOOOOOOOOOO',this.dataSource);
                        this.editSection = false;
                        
                        //this.getNonOptedProctList();
                      }
                      if(this.newList.length!=0){
                        //  this.dataSource1 = new MatTableDataSource(this.newList);
                        // this.dataSource1.sort = this.sort;
                        // this.dataSource1.paginator = this.secondPaginator;
                        //  console.log('OOOOOOOOOOOOOOO',this.secondPaginator,this.dataSource1);
                        // this.applyFilters(this.filterValue);
                             }
                  }
                  // if(this.selectedList.length-1 == i){
                  //   this.LossList = this.newList;
                  //   console.log('JJJJJJJJJJJJJ',this.LossList);
                  // }
              }
              else{
                this.selectedProductList = [];
                this.productData = this.selectedProductList;
                // this.dataSource = new MatTableDataSource(this.productData);
                // this.dataSource.sort = this.sort;
                // this.dataSource.paginator = this.paginator;
                // this.applyFilter(this.filterValue);
                this.editSection = false;
                //this.getNonOptedProctList();
              }
            }
      },
      (err) => { },
    );
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2] + '-' + format[1] + '-' + format[0];
          return NewDate;
        }
      }
    }
  }
  CommaFormatted(rowData) {

    // format number
    if (rowData?.SumInsuredEnd) {
      rowData.SumInsuredEnd = rowData?.SumInsuredEnd.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  onSearchCustomer(value){
    this.searchList =[];
      if(value=='' || value==null || value==undefined || value.length<3){
        this.searchLengthSection = true;
      }
      else{
        this.searchLengthSection = false;
        let ReqObj ={
          "BranchCode": null,
          "InsuranceId": this.insuranceId,
          "SearchValue": value,
          "SourceType":this.subUserType
        }
        let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
                console.log("Searched Data",data);
                if(data.Result.length!=0){
                  if(data.Result.length==1){
                    if(data.Result[0].CustomerCode!=null){
                      this.searchList = data.Result;
                    }
                  }
                  else this.searchList = data.Result;
                }
          },
          (err) => { },
        ); 
      }
  }
  selectProduct(value){
    this.sampleCustomerCode=value.CustomerCode;
    this.sampleCustomerName=value.CustomerName;
  }
  SaveCustomer(){
    this.customerSearchvisible=false;
    this.customerCode=this.sampleCustomerCode;
    this.userName=this.sampleCustomerName;
    this.coreAppBrokerCode=this.sampleCustomerCode;
    this.getTiraNo();
  }
  getTiraNo(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "PremiaCode": this.customerCode
    }
    let urlLink = `${this.motorApiUrl}api/getbrokertiracode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.Result){
            this.regulatoryCode = data.Result.Code;
          }
      },
      (err) => { },
    ); 
  }
}
