import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.scss']
})
export class LoginCreationComponent {
  tabIndex: any=0;
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
  insuranceId: any;channelId:any=null;
  productId: string;
  userDetails: any;
  subUserType: string;
  channelList: any[]=[];
  editsSection: boolean;
  loginInformation: any;
  PersonalInformation: any;
  CbcDeposit: any[]=[];
  designation: any;
  contactPersonName: any;
  coreAppBrokerCode: any;
  regulatoryCode: any;
  custConfirmYN: any;
  makerYN: any;
  mobileCode: any;
  pobox: any;
  remarks: any;
  userMail: any;
  userMobile: any;
  userName: any;
  brokerLoginId: any;
  whatsAppCode: any;
  whatsAppNo: any;
  vatRegNo: any;
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
  
  constructor(private router:Router,
   private sharedService:SharedService) {
    this.productId =  sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.brokerProductList=user.BrokerCompanyProducts;

    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = user.LoginId;
    this.subUserType = sessionStorage.getItem('typeValue');
    let channelId =  sessionStorage.getItem('brokerChannelId');
    //this.insuranceId= sessionStorage.getItem('InsuranceId');
    if(channelId) this.channelId = channelId;
    this.getCompanyList();
    this.geChannelList();
  }

  ngOnInit(){
    this.getMobileCodeList();
  }
  onTabClicked(event){
    // console.log("Event",event)
    let index = event.index;
    this.tabIndex = index;
  //  if(this.tabIndex==0) this.getBrokerList();
  //  if(this.tabIndex==1) this.getLapsedBrokerList();
  //  if(this.tabIndex==2) this.getRejectedBrokerList();
  //  if(this.tabIndex==3) this.getSQBrokerList();
  }
  
  showDialogBrokerDetails(type){
    if(type=='AddBroker'){
      this.brokerDialogVisible=true;
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
      this.branchPopup=true;
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
  geChannelList(){
    let ReqObj = {
      "UserType": "Broker"
    }
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.channelList = data.Result;
          if(this.channelList.length!=0){
            if(this.channelId){
                let entry = this.channelList.some(ele=>ele.Code==this.channelId);
                if(!entry){
                  if(this.channelList.some(ele=>ele.Code=='broker')){
                    this.channelId='broker';
                  }
                  else{this.channelId = this.channelList[0].Code;}
                }
            }
            else if(this.channelList.some(ele=>ele.Code=='broker')){
              this.channelId='broker';
            }
            else{this.channelId = this.channelList[0].Code;}
            if(this.insuranceId)this.getBrokerList();
          }
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
         // this.stateCode = Pers
          // alert(this.PersonalInformation.UserName)
          // if (loginInformation) {
          //   if (loginInformation?.Status == null) loginInformation.Status = 'N';
          //   if (loginInformation?.EffectiveDateStart != null) {
          //     this.effectiveDate = this.onDateFormatInEdit(loginInformation?.EffectiveDateStart)
          //   }
          // }

          // this.agencyCode = loginInformation?.AgencyCode;
          // //this.loginId = loginInformation?.LoginId;
          // this.oaCode = loginInformation?.OaCode;
          // if(CbcDeposit.length!=0){
          //   this.cbcno = CbcDeposit[0]?.CbcNo;
          // }
          // else{
          //   this.cbcno = null;
          // }
          // this.statusValue = loginInformation?.Status;
          // this.subUserType = loginInformation?.SubUserType;
          // this.brokerCompanyYn = loginInformation?.BrokerCompanyYn;
          // // this.getInsuranceList('direct', loginInformation.InsuranceId);
          // // this.getBankList();
          // if (this.subUserType == 'bank') this.bankCode = loginInformation?.BankCode;
          // this.executiveId = PersonalInformation?.AcExecutiveId;
          // this.address1 = PersonalInformation?.Address1;
          // this.address2 = PersonalInformation?.Address2;
          // this.checkerYN = PersonalInformation?.CheckerYn;
          // this.customerCode = PersonalInformation?.CustomerCode;
          // if(PersonalInformation?.TaxExemptedYn!=null){
          //   this.taxExcemptedYN=PersonalInformation?.TaxExemptedYn;
          //   if(this.taxExcemptedYN=='Y') this.taxExcemptedCode = PersonalInformation?.TaxExemptedCode;
          // }
          // if(PersonalInformation?.CreditLimit){this.creditLimit = PersonalInformation?.CreditLimit;
          //   if(this.creditLimit!=null) this.creditLimit = String(this.creditLimit).split('.')[0];
          //   this.CommaFormatted();}
          // this.designation = PersonalInformation?.Designation;
          // this.contactPersonName = PersonalInformation?.ContactPersonName;
          // this.coreAppBrokerCode = PersonalInformation?.CoreAppBrokerCode;
          // this.regulatoryCode = PersonalInformation?.RegulatoryCode;
          // //this.cityCode = PersonalInformation?.CityName;
          // this.custConfirmYN = PersonalInformation?.CustConfirmYn;
          // this.makerYN = PersonalInformation?.MakerYn;
          // this.mobileCode = PersonalInformation?.MobileCode;
          // this.pobox = PersonalInformation?.Pobox;
          // this.remarks = PersonalInformation?.Remarks;
          // this.userMail = PersonalInformation?.UserMail;
          // this.userMobile = PersonalInformation?.UserMobile;
          // this.userName = PersonalInformation?.UserName;
          // this.brokerLoginId = loginInformation.LoginId;
          // this.whatsAppCode = PersonalInformation?.WhatsappCode;
          // this.whatsAppNo = PersonalInformation?.WhatsappNo;
          // this.vatRegNo = PersonalInformation?.VatRegNo;
          // this.countryCode = PersonalInformation.CountryCode;
          // this.cityCode = PersonalInformation?.CityCode;
          // this.cityName = PersonalInformation?.CityName;
          // this.stateCode = PersonalInformation?.StateCode;
          // this.onCountryChange('direct');


          // if (this.vatRegNo != null) { this.commissionVatYN = 'Y'; }
        }
      },
      (err) => { },
    );
  }
}
