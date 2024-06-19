import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-insurence-emp',
  templateUrl: './insurence-emp.component.html',
  styleUrls: ['./insurence-emp.component.scss']
})
export class InsurenceEmpComponent {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  AddIssuerVisible:boolean=false;
  AddIssuerPopup: boolean=false;
  editsSection: boolean=false;
  visibleIssuerDetails:boolean=false;
  companyList: any;loginId:any;
  insuranceId: any;channelId:any="broker";
  productId: string;
  IssuerDetails: any;
  subUserType: string;
  channelList: any[]=[];
  loginInformation: any;
  PersonalInformation: any;
  CbcDeposit: any[]=[];
  designation: any;
  contactPersonName: any;
  coreAppBrokerCode: any;
  regulatoryCode: any;
  custConfirmYN: any='Y';
  makerYN: any='Y';
  mobileCode: any='255';
  pobox: any;
  remarks: any;
  userMail: any;
  userMobile: any;
  userName: any;
  brokerLoginId: any;
  whatsAppCode: any='255';
  whatsAppNo: any;
  vatRegNo: any=null;
  countryCode: any;
  cityCode: any;
  cityName: any;
  customerCode: any=null;
  address1: any;
  address2: any;
  companyName: any;
  stateName: any;
  stateCode: any;
  creditLimit: any;
  Status: any;
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
  issuerData:any[]=[];
  ChangePass: boolean=false;
  branchPopup: boolean=false;
  branchDetailsPopup: boolean=false;branchList:any[]=[]
  productPopup: boolean=false;branchIds:any[]=[];
  addProduct:boolean=false;productList:any[]=[];
  ProductsPopup:boolean=false;insuranceIds:any[]=[];
  existingProduct:boolean=true;userDetails:any=null;
  issuerType: any=null;productIds: any[]=[];typeList:any[]=[];
  issuerLoginId: any;
  ReferralIds: any[]=null;
  constructor(private router:Router,
    private sharedService:SharedService,public datePipe:DatePipe) {
     this.productId =  sessionStorage.getItem('companyProductId');
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     const user = this.userDetails?.Result;
 
     this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     this.loginId = user.LoginId;
     this.subUser = sessionStorage.getItem('typeValue');
     let channelId =  sessionStorage.getItem('brokerChannelId');
     //this.insuranceId= sessionStorage.getItem('InsuranceId');
     this.subUserType=channelId;
     if(channelId) this.channelId = channelId;
     this.typeList = [
      { "Code":"SuperAdmin","CodeDesc":"SuperAdmin" },
      { "Code":"low","CodeDesc":"Quotation"},
      { "Code":"high","CodeDesc":"Approver" },
      { "Code":"both","CodeDesc":"Quotation & Approver" },

    ];
      this.getCompanyList();
      this.getCountryList();
      this.getMobileCodeList();
    //  this.getChannelList();
   }
 
