import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  AddUserVisible:boolean=false;
  AddUserPopup: boolean=false;
  editsSection: boolean=false;
  visibleUserDetails:boolean=false;
  companyList: any;loginId:any;
  insuranceId: any;channelId:any="broker";
  productId: string;
  userDetails: any;
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
  userDataList:any[]=[];
  ChangePass: boolean=false;
  branchPopup: boolean=false;
  branchDetailsPopup: boolean=false;
  productPopup: boolean=false;
  addProduct:boolean=false;
  existingProduct:boolean=true;
  brokerValue: any=null;brokerList:any[]=[];
  oaCode: any=null;
  executiveId: any=null;
  policyHolderTypeid: any=null;
  idNumber: any=null;
  userLoginId: any=null;
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
      this.getChannelList('direct');
   }
 
   ngOnInit(){
    //  this.getMobileCodeList();
    //  this.getCountryList();
    this.userDataList=[{
      data1:'frgfhgghf',
      data2:'frgfhgghf',
      data3:'frgfhgghf',
      data4:'frgfhgghf',
      data5:'frgfhgghf',
      data6:'frgfhgghf',
      data7:'frgfhgghf',
    }]
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
            //this.companyList = data.Result;
            //if(this.insuranceId) this.onBrokerChange();
            let obj = [{"Code":null,"CodeDesc":"---Select---"}];
            this.companyList = obj.concat(data?.Result);
        }
      },
      (err) => { },
    );
   }
   getChannelList(type){
      if(type=='change'){
        this.channelId='';
        this.brokerValue='';
      }
      let ReqObj = {
        "UserType": "Broker"
      }
      let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.channelList = data.Result;
            if(this.channelId!='' && this.channelId!=null) this.getBrokersList(type);
          }
        },
        (err) => { },
      );
   }
   getBrokersList(type){
    let ReqObj = {
      "SubUserType": this.channelId,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            
            if(type!='direct'){
              this.userDataList = [];
              this.brokerValue = null;
              let obj = [{"Code":null,"CodeDesc":"---Select---"}];
              this.brokerList = obj.concat(data?.Result);
            }
            else{
              if(data?.Result.length!=0){
                let obj = [{"Code":null,"CodeDesc":"---Select---"}];
                this.brokerList = obj.concat(data?.Result);
                this.brokerValue=this.brokerList[1].BrokerId;
                this.onBrokerChange()
              }
            }
            /*if(this.brokerValue!=undefined && this.insuranceId!=undefined){
              let useObj = {"broker":this.brokerValue,"insuranceId":this.insuranceId};
              sessionStorage.setItem('adduserDetailsObj',JSON.stringify(useObj));
            }*/
             //this.onBrokerChange();
            

        }
      },
      (err) => { },
    );
  }
  onBrokerChange(){
    if(this.insuranceId && this.channelId && this.brokerValue){
      let ReqObj = {
        "UserType": "User",
        "SubUserType":"",
        "InsuranceId": this.insuranceId,
        "OaCode": this.brokerValue,
        "Limit":"0",
        "Offset":"10000",
      }
      let urlLink = `${this.CommonApiUrl}admin/getallusers`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          this.userDataList = data.Result;
          if(this.brokerValue!=undefined && this.insuranceId!=undefined){
            let useObj = {"BrokerId":this.brokerValue,"InsuranceId":this.insuranceId,"channelId":this.channelId,"UserId": null};
            sessionStorage.setItem('userEditDetails',JSON.stringify(useObj));
          }
        },
        (err) => { },
      );
    }
  }
  showDialogBrokerDetails(type){
  if(type=='AddUser'){
      this.AddUserPopup=true;
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
    this.visibleUserDetails=true;
  }
  EditDetailsView(rowData){
    let ReqObj = {"LoginId": rowData.LoginId}
    let urlLink = `${this.CommonApiUrl}admin/getuserbyid`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            //this.cityList = data.Result;
            let loginInformation = data.Result.LoginInformation;
            let PersonalInformation = data.Result.PersonalInformation;
            if(loginInformation){
              if(loginInformation?.Status==null)  loginInformation.Status = 'N';
              if(loginInformation?.EffectiveDateStart!=null){
                this.effectiveDate = loginInformation?.EffectiveDateStart
              }
            }
            this.agencyCode = loginInformation?.AgencyCode;
            //this.loginId = loginInformation?.LoginId;
            this.oaCode = loginInformation?.OaCode;
            this.statusValue = loginInformation?.Status;

            this.subUserType = loginInformation?.SubUserType;
            this.brokerCompanyYn = loginInformation?.BrokerCompanyYn;
            this.insuranceId = loginInformation.InsuranceId;
            this.executiveId = PersonalInformation?.AcExecutiveId;
            this.address1 = PersonalInformation?.Address1;
            this.address2 = PersonalInformation?.Address2;
            this.checkerYN = PersonalInformation?.CheckerYn;
            this.countryCode = PersonalInformation?.CountryCode;
            this.stateCode = PersonalInformation?.StateCode;
            this.policyHolderTypeid = PersonalInformation?.IdType;
            this.idNumber = PersonalInformation?.IdNumber;
            this.onCountryChange('direct');
            //this.onStateChange('direct');
            this.cityCode = PersonalInformation?.CityName;
            this.designation = PersonalInformation?.Designation;
            this.customerCode = PersonalInformation?.CustomerCode;
            this.contactPersonName = PersonalInformation?.ContactPersonName;
            this.coreAppBrokerCode = PersonalInformation?.CoreAppBrokerCode;
            this.commissionVatYN = PersonalInformation?.CommissionVatYn
            this.custConfirmYN = PersonalInformation?.CustConfirmYn;
            this.makerYN = PersonalInformation?.MakerYn;
            this.mobileCode = PersonalInformation?.MobileCode;
            this.pobox = PersonalInformation?.Pobox;
            this.remarks = PersonalInformation?.Remarks;
            this.userMail = PersonalInformation?.UserMail;
            this.userMobile = PersonalInformation?.UserMobile;
            this.userName = PersonalInformation?.UserName;
            this.userLoginId = loginInformation.LoginId;
            this.whatsAppCode = PersonalInformation?.WhatsappCode;
            this.whatsAppNo = PersonalInformation?.WhatsappNo;
            this.vatRegNo = PersonalInformation?.VatRegNo;
            this.AddUserPopup=true;
        }
      });
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
          this.AddUserPopup=false;
          
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
