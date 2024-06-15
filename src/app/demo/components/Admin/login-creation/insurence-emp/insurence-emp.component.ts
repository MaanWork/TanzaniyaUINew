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
  IssuerDataList:any[]=[];
  ChangePass: boolean=false;
  branchPopup: boolean=false;
  branchDetailsPopup: boolean=false;
  productPopup: boolean=false;
  addProduct:boolean=false;
  existingProduct:boolean=true;userDetails:any=null;
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
    //  this.getCompanyList();
    //  this.getChannelList();
   }
 
   ngOnInit(){
    //  this.getMobileCodeList();
    //  this.getCountryList();
    this.IssuerDataList=[{
      data1:'frgfhgghf',
      data2:'frgfhgghf',
      data3:'frgfhgghf',
      data4:'frgfhgghf',
      data5:'frgfhgghf',
      data6:'frgfhgghf',
      data7:'frgfhgghf',
    }]
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
      this.productPopup=true;
    }
    else if(type=='AddProduct'){
      this.addProduct=true;
      this.existingProduct=false;
    }
  }
  brokerDetailsView(){
    this.visibleIssuerDetails=true;
  }
  EditDetailsView(login){
    this.AddIssuerPopup=true;
   // this.getEditBrokerDetails(login);
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
}
