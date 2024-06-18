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
  policyHolderTypeList: any[]=[];
  brokerBranchName: any=null;branchName: any=null;branchType: any=null;salePointCode: any=null;email: any=null;mobile: any=null;subSourceId: any=null;DepartmentCode: any=null;AttachedBranchCode: any=null;BranchCode: any=null;BrokerBranchCode: any=null;
  userInsuranceBranchList: any[]=[];
  brokerCompanyYN: any='N';
  subBranchList: any[]=[];
  subInsuranceList: any[]=[];
  subInsuranceId: any;
  subBranchId: any;
  brokerBranchCode: any;
  newList: any[]=[];
  newslist: any[]=[];
  existings: boolean=false;
  editProduct: boolean=false;
  insertlist: any[]=[];
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
      let ReqObj = {
        "UserType": "Broker"
      }
      let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.channelList = data.Result;
            if(this.subUserType!='' && this.subUserType!=null) this.getBrokersList(type);
          }
        },
        (err) => { },
      );
   }
   getBrokersList(type){
    let ReqObj = {
      "SubUserType": this.subUserType,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
              if(data?.Result.length!=0){
                let obj = [{"BrokerId":null,"BrokerName":"---Select---"}];
                this.brokerList = obj.concat(data?.Result);
                this.brokerValue=this.brokerList[1].BrokerId;
                this.onBrokerChange()
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
  getCountryList(){
    let ReqObj = {
   "InsuranceId":this.insuranceId

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{"Code":null,"CodeDesc":"---Select---"}];
        this.countryList = obj.concat(data?.Result);
            this.getMobileCodeList();


        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
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
          let obj = [{"Code":null,"CodeDesc":"---Select---"}];
          this.mobileCodeList = obj.concat(data?.Result);

          }
        },
        (err) => { },
      );
  }
  onSaveBranchDetails(){
    let ReqObj = {
      "Address1": this.address1,
      "Address2": this.address2,
      "BranchCode": this.AttachedBranchCode,
      "AttachedCompany": this.subInsuranceId,
      "BrokerBranchCode": this.brokerBranchCode,
      "BranchType":this.branchType,
      "BrokerBranchName": this.branchName,
      "CreatedBy": this.loginId,
      "Email": this.email,
      "EffectiveDateStart": this.effectiveDate,
      "InsuranceId": this.insuranceId,
      "LoginId": this.userLoginId,
      "Mobile": this.mobile,
      "Remarks": this.remarks,
      "Status": this.Status,
      "SalePointCode":this.salePointCode
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      let date = String(ReqObj.EffectiveDateStart).split('/');
      if(date.length==1) ReqObj['EffectiveDateStart'] = this.datePipe.transform(String(ReqObj.EffectiveDateStart), "dd/MM/yyyy")
      
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
        }
      });
  }
  onBrokerChange(){
    if(this.insuranceId && this.subUserType && this.brokerValue){
      let value = this.brokerValue;
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
          this.brokerValue = value;
          if(this.brokerValue && this.insuranceId){
            let useObj = {"BrokerId":this.brokerValue,"InsuranceId":this.insuranceId,"channelId":this.subUserType,"UserId": null};
            sessionStorage.setItem('userEditDetails',JSON.stringify(useObj));
          }
        },
        (err) => { },
      );
    }
  }
  showDialogBrokerDetails(type,rowData){
  if(type=='AddUser'){
      this.userLoginId = null;
      this.AddUserPopup=true;
      this.editsSection;
    }
    else if (type=='editBranchDetail'){
      this.branchDetailsPopup=true;
    }
    else if (type=='Product'){
      this.userLoginId = rowData.LoginId;
      this.editProduct = false;
      this.getOptedProductDetails();
      this.productPopup=true;
    }
    else if(type=='AddProduct'){
      this.addProduct=true;
      this.existingProduct=false;
      this.editProduct = false;
    }
    else if(type=='EditProduct'){
      this.addProduct=false;
      this.editProduct = true;
      this.existingProduct=false;
    }
    else if(type=='ProductCancel'){
      this.getOptedProductDetails();
      this.addProduct=false;this.existingProduct=true;
    }
  }
  getOptedProductDetails(){
    this.newList =[];
    this.newslist=[];
    let ReqObj = {
      "LoginId": this.userLoginId,
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
              this.existingProduct = true;
              if(selectedList.length!=0){
                let i=0;
                  for(let product of selectedList){
                      // product['SelectedYN'] = 'Y';
                      if(product?.CreditYn==null) product.CreditYn = 'N';
                      if(product?.CheckerYn==null) product.CheckerYn = 'N';
                      if(product?.SumInsuredEnd!=null){product.SumInsuredEnd =String(product?.SumInsuredEnd).split('.')[0];}
                      if (product?.EffectiveDateStart != null) {
                        product['EffectiveDate'] = product?.EffectiveDateStart
                      }
                      if(product.SelectedYn!='Y'){
                        this.newslist.push(product);
                      }
                      else{
                        this.newList.push(product);
                      }
                    
                      i+=1;
                      if(this.newslist.length!=0){
                        this.editSection = false;
                      }
                  }
              }
              else{
                
              }
            }
      },
      (err) => { },
    );
  }
  checkSelectedProductss(rowData){
    return rowData.SelectedYn=='N'; 
  }
  
  checkSelectedProducts(rowData){
    return rowData.SelectedYn=='Y';
  }
  onChangeSelectedProduct(rowData,check){
    console.log('Checked Statusss',rowData,check)
    if(check){
     return rowData.SelectedYn = 'Y';
    }
    else{
      return rowData.SelectedYn = 'N';
    }
  }
  onChangeSelectedProduc(rowData,check,h){
    console.log('Checked Statusss',rowData,check)
    if(check){
     rowData.SelectedYn = 'N';
     this.insertlist.push(rowData);
    }
    else{
      rowData.SelectedYn = 'Y';
      if(this.insertlist.length!=0){
        let rows = this.insertlist.indexOf(rowData);
        console.log('NNNNNNNNN',rows,this.insertlist);
        this.insertlist.splice(rowData,h);
      }
    }
  }
  onSaveProductDetails(){
    //let selectedList = this.productData.filter(ele=>ele.SelectedYn=='Y');
    let selectedList=[];
    console.log('KKKKKKKKKKKKK',this.newList);
    if(this.addProduct){
      selectedList = this.newslist.filter(ele => ele.SelectedYn=='Y');
      console.log("Final Selected List",selectedList)
    }
    else if(this.editProduct){
      selectedList = this.newList.filter(ele=>ele.SelectedYn=='N');
      console.log("Existing Selected List",selectedList)
    }
    let finalObj = [];let i=0;
    for(let entry of selectedList){
      let SumInsured =0;
      if(entry.SumInsuredEnd.includes(',')){ SumInsured = entry.SumInsuredEnd.replace(/,/g, '') }
      else SumInsured = entry.SumInsuredEnd;
      let effectiveDate=null;
      if(entry.EffectiveDate){
        let dateList = String(entry.EffectiveDate).split('/');
        if(dateList.length==1) effectiveDate = this.datePipe.transform(entry.EffectiveDate, "dd/MM/yyyy");
        else effectiveDate =entry.EffectiveDate
      }
      let Obj =  {
        "ProductId": entry.ProductId,
        "ProductName": entry.ProductName,
        "ProductDesc": entry.ProductDesc,
        "PolicyTypeId": entry.PolicyTypeId,
        "PolicyTypeDesc": entry.PolicyTypeDesc,
        "CommissionPercent": entry.CommissionPercent,
        "SumInsuredStart": "1",
        "SumInsuredEnd": SumInsured,
        "BackDays": entry.BackDays,
        "CreditYn":entry.CreditYn,
        "CheckerYn": entry.CheckerYn,
        "EffectiveDateStart": effectiveDate,
        "Status": entry.Status,
        "InsuranceId": this.insuranceId,
        "LoginId": this.userLoginId,
        "Remarks": "nonr",
        "CreatedBy": entry.CreatedBy
      }
      finalObj.push(Obj);
      i+=1;
      if(i==selectedList.length) this.finalProceed(finalObj);
    }
  }
  changeEffectiveDate(rowData){

    rowData['EffectiveDate'] = rowData.EffectiveDateStart;
  }
  finalProceed(finalObj){
    let urlLink = `${this.CommonApiUrl}admin/updatebrokercompanylistproducts`;
    this.sharedService.onPostMethodSync(urlLink, finalObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.newslist=[];
          this.newList=[];this.insertlist=[];
          this.addProduct=false;
          this.editProduct = false;
          this.existingProduct=true;
          this.getOptedProductDetails();
              // this.productData = [];
              // this.newslist=[];
              // this.newList=[];
              // this.existings=false;
              // this.editSection=false;
              // this.getOptedProductDetails();
        }
      },
      (err) => { },
    );
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
            this.subUserType = loginInformation?.SubUserType;
            this.brokerCompanyYn = loginInformation?.BrokerCompanyYn;
            this.insuranceId = loginInformation.InsuranceId;
            this.getCountryList();
            this.getPolicyIdTypeList('direct');
            this.agencyCode = loginInformation?.AgencyCode;
            //this.loginId = loginInformation?.LoginId;
            this.oaCode = loginInformation?.OaCode;
            this.statusValue = loginInformation?.Status;
            this.editSection = true;
            
            this.executiveId = PersonalInformation?.AcExecutiveId;
            this.address1 = PersonalInformation?.Address1;
            this.address2 = PersonalInformation?.Address2;
            this.checkerYN = PersonalInformation?.CheckerYn;
            this.countryCode = PersonalInformation?.CountryCode;
            this.stateCode = PersonalInformation?.StateCode;
            this.policyHolderTypeid = PersonalInformation?.IdType;
            this.idNumber = PersonalInformation?.IdNumber;
            this.onCountryChange('direct');
            this.onStateChange('direct');
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
  getPolicyIdTypeList(type) {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": '99999',
			"PolicyTypeId": "1"
		}
		let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					//this.holderTypeValue = null;
					this.policyHolderTypeList = data.Result;
					let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
					this.policyHolderTypeList = defaultRow.concat(this.policyHolderTypeList)
					//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
					if (type == 'change'){this.policyHolderTypeid='';
					//this.productItem.IdNumber=null
				}
				}
			},
			(err) => { },
		);
	}
  passChanged(){
    this.ChangePass=false;
  }
  passwordField(){
    this.ChangePass=true;
  }
  getBrokerBranchList(rowData){
    let ReqObj = {
      "LoginId": rowData.LoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.branchData = data.Result;
          this.userLoginId = rowData.LoginId;
          this.brokerBranchCode = rowData.BrokerBranchCode
          this.branchPopup=true;
        }
      });
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
      this.getMainBranchList();
      this.onBranchChange();
  }
  onBranchChange(){
    if(this.brokerCompanyYN=='Y'){
      this.subInsuranceId = this.insuranceId;
      let branch = this.userInsuranceBranchList.find(ele=>ele.Code==this.AttachedBranchCode);
      if(branch){

        this.branchName = branch.CodeDesc;
      }
    }
  }
  getMainBranchList(){
    let ReqObj = {"InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.userInsuranceBranchList = data.Result;
              if(this.brokerCompanyYN=='Y'){
                this.subBranchList = [];
                this.getSubInsuranceList();
              }
              else{
                this.subBranchList = data.Result;
              }

          }
        },
        (err) => { },
      );
  }
  getSubInsuranceList(){
    let brokerYN = "";
    if(this.brokerCompanyYN == 'Y') brokerYN = 'N';
    else brokerYN = 'Y';
    let ReqObj = {
      "BrokerCompanyYn": brokerYN
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.subInsuranceList = data.Result;
        }
      },
      (err) => { },
    );
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

  onSubmit() {
    let ReqObj ={
      "LoginInformation": {
        "AgencyCode": this.agencyCode,
        "BankCode": null,
        "BrokerCompanyYn": "N",
        "Createdby": this.loginId,
        "EffectiveDateStart": this.effectiveDate,
        "InsuranceId": this.insuranceId,
        "LoginId": this.userLoginId,
        "OaCode": this.brokerValue,
        "Password": this.password,
        "Status": this.statusValue,
        "SubUserType": this.subUserType,
        "UserType": "User"
      },
      "PersonalInformation": {
        "AcExecutiveId": "5",
        "Address1": this.address1,
        "Address2": this.address2,
        "Address3": "None",
        "ApprovedPreparedBy": this.loginId,
        "CheckerYn": this.checkerYN,
        "CityName": this.cityCode,
        "CommissionVatYn": this.commissionVatYN,
        "CompanyName": this.companyCode,
        "ContactPersonName": this.contactPersonName,
        "CoreAppBrokerCode": this.coreAppBrokerCode,
        "CountryCode": this.countryCode,
        "CustConfirmYn": this.custConfirmYN,
        "Designation": this.designation,
        "Fax": "0",
        "StateCode":this.stateCode,
        "MakerYn": this.makerYN,
        "Pobox": this.pobox,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "MobileCode": this.mobileCode,
        "WhatsappCode": this.whatsAppCode,
        "WhatsappNo":this.whatsAppNo,
        "VatRegNo": this.vatRegNo,
        "CustomerCode": this.customerCode,
        "IdType": this.policyHolderTypeid,
        "IdNumber": this.idNumber
      }
    }
     if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      ReqObj.LoginInformation['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/createuser`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
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
      let obj = [{"Code":null,"CodeDesc":"---Select---"}];
      this.stateList = obj.concat(data?.Result);
      if (type == 'change') {
        this.stateCode = null;
        this.cityCode = null;
      }
      else {
        if(this.stateCode!=null && this.stateCode!=''){ let entry = this.stateList.some(ele=>ele.Code==this.stateCode);
          if(entry){this.onStateChange('direct');}
          else this.stateCode=null;
        }
        
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
        let obj = [{"Code":null,"CodeDesc":"---Select---"}];
        this.cityList = obj.concat(data?.Result);
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
