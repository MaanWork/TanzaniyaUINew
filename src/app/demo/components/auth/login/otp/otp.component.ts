import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { SharedService } from 'src/app/demo/service/shared.service';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';

import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent {

  // @HostListener('window:scroll', ['$event'])
  // public menuActive: any = 'login';
  branchselection:boolean=false;
  isReadMore: boolean = true;
  isReadMoretravel: boolean = true;
  isReadMorecorporate: boolean = true;
  isReadMoremarine: boolean = true;
  brokerLogin = true;
  value: string = "Change Password"
  value_cancel: string = "Cancel"
  issuerLogin = false;
  brokerName = null;
  brokerPassword = null;
  loginfirst:any=false;
  issuerName = null;
  pass:any;
  issuerPassword = null; branchList: any[] = [];
  invalidBroker = false;
  invalidIssuer = false; branchValue: any;
  issuerLogins = false; loginSection: boolean = false;
  brokerLogins = false; public submitted = false; public Proceed = false;
  public issuerBranch; public issuerRegion;
  public branches;
  public errorsList = new Array(); public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public loginForm!: FormGroup; changeForm: FormGroup; ForgetForm : FormGroup
  regionList: any; userType: any;
  forget: boolean=false;
  temps:boolean=false;
  pa:any;
  changePasswordSection: boolean;
  passExpiredError: boolean;
  mobileCodeList: { Code: string; CodeDesc: string; }[];
  insuranceId: any;
  OtpBtnTime: any=null;
  OtpBtnEnable: boolean;
  otpSection: boolean;
  otpGenerated: null;
  otpId: any;
  otpValue: any=null;
  agencyCode: any;
  mobileCodeDesc: any=null;
  ipAddress: any=null;
  customerDetails: any;
  requestReferenceNo: string;
  productId: any;
  CustomerReferenceNo: any;
  oaCode: void;
  userDetails: any;
  quoteNo: any;
  isMannualReferal: any;
  remarks: any;
  referenceNo: string;
  loginId: any;
  constructor(private _formBuilder: FormBuilder,
    private loginService: LoginService, private SharedService: SharedService, private authService: AuthService,
    private router: Router,) {
   // this.onLoginTap();
   // sessionStorage.clear();
    // this.service.ocQuoteMenu = false;
    // this.service.navMenu = false;
    // this.service.openCoverMenu = false;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.CustomerReferenceNo = sessionStorage.getItem('customerReferenceNo');
    this.oaCode =  this.userDetails.Result.OaCode;
    this.loginId =this.userDetails.Result.LoginId;
    //this.getRegionList();
   // this.onLogin();
   this.getCustomerDetails(this.CustomerReferenceNo);
  }

  onLogin() {
    this.submitted = true;
    let searchValue = "";
		let mobileCode = ""; let mobileNumber = "";
		let token = sessionStorage.getItem('UserToken');
   // const formData = this.customerDetails;
    // if(formData.mobileCode !=null){
    //   this.mobileCodeDesc = this.mobileCodeList.find(ele=>ele.Code==formData?.mobileCode).CodeDesc;
    // }
		let reqObj = {
			"CompanyId":'100002',
			"ProductId": '5',
			"LoginId": 'guest',
			"TemplateName":null,
			"OtpUser": {
				"UserMailId": null,
				"UserMobileNo":this.customerDetails.MobileNo1,
				"UserMobileCode": this.customerDetails.MobileCode1,
				"UserWhatsappNo": this.customerDetails.WhatsappNo,
				"UserWhatsappCode": this.customerDetails.WhatsappCode,
				"CustomerName": null
			}
		}
		let url = `${this.CommonApiUrl}otp/generate`;
		try {
		  this.SharedService.onPostMethodSync(url, reqObj).subscribe((data: any) => {
			console.log("Otp Generate Res", data);
			if (data.Errors) {
			  this.otpSection = false;
			  this.otpGenerated = null;
			  let element = '';
			  for (let i = 0; i < data.Errors.length; i++) {
				  element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
			  }
	
			  Swal.fire(
				'Please Fill Valid Value',
				`${element}`,
				'error',
			  )
			}
			else {
        
			   this.otpId = data.OtpToken;
			   this.otpGenerated = data.OTP;
         this.loginfirst = true;
			  this.otpSection = true;
			  this.OtpBtnEnable = true;
			  this.setTimeInterval();
			}
		  }, (err) => {
			console.log(err);
		  })
		 } catch (error) {
		}
  }
  setTimeInterval() {

    var count = 15,
      timer = setInterval(() => {
        var seconds = (count--) - 1;
        var percent_complete = (seconds / 60) * 100;
        percent_complete = Math.floor(percent_complete);

        this.OtpBtnTime = count;
        if (seconds == 0) {
          clearInterval(timer);
          this.OtpBtnEnable = false;
          this.OtpBtnTime = '';
        }
      }, 1000);
  	}
    onOtpValidate() {

      if (this.otpValue == "" || this.otpValue == undefined || this.otpValue == null) {
        let element = '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>Please Enter OTP</div>';
        Swal.fire(
        'Please Fill Valid Value',
        `${element}`,
        'error',
        )
      }
      else {
        this.otpValue = this.otpValue.replace(/\D/g, '');
        let reqObj = {
        "CompanyId": '100002',
        "ProductId":"5",
        "AgencyCode": this.oaCode,
        "OtpToken": this.otpId,
        "UserOTP": this.otpValue,
        "CreateUser": false,
        "CustomerId": this.CustomerReferenceNo,
        "ReferenceNo": sessionStorage.getItem('quoteReferenceNo') 
        }
        let url = `${this.CommonApiUrl}otp/validate`;
        try {
        this.SharedService.onPostMethodSync(url, reqObj).subscribe((data: any) => {
          console.log("Otp Generate", data);
          if (data) {
          if (data.Errors.length!=0) {
            let element = '';
            for (let i = 0; i < data.Errors.length; i++) {
            element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
            }
    
            Swal.fire(
            'Please Fill Valid Value',
            `${element}`,
            'error',
            )
          }
          else {
            this.otpId = "";
            this.otpValue = "";
            this.onGuestLogin()
           this.onProceedBuyPolicy();
          }
          }
        }, (err) => {
        })
        } catch (error) {
        }
      }
    }

    onGuestLogin(){
      const urlLink = `${this.CommonApiUrl}authentication/login`;
      //const formData = this.loginForm.value;
      let loginId=this.customerDetails.MobileCode1+this.customerDetails.MobileNo1
      const reqData = {
      "LoginId": loginId,
      "Password": 'Admin@01',
      "ReLoginKey": 'Y'
      };
    
        this.SharedService.onPostMethodSync(urlLink, reqData).subscribe(
          (data: any) => {
            let res: any = data;
            console.log(data);
              if (data.Result) {
                // Swal.fire(
                //   'Success',
                //   `Otp Validated Successfully`,
                //   'success',
                //   )
                const Token = data?.Result?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              sessionStorage.setItem('Userdetails', JSON.stringify(data));
              sessionStorage.setItem('UserToken', Token);
              sessionStorage.setItem('menuSection', 'navMenu');
              this.userType = data.Result.UserType;
              if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {

                let currencyId=data?.Result?.CurrencyId;
                console.log('IIIIIIIIIIIIIIII',currencyId);
                sessionStorage.setItem('CurrencyidLogin',currencyId);

                let branchList: any[] = data?.Result?.LoginBranchDetails;
                if (branchList.length != 0 && branchList.length > 1) {
                  console.log("Entered Branch", branchList)
                  // this.router.navigate(['/branch']);
                  this.loginSection=false;
                  this.branchselection=true;
                  this.branchList = branchList;
                }
                else {
                  this.branchList = branchList;
                  if (this.userType == 'Issuer') {
                    this.branchValue = branchList[0].BranchCode;
                    this.onBranchProceed();
                  }
                  else {
                    this.branchValue = branchList[0].BrokerBranchCode;
                    this.onBranchProceed();
                  }

                }
              }
              else{
                this.router.navigate(['/Admin']);
              }
           
            
            }
            },
            (err: any) => {
              alert("Error")
              // console.log(err);
            },
          );
    }

    onBranchProceed() {
      this.Proceed = true;
      if (this.branchValue != '' && this.branchValue != undefined) {
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
        if (this.userType == 'Issuer') {
          let branchData: any = this.branchList.find(ele => ele.BranchCode == this.branchValue);
          userDetails.Result['BrokerBranchCode'] = null;
          userDetails.Result['BranchCode'] = branchData.BranchCode;
          userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
          userDetails.Result['LoginType'] = 'B2CFlow2';
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
          this.router.navigate(['/products']);
        }
        else {
  
          let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
          console.log("Branch Value", this.branchValue, branchData)
          userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
          userDetails.Result['BranchCode'] = branchData.BranchCode;
          userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
          userDetails.Result['LoginType'] = 'B2CFlow2';
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
          this.router.navigate(['/quotation/plan/main/document-info']);
        }
  
      }
    }

    onProceedBuyPolicy(){
      let ReqObj = {
        "RequestReferenceNo": this.referenceNo,
        "CreatedBy": this.loginId,
        "ProductId": '5',
        "ManualReferralYn": 'N',
        "ReferralRemarks": "none",
        "Vehicles" : null
      }
      let urlLink = `${this.CommonApiUrl}quote/buypolicy`;
      this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.Result){
            if(data?.Result.QuoteNo){
              this.quoteNo = data.Result?.QuoteNo;
              sessionStorage.setItem('quoteNo',data.Result?.QuoteNo);
              sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
              let clausesList: any[] = [],
              exclusionList: any[] = [],
              warrantiesList: any[] = [];
            //console.log("Cccccccc", this.CoversList);
            //console.log("VVVVVVVV", this.vehicleDetailsList);
            let vechileId: any;
            let sectionId: any;
            let i = 0;
  
            
            }
           
          }
        },
        (err) => {
          this.SharedService.fnToastMoveHover("Quote Moved to Referral Pending");
         },
      );
    }
    
  cancelOtp(value_cancel) {
      this.loginfirst = false;
      this.router.navigate(['/quotation/plan/premium-details'])
  }
  getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          this.referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (this.referenceNo) {
            this.requestReferenceNo = this.referenceNo;
            // if(this.productId!='60'){
             // if(this.productId!='46' && this.productId!='4') this.getExistingBuildingList();
            // }
            this.onLogin();
          }
          
        }

      });
    }
    onPress() {
      this.loginSection = !this.loginSection;
      this.branchselection = false;
    }
    
}
