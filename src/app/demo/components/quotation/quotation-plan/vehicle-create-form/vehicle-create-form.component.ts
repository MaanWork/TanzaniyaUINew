import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-create-form',
  templateUrl: './vehicle-create-form.component.html',
  styles : [`
    .card .form-container div label { font-weight: bold; }
    .flex input, .flex p-dropdown, .flex p-calendar, .flex p-inputNumber { min-width: 200px; }
  `],
  providers: [MessageService]
})
export class VehicleCreateFormComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public commonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  items:MenuItem[] | undefined;regNo:any=null;
  customerTypes:any[] | undefined;modelList:any[]=[];
  currentCustomerType:any = 'personal';
  ownerCategoryOptions: any[] | undefined;orginalPolicyNo:any=null;
  selectedOwnerCategory: any | undefined;getdetails: any=null;
  userDetails:any;loginId:any=null;userType:any=null;modelValue:any=null;
  brokerbranchCode:any=null;branchList:any[]=[];bodyTypeId:any=null;
  makeValue:any=null;manufactureYear:any=null;bodyTypeValue:any=null;
  insuranceId:any=null;agencyCode:any=null;ownerList:any[]=[];
  branchCode:any=null;productId:any=null;fuelTypeList:any[]=[];
  colorList:any[]=[];bodyTypeList:any[]=[];usageList:any[]=[];
  motorCategoryList:any[]=[];editSection:boolean=false;makeList:any[]=[];
  vehicleDetails: any;modelDesc:any=null;endtPrevQuoteNo:any=null;
  editdata: any;endorsementYN:any='N';promoCode:any=null;
  quoteRefNo: any=null;endorsementDate:any=null;havePromoCode:any='N';
  axelDistance: any;endorsementType:any=null;exchangeRate:any=null;
  chassisNo: any;endtPrevPolicyNo:any=null;
  colorValue: any;tareWeight:any=null;currencyCode:any=null;
  engineNo: any;seatingCapacity:any=null;customerName:any=null;
  fuelType: any;ownerName:any=null;endtStatus:any=null;
  grossWeight: any;engineCapacity:any=null;vehicleDetailsList:any[]=[];
  motorCategory: any;ownerCategory:any=null;validSection:boolean=false;
  usageValue: any;noOfAxels:any=null;duplicateSection:boolean=false;
  customerCode: any;endorsementEffectiveDate:any=null;isFinanceEndt:any=null;
  brokerCode: any;endorsementTypeDesc:any=null;endtCategoryDesc:any=null;
  sourceType: any;endorsementSection:boolean=false;endtCount:any=null;
  subuserType: any;customerDetails:any;endorsementRemarks:any=null;
  endorsePolicyNo: any=null;years:any[]=[];
  referenceNo: string;
  commonDetails: any;
  constructor(private messageService: MessageService,private sharedService: SharedService,
    private datePipe:DatePipe,private router:Router) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.insuranceId = this.userDetails.Result.InsuranceId;
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.insuranceId = this.userDetails.Result.InsuranceId;
      let vehicleList = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleList) this.vehicleDetailsList = vehicleList;
    this.getOwnerCategoryList();
  }

  ngOnInit(): void {
    this.ownerCategoryOptions = [{name: 'Category', code: 'category'}];
    this.customerTypes = [{label: 'Personal', value: 'personal'}, {label: 'Corporate', value: 'corporate'}];
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Vehicle', routerLink: '/vehicle'}, { label: 'Create Vehicle' }];
    this.getdetails= sessionStorage.getItem('Editcars');
    this.years = this.getYearList();
    if(this.getdetails== 'SavedFroms'){
      this.getExistingVehiclesList();
    }
    else{

    }
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.referenceNo = referenceNo;
      this.getCustomerDetails(referenceNo);
      
    }

  }
  getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.commonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            console.log("customer details",this.customerDetails)
            // this.title = this.customerDetails?.TitleDesc;
            // this.clientName = this.customerDetails?.ClientName;
             this.ownerName = this.customerDetails?.ClientName;
            // this.dateOfBirth = this.customerDetails?.DobOrRegDate;
            // if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
            // if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
            // //this.ownerCategory = this.customerDetails?.PolicyHolderType;
            // this.emailId = this.customerDetails?.Email1;
            // this.mobileNo = this.customerDetails?.MobileNo1;
            // this.idNumber = this.customerDetails?.IdNumber;
          }
        }
      },
      (err) => { },
    );
  }
  omit_special_char(event){
   var k;
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  onRegistrationSearch(){
  this.duplicateSection=false;this.editSection=false;this.validSection=false;
    if(this.regNo!=null && this.regNo!='' && this.regNo!=undefined){
      this.regNo = this.regNo.toUpperCase();
      this.editSection = true;
      sessionStorage.setItem('loadingType','motorSearch');
      let ReqObj = {
        "ReqChassisNumber": '',
        "ReqRegNumber": this.regNo,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "BrokerBranchCode": this.branchCode,
        "ProductId": this.productId,
        "CreatedBy": this.loginId,
        "SavedFrom": 'API'
      }
      let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.Result){
            let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
            if(commonDetails){
              if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
              if(this.vehicleDetails.PolicyStartDate==null || this.vehicleDetails.PolicyStartDate==undefined){
                let dateList = commonDetails.policyStartDate.split('/');
                if(dateList.length==1){
                  this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                  this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                }
                else{
                  this.vehicleDetails.PolicyStartDate = commonDetails.policyStartDate;
                  this.vehicleDetails.PolicyEndDate = commonDetails.policyEndDate;
                }
              } 
               this.currencyCode = commonDetails?.currencyCode;
               this.exchangeRate = commonDetails?.exchangeRate;
               if(commonDetails?.promoCode!=null && commonDetails?.promoCode!=undefined) this.promoCode = commonDetails?.promoCode;
               if(this.promoCode!=null) this.havePromoCode = 'Y';
            }
            // if(this.policyStartDate){
            //   if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
            //   this.vehicleDetails.PolicyStartDate = this.datePipe.transform(this.updateComponent.policyStartDate, "dd/MM/yyyy");
            //   this.vehicleDetails.PolicyEndDate = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
            // }
            sessionStorage.removeItem('loadingType');
            if(this.vehicleDetailsList.length!=0){
                let entry = this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo);
                if(entry){
                    this.duplicateSection = true;
                    this.validSection = false;
                }
                else this.onSaveSearchVehicles();
            }
            else this.onSaveSearchVehicles();
         }
          else if(data.ErrorMessage!=null){
            if(data.ErrorMessage.length!=0){
              sessionStorage.removeItem('loadingType');
              this.duplicateSection = false;
              this.editSection = false;
              this.validSection = true;
            }
          }
        },
        (err) => {
          
         },
        );
    }
  }
  onSaveSearchVehicles(){

    sessionStorage.removeItem('loadingType');
    this.duplicateSection = false;
    this.subuserType = sessionStorage.getItem('typeValue');
    let appId = "1",loginId="",brokerbranchCode="",createdBy="";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          createdBy = this.vehicleDetails.CreatedBy;
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
          loginId = this.vehicleDetails.LoginId;
          //loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = null;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.commonDetails?.SourceCode;
        this.customerCode = this.commonDetails?.CustomerCode;
        this.brokerCode = this.commonDetails?.BrokerCode;
        brokerbranchCode =  this.commonDetails?.BrokerBranchCode;
        this.customerName = this.commonDetails?.CustomerName;
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      let id = sessionStorage.getItem('vehicleLength')
      if(id!=null && id!=undefined){
        this.vehicleDetails['Vehicleid'] =  sessionStorage.getItem('vehicleLength');
      }
      else{ this.vehicleDetails['Vehicleid'] = '1';} 
      this.vehicleDetails['Active'] = false;
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      if(this.endorsementSection){
      }
      let sumInsured = null;
      if(this.vehicleDetails?.SUM_INSURED) sumInsured = this.vehicleDetails?.SUM_INSURED;
      let quoteReferenceNo = null;
      if(this.endorsementSection){
        let entry = this.vehicleDetailsList.filter(ele=>ele?.EndorsementDate!=undefined)
        if(entry){
          let details = entry[0];
          console.log("Filtered Endorsement Set",entry)
          this.endorsementYN ='Y';
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsmentRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceYesNo;
        }
      }
      else this.endorsementYN = 'N';
      if(sessionStorage.getItem('quoteReferenceNo')) quoteReferenceNo = sessionStorage.getItem('quoteReferenceNo');
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": this.vehicleDetails?.AcExecutiveId,
      "CommissionType": this.vehicleDetails?.CommissionType,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": quoteReferenceNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleDetails.Vehicleid,
      "AcccessoriesSumInsured": this.vehicleDetails?.AcccessoriesSumInsured,
      "AccessoriesInformation": this.vehicleDetails?.AccessoriesInformation,
      "AdditionalCircumstances": this.vehicleDetails?.AdditionalCircumstances,
      "AxelDistance": this.axelDistance,
      "Chassisnumber": this.chassisNo,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": this.vehicleDetails?.CityLimit,
      "CoverNoteNo": this.vehicleDetails?.CoverNoteNo,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": createdBy,
      "DrivenByDesc": 'D',
      "EngineNumber": this.vehicleDetails?.EngineNumber?.toUpperCase(),
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": this.vehicleDetails?.Gpstrackinginstalled,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": this.vehicleDetails?.Insurancetype,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": this.vehicleDetails?.InsuranceClass,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": this.vehicleDetails?.TiraMotorUsage,
      "NcdYn": this.vehicleDetails?.NcdYn,
      "NoOfClaims": this.vehicleDetails?.NoOfClaims,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": this.vehicleDetails?.SectionId,
      "PolicyType": this.vehicleDetails?.PolicyType,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "Registrationnumber": this.regNo,
      "RoofRack": null,
      "SeatingCapacity": this.seatingCapacity,
      "SourceTypeId": this.sourceType,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": this.vehicleDetails?.SumInsured,
      "Tareweight": this.tareWeight,
      "TppdFreeLimit": this.vehicleDetails?.TppdFreeLimit,
      "TppdIncreaeLimit": this.vehicleDetails?.TppdIncreaeLimit,
      "TrailerDetails": null,
      "Vehcilemodel":  this.vehicleDetails?.VehcileModel,
      "VehicleType": this.bodyTypeId,
      "Vehiclemake": this.vehicleDetails?.VehicleMake,
      "WindScreenSumInsured": this.vehicleDetails?.WindScreenSumInsured,
      "Windscreencoverrequired": this.vehicleDetails?.Windscreencoverrequired,
      "accident": null,
      "periodOfInsurance": this.vehicleDetails?.periodOfInsurance,
      "PolicyStartDate": this.vehicleDetails.PolicyStartDate,
      "PolicyEndDate": this.vehicleDetails.PolicyEndDate,
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.havePromoCode,
      "PromoCode": this.promoCode,
      "CollateralYn": this.vehicleDetails?.CollateralYn,
      "CollateralName": this.vehicleDetails?.CollateralName,
      "FirstLossPayee": this.vehicleDetails?.FirstLossPayee,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
      "NoOfComprehensives": this.vehicleDetails?.NoOfComprehensives,
      "ClaimRatio": null,
      "SavedFrom": this.vehicleDetails?.SavedFrom,
      "UserType": this.userType,
      "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
      "EndorsementYn":  this.endorsementYN,
      "SaveOrSubmit": "Save",
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
      "Scenarios": {
          "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": null,
              "OldCurrency": this.currencyCode,
              "OldExchangeRate": this.exchangeRate,
              "OldSumInsured": null,
              "OldTppdIncreaeLimit": null,
              "OldWindScreenSumInsured": null
          }
      },
      "Status": "Y"
    }
    ReqObj['FleetOwnerYn'] = "N";
      if(this.endorsementSection){
        if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y'){
          ReqObj['Status'] = 'E';
        }
        else{
          ReqObj['Status'] = this.vehicleDetails?.Status;
        }
        ReqObj['PolicyNo'] = this.endorsePolicyNo
      }
      else{
        ReqObj['Status'] = 'Y';
      }
      if(this.insuranceId=='100019'){
        if(this.vehicleDetails?.CarAlarmYn!= null && this.vehicleDetails?.CarAlarmYn!='' && this.vehicleDetails?.CarAlarmYn!=undefined)  ReqObj['CarAlarmYn'] = this.vehicleDetails?.CarAlarmYn;
        else ReqObj['CarAlarmYn'] = 'N';
      }
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      console.log("Final Req",ReqObj,this.vehicleDetails);
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
          }
          else{
            this.quoteRefNo = data?.Result?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
              this.vehicleDetails = null;
              sessionStorage.setItem('vehicleExist','true');
              sessionStorage.removeItem('vehicleDetailsList');
              sessionStorage.removeItem('editCars');
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Motor Details Updated Successfully' });
              this.router.navigate(['/policyDetails'])

          }
        },
        (err) => { },
      );
  }
  getOwnerCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/ownercategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ownerList = data.Result;
            this.getFuelTypeList();
        }
      },
      (err) => { },
    );
  }
  getFuelTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/fueltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.fuelTypeList = data.Result;
            this.getColorsList();
        }

      },
      (err) => { },
    );
  }
  getColorsList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/color`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.colorList = data.Result;
            this.getBodyTypeList();
        }
      },
      (err) => { },
    );
  }
  getBodyTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/induvidual/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bodyTypeList = data.Result;
            this.getUsageList();
        }

      },
      (err) => { },
    );
  }
  getUsageList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}api/dropdown/induvidual/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.usageList = data.Result;
            this.getMotorCategoryList();
        }

      },
      (err) => { },
    );
  }
  onBodyTypeChange(type){
    if(this.bodyTypeValue!=null && this.bodyTypeValue!=''){
      this.bodyTypeId = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeValue)?.Code;
      if(type=='change' && this.insuranceId!='100020'){this.makeValue=null;this.modelValue=null;}
      if(this.bodyTypeId && this.insuranceId!='100020') this.getMakeList();
      
    }
  }
  getMakeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormake`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.makeList = data.Result;
            if(this.getdetails== 'SavedFroms'){
              if(this.editdata?.Vehiclemake!=null && this.editdata?.Vehiclemake!=''){
                let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake);
                this.makeValue = entry.Code;
                this.onMakeChange();
              }
            }
            
        }

      },
      (err) => { },
    );
  }
  onMakeChange(){
    console.log("on make change",this.makeValue);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId,
      "MakeId": this.makeValue
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormakemodel`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.modelList = data.Result;
            if(this.getdetails== 'SavedFroms'){
              let entry = this.modelList.find(ele=>ele.CodeDesc==this.editdata?.Vehcilemodel);
              if((entry==null || entry==undefined) && (this.editdata?.Vehcilemodel!=null && this.editdata?.Vehcilemodel!=undefined)){
                  this.modelValue = '99999';
                  this.modelDesc = this.editdata?.Vehcilemodel;
              }
              else this.modelValue = this.modelValue = entry.Code;
            }
        }
      },
      (err) => { },
    );
  }
  onModelChange(type){
    if(this.modelValue!=null && this.modelValue!=''){
      if(this.modelValue!='99999'){
        this.modelDesc = this.modelList.find(ele=>ele.CodeDesc==this.modelValue)?.CodeDesc;
      }
      
      else if(type=='change'){this.modelDesc = null}
    }
  }
  getMotorCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/motorcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorCategoryList = data.Result;
            // let chassisNo = sessionStorage.getItem('editVehicleDetails');
            // if(chassisNo){
            //   this.editSection = true;
            //   this.getVehicleDetails('',chassisNo,'edit');
            // }
            // else{ this.editSection = false}
        }

      },
      (err) => { },
    );
  }
  getYearList(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const currentYear = new Date().getFullYear()-20, years = [];
    while ( year >= currentYear ) {
      let yearEntry = year--
      years.push({"Code":String(yearEntry),"CodeDesc":String(yearEntry)});
    }   
    return years;
  }
  submit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle Added Successfully' });
  }
  getExistingVehiclesList(){
    let sessioncar= JSON.parse(sessionStorage.getItem('EditCarDetails'));
    // let ReqObj = {
    //   "ReqChassisNumber": sessioncar?.ReqChassisNumber,
    //   "ReqRegNumber": sessioncar?.ReqRegNumber,
    //   "InsuranceId": this.insuranceId,
    //   "BranchCode": this.branchCode,
    //   "BrokerBranchCode": this.branchCode,
    //   "ProductId": this.productId,
    //   "CreatedBy": this.loginId,
    //   "SavedFrom": 'WEB'
    // }
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo')
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": sessioncar?.Idnumber,
      "Vehicleid": sessioncar.Vehicleid
    }
    let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
         console.log('Device Datasssss',data.Result);
         this.vehicleDetails = data.Result;
         this.editdata=data.Result;
         this.setVehiclValues(this.editdata);

      }
      },
      (err) => { },
    );
  }
  setVehiclValues(vehDetails){
    this.axelDistance = vehDetails?.AxelDistance;
    this.chassisNo = vehDetails?.Chassisnumber;
    this.colorValue = vehDetails?.Color;
    this.engineNo = vehDetails?.EngineNumber;
    this.fuelType = vehDetails?.FuelType;
    this.grossWeight = vehDetails?.Grossweight;
    this.manufactureYear = vehDetails?.ManufactureYear;
    this.motorCategory = vehDetails?.MotorCategory;
    this.usageValue = vehDetails?.TiraMotorUsage;
    this.noOfAxels = vehDetails?.NumberOfAxels;
    this.ownerCategory = vehDetails?.OwnerCategory;
    this.regNo = vehDetails?.Registrationnumber;
    this.engineCapacity = vehDetails?.EngineCapacity;
    this.ownerName = vehDetails?.ResOwnerName;
    this.seatingCapacity = vehDetails?.SeatingCapacity;
    this.tareWeight = vehDetails?.Tareweight;
    if(vehDetails?.VehicleType!=null && vehDetails?.VehicleType!=''){
    this.bodyTypeValue = vehDetails?.TiraBodyType;
     if(this.insuranceId!='100020') this.onBodyTypeChange('direct');
     else{
      if(vehDetails?.Vehiclemake!=null && vehDetails?.Vehiclemake!='' && this.makeList.length!=0){
          let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake);
          console.log("Make List",this.makeList)
          this.makeValue = entry.Code;
          // this.editSectionAlt = true;
          // this.onMakeAltChange('direct',vehDetails?.VehicleModelDesc);
      }
     }
    }

  }
  onFormSubmit(){
    let make = "";
    if(this.makeValue!='' && this.makeValue!=undefined && this.makeValue!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.makeValue);
      make = entry.CodeDesc;
    }
    let modelDesc = null;
    if(this.insuranceId=='100020'){
        if(this.modelDesc!=null && this.modelDesc!=''){ 
          let entry = this.modelList.find(ele=>ele.Model==this.modelDesc);
          if(entry) modelDesc = entry?.VehicleId
        }
        else modelDesc = null;
    }
    else{
      if(this.bodyTypeId=='1' || this.bodyTypeId=='2' || this.bodyTypeId=='3' || this.bodyTypeId=='4' || this.bodyTypeId=='5'){
        if(this.modelValue=='99999'){
            modelDesc = this.modelDesc;
        }
        else if(this.modelValue!='' && this.modelValue!=null){
          modelDesc = this.modelList.find(ele=>ele.Code==this.modelValue)?.CodeDesc
        }
      }
      else modelDesc = this.modelDesc;
    }
    
    
    if(this.insuranceId=='100004') this.usageValue = null;
    this.ownerCategory = this.customerDetails?.PolicyHolderType;
    let ReqObj = {
      "Insuranceid": this.insuranceId,
      "BranchCode": this.branchCode,
      "AxelDistance": this.axelDistance,
      "Chassisnumber": this.chassisNo?.toUpperCase(),
      "Color": this.colorValue,
      "CreatedBy": this.loginId,
      "EngineNumber": this.engineNo?.toUpperCase(),
      "FuelType": this.fuelType,
      "Grossweight": this.grossWeight,
      "ManufactureYear": this.manufactureYear,
      "MotorCategory": this.motorCategory,
      "Motorusage": this.usageValue,
      "NumberOfAxels": this.noOfAxels,
      "OwnerCategory": this.ownerCategory,
      "Registrationnumber": this.regNo?.toUpperCase(),
      "ResEngineCapacity": this.engineCapacity,
      "ResOwnerName": this.ownerName,
      "ResStatusCode": "Y",
      "ResStatusDesc": "None",
      "SeatingCapacity": this.seatingCapacity,
      "Tareweight": this.tareWeight,
      "Vehcilemodel": modelDesc,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": make
    }
    let urlLink = `${this.motorApiUrl}regulatory/savevehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //if(this.getdetails!='SavedFroms'){
            this.getVehicleDetails(this.regNo,this.chassisNo,'save',this.bodyTypeValue,this.usageValue,this.engineCapacity,make,modelDesc);
          // }
          // else{
          //   sessionStorage.removeItem('Editcars')
          //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
          // }
        }
        else  if(data.ErrorMessage.length!=0){
          if(data.ErrorMessage){
            // for(let entry of data.ErrorMessage){
            //   let type: NbComponentStatus = 'danger';
            //   const config = {
            //     status: type,
            //     destroyByClick: true,
            //     duration: 4000,
            //     hasIcon: true,
            //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //     preventDuplicates: false,
            //   };
            //   this.toastrService.show(
            //     entry.Field,
            //     entry.Message,
            //     config);
            // }
          }
        }
      },
      (err) => { },
    );
  }
  getVehicleDetails(regNo,chassisNo,type,modelDesc,usageDesc,engCapacity,make,model){
    //   let ReqObj = {
    //     "ReqChassisNumber": chassisNo,
    //     "ReqRegNumber": regNo,
    //     "InsuranceId": this.insuranceId,
    //     "BranchCode": this.branchCode,
    //     "BrokerBranchCode": this.branchCode,
    //     "ProductId": this.productId,
    //     "CreatedBy": this.loginId,
    //     "SavedFrom": 'WEB'
    //   }
    //   let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //       if(data.Result){
    //         this.vehicleDetails = data?.Result;
            if(this.vehicleDetails==undefined || this.vehicleDetails==null){
              this.vehicleDetails = {
                "AcccessoriesSumInsured": null,
        "AccessoriesInformation": null,
        "AdditionalCircumstances": null,
        "CityLimit": null,
        "CoverNoteNo": null,
        "Gpstrackinginstalled": null,
        "Insurancetype": null,
        "InsuranceId": this.insuranceId,
        "InsuranceClass": null,
        "InsurerSettlement": "",
        "InterestedCompanyDetails": "",
        "ModelNumber": null,
        "MotorCategory": null,
        "NcdYn": null,
        "NoOfClaims": null,
        "SectionId": null,
        "PolicyType": null,
        "RadioOrCasseteplayer": null,
        "RoofRack": null,
        "SourceTypeId": this.sourceType,
        "SpotFogLamp": null,
        "Stickerno": null,
        "SumInsured": null,
        "TppdFreeLimit":null,
        "TppdIncreaeLimit": null,
        "TrailerDetails": null,
        "WindScreenSumInsured": null,
        "Windscreencoverrequired": null,
        "accident": null,
        "periodOfInsurance": null,
        "CollateralYn": null,
        "CollateralName": null,
        "FirstLossPayee": null,
        "FleetOwnerYn": null,
        "NoOfVehicles": null,
        "NoOfComprehensives": null,
        "ClaimRatio": null,
        "SavedFrom":null,
        "TiraCoverNoteNo": null,
        "EndorsementYn": null,
        "SaveOrSubmit": "Save",
        "EndorsementDate": null,
        "EndorsementEffectiveDate": null,
        "EndorsementRemarks": null,
        "EndorsementType": null,
        "EndorsementTypeDesc": null,
        "EndtCategoryDesc": null,
        "EndtCount": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo":null,
        "EndtStatus": null,
        "IsFinanceEndt": null,
        "OrginalPolicyNo": null,
        "Scenarios": {
            "ExchangeRateScenario": {
                "OldAcccessoriesSumInsured": null,
                "OldCurrency": this.currencyCode,
                "OldExchangeRate": this.exchangeRate,
                "OldSumInsured": null,
                "OldTppdIncreaeLimit": null,
                "OldWindScreenSumInsured": null
            }
        },
              }
            }
            let id = sessionStorage.getItem('vehicleLength')
            if(id!=null && id!='' && id!= undefined){
              this.vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength');
            }
            else{ this.vehicleDetails['Vehicleid'] = '1';}
            this.vehicleDetails['Active'] = false;
            let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
            if(vehicles){
              if(modelDesc!=null){
                this.vehicleDetails['TiraBodyType'] = modelDesc;
                this.vehicleDetails['TiraMotorUsage'] = usageDesc;
                this.vehicleDetails['EngineCapacity'] = engCapacity;
              }
              this.vehicleDetails['Currency'] = this.currencyCode;
              this.vehicleDetails['ExchangeRate'] = this.exchangeRate;
              let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
              if(commonDetails){
                this.commonDetails = commonDetails;
                if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
                if(this.vehicleDetails.PolicyStartDate==null || this.vehicleDetails.PolicyStartDate==undefined){
                  let dateList = commonDetails.policyStartDate.split('/');
                  if(dateList.length==1){
                    this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                    this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                  }
                  else{
                    this.vehicleDetails.PolicyStartDate = commonDetails.policyStartDate;
                    this.vehicleDetails.PolicyEndDate = commonDetails.policyEndDate;
                  }
                } 
                this.currencyCode = commonDetails?.currencyCode;
                this.exchangeRate = commonDetails?.exchangeRate;
                if(commonDetails?.promoCode!=null && commonDetails?.promoCode!=undefined) this.promoCode = commonDetails?.promoCode;
                if(this.promoCode!=null) this.havePromoCode = 'Y';
              }
              this.vehicleDetails['modifiedYN'] = 'Y';
              // this.vehicleDetails['SourceType'] = this.updateComponent.sourceType;
              // this.vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
              // this.vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
              // this.vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
              // this.vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
              // this.vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
              // this.vehicleDetails['HavePromoCode'] = this.updateComponent.HavePromoCode;
              // this.vehicleDetails['PromoCode'] = this.updateComponent.PromoCode;
              vehicles.push(this.vehicleDetails);
              sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicles));
              this.onSaveSearchVehicles();
           }
            else{ 
              if(modelDesc!=null){
                this.vehicleDetails['TiraBodyType'] = modelDesc;
                this.vehicleDetails['TiraMotorUsage'] = usageDesc;
                this.vehicleDetails['EngineCapacity'] = engCapacity;
              }
              let commonDetails = JSON.parse(sessionStorage.getItem('commonDetails'));
              if(commonDetails){
                if(this.vehicleDetails==null || this.vehicleDetails==undefined) this.vehicleDetails={};
                this.vehicleDetails.PolicyStartDate = this.datePipe.transform(commonDetails.policyStartDate, "dd/MM/yyyy");
                this.vehicleDetails.PolicyEndDate = this.datePipe.transform(commonDetails.policyEndDate, "dd/MM/yyyy");
                this.currencyCode = commonDetails?.currencyCode;
                this.exchangeRate = commonDetails?.exchangeRate;
                if(commonDetails?.promoCode!=null && commonDetails?.promoCode!=undefined) this.promoCode = commonDetails?.promoCode;
                if(this.promoCode!=null) this.havePromoCode = 'Y';
              }
              this.vehicleDetails['modifiedYN'] = 'Y';
              // this.vehicleDetails['SourceType'] = this.updateComponent.sourceType;
              // this.vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
              // this.vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
              // this.vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
              // this.vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
              // this.vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
              this.vehicleDetails['VehicleMake'] = make;
              this.vehicleDetails['VehicleModel'] = model;
              this.onSaveSearchVehicles();
             
  
            //this.updateComponent.CurrencyCode = this.updateComponent.vehicleWishList[0].Currency;
              /*this.currencyCode = this.updateComponent.CurrencyCode;
            this.exchangeRate = this.updateComponent.exchangeRate;
            this.policyStartDate = this.updateComponent.policyStartDate;
            this.policyEndDate = this.updateComponent.policyEndDate;
            this.HavePromoCode = this.updateComponent.HavePromoCode;
            this.PromoCode = this.updateComponent.PromoCode;
            console.log('update',this.updateComponent.CurrencyCode);
            //this.acExecutiveId = this.updateComponent.AcExecutiveId;
            //this.commissionType = this.updateComponent.vehicleWishList[0].CommissionType;
            /*this.updateComponent.CurrencyCode = this.updateComponent.customerData[0].Currency;
            this.currencyCode = this.updateComponent.customerData[0].Currency;
            this.exchangeRate = this.updateComponent.customerData[0].ExchangeRate;
            this.policyStartDate = this.updateComponent.customerData[0].PolicyStartDate;
            this.policyEndDate = this.updateComponent.customerData[0].PolicyEndDate;
            this.HavePromoCode = this.updateComponent.customerData[0].HavePromoCode;
            this.PromoCode = this.updateComponent.customerData[0].PromoCode;
            this.acExecutiveId = this.updateComponent.customerData[0].AcExecutiveId;
            this.commissionType = this.updateComponent.customerData[0].CommissionType;*/
  
            }
            
  
            
            // if(type=='save'){
            //   if(this.editSection){
            //     sessionStorage.removeItem('vehicleDetails')
            //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
            //   }
            //   else{
            //   sessionStorage.removeItem('editVehicleId');
            //   vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength')
            //   sessionStorage.setItem('vehicleDetails',JSON.stringify(vehicleDetails));
            //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
            //   }
            // }
            // else{
            //   this.setVehiclValues(vehicleDetails);
            // }
          //}
      //   },
      //   (err) => { },
      // );
    }
}