   ngOnInit(){
    //  this.getMobileCodeList();
    //  this.getCountryList();
   }
   getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let obj = [{"Code":null,"CodeDesc":"---Select---"}]
            this.countryList = obj.concat(data.Result);
            if(this.countryList.length==2){
              this.countryCode = this.countryList[1].Code;
              this.onCountryChange('change');
            }
        }
      },
      (err) => { },
    );
   }
   getMobileCodeList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj = [{"Code":null,"CodeDesc":"---Select---"}]
            this.mobileCodeList = obj.concat(data.Result);
          }
        },
        (err) => { },
      );
    }
   getCompanyList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    let ReqObj ={
      "BrokerCompanyYn": "N",
      "LoginId": this.loginId
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.issuerType=='SuperAdmin'){
            this.companyList = data.Result;
          }
          else if(this.issuerType!='SuperAdmin'){
            let obj = [{"Code":null,"CodeDesc":"---Select---"}]
            this.companyList = obj.concat(data.Result);
          }
         
            if(this.insuranceId) this.getIssuerList();

        }
      },
      (err) => { },
    );
   }
   getIssuerList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "UserType": "Issuer",
      "SubUserType":"",
      "Limit":"0",
      "Offset":"1000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallissuers`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.issuerData = data.Result;
          }
        },
        (err) => { },
      );
  }
  onIssuerTypeChange(){
    if(this.issuerType!='low'){
          this.productIds = [];
          this.onCompanyChange(null,null,null);
    }
   }
   onCompanyChange(type,branches,products){
    if(this.issuerType=='SuperAdmin'){
        this.branchIds = [];
    }
    else if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList = data.Result;
              console.log(this.productList,"productList");
              
              if(type=='direct'){
                this.productIds = products;
              }
              this.getBranchList(type,branches);
          }
        },
        (err) => { },
      );
    }
  }
  getBranchList(type,branchValue){
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.branchList = data.Result;
              console.log(this.branchList,"this.branchList");
              
              if(type=='direct'){
                this.branchIds = branchValue;
              }
          }
        },
        (err) => { },
      );
  }
  showDialogBrokerDetails(type){
  if(type=='AddIssuer'){
      this.AddIssuerPopup=true;
      this.editsSection;
    }
    else if (type=='editBranchDetail'){
      this.branchDetailsPopup=true;
    }
    else if (type=='Product'){
      this.ProductsPopup=true;
    }
    else if(type=='AddProduct'){
      this.addProduct=true;
      this.existingProduct=false;
    }
  }
  brokerDetailsView(){
    this.visibleIssuerDetails=true;
  }
  EditDetailsView(loginData){
    this.AddIssuerPopup=true;
    this.getEditIssuerDetails(loginData);
  }
  
  passChanged(){
    this.ChangePass=false;
  }
  passwordField(){
    this.ChangePass=true;
  }
  branchDataList(){
    alert()
    this.branchPopup=true;
  }
  onProceed() {

    if (this.editSection && this.changePasswordYN=='N') {
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
            this.onSubmit();
            console.log('gggggggg', this.brokerLoginId)

          }
        }

      }



    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }

  getEditIssuerDetails(issuerId){
    this.editSection=true;
    let ReqObj = {
      "LoginId": issuerId.LoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getissuerbyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let loginInformation = data?.Result?.LoginInformation;
          let personalInfo = data?.Result?.PersonalInformation;
          if(loginInformation?.Status==null)  loginInformation.Status = 'N';
            if(loginInformation?.EffectiveDateStart!=null){
              this.effectiveDate = this.onDateFormatInEdit(loginInformation?.EffectiveDateStart)
            }
          //this.insuranceId = loginInformation?.InsuranceId;
          this.onCompanyChange('direct',loginInformation?.AttachedBranches,loginInformation?.ProductIds)

          // let n=sessionStorage.getItem('ReferralId')
          // if(n!="null" || n!=undefined){
          // this.ReferralIds.push(n);
          // }
          alert(personalInfo?.UserName)
          this.userName = personalInfo?.UserName;
          this.userMobile = personalInfo?.UserMobile;
          this.userMail = personalInfo?.UserMail;
         
          this.agencyCode = loginInformation?.AgencyCode;
          this.issuerLoginId = loginInformation?.LoginId;
          this.statusValue = loginInformation?.Status;
          this.issuerType = loginInformation?.SubUserType;
          if(loginInformation?.AttachedCompanies){
            if(loginInformation?.AttachedCompanies.length!=0){
              if(this.issuerType=='SuperAdmin') this.insuranceIds = loginInformation?.AttachedCompanies;
              else this.insuranceId = loginInformation?.AttachedCompanies[0];
            }
          }
          this.address1 = personalInfo?.Address1;
          this.address2 = personalInfo?.Address2;
          this.countryCode = personalInfo?.CountryCode;
          this.stateCode = personalInfo?.StateCode;
          this.onCountryChange('direct');
          this.onStateChange('direct')
          this.cityName = personalInfo?.CityName;
          this.mobileCode = personalInfo?.MobileCode;
          this.whatsAppCode = personalInfo?.WhatappCode;
          this.whatsAppNo = personalInfo?.WhatsappNo;
          this.remarks = personalInfo?.Remarks;
          this.ReferralIds=null;
        }
      },
      (err) => { },
    );
}
onDateFormatInEdit(date) {
  if (date) {
    let format = date.split('-');
    if(format.length >1){
      var NewDate = new Date(new Date(format[0], format[1], format[2]));
      NewDate.setMonth(NewDate.getMonth() - 1);
      return NewDate;
    }
    else{
      format = date.split('/');
      if(format.length >1){
        //var NewDate = new Date(new Date(format[2], format[1], format[0]));
        //NewDate.setMonth(NewDate.getMonth() - 1);
        let NewDate = format[2]+'-'+format[1]+'-'+format[0];
        return NewDate;
      }
    }
  }
}
  // getEditBrokerDetails(value){
  //   // this.editSection=true;
  //   // this.userName=value.UserName;
  //   // this.issuerType=value.SubUserType;
  //   // this.insuranceIds=value.AttachedCompanies;
  //   // this.insuranceId=value.InsuranceId;
  //   // this.productIds=value.ProductIds;
  //   // this.branchIds=value.AttachedBranches;
  //   // this.address1=value.Address1;
  //   // this.address2=value.Address2;
  //   // this.userMail=value.UserMail;
  //   // this.countryCode=value.CountryCode;
  //   // this.stateCode=value.StateCode;
  //   // this.cityCode=value.CityName;
  //   // this.mobileCode=value.MobileCode;
  //   // this.userMobile=value.UserMobile;
  //   // this.whatsAppCode=value.WhatappCode;
  //   // this.whatsAppCode=value.WhatsappNo;
  //   // this.issuerLoginId=value.LoginId;
  //   // //this.changePasswordYN=value.ChangePasswordYN;
  //   // this.password=value.Password;
  //   // this.effectiveDate=value.EffectiveStartDate;
  //   // this.remarks=value.Remarks;
  //   // this.statusValue=value.Status;
  //   // this.effectiveDate=value.EffectiveStartDate;
  //   // this.remarks=value.Remarks;

  // }
  onSubmit() {
    let referral:any;
    if(this.ReferralIds!=null){
    referral=this.ReferralIds;
    }
    else{
      referral=[];
    }
    if(this.issuerType!='SuperAdmin' && this.insuranceId!=null && this.insuranceId!=undefined){
      this.insuranceIds=[];
      this.insuranceIds.push(this.insuranceId);
    }
    else this.insuranceId = null;
    let ReqObj = {
      
      "LoginInformation": {
        "LoginId": this.issuerLoginId,
        "UserType": "Issuer",
        "SubUserType": this.issuerType,
        "Createdby": this.loginId,
        "OaCode": this.agencyCode,
        "AgencyCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
         "AttachedBranches": this.branchIds,
         "AttachedCompanies" : this.insuranceIds ,
        "ProductIds": this.productIds,
        "InsuranceId": this.insuranceId,
        "EffectiveDateStart": this.effectiveDate,
        "ReferralIds": referral

      },
      "PersonalInformation": {
        "Address1": this.address1,
        "Address2": this.address2,
        "CityName": this.cityCode,
        "StateCode":this.stateCode,
        "CountryCode": this.countryCode,
        "MobileCode": this.mobileCode,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "WhatappCode": this.whatsAppCode,
        "WhatsappNo": this.whatsAppNo
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
          this.AddIssuerPopup=false;
          
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
onCountryChange(type) {
  let ReqObj = {
    "CountryId": this.countryCode
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let obj = [{"Code":null,"CodeDesc":"---Select---"}]
      this.stateList = obj.concat(data.Result);
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
      let obj = [{"Code":null,"CodeDesc":"---Select---"}]
      this.cityList = obj.concat(data.Result);
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

}
