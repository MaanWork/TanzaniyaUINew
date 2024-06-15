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
  Status: any;
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
  password: any;
  statusValue: String='Y';
  effectiveDate: any;
  changePasswordYN: string='N';
  repassword: null;
  bankCode: null;
  subUser: string;
  branchData: any[]=[];
  AddUserPopup: boolean=false;
  userDataList: any[]=[];
 
  
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
    else if (type=='Branch'){
      // this.branchPopup=true;
      // this.getBrokerBranchList();
    }
    else if (type=='Deposit'){
      this.depositPopup=true;
    }
    else if (type=='PaymentTypes'){
      this.paymentTypesPopup=true;
    }
    else if (type=='Product'){
      this.productPopup=true;
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
  // geChannelList(){
  //   let ReqObj = {
  //     "UserType": "Broker"
  //   }
  //   let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       if (data.Result) {
  //         this.channelList = data.Result;
  //         if(this.channelList.length!=0){
  //           if(this.channelId){
  //               let entry = this.channelList.some(ele=>ele.Code==this.channelId);
  //               if(!entry){
  //                 if(this.channelList.some(ele=>ele.Code=='broker')){
  //                   this.channelId='broker';
  //                 }
  //                 else{this.channelId = this.channelList[0].Code;}
  //               }
  //           }
  //           else if(this.channelList.some(ele=>ele.Code=='broker')){
  //             this.channelId='broker';
  //           }
  //           else{this.channelId = this.channelList[0].Code;}
  //           if(this.insuranceId)this.getBrokerList();
  //         }
  //       }
  //     },
  //     (err) => { },
  //   );
  // }
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
          this.editsSection = true;
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
      this.onSubmit();
    }
    else {
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
          else {
            alert("else")
            this.onSubmit();
            console.log('gggggggg', this.brokerLoginId)

          }
        }

      }



    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }


  /*pass(){
    if(this.password!=undefined || this.password!=null || this.password!="" ){
      if(this.repassword!=undefined || this.repassword!=null || this.repassword!=""){
        if(this.password!=this.repassword){
          this.Toaster.open({
            text:'Passwords are MisMatching',
            caption: 'password Details',
            type: 'danger',
          });      
      }
      else{             
        this.onSubmit();    
        console.log('gggggggg',this.brokerLoginId)
       
      }
      }
     
    }
  
  }*/
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
    sessionStorage.setItem('brokerLoginId',this.brokerLoginId)
    let ReqObj = {
      "LoginId": this.brokerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          
          this.branchData = data?.Result;
        }
      },
      (err) => { },
    );

  }
  branchDataList(value){
    this.branchPopup=true;
    this.getBrokerBranchList(value);
  }
}
