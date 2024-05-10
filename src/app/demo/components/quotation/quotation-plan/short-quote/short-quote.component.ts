import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MotorShotQuoteUganda } from '../models/Uganda/MotorShotQuoteUganda';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProductData } from '../models/product';
import * as moment from 'moment';

@Component({
  templateUrl: './short-quote.component.html',
  styleUrls: ['./short-quote.component.scss']
})
export class ShortQuoteComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  insuranceId: any=null;
  productId: any;
  countryCode:any='';clientName:any='';
  insurenceTypeList: any[]=[];
  insurenceClassList: any[]=[];
  bodyTypeList: any;
  motorUsageList: any;
  modelList: any;
  makeList: any;
  years: any;
  userDetails: any;
  loginId: any;
  userType: any;
  brokerbranchCode: any;
  branchList: any;
  agencyCode: any;customerName:any=null;
  branchCode: any;classList:any[]=[];customerDetails:any=null;
  modelColumns: string[];brokerCode:any=null;customerCode:any=null;
  vehicleDetailsList: any;noOfDays:any=null;sourceType:any=null;
  editSectionAlt: boolean;endorseEffectiveDate:any=null;
  makeValue: any;typeList:any[]=[];policyStartDate:any=null;
  editdata: any;mobileNo:any=null;endorsementSection:boolean=false;
  bodyTypeId: any;cityValue:any=null;yearList:any[]=[];enableAddVehicle:boolean=false;
  bodyTypeValue: any;motorUsageValue:any=null;policyEndDate:any=null;
  bodyTypeIdcode: any;vehicleDetails:any=null;endorsementYn:any='N';
  form:any;classValue:any=null;motorUsageType:any=null;
  model:any;motorTypeList:any[]=[];typeValue:any=null;subuserType:any=null;
  fields:any[]=[];productItem:any=null;mobileCodeList:any[]=[];
  individualCalcIndex: number;
  quoteRefNo: any=null;
  endorseCoverModification: any;
  exchangeRate: any=null;
  currencyCode: any=null;
  currencyList: any[]=[];
  minCurrencyRate: any=null;
  maxCurrencyRate: any=null;
  constructor(private router: Router,private sharedService: SharedService,private datePipe:DatePipe) {
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
      this.currencyCode = this.userDetails.Result.CurrencyId;
      this.modelColumns = ['Select','Model','Body Type','Fuel Type','Transmission','WeightKg'];
      let vehicleList = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleList) this.vehicleDetailsList = vehicleList;
      this.form = new FormGroup({});
      this.model = { };
    // this.getCountryCode();
    // this.getInsurenceType();
    // this.getInsurenceClass();
    // this.getMotorUsageList();
    // this.getBodyType();
    // this.years = this.getYearList();
  }
  ngOnInit(): void {
    this.productItem = new ProductData();
    this.productItem.CarAlarmYN = 'N';
    this.productItem.GpsYN = 'N';
    this.productItem.ClaimsYN = 'N';
    this.yearList = this.getYearList();
    this.onGetFormControl();
    this.getMobileCodeList();
    this.getCurrencyList();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.policyStartDate = this.datePipe.transform(new Date(year, month, day),'dd/MM/yyyy');
    this.policyEndDate = this.datePipe.transform(new Date(year + 1, month, day-1),'dd/MM/yyyy');
  }
  onGetFormControl(){
    
    this.fields = [];
    let fireData:any=null;
    fireData = new MotorShotQuoteUganda();
    this.fields[0] = fireData?.fields;
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.form.controls['InsuranceType'].valueChanges.subscribe(() => {
            this.getMotorTypeList('change',null,null);
            this.getMotorUsageList(null,'change');
        });
      } }
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks;
      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004' || this.insuranceId=='100028'){
        let regionHooks2 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onChangeInsuranceClass('change')
          });
        } 
       }
       let regionHooks3 ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onBodyTypeChange('change');
        });
        }} 
        let regionHooks4 ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.onMakeChange();
          });
          }} 
        if(this.insuranceId!='100004') {
          let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
          let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
          for(let field of fieldList){
            if(field.key=='ManufactureYear' && this.yearList.length!=0) field.props.options= defaultObj.concat(this.yearList);
            if(field.key=='BodyType'){ field.hooks = regionHooks3;}
            if(field.key=='Make'){ field.hooks = regionHooks4;}
            if(field.key=='InsuranceType' && this.insuranceId=='100028'){
              field.hooks = regionHooks2;
            }
            else if(field.key=='InsuranceClass'  && this.insuranceId!='100028') field.hooks = regionHooks2;
          }
        }
        else this.fields[0].fieldGroup[0].fieldGroup[0].hooks = regionHooks2;
      }
      this.getInsuranceTypeList();
      this.getInsuranceClassList();
      

  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productcurrency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyList = data.Result;
             if(this.currencyCode){
            //   if(this.currencyList.some(ele=>ele.Code==this.currencyCode)){
                this.onCurrencyChange('direct');
                console.log('currency Details 888',this.currencyCode);
              // }
              // else this.currencyCode=this.currencyList[0].Code
            }
            else if(this.currencyList.length==1){
            this.currencyCode=this.currencyList[0].Code;
            this.onCurrencyChange('direct');
          }
        }

      },
      (err) => { },
    );
  }
  onCurrencyChange(type){
    let currencyData 
    if(this.currencyCode!=null && this.currencyCode!=''){
      console.log('Currency Listss',this.currencyList);
      if(this.currencyList.length!=0){
        currencyData = this.currencyList.find(ele=>ele.Code==this.currencyCode);
        if(currencyData){
          this.exchangeRate = currencyData?.ExchangeRate;
          this.minCurrencyRate = currencyData?.MinRate;
          this.maxCurrencyRate = currencyData?.MaxRate;
        }
        else{
          this.currencyCode= this.currencyList[0]?.Code;
          this.exchangeRate =this.currencyList[0]?.ExchangeRate;
          this.minCurrencyRate = this.currencyList[0]?.MinRate;
          this.maxCurrencyRate = this.currencyList[0]?.MaxRate;
        }
      }
      
    }
    console.log('CCCCCCCC',this.currencyCode)

    if(this.currencyCode=="TZS")
    {
      // this.editSection=false;
    }
    else{
      // this.editSection=true;
    }
    //if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    if(type=='change' && this.quoteRefNo!=null){
      // this.updateComponent.ModifiedCurrencyYN = 'Y';
    }
    if(type=='change'){
      if(this.vehicleDetailsList.length!=0){
        for(let customer of this.vehicleDetailsList) customer['modifiedYN'] = 'Y';
      }
    }
  }
  onBodyTypeChange(type){
    if(this.productItem.BodyType!=null && this.productItem.BodyType!=''){
      this.bodyTypeId = this.motorTypeList.find(ele=>ele.CodeDesc==this.productItem.BodyType || ele.Code==this.productItem.BodyType)?.Code;
      if(type=='change' && this.insuranceId!='100020'){this.productItem.MakeId=null;this.productItem.ModelId=null;}
      if(this.bodyTypeId && this.insuranceId!='100020'){ this.getMakeList(); } 
      
    }
  }
  onMakeChange(){
    console.log("on make change",this.makeValue);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId,
      "MakeId": this.makeValue
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/motormakemodel`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.modelList = data.Result;
            if(this.modelList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.modelList.length; i++) {
                this.modelList[i].label = this.modelList[i]['CodeDesc'];
                this.modelList[i].value = this.modelList[i]['Code'];
                if (i == this.modelList.length - 1) {
                  if(this.fields.length!=0){
                    let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Model'){
                            field.props.options =  defaultObj.concat(this.modelList);
                      }
                    };
                  }
                }
              }
            }
            // if(this.getdetails== 'SavedFroms'){
            //   let entry = this.modelList.find(ele=>ele.CodeDesc==this.editdata?.Vehcilemodel || ele.Code==this.editdata?.Vehcilemodel);
            //   if((entry==null || entry==undefined) && (this.editdata?.Vehcilemodel!=null && this.editdata?.Vehcilemodel!=undefined)){
            //       this.modelValue = '99999';
            //       this.modelDesc = this.editdata?.Vehcilemodel;
            //   }
            //   else this.modelValue = this.modelValue = entry.Code;
            // }
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
      years.push({"Code":String(yearEntry),'label':String(yearEntry),"value":String(yearEntry),"CodeDesc":String(yearEntry)});
    }   
    return years;
  }
  getMakeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.makeList = data.Result;
            if(this.makeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.makeList.length; i++) {
                this.makeList[i].label = this.makeList[i]['CodeDesc'];
                this.makeList[i].value = this.makeList[i]['Code'];
                if (i == this.makeList.length - 1) {
                  if(this.fields.length!=0){
                    let fieldList =  this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='Make'){
                            field.props.options =  defaultObj.concat(this.makeList);
                      }
                    };
                  }
                    
                 
                    
                }
              }
            }
            // if(this.getdetails== 'SavedFroms'){
            //   if(this.editdata?.Vehiclemake!=null && this.editdata?.Vehiclemake!=''){
            //     let entry = this.makeList.find(ele=>ele.CodeDesc==this.editdata?.Vehiclemake || ele.Code==this.editdata?.Vehiclemake);
            //     if(entry){
            //         this.makeValue = entry.Code;
            //         this.onMakeChange();
            //     }
            //   }
            // }
            
        }

      },
      (err) => { },
    );
  }
  getInsuranceTypeList(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.typeList = data.Result;
            if(this.typeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.typeList.length; i++) {
                this.typeList[i].label = this.typeList[i]['CodeDesc'];
                this.typeList[i].value = this.typeList[i]['Code'];
                if (i == this.typeList.length - 1) {
                  if(this.fields.length!=0)  this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.typeList);
                    
                }
              }
            }
        }

      },
      (err) => { },
    );
  }
  getInsuranceClassList(){
    let loginId = null;
    if(this.userType!='Issuer'){
      this.subuserType = sessionStorage.getItem('typeValue');
      if(this.subuserType=='B2C') loginId = 'guest';
      else{
      loginId=this.loginId;
      }
    }
    else{
      loginId=this.loginId
        if(this.vehicleDetailsList.length!=0) loginId = this.vehicleDetailsList[0].LoginId;
        //if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "LoginId":loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.classList = data.Result;
            if(this.insuranceId!='100027'){
              if(this.classList.length!=0){
                let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
                for (let i = 0; i < this.classList.length; i++) {
                  this.classList[i].label = this.classList[i]['CodeDesc'];
                  this.classList[i].value = this.classList[i]['Code'];
                  if (i == this.classList.length-1) {
                   
                      console.log("Dropdown List",this.fields)
                      if(this.insuranceId=='100002' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020' || this.insuranceId=='100004'){
                        let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                        for(let field of fieldList){
                          console.log('Field ',field)
                          if(field.key=='InsuranceClass'){
                                field.props.options= defaultObj.concat(this.classList);;
                          }
                        }
                      }
                  }
                }
              }
            }
            
        }
      },
      (err) => { },
    );
  }
  getMobileCodeList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {

          let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
          this.mobileCodeList = obj.concat(data.Result);
  
        }
      },
      (err) => { },
    );
}
  getMotorUsageList(vehicleValue,type){
    let sectionId = null;
    this.productItem.MotorUsage = this.motorUsageValue;
    if(this.insuranceId=='100027') sectionId='91';
    else{
      if(Array.isArray(this.productItem?.InsuranceType)) sectionId = null;
     else sectionId = this.productItem?.InsuranceType;
    }
    console.log("ProductItem",this.productItem)
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SectionId": sectionId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            if(this.motorUsageList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':null,'CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorUsageList.length; i++) {
                this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
                this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
                if (i == this.motorUsageList.length - 1) {
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='MotorUsage'){
                        if(vehicleValue==null && type!='direct'){
                          if(this.motorUsageValue) this.productItem.MotorUsage = this.motorUsageValue;
                          let entry = this.motorUsageList.some(ele=>ele.Code==this.productItem.MotorUsage || ele.CodeDesc==this.productItem.MotorUsage);
                          if(!entry){
                            this.productItem.MotorUsage='';field.formControl.setValue(''); this.motorUsageValue='';this.motorUsageType=type;
                          }
                        }
                        else{field.formControl.setValue(vehicleValue);this.motorUsageType=type;}
                            field.props.options= defaultObj.concat(this.motorUsageList);
                      }
                    }
                }
              }
            }
            this.motorUsageValue = vehicleValue;
            // if(vehicleValue==null && type!='direct'){
            //   this.productItem.MotorUsage = null;
            //   console.log(this.fields)
            // }
            // else{
            //   this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
            // }
            if(this.insuranceId!='100028') this.productItem.MotorUsage = vehicleValue;
            if(this.vehicleDetails && this.motorUsageList.length!=0 && this.motorUsageValue==null){
              let value = this.motorUsageList.find(ele=>ele.CodeDesc == this.vehicleDetails?.Motorusage || ele.Code==this.vehicleDetails?.Motorusage);
              if(value){ this.motorUsageValue = value.Code;this.productItem.MotorUsage = value.Code;}
              else this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
            }
            
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
            //   if(value){ this.motorUsageValue = value.Code}
            // }

            //this.getMotorUsageList();
        }

      },
      (err) => { },
    );
  }
  onChangeInsuranceClass(type){
    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
    for(let field of fieldList){
      if(field.key=='GpsYN' || field.key=='CarAlarmYN'){
        if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
          if(this.productItem.InsuranceClass=='1'){
            field.hideExpression = false;field.hide=false;  
            if(this.productItem.GpsYN==null || this.productItem.GpsYN=='') this.productItem.GpsYN = 'N';
            if(this.productItem.CarAlarmYN==null || this.productItem.CarAlarmYN=='') this.productItem.CarAlarmYN = 'N';
          }
          else{ field.hideExpression = true;field.hide=true;
            if(this.productItem){
              this.productItem.GpsYN = 'N';
              this.productItem.CarAlarmYN = 'N';
            }
          }
        }
      }
      if(field.key=='InsuranceType' && (this.insuranceId=='100028' || this.insuranceId=='100027') && this.vehicleDetailsList.length==1){
        field.hideExpression = true;field.hide=true;
      }
      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
        if(this.insuranceId=='100028' && this.vehicleDetailsList.length==1){
          field.hideExpression = false;field.hide=false;
        }
        else if(this.productItem.InsuranceClass!='' && this.productItem.InsuranceClass!=null && this.productItem.InsuranceClass!=undefined){
            if(this.productItem.InsuranceClass=='1' || this.productItem.InsuranceClass=='2'){
              field.hideExpression = false;field.hide=false;
            }
            else{ 
              this.productItem.VehicleSI = null;
              this.productItem.WindShieldSI = null;
              this.productItem.Accessories 
              field.hideExpression = true;field.hide=true;}
        }
      }
    }
  }
  getMotorTypeList(type,motorValue,vehicleUsage){
    if(this.insuranceId=='100027' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.typeValue=='100020') this.typeValue = this.productItem.InsuranceType;
    let typeValue = null;
    if(this.insuranceId!='100028') typeValue = null;
    else{
     if(Array.isArray(this.typeValue)) typeValue = null;
     else typeValue = this.typeValue;
    } 
    let ReqObj = {
      "SectionId": typeValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(type=='change'){
            this.cityValue = null;
            if(this.insuranceId=='100027' || this.insuranceId=='100028'){
              this.productItem.InsuranceClass = this.productItem?.InsuranceType
              this.classValue = this.typeValue;
            } 
          } 
            this.motorTypeList = data.Result;
            
            if(type=='direct'){ this.bodyTypeValue = motorValue; this.productItem.BodyType = motorValue}
            else if(this.insuranceId!='100027') this.bodyTypeValue = motorValue;
            if(this.vehicleDetails && this.motorTypeList.length!=0 && this.bodyTypeValue==null){
              let value = this.motorTypeList.find(ele=>ele.Code == this.vehicleDetails?.VehicleType || ele.CodeDesc == this.vehicleDetails?.VehicleType);
              if(value){ this.bodyTypeValue = value.Code;}
            }
            //this.getMotorUsageList(vehicleUsage,'direct');
            if(this.motorTypeList.length!=0){
              let defaultObj = [{'label':'---Select---','value':'','Code':'','CodeDesc':'---Select---'}];
              for (let i = 0; i < this.motorTypeList.length; i++) {
                this.motorTypeList[i].label = this.motorTypeList[i]['CodeDesc'];
                this.motorTypeList[i].value = this.motorTypeList[i]['Code'];
                if (i == this.motorTypeList.length - 1) {
                  if(this.insuranceId=='100027' || this.insuranceId=='100002' || this.insuranceId=='100028' || this.insuranceId=='100018' || this.insuranceId=='100019' || this.insuranceId=='100020'){
                    console.log(this.fields);
                    let fieldList = this.fields[0].fieldGroup[0].fieldGroup;
                    for(let field of fieldList){
                      if(field.key=='VehicleSI' || field.key=='AccessoriesSI' || field.key=='WindShieldSI' || field.key=='ExtendedTPPDSI'){
                        if(this.insuranceId=='100027'){
                          if(this.vehicleDetailsList.length==1){
                            field.hideExpression = false;field.hide=false;
                          }
                          else if(this.productItem.InsuranceType=='102' || this.productItem.InsuranceType=='95'){
                            field.hideExpression = true;field.hide=true;
                          }
                          else{field.hideExpression = false;field.hide=false;}
                        }
                        else if(this.insuranceId=='100028'){
                          if(this.vehicleDetailsList.length==1){
                            field.hideExpression = false;field.hide=false;
                          }
                          else if(this.productItem.InsuranceType=='104'){
                              field.hideExpression = false;field.hide=false;
                          }
                          else{field.hideExpression = true;field.hide=true;}
                        }
                      }
                      if(field.key=='BodyType'){
                        field.props.options = defaultObj.concat(this.motorTypeList);
                      }
                    }
                  }
                    //this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.motorTypeList);
                    
                }
              }
            }
            
            
        }

      },
      (err) => { },
    );
  }
  onSaveVehicleData(){
    if(this.insuranceId=='100004') this.typeValue = this.classValue;
    let createdBy="";
    let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.subuserType = sessionStorage.getItem('typeValue');
    
    let appId = "1",loginId="",brokerbranchCode="";
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        createdBy = this.vehicleDetailsList[0].CreatedBy;
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
        loginId = this.vehicleDetails?.LoginId;
        brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
        //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
        //   brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        // }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
        //   this.sourceType = this.vehicleDetails.SourceTypeId;
        //   this.bdmCode = this.vehicleDetails.BrokerCode;
        //   this.brokerCode = this.vehicleDetails.BrokerCode;
        //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
        //   this.customerCode = this.vehicleDetails.CustomerCode;
        //   this.customerName = this.vehicleDetails.CustomerName;
        // }
        // else{
        //   this.sourceType = this.updateComponent.sourceType;
        //   this.bdmCode = this.updateComponent.brokerCode;
        //   this.brokerCode = this.updateComponent.brokerCode;
        //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
        //   this.customerCode = this.updateComponent.CustomerCode;
        //   this.customerName = this.updateComponent.CustomerName;
        // }
      }
      else {
        this.sourceType = this.subuserType;
        this.customerCode = this.userDetails?.Result.CustomerCode;
      }
    }
      if(this.customerName ==undefined) this.customerName = null;
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
      IdNo = this.customerDetails?.IdNumber;
      regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      let deductibles = null;
    if(this.productItem.Deductibles!='' && this.productItem.Deductibles!=undefined) deductibles = this.productItem.Deductibles;
    let insuranceType = [];
    if((this.insuranceId=='100028' || this.insuranceId=='100027') && this.vehicleDetailsList.length==1){
        //if(this.typeValue==null || this.typeValue==undefined){
          for(let entry of this.typeList){
            insuranceType.push(entry.Code);
          }
        // }
        // else insuranceType.push(this.typeValue)
    }
    else{
      if(this.typeValue==null || this.typeValue==undefined){

      }
      else{
        if(this.insuranceId=='100004'){this.productItem.InsuranceType = this.productItem.InsuranceClass;}
        if(Array.isArray(this.productItem.InsuranceType)) insuranceType = this.productItem.InsuranceType;
        else insuranceType.push(this.productItem.InsuranceType);
      }
    }
   
    if(this.insuranceId=='100027' || this.insuranceId=='100028'){
      if(Array.isArray(insuranceType)){
        if(insuranceType.length!=0) this.productItem.InsuranceClass = insuranceType[0];
      }
      else this.productItem.InsuranceClass = insuranceType
      this.classValue = this.typeValue;
    } 
    let PurchaseDate= null;
    if(this.productItem.PurchaseDate!=null && this.productItem.PurchaseDate!='' && this.productItem.PurchaseDate!=undefined){
     if(String(this.productItem.PurchaseDate).includes('/')){
        PurchaseDate = this.productItem.PurchaseDate;
      }
      else PurchaseDate = this.datePipe.transform(this.productItem.PurchaseDate,'dd/MM/yyyy');
    }
    if(this.productItem.GpsYN==null || this.productItem.GpsYN==undefined || this.productItem.GpsYN=='') this.productItem.GpsYN = 'N';
    let VehicleTypeId = null,VehicleType=null;
    if(this.productItem.BodyType!=null && this.productItem.BodyType!=''){
      let usageId = this.motorTypeList.find(ele=>ele.CodeDesc==this.productItem.BodyType || ele.Code==this.productItem.BodyType).Code;
      if(usageId) VehicleTypeId = usageId;
      let usageDesc = this.motorTypeList.find(ele=>ele.CodeDesc==this.productItem.BodyType || ele.Code==this.productItem.BodyType).CodeDesc;
      if(usageDesc) VehicleType = usageDesc;

    }
    let motorUsage=null,motorUsageId=null;
   
      if(this.productItem.MotorUsage!=null && this.productItem.MotorUsage!='' && this.productItem.MotorUsage!=undefined){
        let usageDesc = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage)?.CodeDesc;
        if(usageDesc){
          motorUsage = usageDesc;
          let usageId = this.motorUsageList.find(ele=>ele.CodeDesc==this.productItem.MotorUsage || ele.Code==this.productItem.MotorUsage)?.Code;
          if(usageId) motorUsageId = usageId;
        } 
        else{
          if(this.vehicleDetails){
            motorUsageId = this.vehicleDetails.Motorusage
            motorUsage = this.vehicleDetails.MotorUsageDesc;
          }
        }
      }
      else{
        if(this.vehicleDetails){
          motorUsageId = this.vehicleDetails.Motorusage
          motorUsage = this.vehicleDetails.MotorUsageDesc;
        }
      }
    let ReqObj={
      "CustomerName": this.clientName,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "UserType": this.userType,
      "ApplicationId": appId,
      "CustomerReferenceNo": null,
      "RequestReferenceNo": null,
      "VehicleId": "1",
      "CreatedBy": createdBy,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": brokerbranchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SavedFrom": "SQ",
      "MobileCode": this.countryCode,
      "MobileNumber": this.mobileNo,
      "Chassisnumber": this.productItem.ChassisNo,
      "Insurancetype": [
          this.productItem.InsuranceType
      ],
      "InsuranceClass": this.productItem.InsuranceClass,
      "Motorusage": motorUsage,
      "MotorusageId": this.productItem.Motorusage,
      "Vehiclemake": "MITSUBISHI",
      "VehiclemakeId": this.productItem.Make,
      "VehicleModel": "99999",
      "VehcilemodelId": this.productItem.Model,
      "ManufactureYear": this.productItem.ManufactureYear,
      "Gpstrackinginstalled": this.productItem.GpsYN,
      "NcdYn": this.productItem.ClaimsYN,
      "VehicleType": VehicleType,
      "VehicleTypeId": VehicleTypeId,
      "CarAlarmYn": this.productItem.CarAlarmYn,
      "PolicyStartDate": this.policyStartDate,
      "PolicyEndDate": this.policyEndDate,
      "CustomerCode":this.customerCode,
      "BdmCode": this.customerCode,
      "SourceTypeId": this.sourceType,
      "SumInsured": this.productItem.VehicleSI,
      "ExchangeRate": this.exchangeRate,
      "Currency": this.currencyCode,
      "HavePromoCode":"N",
      "SearchFromApi":false
      
    }
    ReqObj['DriverDetails'] = null;
            if(this.insuranceId=='100019') ReqObj['CarAlarmYn'] = this.productItem.CarAlarmYn;
            if(this.insuranceId=='100020') ReqObj['VehicleClass'] = this.productItem.VehicleClass
          let urlLink = `${this.motorApiUrl}api/savemotordetails`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              if(data.ErrorMessage.length!=0){
                if(res.ErrorMessage){
                }
              }
              else{
                if(data.Result?.length!=0){
                  this.vehicleDetailsList = [];
                  this.vehicleDetailsList.push(ReqObj);
                  let entry = this.vehicleDetailsList[0];
                  entry['PolicyEndDate'] = endDate;
                  entry['PolicyStartDate'] = startDate;
                  this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo',data?.Result[0]?.RequestReferenceNo);
                  let i=0;this.individualCalcIndex = 0;
                  for(let veh of data.Result){
                    entry['MSRefNo'] = data?.Result[0].MSRefNo;
                    entry['VdRefNo'] = data?.Result[0].VdRefNo;
                    entry['CdRefNo'] = data?.Result[0].CdRefNo;
                    entry['Active'] = true;
                    entry['VehicleId'] = data.Result[0].VehicleId;
                    this.onCalculateVehDetails(veh,'proceedSave',i,data.Result.length,insuranceType.length);
                    i+=1;
                  }
                }
               
              }
          });
        }
        onCalculateVehDetails(vehicleDetails,type,entry,totalCount,sectionCount){
          console.log(this.individualCalcIndex,totalCount)
          let createdBy="";
                let coverModificationYN = 'N';
                if(this.endorsementSection){
                  // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
                  // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
                  // else coverModificationYN = 'N';
                  if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
                }
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP'){
                    createdBy = this.vehicleDetailsList[0].CreatedBy;
                }
                else{
                  createdBy = this.loginId;
                }
               
                let endDate:any = null;
                if(this.endorsementSection && vehicleDetails?.Status=='D'){
                  coverModificationYN = 'Y';
                  endDate = this.endorseEffectiveDate;
                }
                // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
                //   coverModificationYN = 'N';
                // }
                else{
                  if(this.policyEndDate){
                    if(String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
                    else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                  }
                }
                let effectiveDate=null;
                if(this.endorsementSection){
                    effectiveDate = this.endorseEffectiveDate;
                }
                else {
                  if(this.policyStartDate){
                    if(String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
                    else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                  }
                }
                let ReqObj = {
                    "InsuranceId": this.insuranceId,
                    "BranchCode": this.branchCode,
                    "AgencyCode": this.agencyCode,
                    "SectionId": vehicleDetails?.SectionId,
                    "ProductId": this.productId,
                    "MSRefNo": vehicleDetails?.MSRefNo,
                    "VehicleId": vehicleDetails?.VehicleId,
                    "CdRefNo": vehicleDetails?.CdRefNo,
                    "DdRefNo": vehicleDetails?.DdRefNo,
                    "VdRefNo": vehicleDetails?.VdRefNo,
                    "CreatedBy": createdBy,
                    "productId": this.productId,
                    "sectionId": vehicleDetails?.SectionId,
                    "RequestReferenceNo": this.quoteRefNo,
                    "EffectiveDate": effectiveDate,
                    "PolicyEndDate": endDate,
                    "CoverModification": coverModificationYN
                }
                let urlLink = `${this.CommonApiUrl}calculator/calc`;
                this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
                  (data: any) => {
                    this.individualCalcIndex +=1;
                        if(this.individualCalcIndex==totalCount){ 
                          alert('Calculated');
                        }
                  });
        }
}
