import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  providers: [MessageService]
})
export class PaymentInfoComponent {
  displayPayment:boolean = false;

  paymentOptions:MenuItem[] = [
    {'label': 'Cash', 'target': 'cash'}, 
    {'label':'Cheque', 'target': 'cheque'}, 
    {'label': 'Online', 'target': 'online'}
  ];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  selectedPaymentOption:string = 'cheque';
  minDate:any=null;customerDetails:any=null;
  vehicleDetails:any[]=[];requestReferenceNo:any=null;
  quoteNo:any=null;userDetails:any=null;loginId:any=null;
  userType:any=null;agencyCode:any=null;brokerbranchCode:any=null;draftSection:boolean=false;
  branchCode:any=null;branchList:any[]=[];productId:any=null;emiPeriod:any=null;
  productName:any=null;subuserType:any=null;insuranceId:any=null;emiMonth:any=null;
  loginType:any=null;redirectUrl:any=null;endorsementSection:boolean=false;totalPremium:any=0;
  endorseCategory:any=null;endorsementName:any=null;endorsePolicyNo:any=null;loadingSection:boolean=false;
  enableFieldsList:any[]=[];endorsementId:any=null;cancelEndorse:boolean=false;paymentDetails:any=null;
  title:any=null;clientName:any=null;dateOfBirth:any=null;emailId:any=null;DueAmount:any=null;policyNo:any=null;
  mobileNo:any=null;idNumber:any=null;customerType:any=null;quoteSubUsertype:any=null;EmiYn:any='N';successSection:boolean=false;
  vehicleList: any;quoteDetails:any=null;orgPolicyNo:any=null;quoteLoginId:any=null;endtPremium:any=null;
  quoteUsertype:any=null;quoteBranchCode:any=null;currencyCode:any=null;IsChargeOrRefund:any=null;policySection:boolean=false;
  stickerNo: any=null;CoverNoteNo:any=null;paymentTypeList:any[]=[];nineMonthSection:boolean=false;
  commonDocTypeList: any[]=[];yearlySection:boolean=false;sixMonthSection:boolean=false;
  Emilist1: any[]=[];
  bankList: any[]=[];
  threeMonthSection: boolean=false;fiveMonthSection: boolean=false;eightMonthSection: boolean=false;
  emiSection: boolean=false;
  emiyn: any=null;chequeSection: boolean=false;
  payAmount: any=null;
  uploadedDocList: any[]=[];
  Menu: any=null;first: boolean;
  second: boolean=false;Third: boolean=false;Fourth: boolean=false;Fifth: boolean=false;bankName: any=null;
  chequeDate: any=null;chequeNo: any=null;Sixth: boolean=false;seven: boolean=false;
  payeeName: any=null;
  activeMenu: any=null;
  iBanNo: any=null;accNo: any=null;micrNo: any=null;
  constructor(private messageService: MessageService,private router:Router,private sharedService: SharedService,private route:ActivatedRoute,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    sessionStorage.removeItem('buyPolicyDetails');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName = this.userDetails.Result.ProductName
    this.subuserType = sessionStorage.getItem('typeValue');
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    this.redirectUrl = "aHR0cHM6Ly90ei5zZWxjb20ub25saW5lL3BheW1lbnRndy9jaGVja291dC9XbXRLVmpWbVVGWmtWRTFTY2xGWlVIbEpWR1ZFYTFWbFlqQmFkWHBEWmtJelpFOXdlR1JSTUhZNGQwTjBZa2hZVTFFMVJVNXZTbmwwYWs1cGNHd3dhV3BrYWxZMGFGVkdZbUpWUFE9PS8=";
    this.decodeUrl();
      
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        if(this.endorsementId==42 || this.endorsementId==842) this.cancelEndorse = true;
        else this.cancelEndorse = false;
        
      }
      else{
        this.endorsementSection = false;
      }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      console.log("Params",params.params)
      let quoteNo = params?.params?.QuoteNo;
      let type = params?.params?.type;
      if(quoteNo){
        this.quoteNo = quoteNo;
        console.log('NNNNNNNNNNNNNN')
        // if(type!='cancel') this.successSection = true;
      }
    })
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
      if(this.customerDetails.PolicyHolderType=='1'){this.customerType="Individual";}
      else if(this.customerDetails.PolicyHolderType=='2'){this.customerType="Corporate";}
    }
    this.getEditQuoteDetails();
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.requestReferenceNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.vehicleList = data?.Result?.ProductDetails;
            let quoteDetails = data?.Result?.QuoteDetails;
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.orgPolicyNo = quoteDetails?.OriginalPolicyNo;
            this.endorsePolicyNo = quoteDetails?.policyNo;
            this.quoteLoginId = quoteDetails?.LoginId;
            this.quoteSubUsertype = quoteDetails?.SubUserType;
            this.quoteUsertype = quoteDetails?.UserType;
            this.quoteBranchCode = quoteDetails?.BrokerBranchCode;
            this.currencyCode = quoteDetails?.Currency;
            this.IsChargeOrRefund = quoteDetails?.IsChargeOrRefund;
            this.endtPremium = quoteDetails?.TotalEndtPremium;
            this.DueAmount=quoteDetails?.DueAmount;
            this.EmiYn = this.quoteDetails.EmiYn;
            this.emiPeriod = this.quoteDetails.InstallmentPeriod;
            this.emiMonth = this.quoteDetails.InstallmentMonth;
            console.log("Total",this.totalPremium)
            if(this.loadingSection && this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!=''){
              this.paymentDetails = {
                "QuoteNo": this.quoteNo,
                "PolicyNo": this.quoteDetails?.policyNo,
                "MerchantReference": this.quoteDetails?.MerchantReference,
                "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
                "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
              };
              this.policyNo = data?.Result?.PolicyNo;
              this.policySection = true;
              this.successSection = false;
              this.loadingSection = false;
              this.draftSection=false;
              this.updateTiraDetails();
            }
            else{
              this.checkStatus();
              this.getBankList();
              let paymentId = sessionStorage.getItem('quotePaymentId');
              let makepayment= sessionStorage.getItem('Makepaymentid');
              if(paymentId || makepayment =='Ids'){
                this.getPaymentTypeList();
              } 
            }
            
            
          }
      },
      (err) => { },
    );

  }
  getBankList(){
    let branchCode = '';
    if((this.userType!='Broker' && this.userType!='User')){
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
            if(this.orgPolicyNo!=undefined && this.endorsementSection && (this.endtPremium==null || this.endtPremium=='' || this.endtPremium==0 || this.endtPremium==undefined) && !this.cancelEndorse){
              this.updateEndorseStatus();
            }
        }

      },
      (err) => { },
    );
  }
  updateEndorseStatus(){
    let ReqObj = {
      "QuoteNo":this.quoteNo,
      "PolicyNo": this.orgPolicyNo,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/changeEndtStatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
                this.IsChargeOrRefund = null;
                this.paymentDetails = {
                  "QuoteNo": this.quoteNo,
                  "PolicyNo": this.endorsePolicyNo
                }
                this.policySection = true;
                this.updateTiraDetails();
                
          }
      },
      (err) => { },
    );
  }
  checkStatus(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${this.quoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
            if(this.quoteDetails.EmiYn!=null){
              this.EmiYn = this.quoteDetails.EmiYn;
              this.emiPeriod = this.quoteDetails.InstallmentPeriod;
              this.emiMonth = this.quoteDetails.InstallmentMonth;
              if(this.EmiYn=='Y') this.getCurrentEmiDetails();
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
            if(this.endorsementSection){
              this.totalPremium = this.quoteDetails?.TotalEndtPremium;
            }
            else {
              if(this.EmiYn !='Y'){
                this.totalPremium = this.quoteDetails?.OverallPremiumFc;
              }
              else{
                this.totalPremium = this.quoteDetails?.DueAmount;
              }   
            }
        }
        else{
          if(this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!='' && this.quoteDetails?.policyNo!=undefined){
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.draftSection=false;
            this.successSection = false;
            this.updateTiraDetails();
          }
          else{
            this.loadingSection = true;
            this.getEditQuoteDetails();
          }
        }
      });
  }
  getCurrentEmiDetails(){
    let ReqObj = {
         "QuoteNo": this.quoteNo,
         "InsuranceId": this.insuranceId,
         "ProductId": this.productId
         }
    let urlLink = `${this.CommonApiUrl}api/getemidetailsbyquoteno`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              let emiList = data.Result;
              if(emiList.length!=0){
                    let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[],fiveList=[],eightList=[];
                    if(emiList.length==13){
                      this.yearlySection = true;
                      yearlyList = emiList;
                    }
                    else if(emiList.length==10){
                      nineList = emiList;
                      this.nineMonthSection = true;
                    }
                    else if(emiList.length==7){
                      sixList = emiList;
                      this.sixMonthSection = true;
                    }
                    else if(emiList.length==4){
                      threeList = emiList;
                      this.threeMonthSection = true;
                    }
                    else if(emiList.length==6){
                      fiveList = emiList;
                      this.fiveMonthSection = true;
                    }
                    else if(emiList.length==9){
                      eightList = emiList;
                      this.eightMonthSection = true;
                    }
                    this.setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList);
                // this.Emilist1=data?.Result[0]?.EmiPremium
                // this.Emilist2=data?.Result[1]?.EmiPremium;
                // this.EmiDetails=data.Result[0].EmiDetails;
                // this.EmiDetails1=data.Result[1].EmiDetails;
                console.log('tttt',this.totalPremium);
              }
          }
        },
        (err) => { },
      );
  }
  setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
            if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
            else{data['yearlyAmount']=null}
            if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
            else{data['nineAmount']=null}
            if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
            else{data['sixAmount']=null}
            if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
            else{data['threeAmount']=null}
            if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
   else if(this.fiveMonthSection){
    let i=0;this.Emilist1=[];
    for(let entry of fiveList){
         let data = entry;
         if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
         else{data['yearlyAmount']=null}
         if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
         else{data['nineAmount']=null}
         if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
         else{data['sixAmount']=null}
         if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
         else{data['threeAmount']=null}
         if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
          else{data['fiveAmount']=null}
          if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
          else{data['eightAmount']=null}
         this.Emilist1.push(entry);
         i+=1;
         if(i==fiveList.length){this.emiSection=true}
    }
 }
 else if(this.eightMonthSection){
  let i=0;this.Emilist1=[];
  for(let entry of eightList){
       let data = entry;
       if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
       else{data['yearlyAmount']=null}
       if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
       else{data['nineAmount']=null}
       if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
       else{data['sixAmount']=null}
       if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
       else{data['threeAmount']=null}
       if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
        else{data['fiveAmount']=null}
        if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
        else{data['eightAmount']=null}
       this.Emilist1.push(entry);
       i+=1;
       if(i==eightList.length){this.emiSection=true}
  }
}
  }
  getPaymentTypeList(){
    let ReqObj = {
      "BranchCode": this.quoteBranchCode,
      "InsuranceId": this.insuranceId,
      "UserType": this.quoteUsertype,
      "SubUserType": this.quoteSubUsertype,
      "ProductId": this.productId,
      "CreatedBy": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/paymenttypes`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.paymentTypeList = data.Result;
          if(this.paymentTypeList.length!=0){
            this.selectedPaymentOption = this.paymentTypeList[0].Code;
            this.onRedirect();
          }
          if(this.paymentTypeList.some(ele=>ele.Code=='2')){
            if(this.EmiYn!='Y'){
              console.log('Document listsssss',this.emiyn)
              this.getCommonDocTypeList();
              this.getUploadedDocList(null,-1);
            }
            else{
              this.emiupload();
            }
           
          }
        } 
      },
      (err) => { },
      );
  }
  onRedirect(){
    let value = this.selectedPaymentOption;
    console.log('Routing Valuesss',value);
    this.Menu=value;
    this.activeMenu = this.Menu;
    this.payAmount = null;
    this.first = false;this.second = false;this.Third=false;this.Fourth=false;this.Fifth = false;
    this.bankName = null;this.chequeDate=null;this.chequeNo = null;this.Sixth=false;this.seven=false;
    if(this.Menu=='VisionPay'){ this.first=true;}
    else if(this.Menu=='Pos'){ this.second=true;}
    else if(this.Menu=='1'){ this.Third=true; }
    else if(this.Menu == '2'){ this.Fourth = true;}
    else if(this.Menu == 'Bank'){ this.Fifth = true;}
    else if(this.Menu == '3'){ this.seven = true;}
    else if(this.Menu == '4'){
      if(this.EmiYn!='Y'){
        this.payAmount = this.totalPremium;
      }
      else{
        this.payAmount =this.DueAmount;
      }
        this.payeeName = this.clientName;
        this.activeMenu = this.Menu;
        this.onCashPayment();
        // if(this.EmiYn!='Y'){
        //   //this.onCashPayment();
        // } 
        // else{
        //   this.onproceed(); 
        // } 
    }
    if(this.EmiYn!='Y'){
      //this.payAmount=this.totalPremium;
    }
    else {
      //this.payAmount=this.DueAmount;
    }
    //if(this.totalPremium!=null && this.totalPremium!=undefined){this.payAmount = String(this.totalPremium);this.CommaFormatted();}

    // if(this.EmiYn=='N'){
    //   if(this.totalPremium!=null && this.totalPremium!=undefined){this.payAmount = String(this.totalPremium);this.CommaFormatted();}
    // }

  }
  onCashPayment(){
    let chequeDate = "";let amount=this.totalPremium;
   
    if(this.IsChargeOrRefund=='REFUND'){
      if(this.quoteDetails?.PrevPaymentType!=null && this.quoteDetails?.PrevPaymentType!=undefined && this.quoteDetails?.PrevPaymentType=='3'){
        this.Menu = this.quoteDetails?.PrevPaymentType;
        this.activeMenu = this.Menu;
        amount = this.totalPremium
      }
      else{
        this.Menu='2';
        this.activeMenu = '2';
        amount = this.totalPremium
      }
    }
    else{this.iBanNo = null;this.accNo=null;
      if(this.payAmount==undefined) amount = null;
      else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
      else amount = this.payAmount;
    }
    if(this.IsChargeOrRefund!='REFUND' && this.Menu=='2'){
        if(this.chequeDate!='' && this.chequeDate!=null && this.chequeDate!= undefined){
          chequeDate = this.datePipe.transform(this.chequeDate,'dd/MM/yyyy');
        }
        amount = this.totalPremium;
    }
    else{
      this.chequeDate = null;this.chequeNo = null;this.micrNo=null;if(this.IsChargeOrRefund!='REFUND')this.bankName = null;
      
    }
    // if(this.Menu=='4'){
    //   if(this.payAmount==undefined) amount = null;
    //   else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
    //   else amount = this.payAmount;
    // }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "EmiYn":this.EmiYn,
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "PayeeName": this.payeeName,
      "SubUserType": this.subuserType,
      "UserType": this.userType,
      "MICRNo": this.micrNo,
      "BankName":this.bankName,
      "ChequeNo":this.chequeNo,
      "ChequeDate":chequeDate,
      "PaymentType": this.activeMenu,
      "Payments": this.IsChargeOrRefund,
      "PaymentId": sessionStorage.getItem('quotePaymentId'),
      "AccountNumber":this.accNo,
      "IbanNumber": this.iBanNo
    }
    console.log("Final Pay Req",ReqObj)
    let urlLink = `${this.CommonApiUrl}payment/insertpaymentdetails`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          // if(this.EmiYn=='Y'){
          //   this.updateinstallemnet();
          // }
          if(data.Result.paymentUrl){
            this.redirectUrl = data.Result.paymentUrl;
            console.log("Url",atob(this.redirectUrl))
            window.location.href =  atob(this.redirectUrl)
          }
          else {
            if(!this.seven){
              this.router.navigate(['/quotation/plan/main/policy-info']);
              // this.paymentDetails = data.Result;
              // this.policyNo = data?.Result?.PolicyNo;
              // this.updateTiraDetails();
              // this.policySection = true;
              // this.draftSection=false;
            }
            else{
              if(data.Result?.DepositResponse!='Y'){
                let Result = data.Result?.DepositResponse;
                console.log('HHHHHHHHHH',Result);
                Swal.fire({
                  title: '<strong>Error</strong>',
                  icon: 'info',
                  html: `<ul class="list-group errorlist">
                     <li>${Result}</li>
                 </ul>`,
                  showCloseButton: false,
                 cancelButtonColor: '#d33',
                 cancelButtonText: 'Ok',
                })
              }
              else{
                this.router.navigate(['/quotation/plan/main/policy-info']);
                // this.paymentDetails = data.Result;
                // this.policyNo = data?.Result?.PolicyNo;
                // this.updateTiraDetails();
                // this.policySection = true;
                // this.draftSection=false;
                
              }
             
            }
          }
        } 
      },
      (err) => { },
      );
  }
  emiupload(){
    let ReqObj = {
      "EmiYn":this.EmiYn,
      "QuoteNo":  this.quoteNo,
      "InstallmentPeriod":this.emiPeriod,
     "NoOfInstallment":this.emiMonth
    }
    let urlLink = `${this.CommonApiUrl}document/getemidoc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data?.Result){
            this.uploadedDocList = data?.Result?.CommmonDocument;
            this.chequeSection=true;
          }
        }
      },
      (err) => { },
    );
  }
  getUploadedDocList(vehicleData:any,index:any){
    this.uploadedDocList=[];
    let ReqObj = {
      "QuoteNo":  this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            if(data?.Result?.CommmonDocument){
              this.uploadedDocList = data?.Result?.CommmonDocument.filter(ele=>ele.DocumentId=='23');
            }
            
          }
        },
        (err) => { },
      );
  }
  getCommonDocTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "SectionId":"99999"
    }
    let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.commonDocTypeList = data.Result;
          if(this.commonDocTypeList.some(ele=>ele.Code=='23')){this.chequeSection=true;}
           
        }
      },
      (err) => { },
    );

  }
  updateTiraDetails(){
    let ReqObj={
      "QuoteNo": this.quoteNo,
    }
    let urlLink = `${this.CommonApiUrl}payment/pushtira`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
          if(data?.Result?.Response=='Success') this.getTiraDetails();
      } 
    },
    (err) => { },
    );
}
getTiraDetails(){
  let urlLink = `${this.CommonApiUrl}payment/gettira/${this.quoteNo}`;
 this.sharedService.onGetMethodSync(urlLink).subscribe(
  (data: any) => {
    if(data?.Result){
      this.policySection = true;
        this.stickerNo = data?.Result?.StickerNumber;
        this.CoverNoteNo = data?.Result?.CoverNoteNo;
    } 
  },
  (err) => { },
  );
}
CommaFormatted() {

  // format number
  if (this.payAmount!='' && this.payAmount!=null && this.payAmount!=undefined) {
   this.payAmount = String(this.payAmount).replace(/[^0-9.]|(?<=\..*)\./g, "")
     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
onAmountChange (args) {
  if (args.key === 'e' || args.key === '+' || args.key === '-') {
    return false;
  } else {
    return true;
  }
}
  decodeUrl(){
    console.log(atob(this.redirectUrl))
  }
  proceedPayment() {
    this.messageService.add({ severity: 'success', summary: 'Payment Successful!', detail: 'Message Content' });
    this.displayPayment = true;
  }
  convertDraft(){
    this.policySection=false;this.loadingSection =false;this.successSection=false;
    this.draftSection = true;
  }
  onBrokerQuotation(){
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "BrokerQuoteYn": 'Y'
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFilebroker(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  downloadMyFilebroker(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', 'Broker Quotation');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onProceed(){
    
    this.router.navigate(['/quotation']);
  }
}
