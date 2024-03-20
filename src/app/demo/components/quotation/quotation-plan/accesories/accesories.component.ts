import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { ProductData } from './Accessories';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DeviceDetails } from '../models/additionalDetails/Devicedetails';
import { LocationDetails } from '../models/additionalDetails/locationdetails';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContentRisk } from '../models/additionalDetails/contentRisk';
import { PersonalAccident } from '../models/PersonalAccident';
import { AllRisks } from '../models/additionalDetails/AllRisk';
import { PersonalIndemenitys } from '../models/additionalDetails/personalIndemenity';
import { ElectronicEquip } from '../models/additionalDetails/Electronicequip';
import { GroupPersonalAccident } from '../models/GroupPersonalAccident';
import { EmployeeLiablityss } from '../models/additionalDetails/Employeeliability';
import { Fedilitis } from '../models/additionalDetails/Fedilitiys';
import { Machineryss } from '../models/additionalDetails/Machinery';
export class ForceLengthValidators {
  static maxLength(maxLength: number) {
    return (control: FormControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }

      if (control.value.length > maxLength) {
        //force the length to 
        control.setValue(control.value.substring(0, maxLength));
      }

      return null;
    };
  }
  static min(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {

      let val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { 'min': true };
    }
  }
}
@Component({
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
})
export class AccesoriesComponent {
  sidebarVisible:boolean = false;
  accessories: MenuItem[] = [];loginId:any=null;machineries:any[]=[];
  userDetails:any=null;insuranceId:any=null;productId:any=null;
  userType:any=null;branchCode:any=null;quoteNo:any=null;chassisNo:any=null;
  quoteRefNo:any=null;Section:boolean=false;buildingDetailsSection:boolean=false;
  newten:boolean=false;minDate:any=null;maxDate:any=null;accessoriesType:any=null;
  endorsementSection:boolean=false;orgPolicyNo:any=null;endorsementId:any=null;actualAssSI:any=null;
  enableFieldsList:any[]=[];enableAllSection:any=null;endorsePolicyNo:any=null;totalAccessoriesSI:any='0';
  endorseCategory:any=null;endorsementName:any=null;newacc:any=null;serialNoDesc:any=null;sectionDetails:any=null;
  employeeOccupationList:any[]=[];actualAccessoriesSI:any=null;SumInsured:any=null;enableAccessoriesEditSection:boolean=false;
  accessoriesList:any[]=[];currentAccessoriesIndex:any=null;editAccessoriesSection:boolean=false;ChassisList:any[]=[];
  totalAccSIError:any=null;AccLists:any[]=[];CoverList:any[]=[];sumInsuredDetails:any=null;item:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;productItem:any=null;
  contentId: null;buildingSection: boolean = false;
  quoteDetails:any=null;Riskdetails:any=null;customerDetails:any;building:any[]=[];
  accessoriesSection: boolean=false;tabIndex:any=0;currentBuildingIndex:any=null;fieldsRisk:any[]=[];CyberItem:any[]=[];
  editBuildingSection:boolean=false;enableBuildingEditSection:boolean=false;fieldsDevice:any[]=[];fieldsElectronic:any[]=[];
  actualFidelitySI: any=null;actualMachinerySI: any=null;actualEmployeeSI: any=null;actualElectronicIntSI: any=null;actualPersonalIntSI: any=null;actualPersonalAccSI: any=null;EquipmentSi: any=null;actualAllRiskSI: any=null;actualContentSI: any=null;actualBuildingSI: any=null;liabilityOccupationId: any;
  liabilityOccupation: any=null;accidentOccupationId: any=null;accidentOccupation: any=null;currencyValue: any=null;
  six:boolean=false;ElectronicList:any[]=[];allriskList:any[]=[];fieldsMachinery:any[]=[];CyperList:any[]=[];
  formSection: boolean=false;viewSection: boolean=false; form = new FormGroup({});field:any[]=[];
  cyberSectionId: any=null;ten: boolean=false;sumInsured:boolean=false; editContentSection: boolean;
  fieldss:any[]=[];first:boolean=false;fieldsContent:any[]=[];eight:boolean=false;
  fieldsPersonalAccident: any;second:boolean=false;third:boolean=false;fieldFEFields:any[]=[];
  contentRiskDesc: any=''; dropList:any[]=[];
  fifth: boolean=false;seven:boolean=false;fieldsEmpFields:any[]=[];selectedTab: any = 0;
  fieldsPersonalInd: any[]=[];monthList: any[]=[];employeeList:any[]=[]; Cotentrisk: any[] = [];
  SectionId: any=null;fidelityList: any[]=[];originalFidelityList: any[];contentRiskSection: boolean=false;
  currentContentIndex: number;enableContentEditSection:boolean = false;LocationId: any;  contentSI: any='0';
  nine: boolean=false;risk: any=null;originalEmployeeList: any[]=[];LocationList:any[]=[];fourth: boolean = false;
  fidelityOccupationList: any[]=[];  occupationList: any[] = []; enableEmployeeUploadSection: boolean=false;
  constructor(private router: Router,private datePipe:DatePipe,
    private sharedService: SharedService,public http: HttpClient) {
   let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
   this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
   this.insuranceId = this.userDetails.Result.InsuranceId;
   this.loginId = this.userDetails.Result.LoginId;
   this.productId = this.userDetails.Result.ProductId;
   this.userType = this.userDetails?.Result?.UserType;
   this.branchCode = this.userDetails.Result.BranchCode;
   this.quoteNo = sessionStorage.getItem('quoteNo');
   this.productItem = new ProductData();
   console.log("item received", homeObj);
   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(this.productId=='5' || this.productId=='29'){
      this.buildingDetailsSection=false;
    }
    else if(this.productId!='43'){
      this.buildingDetailsSection=true;
      // let items = this.item?.find((Code) => Code == '1' || Code=='40');
      // console.log('JJJJJJJJJJJJJJJJJJ',items);
    }
    if(this.productId=='43'){
      this.newten = true;
      
    }
  }
  ngOnInit() {
    if(this.productId!='14' && this.productId!='32') this.getOccupationList(null);
    this.getEditQuoteDetails();
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
    this.minDate = new Date(year-18,month,day-1);
    this.maxDate = new Date();
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //this.fourth=false;
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log('Enables fields Section',this.enableFieldsList);
        let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers' || ele=='AccessoriesSI');
        console.log('Enables Add Section',enableAllSection);
        if(enableAllSection) this.enableAllSection=true;
        else this.enableAllSection = false;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle",this.enableFieldsList,this.endorsementId)
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    this.getSumInsuredDetails();
  }
  onEditBuilding(index){
    this.currentBuildingIndex = index;
    this.editBuildingSection = true;
    this.enableBuildingEditSection = true;
    this.productItem.LocationAddress = this.building[index].BuildingAddress;
    this.productItem.LocationNameBuilding = this.building[index].LocationName;
    this.productItem.BuildingSumInsureds = this.building[index].BuildingSuminsured;
    // this.LocationName = this.building[index].LocationName;
    // this.BuildingAddress = this.building[index].BuildingAddress;
    // this.BuildingSuminsured = this.building[index].BuildingSuminsured;
    this.individualCommaFormatted('building');
  }
  onTabClicked(event){
    // let index = event.index;
    // this.tabIndex = index;
    // if(index!=0){
      
      
    // }
    console.log("Source Event",event,event.tab.textLabel);
    if(event.index!=0){
    if(this.productId!='19' && this.selectedTab!=1 && this.LocationList.length==0) this.onSave(event.tab.textLabel)
    }

    console.log('Tab event',event);
  }
  getSumInsuredDetails(){
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}quote/productsuminsureddetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.sumInsuredDetails = data.Result;
          this.item = this.sumInsuredDetails?.ProductSuminsuredDetails?.SectionId;
          // if(this.productId!='19' && this.productId!='3'){
          //   this.setTabSections();
          //   this.getContentList();
          // }
          // else{
            this.newjsonfile();
           
            //this.setTabSections();
          //}
         
          if(this.six){
            this.Electronic();
          }
          if(this.productId=='21' || this.productId=='26'){
            this.getallriskLists();
          }
          if(this.productId=='5' || this.productId=='29'){
            this.getAccesroies();
            this.getchassisAcc();
          }
          // else if(this.productId=='26'){
          //   this.getallriskListsplant();
          // }
          else if(this.productId=='39'){
            this.getallriskMachinery();
          }
          else if(this.productId=='42'){
            this.getcontenttype();
            this.getCyberDetails();
          }
          else {
            //this.getallriskList();
          }
             
          if(this.sumInsuredDetails){
            // if(this.first) this.contentSumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.second) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.third) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.fifth) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.CurrencyId;
            if(this.productId=='5' || this.productId=='29'){
              this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.Currency;
            }
            this.accidentOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationTypeDesc;
            this.accidentOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationType;
            this.liabilityOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationDesc;
            this.liabilityOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationId
            let buildingSI = this.sumInsuredDetails.ProductSuminsuredDetails.BuildingSuminsured;
            if(buildingSI!='' && buildingSI!=null && buildingSI!=undefined){
              this.actualBuildingSI = buildingSI;
              console.log('LLLLLLLLLL',this.actualBuildingSI);
            }
            else this.actualBuildingSI = 0;
            let contentSI = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            if(contentSI!='' && contentSI!=null && contentSI!=undefined){
              this.actualContentSI = contentSI;
            }
            else this.actualContentSI = 0;
            let allRiskSI = this.sumInsuredDetails.ProductSuminsuredDetails.AllriskSumInsured;
            if(allRiskSI!='' && allRiskSI!=null && allRiskSI!=undefined){
              this.actualAllRiskSI = allRiskSI;
              console.log('KKKKKKKKKKK',this.actualAllRiskSI);
            }
            else this.actualAllRiskSI = 0;

            let AccSI = this.sumInsuredDetails.ProductSuminsuredDetails.AccessoriesSuminsured;
            if(AccSI!='' && AccSI!=null && AccSI!=undefined){
              this.actualAssSI = AccSI;
            }
            else this.actualAssSI  = 0;

            let EquipmentSi = this.sumInsuredDetails.ProductSuminsuredDetails.EquipmentSi;
            if(EquipmentSi!='' && EquipmentSi!=null && EquipmentSi!=undefined){
              this.EquipmentSi = EquipmentSi;
            }
            else this.EquipmentSi = 0;
            let pAccSI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalAccSuminsured;
            if(pAccSI!='' && pAccSI!=null && pAccSI!=undefined){
              this.actualPersonalAccSI = pAccSI;
            }
            else this.actualPersonalAccSI = 0;
            let pASI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalIntermediarySuminsured;
            if(pASI!='' && pASI!=null && pASI!=undefined){
              this.actualPersonalIntSI = pASI;
            }
            else this.actualPersonalIntSI = 0;
            let electr =this.sumInsuredDetails.ProductSuminsuredDetails.ElecEquipSuminsured;
            if(electr!='' && electr!=null && electr!=undefined){
              this.actualElectronicIntSI = electr;
            }
            else this.actualElectronicIntSI=0;
            if(this.productId!='57'){
              let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.EmpLiabilitySi;
              if(empSI!='' && empSI!=null && empSI!=undefined){
                this.actualEmployeeSI = empSI;
              }
              else this.actualEmployeeSI=0;
            }
            else{
              let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.SumInsured;
              if(empSI!='' && empSI!=null && empSI!=undefined){
                this.actualEmployeeSI = empSI;
              }
              else this.actualEmployeeSI=0;
            }
            let MachinerySI = this.sumInsuredDetails.ProductSuminsuredDetails.MachinerySi;
            if(MachinerySI!='' && MachinerySI!=null && MachinerySI!=undefined){
              this.actualMachinerySI = MachinerySI;
            }
            else this.actualMachinerySI=0;
            let FidEmpSi = this.sumInsuredDetails.ProductSuminsuredDetails.FidEmpSi;
            if(FidEmpSi!='' && FidEmpSi!=null && FidEmpSi!=undefined){
              this.actualFidelitySI = FidEmpSi;
            }
            else this.actualFidelitySI=0;
            console.log("SI Rec",this.sumInsuredDetails);
          }
          if(this.productId!='19') {
            this.getbuilding();
          } 
          if(this.productId=='5' || this.productId=='29'){
            this.getAccessories();
          }
        }
      },
      (err) => { },
    );
  }
  onFormSubmit(){
    if(this.productId=='5') this.onSaveAccessories();

  }

  onSave(type) {
    if (this.building.length != 0) {
      console.log("Building Details",this.building);
      let i = 0, buildReqList: any[] = [];
      for (let build of this.building) {
        if (i == 0) {
          this.LocationList = [];
        }
        let sumInsured = null;
        if(this.sumInsured == true){
           if(build.BuildingSuminsured==undefined || build.BuildingSuminsured==null) sumInsured = null;
          // else if(build.BuildingSuminsured.includes(',')){ sumInsured = build.BuildingSuminsured.replace(/,/g, '') }
          else sumInsured = build.BuildingSuminsured;
        }
        else{
          sumInsured = 0;
        }

        this.LocationList.push({ "Code": String(i + 1), "CodeDesc": build.LocationName })
       
        let ReqObj = {

          "BuildingSuminsured":sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "InbuildConstructType":"W",
          "QuoteNo":sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo":this.quoteRefNo,
          "SectionId": build.SectionId,
          "LocationName":build.LocationName,

          /*"ApartmentOrBorder": null,
          "BuildingAreaSqm": null,
          "BuildingBuildYear": build.BuildingBuildYear,
          "BuildingCondition": null,
          "BuildingFloors": build.BuildingFloors,
          "BuildingOccupationType": null,
          "BuildingType": null,
          "BuildingUsageId": null,
          "BuildingUsageYn": null,
          "BuildingSuminsured": sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "CustomerId": null,
          "InbuildConstructType": build.InbuildConstructType,
          "QuoteNo": sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo": this.quoteRefNo,
          "RiskId": null,
          "SectionId": build.SectionId,
          "UpdatedDate": null,
          "Updatedby": this.loginId,
          "WithoutInhabitantDays": null,
          "LocationName":build.LocationName,*/


        }
        buildReqList.push(ReqObj);
        i += 1;
        if (i == this.building.length) {
          this.saveBuildingDetails(buildReqList,type);
        }
      }
      console.log('TTTTTTTTTTTTTTTT',this.LocationList)
      if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
        if(this.LocationList.length !=0){
          for (let j = 0; j < this.LocationList.length; j++) {
            this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
            this.LocationList[j].value = this.LocationList[j]['Code'];
            delete this.LocationList[j].CodeDesc;
            if (j == this.LocationList.length - 1) {
              if(this.first){
                this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
              if(this.second){
                this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
             if(this.fifth){
              this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
             }
             if(this.six){
              this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
             if(this.ten){
              this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
             }
             if(this.third){
              this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.nine){
              this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.seven){
              if(this.productId=='57' && this.sectionDetails.find((ele) => ele.SectionId==45)) this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.LocationList;
              else  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
            }
            if(this.eight){

              this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
            }
            }
          }
        }
      }
    }

    //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

  }
  getcontenttype(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/cybercontents`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.CyperList = data.Result;
            for (let i = 0; i < this.CyperList.length; i++) {
              this.CyperList[i].label = this.CyperList[i]['CodeDesc'];
              this.CyperList[i].value = this.CyperList[i]['Code'];
              delete this.CyperList[i].CodeDesc;
              if (i == this.CyperList.length - 1) {
                this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.CyperList;
              }
            }
            console.log('CyberContent List',this.CyperList);
        }
      },
      (err) => { },
    );
  }
  onSaveLocation(){
    if(this.currentBuildingIndex!=null){
      this.building[this.currentBuildingIndex].BuildingAddress = this.productItem.LocationAddress;
      this.building[this.currentBuildingIndex].LocationName = this.productItem.LocationNameBuilding;
      this.building[this.currentBuildingIndex].BuildingSuminsured = this.productItem.BuildingSumInsureds;
      this.productItem.LocationAddress=null;
      this.productItem.LocationNameBuilding=null;
      this.productItem.BuildingSumInsureds=null;
    }
    else{
      let entry = {
        "BuildingAddress": this.productItem.LocationAddress,
        "BuildingBuildYear": null,
        "BuildingFloors": null,
        "InbuildConstructType": null,
        "BuildingSuminsured": this.productItem.BuildingSumInsureds,
        "RiskId": null,
        "LocationName": this.productItem.LocationNameBuilding,
        "SectionId": "1"
      }
      this.building.push(entry);
      this.productItem.LocationAddress=null;
      this.productItem.LocationNameBuilding=null;
      this.productItem.BuildingSumInsureds=null;
    }
  }
  getallriskMachinery(){
    console.log('QQQQQQQQQQ333333333',this.quoteNo);
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}dropdown/machinerycontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result.ContentTypeRes;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.allriskList;
              }
            }
            //this.getOccupationList()
        }
      },
      (err) => { },
    );
  }
  getallriskLists(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/businessallrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
              }
            }
            //this.getOccupationList();

        }
      },
      (err) => { },
    );
  }
  Electronic(){
    let ReqObj = {
      "BranchCode":this.branchCode,
      "InsuranceId":this.insuranceId,
        }
      let urlLink = `${this.CommonApiUrl}dropdown/electronicitems`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.ElectronicList = data?.Result;
            console.log('RRRRRRRRRRRRRRRRRRR',this.ElectronicList);
            for (let j = 0; j < this.ElectronicList.length; j++) {
              this.ElectronicList[j].label = this.ElectronicList[j]['CodeDesc'];
              this.ElectronicList[j].value = this.ElectronicList[j]['Code'];
              delete this.ElectronicList[j].CodeDesc;
              if (j == this.ElectronicList.length - 1) {
                console.log('LLLLLLLLLLLLLLLLLL',this.ElectronicList);
                this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.ElectronicList;
              }
            }
          }
        },
        (err) => { },
      );
  }
  getCyberDetails(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": this.item[0]
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
              this.CyberItem = res.Result.ContentRiskDetails;
           }
          }
        }
      })
  }
  getchassisAcc(){
    let ReqObj = {
      "QuoteNo":sessionStorage.getItem('quoteNo')
    }
    let urlLink = `${this.CommonApiUrl}dropdown/motorWithaccessories`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){   
          let defaultObj = [{"Code":'',"CodeDesc":"---Select---"}]
          this.ChassisList = defaultObj.concat(data.Result);
          if(this.ChassisList.length==2){this.productItem.AccessoriesChassisNo=this.ChassisList[1].Code;}
        }
      },
      (err) => { },
    ); 
  }
  getAccesroies(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/motorcontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){ 
          let defaultObj = [{"Code":'',"CodeDesc":"---Select---"}]  
          this.AccLists = defaultObj.concat(data.Result);
        }
      },
      (err) => { },
    ); 
  }
  getAccessories(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": "99999"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
            if(this.endorsementSection){
              console.log('Acessories Section',this.enableFieldsList)
              this.accessoriesSection = !this.enableFieldsList.some(ele=>ele=='AccessoriesSuminsured');
            }
            //else this.contentRiskSection = true;
            else this.accessoriesSection = true;
             this.accessoriesList= res.Result.ContentRiskDetails;
             console.log('Get details of Accessories', this.accessoriesList);
             this.getTotalSICost('Accessories');
           }
           else{
        
           }
          }
       
        }
      })
  }
  onEditAccessories(index,rowdata){
    let edit = this.accessoriesList.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc);
    console.log('LLLL',rowdata.ItemId);
    this.currentAccessoriesIndex = edit;
    this.enableAccessoriesEditSection = true;
    this.editAccessoriesSection=true;

    this.productItem.AccessoriesType= rowdata.ItemId;
     this.productItem.AccessoriesSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
     this.productItem.AccessoriesChassisNo = rowdata.RiskId; //this.MachineryName // this.MiSumInsured
    this.productItem.AccessoriesSI= rowdata.SumInsured;
 //this.machineryItemId = this.machineries[index].ItemId;
    this.individualCommaFormatted('accessories');
  }
  newjsonfile(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "OptedSectionIds":this.item
    }
    let urlLink = `${this.CommonApiUrl}master/getoptedsectionadditionalinfo`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){ 
              this.sectionDetails = data.Result;
              this.setTabSections();
              this.getbuilding();
        }
      });
  }
  setTabSections(){
    
    if(this.productId=='42'){
      this.cyberSectionId=this.item[0];

      this.ten=true;
      let fireData = new DeviceDetails();
      let entry = [];
      this.fieldsDevice = fireData?.fields;
      this.form = new FormGroup({});
      this.productItem = new ProductData();
      console.log('ten',this.fieldsDevice);  
      // this.CyberItem=[{'Make':'Honda','DeviceType':'1','Making':'2022','SerialNo':1,"DeviceTypeDesc":"Desktop","SumInsured":"123,45"}];
    }
    //if(this.productId=='19' || this.productId=='3'){
      if(this.sectionDetails.length!=0){
        let items = this.sectionDetails.find((ele) => ele.SectionId == 1 || (this.productId=='19' && ele.SectionId==40));
        if(items){
          if(items?.AddDetailYn=='Y'){
            this.sumInsured=true;
            let fireData = new LocationDetails();
            let entry = [];
            this.field = [
              {
                    fieldGroupClassName: 'row buildingsuminsureds',
                    fieldGroup: [
                          {
                            type: 'commaSeparator',
                            key: 'BuildingSumInsureds',
                            className: 'col-sm-5 offset-lg-1 offset-md-1',
                            props: {
                              maxLength: 15,
                              label: `Sum Insured`,
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                              onInit: (field: FormlyFieldConfig) => {
                                field.formControl.valueChanges.subscribe(() => {
                                  this.individualCommaFormatted('building');
                                });
                              },
                            },
                            expressions: {
                            },
                          },
                      
                    ]
              }
            ];
            this.fieldss = fireData?.fields.concat(this.field);  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
          }
          else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            alert('Details');
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
          }
        }
        else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
        }
        let first = this.sectionDetails.find((ele) => ( ele.SectionId == 47));
        if(first){
          if(first?.AddDetailYn=='Y'){
            this.first=true;
            let fireData = new ContentRisk();
            let entry = [];
            this.fieldsContent = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('content')
              });
            } }
            this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
          }
          else {
            this.first =false;
          }
        }
        else {
          this.first =false;
        }
        const second = this.sectionDetails.find((ele) => ele.SectionId == 35);
        if (second){
          if(second?.AddDetailYn=='Y'){
            this.second = true;
            let fireData = new PersonalAccident();
            let entry = [];
            this.fieldsPersonalAccident = fireData?.fields;
    
            console.log('Second',this.fieldsPersonalAccident);
    
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('PersonalAccident');
              });
            } }
            this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
          }
          else{
            this.second = false;
          }
        }
        else this.second = false;
        const third = this.sectionDetails.find((ele) => ele.SectionId == 3);
        if (third){
          if(third?.AddDetailYn=='Y'){
            this.third = true;
            let fireData = new AllRisks();
            let entry = [];
            this.fieldsRisk = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('AllRisk');
              });
            } }
            this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
            this.getallriskList();
          }
          else this.third = false;
        }
        else this.third = false;
        const fifth = this.sectionDetails.find((ele) => ele.SectionId== 36);
        if(fifth){
            if(fifth?.AddDetailYn=='Y'){
              this.fifth = true;
              let fireData = new PersonalIndemenitys();
              let entry = [];
              this.fieldsPersonalInd = fireData?.fields;
              this.form = new FormGroup({});
              this.productItem = new ProductData();
              console.log('fifth',this.fieldsPersonalInd);
  
              let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.individualCommaFormatted('PersonalInd');
                });
              } }
              this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
            }
            else this.fifth = false;
        }
        else this.fifth = false; 
        const six = this.sectionDetails.find((ele) => ele.SectionId== 39); 
        if(six){
          if(six?.AddDetailYn=='Y'){
            this.six = true;
            let fireData = new ElectronicEquip();
            let entry = [];
            this.fieldsElectronic = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
    
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('Electronicequip');
              });
            } }
            this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
            this.monthList = [
              {"Code":"01","CodeDesc":"January"},
              {"Code":"02","CodeDesc":"February"},
              {"Code":"03","CodeDesc":"March"},
              {"Code":"04","CodeDesc":"April"},
              {"Code":"05","CodeDesc":"May"},
              {"Code":"06","CodeDesc":"June"},
              {"Code":"07","CodeDesc":"July"},
              {"Code":"08","CodeDesc":"August"},
              {"Code":"09","CodeDesc":"September"},
              {"Code":"10","CodeDesc":"October"},
              {"Code":"11","CodeDesc":"November"},
              {"Code":"12","CodeDesc":"December"},
            ]
              for (let i = 0; i < this.monthList.length; i++) {
                this.monthList[i].label = this.monthList[i]['CodeDesc'];
                this.monthList[i].value = this.monthList[i]['Code'];
                delete this.monthList[i].CodeDesc;
                if (i == this.monthList.length - 1) {
                  this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
                }
              }
              this.Electronic();
          }
          else this.six = false;
        }
        else this.six = false;
        const seven = this.sectionDetails.find((ele) => ele.SectionId== 37 || ele.SectionId == 38 || ele.SectionId == 45);
        if(seven){
          if(seven?.AddDetailYn=='Y'){
            this.seven = true;
            this.getEmployeeDetails();
            this.getOccupationList(seven.SectionId);
            if(this.sectionDetails.find((ele) =>ele.SectionId==45) && this.productId==57){
              let fireData = new GroupPersonalAccident();
              let entry = [];
              this.fieldsEmpFields = fireData?.fields;
              this.form = new FormGroup({});
              this.productItem = new ProductData();
      
              let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.individualCommaFormatted('employee');
                });
              } }
              this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
            }
            else{
              let fireData = new EmployeeLiablityss();
              let entry = [];
              this.fieldsEmpFields = fireData?.fields;
              this.form = new FormGroup({});
              this.productItem = new ProductData();
      
              let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.individualCommaFormatted('employee');
                });
              } }
              this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
              this.monthList = [
                {"Code":"01","CodeDesc":"January"},
                {"Code":"02","CodeDesc":"February"},
                {"Code":"03","CodeDesc":"March"},
                {"Code":"04","CodeDesc":"April"},
                {"Code":"05","CodeDesc":"May"},
                {"Code":"06","CodeDesc":"June"},
                {"Code":"07","CodeDesc":"July"},
                {"Code":"08","CodeDesc":"August"},
                {"Code":"09","CodeDesc":"September"},
                {"Code":"10","CodeDesc":"October"},
                {"Code":"11","CodeDesc":"November"},
                {"Code":"12","CodeDesc":"December"},
              ]
              for (let i = 0; i < this.monthList.length; i++) {
                this.monthList[i].label = this.monthList[i]['CodeDesc'];
                this.monthList[i].value = this.monthList[i]['Code'];
                delete this.monthList[i].CodeDesc;
                if (i == this.monthList.length - 1) {
                  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
                }
              }
            }
            
           
          }
          else this.seven = false;
        }
        else this.seven = false;
        const eight = this.sectionDetails.find((ele) => ele.SectionId == 43);
        if(eight){
          if(eight?.AddDetailYn=='Y'){
            this.eight = true;
          this.getFidelityDetails();
          this.getOccupationList(eight.SectionId);
          let fireData = new Fedilitis();
          let entry = [];
          this.fieldFEFields = fireData?.fields;
          this.form = new FormGroup({});
          this.productItem = new ProductData();
          console.log('eight',this.fieldFEFields);
  
          let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.individualCommaFormatted('fidelity');
            });
          } }
          this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
          this.monthList = [
            {"Code":"01","CodeDesc":"January"},
            {"Code":"02","CodeDesc":"February"},
            {"Code":"03","CodeDesc":"March"},
            {"Code":"04","CodeDesc":"April"},
            {"Code":"05","CodeDesc":"May"},
            {"Code":"06","CodeDesc":"June"},
            {"Code":"07","CodeDesc":"July"},
            {"Code":"08","CodeDesc":"August"},
            {"Code":"09","CodeDesc":"September"},
            {"Code":"10","CodeDesc":"October"},
            {"Code":"11","CodeDesc":"November"},
            {"Code":"12","CodeDesc":"December"},
          ]
            for (let i = 0; i < this.monthList.length; i++) {
              this.monthList[i].label = this.monthList[i]['CodeDesc'];
              this.monthList[i].value = this.monthList[i]['Code'];
              delete this.monthList[i].CodeDesc;
              if (i == this.monthList.length - 1) {
                this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
              }
            }
          }
          else this.eight = false;
        }
        else this.eight = false;
        const nine = this.sectionDetails.find((ele) => ele.SectionId == 41);
        if (nine) {
          if(nine?.AddDetailYn=='Y'){
            this.nine = true;
            let fireData = new Machineryss();
            let entry = [];
            this.fieldsMachinery = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            console.log('nine',this.fieldsMachinery);
  
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('machinery');
              });
            } }
            this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
            this.getallriskMachinery();
            this.getMachineryRisk();
          }
          else this.nine = false;
        }
        else this.nine = false;
      }
      else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
      }
    // }
    // else if(this.item){
    //     let items = this.item.find((Code) => Code == '1' || Code=='40');
    //     if (items) {
    //       this.sumInsured=true;
    //       let fireData = new LocationDetails();
    //       let entry = [];
    //       this.field = [
    //         {
    //               fieldGroupClassName: 'row buildingsuminsureds',
    //               fieldGroup: [
    //                     {
    //                       type: 'commaSeparator',
    //                       key: 'BuildingSumInsureds',
    //                       className: 'col-sm-5 offset-lg-1 offset-md-1',
    //                       props: {
    //                         label: `Sum Insured`,
    //                       },
    //                       validators: {
    //                         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
    //                       },
    //                       hooks: {
    //                         onInit: (field: FormlyFieldConfig) => {
    //                           field.formControl.valueChanges.subscribe(() => {
    //                             this.individualCommaFormatted('building');
    //                           });
    //                         },
    //                       },
    //                       expressions: {
    //                       },
    //                     },
                    
    //               ]
    //         }
    //       ];
    //       this.fieldss = fireData?.fields.concat(this.field);  
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;
    //       console.log('GGGGGGGGGGGGGGGG')    
    //     }
    //     else {
    //       this.sumInsured =false;
    //       let fireData = new LocationDetails();
    //       this.fieldss = fireData?.fields;  
    //       console.log('dddddddddddddddddd')
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;      
    //     }
    //     let first = this.item.find((Code) => Code == '47' || Code=='40');
    //     if (first && this.productId!='6' && this.productId!='19') {
    //       this.first=true;
    //       let fireData = new ContentRisk();
    //       let entry = [];
    //       this.fieldsContent = fireData?.fields;
    //       let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //         field.formControl.valueChanges.subscribe(() => {
    //           this.individualCommaFormatted('content')
    //         });
    //       } }
    //       //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
    //       this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
    //       // this.getMedicalDetails();
    //     }
    //     else {
    //       this.first =false;
    //     }
    //   const second = this.item.find((Code) => Code == '35');
    //   if (second && this.productId!='19') {
    //     this.second = true;
    //     let fireData = new PersonalAccident();
    //     let entry = [];
    //     this.fieldsPersonalAccident = fireData?.fields;

    //     console.log('Second',this.fieldsPersonalAccident);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('PersonalAccident');
    //       });
    //     } }
    //     this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
    //     // this.productItem.AccOccupation = this.accidentOccupation;
    //   }
    //   else {
    //     this.second = false;
    //   }
    //   const third = this.item.find((Code) => Code == '3');
    //   if (third && this.productId!='21' && this.productId!='19') {
    //     this.third = true;
    //     let fireData = new AllRisks();
    //     let entry = [];
    //     this.fieldsRisk = fireData?.fields;

    //     console.log('third',this.fieldsRisk);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('AllRisk');
    //       });
    //     } }
    //     this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
    //     this.getallriskList();
    //   }
    //   else {
    //     this.third = false;
    //   }
    //   const fifth = this.item.find((Code) => Code == '36');
    //   if (fifth && this.productId!='19') {

    //     this.fifth = true;


    //     let fireData = new PersonalIndemenitys();
    //     let entry = [];
    //     this.fieldsPersonalInd = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('fifth',this.fieldsPersonalInd);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('PersonalInd');
    //       });
    //     } }
    //     this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
    //   }
    //   else {
    //     this.fifth = false;
    //   }
    //   const six = this.item.find((Code) => Code == '39');
    //   if (six && this.productId!='19') {
    //     this.six = true;
    //     let fireData = new ElectronicEquip();
    //     let entry = [];
    //     this.fieldsElectronic = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('sssssssssiiiiiiiiiixxxxxxxx',this.fieldsElectronic);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('Electronicequip');
    //       });
    //     } }
    //     this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
    //         }
    //       }
    //   }
    //   else {
    //     this.six = false;
    //   }
    //   const seven = this.item.find((Code) =>Code =='37' || Code == '38' || Code == '45');
    //   if(seven && this.productId!='19'){
    //     this.seven = true;
    //     this.getEmployeeDetails();
    //     this.getOccupationList(seven);

    //     let fireData = new EmployeeLiablityss();
    //     let entry = [];
    //     this.fieldsEmpFields = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('Seven',this.fieldsEmpFields);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('employee');
    //       });
    //     } }
    //     this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
    //         }
    //       }
    //    } 
    //    else this.seven = false;
    //    const eight = this.item.find((Code) => Code == '43');
    //     if(eight && this.productId!='19'){
    //     this.eight = true;
    //     this.getFidelityDetails();
    //     this.getOccupationList(eight);
    //     let fireData = new Fedilitis();
    //     let entry = [];
    //     this.fieldFEFields = fireData?.fields;
    //     this.form = new FormGroup({});
    //     this.productItem = new ProductData();
    //     console.log('eight',this.fieldFEFields);

    //     let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe(() => {
    //         this.individualCommaFormatted('fidelity');
    //       });
    //     } }
    //     this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
    //     this.monthList = [
    //       {"Code":"01","CodeDesc":"January"},
    //       {"Code":"02","CodeDesc":"February"},
    //       {"Code":"03","CodeDesc":"March"},
    //       {"Code":"04","CodeDesc":"April"},
    //       {"Code":"05","CodeDesc":"May"},
    //       {"Code":"06","CodeDesc":"June"},
    //       {"Code":"07","CodeDesc":"July"},
    //       {"Code":"08","CodeDesc":"August"},
    //       {"Code":"09","CodeDesc":"September"},
    //       {"Code":"10","CodeDesc":"October"},
    //       {"Code":"11","CodeDesc":"November"},
    //       {"Code":"12","CodeDesc":"December"},
    //     ]
    //       for (let i = 0; i < this.monthList.length; i++) {
    //         this.monthList[i].label = this.monthList[i]['CodeDesc'];
    //         this.monthList[i].value = this.monthList[i]['Code'];
    //         delete this.monthList[i].CodeDesc;
    //         if (i == this.monthList.length - 1) {
    //           this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
    //         }
    //       }
    //     } 
    //     else this.eight = false;
    //    const nine = this.item.find((Code) => Code == '41');
    //     if (nine && this.productId!='16' && this.productId!='19') {
    //       this.nine = true;
    //       let fireData = new Machineryss();
    //       let entry = [];
    //       this.fieldsMachinery = fireData?.fields;
    //       this.form = new FormGroup({});
    //       this.productItem = new ProductData();
    //       console.log('nine',this.fieldsMachinery);
  
    //       let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
    //         field.formControl.valueChanges.subscribe(() => {
    //           this.individualCommaFormatted('machinery');
    //         });
    //       } }
    //       this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
    //       this.getallriskMachinery();
    //       this.getMachineryRisk();
    //     }
    //     else {
    //       this.nine = false;
    //     }
    // }
   

    
  }
  getMachineryRisk(){
    
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"41"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            if(res.Result.ContentRiskDetails.length!=0){
              // if(this.endorsementSection){
              //   this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='MachineryBreakDown');
              // }
              // else 
              //this.enableMachineryEditSection= true;
              this.machineries = res.Result.ContentRiskDetails;
              console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPP',this.machineries);
              this.getTotalSICost('Machinery');
            }
            else{
            //  this.machineries = [{
            //    "ItemId":null,
            //    "RiskId":null,
            //    "MakeAndModel":null,
            //   //  "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //    "SerialNo":null,
            //    "ItemValue":null,
            //    "SumInsured":null,
            //  }]
            }
           }
         
    }

  else {
    this.machineries= [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      // "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    }
      })
  }
  getEmployeeDetails(){
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19' || this.productId=='57') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       //"RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
    //let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log('SectionId',this.SectionId);
          if(this.productId!=='32'){
            this.employeeList = data?.Result;
            console.log('OOOOO',this.employeeList);
          }
          else if(this.productId=='32'){
            this.fidelityList =data?.Result;
            console.log('Ferdility Lists',this.fidelityList);
          }
          else if(this.productId=='3'){
            this.risk =data?.Result;
            console.log('Ferdility Lists',this.risk);
          }
            this.originalEmployeeList = new Array().concat(data?.Result);
            if(this.employeeList.length!=0 && this.productId!=='32'){
              this.getTotalSICost('Employee');
            }
            else if(this.productId=='32' && this.fidelityList.length!=0 ){
              this.getTotalSICost('Fidelity');
            }
            else if(this.productId=='3' && this.risk.length!=0 ){
              //this.getTotalSICost('Fidelity');
            }
        }
      });
  }
  getFidelityDetails(){
    let SectionId = null;
    if(this.productId=='32'  || this.productId=='19') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       "RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;//api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            this.fidelityList = data?.Result;
            this.originalFidelityList = new Array().concat(data?.Result);
            if(this.fidelityList.length!=0){
              this.getTotalSICost('Fidelity');
            }
        }
      });
  }
  // getbuilding() {
  //   let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
  //   let ReqObj = {
  //     "QuoteNo": sessionStorage.getItem('quoteNo'),
  //   }
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       let res: any = data;
  //       if (res.Result.length != 0) {
  //       }
  //       else {
  //       }
  //     })
  // }
  getbuilding() {
    let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (res.Result.length != 0) {
          if(this.endorsementSection){
            console.log('Enable Building Suminsureds',this.enableFieldsList);
            //this.buildingSection = !this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
            this.buildingSection = this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
          }
          else this.buildingSection = false;
          //else this.buildingSection = false;
          this.building = res.Result;
          let i=0;
          for(let entry of this.building){
            if (i == 0) {
              this.LocationList = [];
            }
            this.LocationList.push({ "Code": String(this.LocationList.length+1), "CodeDesc": entry.LocationName })
            i+=1;
          }

          if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
            if(this.LocationList.length !=0){
              for (let j = 0; j < this.LocationList.length; j++) {
                this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
                this.LocationList[j].value = this.LocationList[j]['Code'];
                delete this.LocationList[j].CodeDesc;
                if (j == this.LocationList.length - 1) {
                  if(this.first){
                    this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.six){
                    this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.second){
                    this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.fifth){
                    this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.ten){
                    this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.third){
                    this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.nine){
                    this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.seven){
                    this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                  if(this.eight){
                    this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                }
              }
            }
          }
   
       
          this.fourth = true;
          this.getTotalSICost('building');
        }
        else {
          this.building=[];
          this.AddNew();
          // this.building = [
          //   {
          //     "BuildingAddress": null,
          //     "BuildingBuildYear": null,
          //     "BuildingFloors": null,
          //     "InbuildConstructType": null,
          //     "BuildingSuminsured": null,
          //     "RiskId": null,
          //     SectionId: "1"
          //   }
          // ]
        }
        if(this.first){
          this.getdropList();
          this.getContentDetails();
        }
        else if(this.second){
          //this.getPersonalAccidentDetails();
        }
        else if(this.third){
          //this.getallriskDetails();
        }
        else if(this.fifth){
          //this.getPersonalIntermediaryDetails();
        }
        else if(this.six){
          //this.getElectronicEquipment();
          }
          else if(this.nine){
            //this.getMachineryRisk();
            }
      })
  }
  getdropList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/content`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.dropList = data.Result;
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
            delete this.dropList[i].CodeDesc;
            if (i == this.dropList.length - 1) {
              this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.dropList);
            }
          }
            

            //this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  AddNew() {
    this.productItem.LocationAddress=null;
    this.productItem.LocationNameBuilding=null;
    this.productItem.BuildingSumInsureds=null;
    let entry = {
      "BuildingAddress": null,
      "BuildingBuildYear": null,
      "BuildingFloors": null,
      "InbuildConstructType": null,
      "BuildingSuminsured": null,
      "RiskId": null,
      "SectionId": "1"
    }
    this.currentBuildingIndex = this.building.length;
    this.editBuildingSection = false;
    this.enableBuildingEditSection = true;
    this.building.push(entry);
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log("Data**",data?.Result);
          this.quoteDetails = data?.Result?.QuoteDetails;
          this.Riskdetails = data?.Result?.RiskDetails;
          this.customerDetails=data?.Result?.CustomerDetails;
          if(this.Riskdetails[0].AcccessoriesSumInsured!=null)
          this.actualAccessoriesSI = String(this.Riskdetails[0].AcccessoriesSumInsured);
          
          if(this.Riskdetails.length==1){
            this.newacc=true;
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
            this.productItem = new ProductData();
          }
          else{
            this.newacc=false;
            this.productItem = new ProductData();
          }
          for (let cover of this.Riskdetails) {
            let j = 0;
            for (let section of cover?.SectionDetails) {
              let CoverData = section.Covers;
              for (let subsectioncover of section?.Covers) {
                if (cover?.totalPremium) {
                  cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                }
                else {
                  cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;

                }
                let baseCovers = [], otherCovers = [];
                baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                section.Covers = baseCovers.concat(otherCovers);
                this.CoverList.push(cover);
                if (j == cover?.SectionDetails) {
                  this.CoverList.push(cover);
                  console.log("vehicleList", this.CoverList);
                }
                else j += 1;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getallriskList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/allrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                if(this.third)
                this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
              }
            }

        }
      },
      (err) => { },
    );
  }
  onAccessoriesSubmit(){
    // this.chassisNoError = false;this.accessoriesTypeError = false;this.serialNoError = false;this.sumInsuredError = false;
    // this.totalAccSIError = false;
    // if(i==0){
    //   this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
    //   this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
    //   this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
    //   this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
    //   this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
    //   this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
    //   this.productItem.ContentSI=null; this.productItem.ContentLocation=null;this.productItem.ContentSerialNo=null;
    //   this.productItem.ContentDesc=null;this.productItem.ContentType=null;this.currentContentIndex=null;
    //   this.editContentSection = false;
    //   this.enableContentEditSection = false;
    // } 
    if(this.Riskdetails.length==1){
      this.productItem.AccessoriesChassisNo = 1;
    }
    console.log('yyyyyyyyyyyy',this.productItem.AccessoriesChassisNo);
    let i =0;
    if(this.productItem.AccessoriesChassisNo==null || this.productItem.AccessoriesChassisNo==''){
      i+=1;
    }
    if(this.productItem.AccessoriesType==null || this.productItem.AccessoriesType==''){
      i+=1;
    }
    if(this.productItem.AccessoriesSerialNo==null || this.productItem.AccessoriesSerialNo==''){
      i+=1;
    }
    if(this.productItem.AccessoriesSI==null || this.productItem.AccessoriesSI=='0' || this.productItem.AccessoriesSI==''){
      i+=1;
    }
    else if(this.totalAccessoriesSI > this.actualAccessoriesSI){
      i+=1;
      this.totalAccSIError = true;
      this.onsubmitAccessories()
    }
    if(i==0){
      
      if(!this.editAccessoriesSection && this.currentAccessoriesIndex==null ){
        this.currentAccessoriesIndex = this.accessoriesList.length;
      }
      if(this.accessoriesList[this.currentAccessoriesIndex]==undefined){
        this.accessoriesList.push({
          "ItemId":null,
          "RiskId":null,
          "MakeAndModel":null,
          "ContentRiskDesc":null,
          "SerialNoDesc": null,
          "SerialNo":null,
          "ItemValue":null,
          "SumInsured":null,
        });
      }
      // this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
      // this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
      // this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
      // this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
      // this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
      // this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
      this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
      this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
      this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType//this.contentId;
      this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
      this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
      //this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
      this.currentAccessoriesIndex = null;
      this.editAccessoriesSection = false;
      this.enableAccessoriesEditSection = false;
      this.productItem = new ProductData();
      if(this.ChassisList.length==2){this.productItem.AccessoriesChassisNo=this.ChassisList[1].Code;}
      console.log("Final List",this.accessoriesList)
    }
      
  }
  getAssName(Id){
    let entry = this.ChassisList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.CodeDesc;
    }
    else return '';
  }
  getAssCont(ItemId){
    let entry = this.AccLists.find(ele=>ele.Code==ItemId);
    if(entry) return entry.CodeDesc;
    else return '';
  }
  AccessoriesDelete(rows:any){
    const index = this.accessoriesList.indexOf(rows);
    this.accessoriesList.splice(index, 1);
    this.getTotalSICost('Accessories');
  }
  delete(row: any) {
    const index = this.building.indexOf(row);

    this.building.splice(index, 1);
    this.LocationList.splice(index,1);
    this.getTotalSICost('building');
    console.log("Locations",this.LocationList);
    //this.Section=false;
  }
  onsubmitAccessories(){
    if(this.totalAccessoriesSI > this.actualAccessoriesSI){
      Swal.fire({
        title: '<strong>Error</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Entered SumInsured Amount Greater than Actual Total SumInsured</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        // showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Ok',
      })
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //         this.onProceedUpload('Merge')
      //   }
      //   else{
      //     this.onProceedUpload('Add')
      //   }
      // })
    }
    // else{
    //   this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
    //   this.productItem=new ProductData();
    // }
  }
  onAccessoriesCancel(){
    if(!this.editAccessoriesSection) this.accessoriesList.splice(this.currentAccessoriesIndex,1);
    this.chassisNo = null;this.accessoriesType=null;this.serialNoDesc=null;this.SumInsured=null;
    this.currentAccessoriesIndex = null;
    this.enableAccessoriesEditSection=false;
  }
  getOccupationList(sectionId){
    let ReqObj = {},urlLink:any='';
    if(this.productId!='14' && this.productId!='32' && this.productId!='19'){
      ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId":this.productId
      }
      urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    }
    else{
      ReqObj = {
        "SectionId": sectionId,
        "ProductId": this.productId,
        "QuoteNo": this.quoteNo
      }
      urlLink = `${this.CommonApiUrl}dropdown/occupations`;
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          
          if(this.productId=='14' || sectionId=='45'){
            this.employeeOccupationList = data.Result;
            for (let i = 0; i < this.employeeOccupationList.length; i++) {
              this.employeeOccupationList[i].label = this.employeeOccupationList[i]['CodeDesc'];
              this.employeeOccupationList[i].value = this.employeeOccupationList[i]['Code'];
              delete this.employeeOccupationList[i].CodeDesc;
              if (i == this.employeeOccupationList.length - 1) {
                this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.employeeOccupationList;
              }
            }
    }
    else if(this.productId=='32' || sectionId=='43'){
      this.fidelityOccupationList = data.Result;
      for (let i = 0; i < this.fidelityOccupationList.length; i++) {
        this.fidelityOccupationList[i].label = this.fidelityOccupationList[i]['CodeDesc'];
        this.fidelityOccupationList[i].value = this.fidelityOccupationList[i]['Code'];
        delete this.fidelityOccupationList[i].CodeDesc;
        if (i == this.fidelityOccupationList.length - 1) {
          this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.fidelityOccupationList;
        }
        // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options)
      }
    }
    else 
    {
      this.occupationList = data.Result;
      for (let i = 0; i < this.occupationList.length; i++) {
        this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
        this.occupationList[i].value = this.occupationList[i]['Code'];
        delete this.occupationList[i].CodeDesc;
        if (i == this.occupationList.length - 1) {
          if(this.eight){
            this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.occupationList;
          }
          if(this.seven){
            this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.occupationList;
          }
        }
      }
    }
        }
      },
      (err) => { },
    );
  }
  individualCommaFormatted(type){
    if(type=='accessories'){
      let entry = this.productItem.AccessoriesSI;
      if(entry){
        //if(this.SumInsured.includes('.')) this.SumInsured = this.SumInsured.split('.')[0];
        // let value = this.SumInsured.replace(/\D/g, "")
        // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(!this.editAccessoriesSection && this.currentAccessoriesIndex==null ){
          this.currentAccessoriesIndex = this.accessoriesList.length;
        }
        if(this.accessoriesList[this.currentAccessoriesIndex]==undefined){
          this.accessoriesList.push({
            "ItemId":null,
            "RiskId":null,
            "MakeAndModel":null,
            "ContentRiskDesc":null,
            "SerialNoDesc": null,
            "SerialNo":null,
            "ItemValue":null,
            "SumInsured":null,
          });
          console.log("Final Accessories",this.accessoriesList,this.accessoriesList[this.currentAccessoriesIndex],this.currentAccessoriesIndex)
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
          this.productItem.AccessoriesSI= entry;
          this.getTotalSICost('Accessories');
        }
        else{
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
          this.productItem.AccessoriesSI= entry;
          this.getTotalSICost('Accessories');
        }
      }
    }
  }
  getTotalSICost(type){
     if(type=='Accessories'){
      this.totalAccessoriesSI = 0;
        if(this.accessoriesList.length!=0){
          for(let emp of this.accessoriesList){
            let SI = emp.SumInsured,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAccessoriesSI = Number(entry)+this.totalAccessoriesSI
          }
        }
    }
  }
  onSaveAccessories(){
    if (this.accessoriesList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.accessoriesList){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
            "ItemId":entry.ItemId,
            "RiskId":entry.RiskId,
            "ContentRiskDesc":entry.ContentRiskDesc,
            "SerialNoDesc": entry.SerialNoDesc,
            "MakeAndModel":"TN123",
            "SerialNo":"155685",
            "ItemValue":"26534556",
            "SumInsured":sumInsured
          }
          reqList.push(data);
          i+=1;
          if(i==this.accessoriesList.length){
            this.finalSaveRiskDetails(reqList,'EA');
          }
      }

    }
  }
  finalSaveRiskDetails(reqList,type){
    let ReqObj;let urlLink;
    if(type=='EA' && (this.productId=='5' || this.productId=='29'))
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "99999",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
            // for(let entry of res.ErrorMessage){
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
        else {
          console.log('First Fields');
            // this.toastrService.show(
            //   'Building Details',
            //   'Building Details Inserted/Updated Successfully',
            //   config)
            if(type=='MA' || type=='PI' || type=='E' || type=='EA') this.checkValidation();
  
        }
  
      },
      (err) => { },
    );
  }
  checkValidation(){
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/additionalinfovali`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Message=='Success') {
              this.router.navigate(['/quotation/plan/main/document-info'])
            }
          },
          (err) => { },
        ); 
  }
  showSidebar() {
    this.sidebarVisible = true;
  }

  getBack(type){
    if(this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      else if(type=='Health Insurance'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        // this.fourth = true;
        // this.selectedTab -=1; 
      }
      else if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        //this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;
        //this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;
        //this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;
        //this.getElectronicEquipment();
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
    }
    else if(!this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      else if(type=='Health Insurance'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
      if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        //this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;
        //this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;
        //this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;
        //this.getElectronicEquipment();
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
                else if(type=='Medical'){
                  this.selectedTab-=1;
                }
    }

    
  }

  onSaveEmployeeDetails(type){
    
    let urlLink = null;
    if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
    else urlLink = `${this.motorApiUrl}api/proceedemployees`;
    if(this.employeeList.length!=0){
        let empList = [],i=0;
        for(let emp of this.employeeList){
          let entry = emp;
           if(entry.DateOfBirth!=null){
              if(!entry.DateOfBirth.includes('/')) entry['DateOfBirth']= this.datePipe.transform(entry.DateOfBirth, "dd/MM/yyyy");
          }
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
          else entry['EmployeeId'] = String(entry.EmployeeId);
          empList.push(entry);
          i+=1;
          if(i==this.employeeList.length){
            let SectionId = null;
            if(this.productId=='14' || this.productId=='19' || this.productId=='57') SectionId = '45';
            let validYN='N';
            if(type=='alter') validYN = 'Y';
            let ReqObj = {
              "Createdby": this.loginId,
              "SectionId": SectionId,
              "ProductId": this.productId,
              "InsuranceId": this.insuranceId,
              "ProductEmployeeSaveReq": empList,
              "QuoteNo": this.quoteNo,
               // "EmpcountSIvalidYN": validYN,
              // "ExcelUploadYN": "N",
              // "RequestReferenceNo": this.quoteRefNo
            }
            //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                let res: any = data;
                if (data.ErrorMessage.length != 0) {
                  if (res.ErrorMessage) {
                    let entry = res.ErrorMessage.some(ele=>ele.Code=='333' || ele.Code=='111' || ele.Code=='222');
                    if(entry){
                      let ulList = '';
                      for (let index = 0; index < res.ErrorMessage.length; index++) {
                        const element = res.ErrorMessage[index];
                
                         ulList +=`<li class="list-group-login-field">
                          <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                          <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                        </li>`
                        
                      }
                      
                    }
                    
                }
              }
              else{
                if(this.productId=='19' && this.eight)  this.selectedTab +=1; 
                else if(this.productId=='19' && this.nine)this.selectedTab +=1; 
                else this.checkValidation();
              }
        
            },
            (err) => { },
            );
          }
        }
    }
    else{alert("No Employees Found")}
  }

  saveBuildingDetails(ReqObj,type) {
    let urlLink = `${this.motorApiUrl}api/buildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {

          }
        }
        else {
          if (data.Result) {
            console.log('PPPPPPPPP',data.Result);
            console.log('SSSSSSSSSSSS',type);
            //this.first=true;
            if(type=='Content Risk'){
              this.fourth = true;
              this.getContentDetails();
              this.selectedTab = 1;
            }
            else if(type=='Personal Accident'){
              this.fourth = true;
              // this.getPersonalAccidentDetails();
            }
            else if(type=='All Risk'){
              this.fourth = true;
              // this.getallriskDetails();
            }
            else if(type=='Personal Indemenity'){
              this.fourth = true;
              //this.getPersonalIntermediaryDetails();
            }
            else if(type=='ElectricalEquipment'){
              this.fourth = true;
              //this.getElectronicEquipment();
            }
            else if(type== 'Machinery Breakdown'){
              this.nine =true;
              this.getMachineryRisk();
              }
            else if (this.first||this.second || this.third || this.fifth || this.six || this.seven || this.eight || this.nine) {
              this.fourth = true;
              if(this.first){
                this.getContentDetails();
              }
              else if(this.second){
                //this.getPersonalAccidentDetails();
              }
              else if(this.third){
                //this.getallriskDetails();
              }
              else if(this.fifth){
                //this.getPersonalIntermediaryDetails();
              }
              else if(this.six){
                //this.getElectronicEquipment();
                }
                else if(this.nine){
                  this.getMachineryRisk();
                  }
              this.selectedTab = 1;
            }
            else if(this.productId=='42') this.selectedTab = 1;
            else if(this.productId=='56') this.selectedTab = 1;
            else{
              this.checkValidation();
            }
          }
        }

      },
      (err) => { },
    );
  }

  getContentDetails(){
    let sectionId=null;
    if(this.productId=='19') sectionId = '47';
    else sectionId = '47';
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": sectionId
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
            if(this.endorsementSection){
              this.contentRiskSection = !this.enableFieldsList.some(ele=>ele=='ContentSuminsured');
            }
            else this.contentRiskSection = true;
             this.Cotentrisk = res.Result.ContentRiskDetails;
             console.log('Get details',this.Cotentrisk);
             this.getTotalSICost('content');
           }
           else{
            this.Cotentrisk=[];
            this.ContentAdd();
            //this.ContentAdd();
            // this.Cotentrisk = [{
            //   "ItemId":null,
            //   "RiskId":null,
            //   "MakeAndModel":null,
            //   "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //   "SerialNo":null,
            //   "ItemValue":null,
            //   "SumInsured":null,
            // }]
           }
          }
          else {
            this.Cotentrisk=[];
            this.ContentAdd();
            // this.Cotentrisk = [{
            //   "ItemId":null,
            //   "RiskId":null,
            //   "MakeAndModel":null,
            //   "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //   "SerialNo":null,
            //   "ItemValue":null,
            //   "SumInsured":null,
            // }]
          }
        }
        else {
          // this.Cotentrisk = [{
          //   "ItemId":null,
          //   "RiskId":null,
          //   "MakeAndModel":null,
          //   "ContentRiskDesc":null,
          //   "SerialNoDesc": null,
          //   "SerialNo":null,
          //   "ItemValue":null,
          //   "SumInsured":null,
          // }]
        }
        // if(this.second){
        //   this.getPersonalAccidentDetails();
          
        // }
        // else if(this.third){
        //   this.getallriskDetails();
        // }
        // else if(this.fifth){
        //   this.getPersonalIntermediaryDetails();
        // }
        // else if(this.six){
        //   this.getElectronicEquipment();
        // }
      })
  }
  ContentAdd() {
    this.productItem.ContentDesc=null;
    this.productItem.ContentLocation =null;this.productItem.ContentSI=null;
    this.productItem.ContentSerialNo =null;this.productItem.ContentSuminsured=null;
    this.productItem.ContentType =null;
    let entry = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    this.currentContentIndex = this.Cotentrisk.length;
    this.Cotentrisk.push(entry);
    this.editContentSection = false;this.enableContentEditSection = true;
    this.LocationId = null;this.serialNoDesc = null;this.contentRiskDesc = null;
    this.contentSI = null;this.contentId = null;
  }
}
