import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
interface Plan {
  title:string;
  excess:number;
  totalSum:number;
  year:number;
  discount:number
}
@Component({
  selector: 'app-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.css'],
  providers: [MessageService]
})
export class CoverDetailsComponent {
  plans:Plan[] = [
    { title: 'Cash/ Cheque etc', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Geographical Extension', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Electronic Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
    { title: 'Other Accessories', excess: 4, totalSum: 50.5, year: 1, discount: 500 },
  ];

  tabIndex:any=0;
  years:MenuItem[] = [];
  vehicles: MenuItem[] = [];
  sidebarVisible:boolean = false;
  userDetails:any=null;userType:any=null;
  subuserType:any=null;agencyCode:any=null;
  branchCode:any=null;branchList:any[]=[];
  productId:any=null;productName:any=null;
  insuranceId:any=null;brokerbranchCode:any=null;
  loginType:any=null;finalizeYN:any='N';
  localCurrency: any;
  loginId: any; jsonList:any[]=[];
  json:any[]=[];
  sampleloginId: any;
  endorsementSection: boolean=false;
  endorsementCategory: any=null;
  endorsementId: any=null;
  endorseEffectiveDate: any=null;
  enableFieldsList: any[]=[];
  coverModificationYN: any=null;
  endorseCovers: boolean=false;
  endorseSIModification: boolean=false;
  endorseAddOnCovers: boolean=false;
  enableAddVehicle: boolean=false;
  enableRemoveVehicle: boolean=false;
  enableSections: boolean=false;
  statusList: any[]=[];
  quoteRefNo: string;
  requestReferenceNo: string;
  minDate: Date;
  maxDate: Date;
  quoteNo: string;
  statusValue: string;
  adminSection: boolean;
  vehicleDetailsList: any[]=[];
  isMannualReferal: any='N';
  selectedRowData: any;
  coverSection: boolean;
  vehicleData: any[];
  customerDetails: any;
  viewList: any;ClausesDataId:any[]=[];
  ClausesData: any[]=[];
  ExclusionData: any[]=[];
  WarrantyData: any[]=[];
  WarrteData: any[]=[];
  clause: boolean=false;
  ExclusionDataId: any[]=[];
  WarrantyDataId: any[]=[];
  onClauses: boolean=false;
  onWarranty: boolean=false;
  onExclusion: boolean=false;selectedVehicleList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  emipolicytype: any=null;minCoverRatePercent:any=null;
  SourceType: any=null;
  commissionValue: any=null;
  commissionPercent: any=null;
  policyStartDate: any=null;
  policyEndDate: any=null;
  uwReferralSection: boolean=false;
  endorsementType: any;
  havePromoCode: any='N';
  promoCode: any;
  adminRemarks: any;
  ExclusionList:any[]=[];
  currencyCode: any=null;
  showSection: boolean=false;
  selectedCoverList: any[]=[];
  localPremiumCost: any=null;
  totalPremium: any=null;
  emiYN: any='N';
  emiPeriod:any="0";
  gridshow: boolean=false;
  yearlySection: boolean=false;
  nineMonthSection: boolean=false;
  sixMonthSection: boolean=false;
  threeMonthSection: boolean=false;
  fiveMonthSection: boolean=false;
  eightMonthSection: boolean;
  Emilist1: any[]=[];
  emiSection: boolean=false;
  rejectedReason: any=null;
  selectedVehId: any=null;
  selectedCoverId: any=null;
  ratePercent: any=null;
  CoverName: any=null;
  minimumPremiumYN: any=null;
  discountList: any=[]=[];
  loadingList: any=[]=[];
  discountEndtSection: boolean=false;
  sumInsured: any=null;
  calcType: any=null;
  excessPercent: any=null;
  excessAmount: any=null;
  differenceSI: any=null;
  differencePremium: any=null;
  beforeDiscount: any=null;
  selectedSectionId: any=null;discountDetailModal:boolean=false;
  afterDiscount: any=null;excessDetailModal:boolean=false;
  customerObj: any=null;
  customerReferenceNo: any=null;
  emistatus: string;
  coverlist: any[]=[];
  remarks: any=null;
  newcoverlist: any[]=[];subCoverDetailModal:boolean=false;
  inserts: any=null;subCoverColumns:any[]=[];
  noOfDays: any=null;verticalSection:boolean =false;
  EmiDetails: any[]=[];showCoverList:boolean=false;
  MinimumPremium: any=null;premiumExcluedTax: any=null;
  premiumIncluedTax: any=null;dependantTaxList: any[]=[];taxList: any[]=[];premiumBeforeTax: any=null;
  proRataPercent: any=null;premiumAfterDiscount:any=null;
  fleetCoverDetails: any;columns:any[]=[];
  basePremium: any;premiumIncludedTax: any;premiumExcludedTax: any;factorViewList: any[]=[];factorPremiumDetails:any=null;factorDetailModal: boolean=false;
  newAddClauses: boolean = false; newAddExclusion:boolean = false; newAddWarranty:boolean = false;
  fleetDiscountModal: boolean=false;
  minTaxList: any[]=[];
  minPremiumExcludedTax: any=null;
  minCoverName: any;
  minBasePremium: any;
  minPremiumIncludedTax: number;
  constructor(private router:Router,private sharedService:SharedService,private messageService: MessageService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let loginType = sessionStorage.getItem('resetLoginDetails');
    this.userType = this.userDetails?.Result?.UserType;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.loginType = this.userDetails.Result.LoginType;
    let finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
    if(loginType){
      sessionStorage.removeItem('resetLoginDetails');
      let sectionType = sessionStorage.getItem('riskSection');
      if(sectionType=='additional' ) this.router.navigate(['quotation/plan/main/accessories']);
      else if(this.productId=='4') this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details'])
      else if(this.productId!='5' && this.productId!='46' && this.productId!='29') this.router.navigate(['quotation/plan/main/accessories']);
      else this.router.navigate(['/quotation/plan/main/document-info'])
    }
   
    console.log("Received Session",this.userDetails)
    this.localCurrency = this.userDetails.Result.CurrencyId;
    this.loginId = this.userDetails.Result.LoginId;
    this.sampleloginId = this.loginId;
    
    sessionStorage.removeItem('vehicleDetailsList');
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        console.log("Endorse obj",endorseObj)
        this.endorsementCategory = endorseObj.Category;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection'  || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
        if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
        else this.coverModificationYN = 'N';
        console.log("Enable Obj",this.enableFieldsList)
        if(this.endorsementId!=42){
          this.endorseCovers = this.enableFieldsList.some(ele=>ele=='Covers' && this.endorsementId==852);
          this.endorseSIModification = this.enableFieldsList.some(ele=>(ele=='Covers' && this.endorsementId==850));
          this.endorseAddOnCovers = this.enableFieldsList.some(ele=>ele=='AddOnCovers' || ele=='AddCovers');
          this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
          this.enableRemoveVehicle = this.enableFieldsList.some(ele=>ele=='removeVehicle');
          this.enableSections = this.enableFieldsList.some(ele=>ele=='RemoveSection');
        }
        else{
          this.endorseSIModification = false;
          this.endorseCovers = false;
          this.enableAddVehicle = false;
          this.endorseAddOnCovers = false;
          this.enableRemoveVehicle = false;
          this.enableSections = false;
        }
      }
      else{
        this.endorsementSection = false;
        this.endorseCovers = false;
      }
    this.columns = ["Id","Description"];
    this.subCoverColumns = ['Select','SubCoverName','Premium']
    this.statusList = [
      {"Code":"RP","CodeDesc":"Referral Pending"},
      {"Code":"RA","CodeDesc":"Referral Approved"},
      {"Code":"RR","CodeDesc":"Referral Rejected"},
      {"Code":"RE","CodeDesc":"Referral Re-Quote"},
      {"Code":"REV","CodeDesc":"Referal Reverted"},
    ]
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    this.requestReferenceNo = this.quoteRefNo;
    this.minDate = new Date();
    var d = this.minDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDate = new Date(year, month, day+90);
    let quoteNo = sessionStorage.getItem('quoteNo');
    if(quoteNo) this.quoteNo = quoteNo;
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.viewCondition('direct');
    }
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRE'){
      if(quoteStatus=='AdminRP') this.statusValue ="RP";
      else if(quoteStatus =='AdminRA') this.statusValue ="RA";
      else if(quoteStatus =='AdminRE') this.statusValue ="RE";
        this.adminSection = true;
    }
    else{
      if(quoteStatus) this.statusValue = quoteStatus;
      this.adminSection = false;
    }
    if(this.productId=='5'  || this.productId=='59' || this.productId=='46' || this.productId=='29'){
      //let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      let vehicles:any;
      if(this.statusValue=='RA'){
        this.getUpdatedVehicleDetails();
      }
      else{
        if(vehicles && (this.productId=='5' || this.productId=='46' || this.productId=='29')){
          let vehicleList=[];
          let i=0;
          for(let veh of vehicles){
            if(i==0) veh['Collapse'] = true;
            else veh['Collapse'] = false;
            i+=1;
            vehicleList.push(veh);
            if(i==vehicles.length){
                this.vehicleDetailsList = vehicleList;
                if(this.vehicleDetailsList.some(ele=>ele.ManualReferalYn=='Y') && !this.adminSection){  
                  this.isMannualReferal = "Y";
                  console.log('MannnnnnnnReferral', this.isMannualReferal);
                }
                if(this.statusValue=='RP' && !this.adminSection){
                  
                  if(!this.vehicleDetailsList.some(ele=>ele.Status=='RP') && this.isMannualReferal!='Y'){
                    this.statusValue = null;
                    sessionStorage.removeItem('QuoteStatus')
                  }
                }
                this.selectedRowData = this.vehicleDetailsList[0];
                this.onSelectSection();
                this.coverSection = true;
                // if(((this.uwReferralSection && !this.adminSection  && (this.statusValue=='RP' || this.statusValue==null || this.statusValue==undefined))  || (!this.adminSection && this.statusValue=='RP' && this.vehicleDetailsList.some(ele=>ele.Status=='RP')) || (this.statusValue=='RP' && !this.adminSection && this.vehicleDetailsList.some(ele=>ele.Status=='RP')))){
                //   this.columnHeader = [
                //     {
                //       key: 'selected',
                //       display: 'Select',
                //       config: {
                //         isChecked:true
                //       },
                //     },
                //     { key: 'CoverName', display: 'Cover Name' },
                //     { key: 'SumInsured', display: 'Sum Insured' }
                //   ]
                // }
                // else{
                  
            
   
                 
                //}
                //this.EmiInstallment();
            }
          }
        }
        else{

          this.getUpdatedVehicleDetails();
        }
      }
    }
    else if(this.productId!='5' && this.productId!='59' && this.productId!='46' && this.productId!='29'){
      // let coverListObj = JSON.parse(sessionStorage.getItem('travelCoverListObj'));
      // if(coverListObj){
      //   this.getCoverList(coverListObj);
      // }
      this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
      this.requestReferenceNo = this.quoteRefNo;
      let quoteNo = sessionStorage.getItem('quoteNo');
      if(quoteNo) this.quoteNo = quoteNo;
      this.getUpdatedVehicleDetails();
    }
    this.jsonList = [
      {
        "TypeId":"D",
        "DocRefNo":null,
      "DocumentId":null,
         "Id":"6",
        "SubId":null,
         "SubIdDesc":""
      }
    ];
    this.ExclusionList = [
      {
        "TypeId":"D",
         "Id":"7",
        "SubId":null,
         "SubIdDesc":"",
         "DocRefNo":null,
         "DocumentId":null,
      }
    ]


    this.json = [
      {
        "TypeId":"D",
         "Id":"4",
        "SubId":null,
         "SubIdDesc":"",
         "DocRefNo":null,
         "DocumentId":null,
      }
    ]
  }
  onViewFactorDetails(){
    let ReqObj = {
      "RequestReferenceNo" : this.quoteRefNo, 
      "VehicleId": this.selectedRowData?.Vehicleid,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "SectionId" : this.selectedRowData?.SectionId
    }
    let urlLink = `${this.CommonApiUrl}api/getfactorratedetailsList`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.factorViewList = data.Result.FactorCalculationRes;
          this.factorPremiumDetails = data.Result.FactorResultRes;
          this.factorDetailModal = true;
        }
      },
      (err) => { },
    );
  }
  onSelectSection(){
    console.log("Current Id",this.selectedRowData)
    if(this.selectedRowData!=null){
      this.coverSection = false;
      this.selectedVehicleList = [this.selectedRowData]
      this.coverSection = true;

    }
  }
  getHeaderName(menu){
    if(this.productId=='5'){
      let name = menu.RiskDetails.Registrationnumber;
      if(menu.SectionName!=null){
        name = name+` (${menu.SectionName})`
      }
      return name;
    }
    else if(this.productId=='4'){
      if(menu.RiskDetails.TravelId=='1') return `Kids (${menu.RiskDetails.TotalPassengers})`;
      if(menu.RiskDetails.TravelId=='2') return `Adults (${menu.RiskDetails.TotalPassengers})`;
      if(menu.RiskDetails.TravelId=='3') return `Seniors (${menu.RiskDetails.TotalPassengers})`;
      if(menu.RiskDetails.TravelId=='4') return `Super Seniors (${menu.RiskDetails.TotalPassengers})`;
      if(menu.RiskDetails.TravelId=='5') return `Grand Seniors (${menu.RiskDetails.TotalPassengers})`;
    }
    else if(this.productId!='59' && this.productId!='4' && this.productId!='5' && this.productId!='19' && this.productId!='14' && this.productId!='32') return this.productName;
    else if(this.productId=='59' || this.productId=='19' || this.productId=='14' || this.productId=='32') return menu.SectionName;
    else return '';
  }

  getHeader(){
    if(this.productId == '59'){
          return 'Domestic'
    }
  }
  SaveLoadingDetails(modal){
    if(this.loadingList.length!=0){
      let i=0;
      for(let load of this.loadingList){
        console.log("Entry Load",load)
        if(load.LoadingAmount!=0 && String(load.LoadingAmount).includes(',')) load['LoadingAmount'] = Number(load.LoadingAmount.replaceAll(',',''));
        i+=1;
        if(i==this.loadingList.length) this.finalSaveLoading(modal)
      }
    }
    else this.finalSaveLoading(modal)
  }
  finalSaveLoading(modal){
    let vehData = this.vehicleDetailsList.filter(ele=>ele.VehicleId==this.selectedVehId);
    let secData = vehData.filter(ele=>ele.SectionId==this.selectedSectionId);
    console.log("Final Sellec",vehData,secData,this.selectedSectionId)
    let coverData = secData[0].CoverList.filter(ele=>ele.CoverId==this.selectedCoverId);
    if(coverData[0]?.Endorsements){
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].PremiumBeforeDiscount = this.beforeDiscount;
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].PremiumAfterDiscount = this.differencePremium;
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].EndorsementCalcType = this.calcType;
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].ExcessPercent = this.excessPercent;
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].ExcessAmount = this.excessAmount;
      coverData[0].Endorsements[coverData[0].Endorsements.length-1].EndorsementRate = this.ratePercent;

    }
    else{
      coverData[0].PremiumAfterDiscount = this.afterDiscount;
      coverData[0].Discounts = this.discountList;
      coverData[0].ratePercent = this.ratePercent;
      coverData[0].ExcessPercent = this.excessPercent;
      coverData[0].ExcessAmount = this.excessAmount;
      coverData[0].Rate = this.ratePercent;
    }
    
    this.selectedVehId = null;this.excessPercent = null;
    this.selectedCoverId = null;this.excessAmount=null;
    this.selectedSectionId = null;this.ratePercent = null;
    this.beforeDiscount = null;this.loadingList =[];
    this.afterDiscount = null;this.discountList =[];
    if(coverData){
      this.excessDetailModal = false;
      this.discountDetailModal = false;
    }
  }
  ngOnInit() {
    this.years = [{label: '1 Year'}, {label: '2 Year'}];
    this.vehicles = [{label: 'Vehicle 1'}, {label: 'Vehicle 2'}];
  }
  viewCondition(index){
    let QuoteNo:any;
    if(this.quoteNo!=undefined && this.quoteNo!="" && this.quoteNo!=null ){
      QuoteNo=this.quoteNo;
    }
    else{
      QuoteNo=null;
    }
    let ReqObj = {
      InsuranceId:this.insuranceId,
      BranchCode:this.branchCode,
      ProductId:this.productId,
      QuoteNo:QuoteNo,
      TermsId:"D",
      SectionId:'99999',
      // SectionId:this.vehicleDetailsList[index].SectionId,
      RequestReferenceNo: this.quoteRefNo

    }
    let urlLink = `${this.CommonApiUrl}api/viewtermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.viewList = data.Result;
          if(this.viewList?.ClausesList){
            this.ClausesData = this.viewList?.ClausesList;
          }
          if(this.viewList?.ExclusionList){
            this.ExclusionData = this.viewList?.ExclusionList;
          }
          if(this.viewList?.WarrantyList){
            this.WarrantyData = this.viewList?.WarrantyList;
          }
          this.WarrteData = this.viewList.WarrateList;
          if(this.userType=='Broker'){
            /*console.log('bbbbbbbbbbbbb',this.userType)
            this.ClauseColumnHeader;
            this.clause=true;*/

             //const isChecked=false;
             this.clause=true;
             
            this.ClausesDataId.map(x=>({
              ...x,
              isChecked:false
            }));

            
            this.ExclusionDataId.map(x=>({
              ...x,
              isChecked:false
            }));
            
            this.WarrantyDataId.map(x=>({
              ...x,
              isChecked:false
            }));
          }
          else{
            /*this.ClausesColumnHeader;
            this.clause=false;*/
            this.clause=false;
            
             this.ClausesDataId.map(x=>({
               ...x,
               isChecked:false
             }));
             
            this.ExclusionDataId.map(x=>({
              ...x,
              isChecked:false
            }));
            

          }
          if(this.onClauses==true || this.onWarranty==true || this.onExclusion==true){
            let commonObj = {
              "ClausesList": this.ClausesData,
              "WarrantyList": this.WarrantyData,
              "ExclusionList": this.ExclusionData
            }
              // this.vehicleDetailsList[index]["Common"] = commonObj;
          }
        }
      },
      (err) => { },
    );
  }
  onChooseCompareSection(rowData){
    this.selectedSectionId = rowData.SectionId;
    
  }
  getCustomerDetails(referenceNo){
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.customerDetails = data.Result;
          
        }
      },
      (err) => { },
    );
  }
  getUpdatedVehicleDetails(){
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
    if(referenceNo){
      this.quoteRefNo = referenceNo;
      let ReqObj = {
        "ProductId":this.productId,
        "RequestReferenceNo": this.quoteRefNo
      }
      let urlLink = `${this.CommonApiUrl}api/view/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){

              this.vehicleData = data.Result;
              if(this.vehicleData.length!=0){
                let finalizeyn = this.vehicleData[0]?.FinalizeYn;
                if(finalizeyn!=null){this.finalizeYN = finalizeyn;sessionStorage.setItem('FinalizeYN',finalizeyn);}
                else{this.finalizeYN='N';sessionStorage.removeItem('FinalizeYN')};
              }
              // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
              //     console.log('KKKKKKKKKKKK',this.emipolicytype);
             
              // let refRemarks = this.vehicleData[0].ReferalRemarks;
              // if(refRemarks){
              //   this.referralRemarks = refRemarks.split('~');
              // }
              if(this.productId=='5' || this.productId=='29'){
                let j=0;let datass:any=[]
                if(this.vehicleData.length>1){
                  if(this.vehicleData[0]?.RiskDetails?.InsuranceClass == this.vehicleData[1]?.RiskDetails?.InsuranceClass){
                    this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                  }
                  else{
                    this.emipolicytype='99999';
                  }
                 
                }
                else{
                 this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                }
                // this.emipolicytype=this.vehicleData[0]?.RiskDetails?.InsuranceClass;
                // console.log('KKKKKKKKKKKK',this.emipolicytype);
               }
               else{
                this.emipolicytype='99999';
               }

              let vehicleList:any[]=[];
              if(this.vehicleData.length!=0){
                this.SourceType = this.vehicleData[0].SourceType;
                this.commissionValue = this.vehicleData[0].CommissionPercentage;
                this.commissionPercent = this.vehicleData[0].CommissionPercentage;
                this.policyStartDate = this.vehicleData[0]?.PolicyStartDate;
                this.policyEndDate = this.vehicleData[0]?.PolicyEndDate;
                let referralList = this.vehicleData.filter(ele=>(ele.UWReferral!=null && ele.UWReferral.length!=0) || ele.MasterReferral.length!=0);
                if(referralList.length!=0) this.uwReferralSection = true;
                if(this.vehicleData[0].EndtTypeMaster!=null){
                  let quoteDetails = this.vehicleData[0].EndtTypeMaster
                  this.endorsementType = quoteDetails.Endtcategdesc;
                  this.endorsementCategory = quoteDetails.Endttypecategory;
                  if(!JSON.parse(sessionStorage.getItem('endorseTypeId'))){
                    let obj = {
                      "EndtTypeId": Number(quoteDetails?.Endttypeid),
                      "FieldsAllowed":quoteDetails.Endtdependantfields.split(','),
                      "EffectiveDate":quoteDetails.Endorsementeffdate,
                      "Remarks":quoteDetails.Remarks,
                      "Category": quoteDetails.Endttypecategory,
                      "EndtName": quoteDetails.Endttype,
                      "PolicyNo": quoteDetails?.PolicyNo
                    }
                    sessionStorage.setItem('endorsePolicyNo',this.vehicleData[0].OriginalPolicyNo);
                    //sessionStorage.setItem('endorsePolicyNo',)
                    sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
                    this.endorsementSection = true;
                    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
                    if(endorseObj){
                      console.log("Endorse obj",endorseObj)
                      this.endorsementId = endorseObj.EndtTypeId;
                      this.endorseEffectiveDate = endorseObj?.EffectiveDate;
                      this.enableFieldsList = endorseObj.FieldsAllowed;
                      let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection'  || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
                      if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
                      else this.coverModificationYN = 'N';
                      console.log("Enable Obj",this.enableFieldsList)
                      if(this.endorsementId!=42){
                        this.endorseCovers = this.enableFieldsList.some(ele=>ele=='Covers' && this.endorsementId==852);
                        this.endorseSIModification = this.enableFieldsList.some(ele=>ele=='Covers' && this.endorsementId==850);
                        this.endorseAddOnCovers = this.enableFieldsList.some(ele=>ele=='AddOnCovers' || ele=='AddCovers');
                        this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
                        this.enableRemoveVehicle = this.enableFieldsList.some(ele=>ele=='removeVehicle');
                        this.enableSections = this.enableFieldsList.some(ele=>ele=='RemoveSection');
                      }
                      else{
                          this.endorseSIModification = false;
                          this.endorseCovers = false;
                          this.enableAddVehicle = false;
                          this.endorseAddOnCovers = false;
                          this.enableRemoveVehicle = false;
                          this.enableSections = false;
                      }
                    }
                  }
                }
                if(this.vehicleData[0].HavePromoCode){
                  this.havePromoCode = this.vehicleData[0].HavePromoCode;
                  this.promoCode = this.vehicleData[0].PromoCode;
                }
                else{
                  this.havePromoCode = "N";
                  this.promoCode = null;
                }
                let admRemarks = this.vehicleData[0].AdminRemarks;
                if(admRemarks){
                  this.adminRemarks = admRemarks.split('~');

                }
                this.currencyCode= this.vehicleData[0]?.Currency;
                let i=0;
                for(let veh of this.vehicleData){
                  veh['ReferralList'] = [];
                  if(veh.MasterReferral.length!=0){
                    for(let master of veh.MasterReferral){
                      veh['ReferralList'].push(master.ReferralDesc)
                    }
                  }
                  if(veh.UWReferral.length!=0){
                    for(let master of veh.UWReferral){
                      veh['ReferralList'].push(master.QuestionDesc)
                    }
                  }
                  if(veh.EndorsementYn=='Y'){
                    if(this.endorsementSection==false){
                      
                    }
                  }
                  // if(veh.ReferalRemarks){
                  //   veh['ReferralList']= veh.ReferalRemarks.split('~');
                  // }
                  if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId;
                    veh['Active'] = true;
                    let coverList = veh.CoverList;
                    let baseCovers =[],otherCovers=[];
                    baseCovers = coverList.filter(ele=>ele.CoverageType=='B');
                    otherCovers= coverList.filter(ele=>ele.CoverageType!='B');
                    veh.CoverList = baseCovers.concat(otherCovers)
                    if(i==0){
                      veh['Collapse'] = true;
                      //this.remarks = veh.AdminRemarks;
                      vehicleList.push(veh);
                    }
                    else{
                      veh['Collapse'] = false;
                      vehicleList.push(veh);
                    }
                    i+=1;
                    if(i==this.vehicleData.length){
                      console.log("Vehiclessss",this.vehicleData,data.Result)
                      console.log("Final Vehicle List",vehicleList)
                      //sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                      if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
                        this.vehicleData = vehicleList;
                        this.filterVehicleList();
                      }
                      else{
                        this.vehicleDetailsList = vehicleList;
                        this.checkSelectedCovers();
                      }
                    }
                }
              }
            
          }
        },
        (err) => { },
      );
    }
  }
  checkCurrentSection(){
    if(this.insuranceId=='100028' || this.insuranceId=='100027'){
      let duplicateId = null;
      let i=0,j=0;
      for(let veh of this.vehicleDetailsList){
        let duplicateVehicle = [];
        duplicateVehicle = this.vehicleDetailsList.filter((val) => val.Vehicleid === veh.Vehicleid);
      
        if (duplicateVehicle.length > 1) {
            duplicateId = duplicateVehicle[0].Vehicleid;
        }
        j+=1;
            if (duplicateId!=null) {
              return true;
            }
            else return false;
      }
    }
    else return false;
  }
  checkPremiumIncludedTax(coverData,rowData){
    let entry = this.selectedCoverList.find(ele=>ele.Id==rowData.Vehicleid);
    if(coverData.SubCovers){
       if(coverData.SubCovers.length!=0){
          console.log(coverData.SubCovers,coverData.SubCovers.some(ele=>ele.isSelected=='D' || ele.isSelected=='O' || ele.isSelected=='Y' || ele?.UserOpt=='Y' || ele?.selected==true))
         return coverData.SubCovers.some(ele=>ele.isSelected=='D' || ele.isSelected=='O' || ele.isSelected=='Y' || ele?.UserOpt=='Y' || ele?.selected==true);
        }
    }
    else return true;
  }
  getSubCoverTitle(coverData,rowData){
    if(this.selectedCoverList.length!=0){
      let entry = this.selectedCoverList.find(ele=>ele.Id==rowData.Vehicleid && ele.SectionId==rowData.SectionId);
      if(entry){
          let coverEntry = coverData.SubCovers.find(ele=>entry.Covers[0].SubCoverId == ele.SubCoverId);
          if(coverEntry) return `SubCover - ${coverEntry.SubCoverName}`;
          else return 'Choose SubCover'
      }
      else return 'Choose SubCover'
    }
    else return 'Choose SubCover'
  }
  checkActiveIndex(coverData){
    console.log(coverData.ActiveIndex)
      if(coverData.ActiveIndex){
         
          return coverData.ActiveIndex;
      }
      else return null;
      
  }
  checkEmptyCovers(covers){
    return covers.CoverList.length==0;
  }
  checkBenefitSection(covers){
    let list:any[] = covers.CoverList.filter(ele=>ele.CoverageType=='A' && ele.isSelected=='D');
    return (list.length!=0);
  }
  checkBenefitSection2(covers){
    let list:any[] = covers.CoverList.filter(ele=>ele.CoverageType=='A' && ele.isSelected!='D');
    return (list.length!=0);
  }
  filterVehicleList(){
    let vehicleList = [];
    console.log("Vehiclessss on Filter",this.vehicleDetailsList,this.vehicleData)
      if(this.vehicleData.length!=0){
          let i=0;
          this.vehicleDetailsList = [];
          for(let vehicle of this.vehicleData){
            if(i==0){
                vehicleList.push(vehicle);
            }
            else{
              let entry = vehicleList.find(ele=>ele.VehicleId==vehicle.VehicleId);
              if(entry){

                if(entry.SectionId==vehicle.SectionId){
                  entry.CoverList = entry.CoverList.concat(vehicle.CoverList);
                }
                else{
                  vehicleList.push(vehicle);
                }
              }
              else{
                vehicleList.push(vehicle);
              }
            }

            i+=1;
            if(i==this.vehicleData.length){
              this.vehicleDetailsList = vehicleList;
              console.log("Filtered Vehicle List",this.vehicleDetailsList)
              this.checkSelectedCovers();
            }
          }
      }
  }
  checkSelectedCovers(){
    console.log('VVVVVVVVV',this.vehicleDetailsList);
    if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList[0].CoverList.length!=0){
        this.currencyCode== this.vehicleDetailsList[0].CoverList[0].Currency;
      }
      let j=0;
      for(let veh of this.vehicleDetailsList){
        veh['totalPremium'] = 0;
        let i=0;
        let coverList:any[]=veh.CoverList;
        for(let cover of coverList){
          cover['ExcessDesc'] = 'None';
          let fieldList = [];
          if(cover.Endorsements!=null && veh.Status!='D'){
            
            cover['DifferenceYN']= 'Y';
            if(veh?.EndtTypeMaster?.Endtdependantfields){
              fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
            }
          }
          if(cover.Endorsements!=null && !this.endorsementSection){
            this.endorsementSection = true;
            
            let obj = {
              "EndtTypeId":cover.Endorsements[0].EndorsementId,
              "FieldsAllowed": fieldList,
              "EffectiveDate":cover.EffectiveDate,
              "Remarks":null,
              "Category": veh?.EndtTypeMaster?.Endttypecategory,
              "EndtName": cover.Endorsements[0].EndorsementDesc,
              "PolicyNo": null
            }
            this.endorsementId = cover.Endorsements[0].EndorsementId;
            this.endorseEffectiveDate = cover.EffectiveDate;
            this.enableFieldsList = fieldList;
            let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection' || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
            if(this.coverModificationYN=='N'){
              if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
              else this.coverModificationYN = 'N';
            }
            sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
          }
          if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
          (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='D' || cover.isSelected=='O')) ){
            // if(this.endorsementId == 846 && veh.Status=='D'){
            //   cover['selected']= false;
            //   this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
            // }
            // else{
              this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
            //}
            
          }
          else{
            console.log("Not Selected 1",cover);
            cover['selected']= false;
          }
          if(cover.SubCovers!=null){
            let k=0;
            for(let sub of cover.SubCovers){
              if(sub.isSelected=='D' || sub.isSelected=='O' || sub.isSelected=='Y' || sub?.UserOpt=='Y'){
                    this.onChangeSubCover(sub,cover,veh,true,null);
              }
              k+=1;
              if(k==cover.SubCovers){
                i+=1;
                if(i==coverList.length){
                  let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
                  let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
                  veh.CoverList = defaultList.concat(otherList);
                  if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
                }
              }
            }
          }
          else{
            i+=1;
            if(i==coverList.length){
              let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
              let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
              veh.CoverList = defaultList.concat(otherList);
              if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
              
            }
          }
          
        }
        j+=1;
        if(j==this.vehicleDetailsList.length){
          if(this.endorsementId==846){
              let vehicles = this.vehicleDetailsList.filter(ele=>ele.Status=='D');
              console.log("Entered Veh 1",vehicles)
              if(vehicles.length!=0){
                let n=0;
                  for(let veh of vehicles){
                    let SectionEntry:any[]=[];
                    SectionEntry = this.vehicleDetailsList.filter(ele=>ele.Status=='E' && ele.SectionId==veh.SectionId);
                    let coverList:any[]=veh.CoverList;
                    let j = 0;
                    for(let cover of coverList){
                      if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
                        (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='Y')) ){
                          cover['selected']= false;
                          this.onSelectCover(cover,false,veh.Vehicleid,veh,'coverList','change');
                          cover['DifferenceYN'] = 'N';
                          if(SectionEntry.length!=0){
                            let coverList = SectionEntry[0]?.CoverList;
                            let covers = coverList.filter(ele=>ele.CoverId==cover.CoverId);
                            
                            if(!(covers[0].UserOpt=='Y' || covers[0].isSelected=='D' || covers[0].isSelected=='O')){
                              console.log("Opted Sections",SectionEntry[0],covers)
                              covers[0]['selected']= true;
                              this.onSelectCover(covers[0],true,SectionEntry[0].Vehicleid,SectionEntry[0],'coverList','change');
                               covers[0]['DifferenceYN'] = 'Y';
                            }
                          }
                          
                        }
                      
                      j+=1;
                      if(j==coverList.length) n+=1;
                    }
                    
                    if(n==vehicles.length){
                      if(this.quoteNo!="null" && this.quoteNo!=null){
                      }
                       if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                        this.getEditQuoteDetails();
                      }
                      else{
                        
                      }
                    }
                  }
              }
              else{
                if(this.quoteNo!="null" && this.quoteNo!=null){
                  //this.getEditQuoteDetails();
                }
                 if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
                  //this.updateComponent.quoteNo = this.quoteNo;
                  this.getEditQuoteDetails();
                }
                else{
                  
                }
              }
          }
          else{
            if(this.quoteNo!="null" && this.quoteNo!=null){
              //this.getEditQuoteDetails();
            }
             if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
              //this.updateComponent.quoteNo = this.quoteNo;
              this.getEditQuoteDetails();
            }
            else{
              
            }
          }
          
          //this.onGetCoverListById();
        }
      }


    }
  }
  getCoverName(rowData){
      console.log("Cocver",rowData,this.vehicleDetailsList)
      return rowData.CoverName;
  }
  getMenuDetails(rowData){
    console.log("Cocver 2",rowData,this.vehicleDetailsList)
      return rowData.Vehicleid;
  }
  checkCoverSelection(vehicleData,coverData){
    if(this.finalizeYN=='Y') return true;
    else if(this.endorsementSection && !this.adminSection && this.statusValue!='RA'){
      if(this.endorseCovers){
        if(!this.adminSection && coverData.ModifiedYN =='N') return false;
        else if(!this.adminSection) return true;
        else return false;
      }
      else if(this.endorseSIModification){
        // console.log("Admin Section",this.adminSection,coverData.ModifiedYN)
        if(!this.adminSection && coverData.ModifiedYN =='Y') return false;
        else if(!this.adminSection) return true;
        else return false;
      }
      else if(vehicleData.EndorsementYN=='Y') return false;
      else if(this.endorseAddOnCovers && coverData.ModifiedYN =='Y'){
          return false;
      }
      else if(this.enableAddVehicle){
        if(vehicleData.EndorsementYn=='Y')return false;
        else return true;
      }
      else if(this.endorseAddOnCovers && this.adminSection )return false;
      else return true;  
    }
    else if(!this.adminSection && this.statusValue=='RA' && (((coverData.isSelected=='D' || coverData.isSelected=='O' || coverData.isSelected=='Y' || coverData?.UserOpt=='Y') && !this.endorsementSection) || 
    (this.endorsementSection && (coverData.UserOpt=='Y' || coverData.isSelected=='D' || coverData.isSelected=='O')))) return true;
    else return false;
  }
  onChangeSubCover(subCover,cover,vehicle,event,element){
    
    if(subCover==undefined || subCover==null){
      if(element){
        subCover = cover.SubCovers.find(ele=>ele.SubCoverId==element.value)
      }
    }
    console.log("SubCover Data",subCover,event);
    if(subCover.MultiSelectYn=='Y'){
        if(event){
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
            if(entry.length==0){
              let element = {
                  "Covers": [
                    {
                      "CoverId": cover.CoverId,
                      "SubCoverId": subCover.SubCoverId,
                      "SubCoverYn": "Y",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicle.VehicleId,
                  "SectionId": cover.SectionId,

                }
              cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              console.log("Selected Covers",this.selectedCoverList)
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
                console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
             let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
             if(sectionEntry == undefined){
              let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicle.VehicleId,
                "SectionId": cover.SectionId
              }
              cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
                // if(vehicle?.totalPremium){
                //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
                //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
                // }
                // else{
                //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                // }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
             }
             else{
               console.log("Sections",sectionEntry)
              let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
              if(findCover.length==0) {
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId":subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.selected = true;
                for(let sub of cover.SubCovers){
                  if(sub.SubCoverId==subCover.SubCoverId){
                    cover['isReferal'] = sub.isReferal;
                    cover['SumInsured'] = sub.SumInsured;
                    cover['Loadings'] = sub.Loadings;
                    cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                    cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                    cover['Discounts'] = sub?.Discounts;
                    cover['CalcType'] = sub?.CalcType;
                    cover['Rate'] = sub?.Rate;
                    cover['ExcessPercent'] = sub?.ExcessPercent;
                    cover['ExcessAmount'] = sub?.ExcessAmount;
                    cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                    cover['ExchangeRate'] = sub?.ExchangeRate;
                    cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                    cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                    cover['Taxes'] = sub.Taxes;
                    sub['selected'] = true;
                  }
                  else{
                    sub['selected'] = false;
                  }
                }
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if(vehicle?.totalPremium){
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                  }
                
                }
                else{
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
              }
              else{
                console.log("Finded Covers",findCover,sectionEntry)
                let subCoverEntry = findCover.filter(ele=>ele.SubCoverId==subCover.SubCoverId);
                if(subCoverEntry.length==0){
                  let newEntry = {
                    "CoverId": cover.CoverId,
                    "SubCoverId":subCover.SubCoverId,
                    "SubCoverYn": "Y"
                    //"isReferal": rowData.isReferal
                  }
                  cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                  cover.selected = true;
                  for(let sub of cover.SubCovers){
                    if(sub.SubCoverId==subCover.SubCoverId){
                      cover['isReferal'] = sub.isReferal;
                      cover['SumInsured'] = sub.SumInsured;
                      cover['Loadings'] = sub.Loadings;
                      cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                      cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                      cover['Discounts'] = sub?.Discounts;
                      cover['CalcType'] = sub?.CalcType;
                      cover['Rate'] = sub?.Rate;
                      cover['ExcessPercent'] = sub?.ExcessPercent;
                      cover['ExcessAmount'] = sub?.ExcessAmount;
                      cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                      cover['ExchangeRate'] = sub?.ExchangeRate;
                      cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                      cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                      cover['Taxes'] = sub.Taxes;
                      sub['selected'] = true;
                    }
                    else{
                      sub['selected'] = false;
                    }
                  }
                  subCover['selected'] = true;
                  sectionEntry.Covers.push(newEntry);
                  if(vehicle?.totalPremium){
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                    }
                  
                  }
                  else{
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                    }
                    
                  }
                  console.log("Total Premium",cover,vehicle)
                  this.getTotalVehiclesCost();
                }
                
              }
             }
            }
          }
          else{
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
              
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            this.getTotalVehiclesCost();
          }
        }
        else{
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
            console.log("Entry List",entry);
            let sectionEntry = entry.find(ele=>ele.SectionId==cover.SectionId);
            sectionEntry.Covers = sectionEntry.Covers.filter(ele=>ele.SubCoverId!=subCover.SubCoverId )
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
            subCover['selected'] = false;
            
            cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC-subCover.PremiumIncludedTaxFC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
            if(vehicle?.totalPremium==null || vehicle?.totalPremium==undefined){ vehicle['totalLcPremium']=0;vehicle['totalPremium']=0 }
            if(vehicle?.totalPremium){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']-subCover.PremiumIncludedTax;
              if(findCover.length==0){cover['selected'] = false;  vehicle['totalPremium'] =  vehicle['totalPremium']-cover.PremiumIncludedTax; vehicle['totalLcPremium'] =  vehicle['totalLcPremium']-cover.PremiumIncludedTaxFC;}
            }
            else{
              if(findCover.length!=0){
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
        }
    }
    else{
      
      if(this.selectedCoverList.length!=0){
        let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId && ele.SectionId==vehicle.SectionId);
        
        if(entry.length==0){
          let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId,

            }
            if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTaxFC=0;
            }
            cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          // cover.PremiumIncludedTaxFC = cover.PremiumIncludedTaxFC+subCover.PremiumIncludedTaxFC;
          // cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
          cover['selected'] = true;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          console.log("Selected Covers",this.selectedCoverList)
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
          }
          // if(vehicle?.totalPremium){
          //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
          //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
          // }
          // else{
          //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
          //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
          // }
            console.log("Total Premium",cover,vehicle)
          this.getTotalVehiclesCost();
          //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
        }
        else{
          
         let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
         if(sectionEntry == undefined){
          let element = {
            "Covers": [
              {
                "CoverId": cover.CoverId,
                "SubCoverId": subCover.SubCoverId,
                "SubCoverYn": "Y",
                //"isReferal": rowData.isReferal
              }
            ],
            "Id": vehicle.VehicleId,
            "SectionId": cover.SectionId
          }
          if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
            cover.PremiumIncludedTax = 0;
            cover.PremiumIncludedTaxFC=0;
          }
          cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
          cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
          cover.selected = true;
          cover.SubCoverId = subCover.SubCoverId;
          for(let sub of cover.SubCovers){
            if(sub.SubCoverId==subCover.SubCoverId){
              cover['isReferal'] = sub.isReferal;
              cover['SumInsured'] = sub.SumInsured;
              cover['Loadings'] = sub.Loadings;
              cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
              cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
              cover['Discounts'] = sub?.Discounts;
              cover['CalcType'] = sub?.CalcType;
              cover['Rate'] = sub?.Rate;
              cover['ExcessPercent'] = sub?.ExcessPercent;
              cover['ExcessAmount'] = sub?.ExcessAmount;
              cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
              cover['ExchangeRate'] = sub?.ExchangeRate;
              cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
              cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
              cover['Taxes'] = sub.Taxes;
              sub['selected'] = true;
            }
            else{
              sub['selected'] = false;
            }
          }
          subCover['selected'] = true;
          this.selectedCoverList.push(element);
          if(vehicle?.totalPremium){
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
            }
          
          }
          else{
            if(cover.Endorsements!=null){
              vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
              vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
            }
            else{
              vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            }
            
          }
            // if(vehicle?.totalPremium){
            //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxFC;
            //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
            // }
            // else{
            //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
            //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
            // }
            this.getTotalVehiclesCost();
         }
         else{
          let covers:any[] = sectionEntry.Covers;
          let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
          if(findCover.length==0) {
            let newEntry = {
              "CoverId": cover.CoverId,
              "SubCoverId":subCover.SubCoverId,
              "SubCoverYn": "Y"
              //"isReferal": rowData.isReferal
            }
            if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
              cover.PremiumIncludedTax = 0;
              cover.PremiumIncludedTaxFC=0;
            }
            cover.SubCoverId = subCover.SubCoverId;
            cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
            cover.selected = true;
            for(let sub of cover.SubCovers){
              if(sub.SubCoverId==subCover.SubCoverId){
                cover['isReferal'] = sub.isReferal;
                cover['SumInsured'] = sub.SumInsured;
                cover['Loadings'] = sub.Loadings;
                cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                cover['Discounts'] = sub?.Discounts;
                cover['CalcType'] = sub?.CalcType;
                cover['Rate'] = sub?.Rate;
                cover['ExcessPercent'] = sub?.ExcessPercent;
                cover['ExcessAmount'] = sub?.ExcessAmount;
                cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                cover['ExchangeRate'] = sub?.ExchangeRate;
                cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                cover['Taxes'] = sub.Taxes;
                sub['selected'] = true;
              }
              else{
                sub['selected'] = false;
              }
            }
            subCover['selected'] = true;
            sectionEntry.Covers.push(newEntry);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
            
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            console.log("Total Premium",cover,vehicle)
            this.getTotalVehiclesCost();
          }
          else{
            console.log("Finded Covers",findCover,sectionEntry)
              let newEntry = {
                "CoverId": cover.CoverId,
                "SubCoverId":subCover.SubCoverId,
                "SubCoverYn": "Y"
                //"isReferal": rowData.isReferal
              }
              console.log("Covers Included",cover);
              if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
               vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
                cover.PremiumIncludedTax = 0;
                cover.PremiumIncludedTaxFC=0;
              }
              cover.SubCoverId = subCover.SubCoverId;
              cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = subCover.PremiumIncludedTax;
              cover.selected = true;
              for(let sub of cover.SubCovers){
                if(sub.SubCoverId==subCover.SubCoverId){
                  cover['isReferal'] = sub.isReferal;
                  cover['SumInsured'] = sub.SumInsured;
                  cover['Loadings'] = sub.Loadings;
                  cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
                  cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
                  cover['Discounts'] = sub?.Discounts;
                  cover['CalcType'] = sub?.CalcType;
                  cover['Rate'] = sub?.Rate;
                  cover['ExcessPercent'] = sub?.ExcessPercent;
                  cover['ExcessAmount'] = sub?.ExcessAmount;
                  cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
                  cover['ExchangeRate'] = sub?.ExchangeRate;
                  cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
                  cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
                  cover['Taxes'] = sub.Taxes;
                  sub['selected'] = true;
                }
                else{
                  sub['selected'] = false;
                }
              }
              subCover['selected'] = true;
              
              let subIndex = sectionEntry.Covers.findIndex(ele=>ele.CoverId==cover.CoverId);
              sectionEntry.Covers[subIndex] = newEntry;
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
            
            
          }
         }
        }
      }
      else{
        
        let element = {
          "Covers": [
            {
              "CoverId": cover.CoverId,
              "SubCoverId": subCover.SubCoverId,
              "SubCoverYn": "Y",
              //"isReferal": rowData.isReferal
            }
          ],
          "Id": vehicle.VehicleId,
          "SectionId": cover.SectionId
        }
        if((cover.PremiumIncludedTaxFC!=null && cover.PremiumIncludedTaxFC!='0' && cover.PremiumIncludedTaxFC!=undefined)){
              
          vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - cover.PremiumIncludedTaxFC;
          vehicle['totalPremium'] =  vehicle['totalPremium'] - cover.PremiumIncludedTax; 
          cover.PremiumIncludedTax = 0;
          cover.PremiumIncludedTaxFC=0;
        }
        cover.PremiumIncludedTaxFC = subCover.PremiumIncludedTaxLC;
        cover.PremiumIncludedTax = subCover.PremiumIncludedTax;

        cover.selected = true;
        for(let sub of cover.SubCovers){
          if(sub.SubCoverId==subCover.SubCoverId){
            cover['isReferal'] = sub.isReferal;
            cover['SumInsured'] = sub.SumInsured;
            cover['Loadings'] = sub.Loadings;
            cover['PremiumAfterDiscount'] = sub.PremiumAfterDiscount;
            cover['MinimumPremiumYn'] = sub?.MinimumPremiumYn;
            cover['Discounts'] = sub?.Discounts;
            cover['CalcType'] = sub?.CalcType;
            cover['Rate'] = sub?.Rate;
            cover['ExcessPercent'] = sub?.ExcessPercent;
            cover['ExcessAmount'] = sub?.ExcessAmount;
            cover['PremiumBeforeDiscount'] = sub.PremiumBeforeDiscount;
            cover['ExchangeRate'] = sub?.ExchangeRate;
            cover['PremiumExcluedTax'] = sub?.PremiumExcluedTax;
            cover['PremiumIncludedTax'] = sub?.PremiumIncludedTax;
            cover['Taxes'] = sub.Taxes;
            sub['selected'] = true;
          }
          else{
            sub['selected'] = false;
          }
        }
        subCover['selected'] = true;
        this.selectedCoverList.push(element);
        if(vehicle?.totalPremium){
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
            vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
          }
          
        }
        else{
          if(cover.Endorsements!=null){
            vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxFC;
            vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
          }
          else{
            vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxFC;
            vehicle['totalPremium'] =  cover.PremiumIncludedTax;
          }
          
        }
        this.getTotalVehiclesCost();
      }
    }
    console.log("Total Vehicle",this.selectedCoverList)
  }
  getTotalCost(rowData){
    //console.log('rowData entry',rowData);
    if(rowData?.totalPremium) return rowData?.totalPremium;
    else return 0;

  }
  getTotalVehiclesCost(){
    let totalCost = 0,i=0,totalLocalCost=0;
    
    for(let veh of this.vehicleDetailsList){
      
      if(veh?.totalPremium) totalCost = totalCost+veh?.totalPremium;console.log('Total1 premium',veh,totalCost,veh?.totalPremium);
      if(veh?.totalLcPremium) totalLocalCost = totalLocalCost+veh?.totalLcPremium; console.log('Total2 premium',veh,totalLocalCost,veh?.totalLcPremium);
      i+=1;
      if(i==this.vehicleDetailsList.length){
          this.localPremiumCost = totalLocalCost;
          this.totalPremium = totalCost;
          if(this.vehicleData[0].EmiYn!=null && this.vehicleData[0].EmiYn!=undefined && this.vehicleData[0].EmiYn!=''){
          this.emiYN = this.vehicleData[0].EmiYn;
          this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
          if(!this.endorsementSection && this.emiYN=='Y'){
            this.EmiInstallment();
          }
        }
        else if(!this.endorsementSection) {
          this.emiYN = "N";
          this.EmiInstallment();
        }
    }
    console.log("Total Premium",this.vehicleDetailsList)
    console.log("Final Cost Of Vehicle",this.vehicleDetailsList)
      console.log('TTTTTTTT',this.totalPremium);
    }
  }
  EmiInstallment(){
    if(this.localCurrency==undefined) this.localCurrency = 'TZS'
    let ReqObj = {
    "PremiumWithTax":this.totalPremium,
     "InsuranceId":this.insuranceId,
     "ProductId":this.productId,
     "Currency": this.localCurrency,
     "PolicyType":this.emipolicytype
    }
    let urlLink = `${this.CommonApiUrl}api/viewemi`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            //let emiList = data.Result;
            let emiList=[];
            emiList = data.Result;
            let EmiYnShow =data.Result[0].EmiYn;
            if(EmiYnShow=='Y')
            {
              this.gridshow=true;
              if(emiList.length!=0){

                let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[],fiveList=[],eightList=[];
                for(let entry of emiList){
                    let emiDetails = entry.EmiPremium;
                    if(emiDetails.length==13){
                      this.yearlySection = true;
                      yearlyList = entry.EmiPremium;
                    }
                    else if(emiDetails.length==10){
                      nineList = entry.EmiPremium;
                      this.nineMonthSection = true;
                    }
                    else if(emiDetails.length==7){
                      sixList = entry.EmiPremium;
                      this.sixMonthSection = true;
                    }
                    else if(emiDetails.length==4){
                      threeList = entry.EmiPremium;
                      this.threeMonthSection = true;
                    }
                    else if(emiDetails.length==6){
                      fiveList = entry.EmiPremium;
                      this.fiveMonthSection = true;
                    }
                    else if(emiDetails.length==9){
                      eightList = entry.EmiPremium;
                      this.eightMonthSection = true;
                    }
                    i+=1;
                    if(i==emiList.length){
                        this.setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList);
                    }
                }
                console.log('tttt',this.totalPremium);
              }
              else{
                this.emiYN='N';
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   'EMI Option',
                //   'No EMI Plan Available',
                //   config);
               }
            }
            else{
              this.gridshow = false;
            }

            //this.getBorrowerList();
        }
      },
      (err) => { },
    );
  }
  onEMIChange(){
    if(this.emiPeriod!='N'){
      console.log("Entered Level",this.emiPeriod,this.EmiDetails)
      if(this.EmiDetails==null || this.EmiDetails==undefined || this.EmiDetails.length==0){
      }
    }
  }
  onEmiYNChange(){
    if(this.emiYN == 'Y') this.EmiInstallment();
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
         if(threeList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
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
       if(threeList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
       else{data['fiveAmount']=null}
       if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
       else{data['eightAmount']=null}
       this.Emilist1.push(entry);
       i+=1;
       if(i==eightList.length){this.emiSection=true}
  }
  }
  }
  canbeChecked(rowData){
    if(rowData?.selected!=undefined){
      return rowData.selected;
    }
    return false;
  }
  canbeChecked2(rowData){
    if(rowData?.selected!=undefined && rowData.CoverageType!='A' && rowData.PremiumIncludedTaxLC!=null && rowData.PremiumIncludedTaxLC!=0){
      return rowData.selected;
    }
    return false;
  }
  canbeChecked3(vehicle){
    let coverList = vehicle.CoverList;
    let i =0;
    let entry = coverList.some(ele=>ele.PremiumIncludedTaxLC!=0 && ele.PremiumIncludedTaxLC!=null);
    console.log('Entry',entry)
    return entry;
  }
  onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){
    console.log("Cover Selected received",event)
    if(event==null){
      event = !this.canbeChecked(rowData);
    }
    //if(type=='coverList' && (rowData.SubCovers==null || (rowData.SubCovers!=null && rowData.SubCoverId!=null))){
      let vehicle:any;
        if(this.productId!='4' && this.productId!='5' && this.productId!='46' && this.productId!='29'){
          vehicle = this.vehicleDetailsList.find(ele=>(ele.Vehicleid==vehicleId || ele.VehicleId==vehicleId) && (ele.SectionId==rowData.SectionId));
        }
        else{
          vehicle = this.vehicleDetailsList.find(ele=>ele.Vehicleid==vehicleId && ele.SectionId==rowData.SectionId);
          console.log('Vechiles2',vehicle)
        }
        
        let coverList = vehicle?.CoverList;
        if(event){
         
          rowData.selected= true;
          console.log("Final Row",rowData)
          if(rowData.DifferenceYN==undefined && this.coverModificationYN=='Y'){
            if(vehicle.Status=='D') rowData.DifferenceYN = 'N';
            else rowData.DifferenceYN = 'Y'
          }
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
            if(entry.length==0){
              
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
              }
              
              
              if(directType=='change' && this.endorsementSection){
                console.log('Endorsemet section Values')
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN=='Y'){
                    if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  //rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC = 0;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
              }
              else if(vehicle?.totalPremium){
                console.log('Endorsemet section Values 2')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                console.log('Endorsemet section Values3')
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                 
                  if(this.coverModificationYN!='Y' || this.endorseSIModification || vehicle.Status=='D'){
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0;}
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    
                  }
                }
                else{
                 
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
                
              }
                console.log("Total Premium",rowData,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
              console.log('Endorsemet section Values4');
             let sectionEntry = entry.find(ele=>ele.SectionId == rowData.SectionId);
            
             if(sectionEntry == undefined){
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'Y';
                }
                console.log("Selected Cover Lists",this.selectedCoverList)
              }
              
              if(directType=='change' && this.endorsementSection){
                
                if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
                  rowData['ModifiedYN'] = 'Y';
                }
                
                if(this.coverModificationYN=='Y' && this.endorsementSection && vehicle?.totalPremium && rowData.Endorsements!=null){
                  if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else if(vehicle?.totalPremium){
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
  
  
                  }
                  else{
                    
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  rowData['Modifiable']='N';
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                }
                
              }
              else if(vehicle?.totalPremium){
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }


                }
                else{
                  
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                rowData['Modifiable']='N';
                if(this.endorseAddOnCovers || this.endorseCovers){
                  rowData['ModifiedYN'] = 'N';
                }
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  if(this.coverModificationYN!='Y' || this.endorseSIModification){
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                }
                else{
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
              }
                this.getTotalVehiclesCost();
             }
             else{
                let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==rowData.CoverId);
              if(findCover.length==0) {
                if(rowData.SubCovers==null){
                  let element = {
                        "CoverId": rowData.CoverId,
                         "SubCoverId": null,
                         "SubCoverYn": "N",
                  }
                  // let element = {
                  //   "Covers": [
                  //     {
                  //       "CoverId": rowData.CoverId,
                  //       "SubCoverId": null,
                  //       "SubCoverYn": "N",
                  //       //"isReferal": rowData.isReferal
                  //     }
                  //   ],
                  //   "Id": vehicleId,
                  //   "SectionId": rowData.SectionId,
  
                  // }
                  // this.selectedCoverList.push(element);
                  sectionEntry.Covers.push(element)
                  console.log("Selected Coverlistss",this.selectedCoverList);
                  
                }
                
                if(directType=='change' && this.endorsementSection){
                  console.log('If cover changes1');
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      console.log('If cover changes4');
                      if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      else{
                        console.log('If cover changes5');
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    console.log('JJJJJJJJJ',vehicle?.totalLcPremium,vehicle?.totalPremium);
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium'] = 0; }
                    console.log('If cover changes10',rowData,rowData.PremiumIncludedTaxFC,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      console.log('Total Premiums 111111111',vehicle?.totalPremium,rowData.PremiumIncludedTax);
                      vehicle['totalPremium'] =  vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                      console.log('end', vehicle);
                  }
                }
                else if(vehicle?.totalPremium){
                  console.log('If cover changes2');
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                    console.log('If cover changes0',rowData.PremiumIncludedTaxFC,rowData.PremiumIncludedTax);
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  console.log('If cover changes3');
                  if(this.endorseAddOnCovers || this.endorseCovers){
                    rowData['ModifiedYN'] = 'N';
                  }
                  if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN!='Y' || this.endorseSIModification){
                      
                      if(!vehicle?.totalLcPremium){ vehicle['totalLcPremium'] = 0;}
                      if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                    if(!vehicle?.totalPremium){ vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",rowData,vehicle)
                this.getTotalVehiclesCost();
              }
             }
            }
          }
          else{
            
            if(rowData.SubCovers==null){
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicleId,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
              console.log("Selected Cover",this.selectedCoverList)
            }
          
          if(directType=='change' && this.endorsementSection){
            console.log('Endorsement section1')
            if((this.endorseAddOnCovers || this.endorseCovers) && (rowData.Modifiable==undefined || rowData.Modifiable!='N')){
              rowData['ModifiedYN'] = 'Y';
            }
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              if(this.coverModificationYN=='Y'){
                if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
            
          }
          else if(vehicle?.totalPremium){
            console.log('Endorsement section2')
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              
              if(this.coverModificationYN!='Y' || this.endorseSIModification){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
            }
            else{
              
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxFC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
          
          }
          else{
            console.log('Endorsement section3')
            if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
              
              if(this.coverModificationYN!='Y' || this.endorseSIModification){
                vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                
              }
            }
            else{
              vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxFC;
              vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
            }
            
          }
          // vehicle['totalLcPremium'] = rowData.PremiumIncludedTaxFC;
          // vehicle['totalPremium'] = rowData.PremiumIncludedTax;
          console.log("Premium Total ",vehicle,this.selectedCoverList)
          this.getTotalVehiclesCost();
            // this.selectedCoverList.push(rowData);
            // this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
        }
        else{
          console.log("Received RowData",rowData)
          rowData['selected']= false;
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
          if(entry){
            let sectionEntry = entry.find(ele=>ele.SectionId==rowData.SectionId);
            if(sectionEntry!=undefined){
              let covers:any[] = sectionEntry.Covers;
              let CoverIndex = covers.findIndex(ele=>ele.CoverId==rowData.CoverId);
              covers.splice(CoverIndex,1);
              if(this.coverModificationYN=='Y') {rowData['DifferenceYN'] = 'N';}
              if(directType=='change' && this.endorsementSection){
                if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;}
                if(!vehicle?.totalPremium) { vehicle['totalPremium'] = 0 ;}
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                    if(this.coverModificationYN=='Y'){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    console.log('Minus premiums1',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
                    vehicle['totalPremium'] =  vehicle['totalPremium'] - rowData.PremiumIncludedTax;
                  }
                
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null && rowData.Endorsements!=undefined){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  console.log('Minus premiums2',vehicle,vehicle?.totalPremium,rowData.PremiumIncludedTax)
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                }
              
              }
              if(rowData.SubCovers){
                rowData.SubCoverId=null;
                for(let sub of rowData.SubCovers){
                  sub['selected'] = false;
                }
              }
              // vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
              // vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxFC;
              this.getTotalVehiclesCost();
            }

          }
          // else if(this.endorsementId==846){
          //   let covers:any[] = rowData.Covers;
          //   console.log("Coverssssssssss",covers)
          // }
        }

    //}
    // else if(directType=='change'){
    //     if(event){
    //       if(rowData.SubCovers){
    //         if(rowData.SubCoverId==null){
    //             rowData['Entry']=null;
    //             rowData['Entry']='None';
    //             rowData['ActiveIndex']= 0;
    //         }
    //       }
    //     }
    // }
    //this.onEmiYNChange();
    console.log("Final Covers",this.vehicleDetailsList,this.selectedCoverList)
  }
  ClausesStatuss(){
    let common:any;
    console.log('this',this.vehicleDetailsList);
    console.log('TTTTTTT',this.vehicleDetailsList);
    this.showCoverList=false;
   // this.ClausesSection=true;
    this.onClauses = true;
    this.onWarranty=false;
    this.onExclusion = false;
    this.newAddClauses=false;
    this.newAddExclusion=false;
    this.newAddWarranty=false;
  }
  ExclusioStatuss(){
    this.onExclusion = true;
    this.onWarranty=false;
    this.onClauses = false;
    this.viewCondition('1'); 
    this.newAddClauses=false;
    this.newAddExclusion=false;
    this.newAddWarranty=false;
  }
  WarrantyStatuss(){
     this.onWarranty=true;
     this.onClauses = false;
     this.onExclusion = false;
     this.newAddClauses=false;
     this.newAddExclusion=false;
     this.newAddWarranty=false;
     let common
     this.viewCondition('1');
  }
  OnClose(){
    this.onExclusion = false;
    this.onWarranty=false;
    this.onClauses = false;
    this.clause = false;
  }
  onAddClause(){
this.newAddClauses=true;
  }
  onAddExclusion(){
    this.newAddExclusion =true;
  }
  onAddWarranty(){
    this.newAddWarranty = true;
  }
  editClauses(id){
  }
  saveClausesData(rawData,type){
    let clauses
     

    console.log('QQQQQ',this.quoteNo,rawData);
        let quote
    if(this.quoteNo){
      quote=this.quoteNo;
    }
    else{
      quote="";
    }
    let i=0;
    let passData:any[]=[];
    let id:any;
    // if(type){
    //   if(type=='Clauses'){
    //   id="6";
    //   }
    //   else if(type=='Exclusion'){
    //  id="7";
    //   }
    //   else if(type=='Warranty'){
    //     id="4";
    //   }      
    //   }
    for( let f of rawData){
       if(f.TypeId != 'D'){
        console.log('KKKKKKKKK',f.TypeId);
        rawData[i].TypeId='O';
       }
       i+=1;
    }

    //console.log('SSSSSSSSSSSS',this.tempData)
    //console.log('aaaaaaaaaaaaaa',this.jsonList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId:'1',
      SectionId:'99999',
      TermsAndConditionReq:rawData,
      RequestReferenceNo: this.requestReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        
        this.onExclusion = false;
        this.onWarranty=false;
        this.onClauses = false;
        this.clause = false;
        
   if(type){
    if(type=='Clauses'){
      this.viewCondition('direct');
      this.showCoverList=true;
    }
    else if(type=='Exclusion'){
      this.viewCondition('direct');
    this.onExclusion = true;
    }
    else if(type=='Warranty'){
      this.viewCondition('direct');
      this.onWarranty = true;
      }
      else{
      }
    }
      }
      
    });
  }
  setDiscountDetails(vehData,rowData,modal){
    this.selectedVehId = vehData.VehicleId;
    this.selectedCoverId = rowData.CoverId;
    this.ratePercent = rowData.Rate;
    this.CoverName = rowData.CoverName;
    this.minimumPremiumYN = rowData.MinimumPremiumYn;
    if(rowData.Discounts) this.discountList = rowData.Discounts;
    if(rowData.Loadings) this.loadingList = rowData.Loadings;
    if(rowData.Endorsements){
        this.discountEndtSection = true;
        this.sumInsured = rowData.SumInsured;
        //this.sumInsured = rowData.Endorsements[rowData.Endorsements.length-1].EndorsementSumInsured;
        this.calcType = rowData.Endorsements[rowData.Endorsements.length-1].EndorsementCalcType;
        this.excessPercent = rowData.Endorsements[rowData.Endorsements.length-1].ExcessPercent;
        this.ratePercent = rowData.Endorsements[rowData.Endorsements.length-1].EndorsementRate;
        this.excessAmount = rowData.Endorsements[rowData.Endorsements.length-1].ExcessAmount;
        this.differenceSI = rowData.Endorsements[rowData.Endorsements.length-1].EndorsementSumInsured;
        this.differencePremium = rowData.Endorsements[rowData.Endorsements.length-1].PremiumAfterDiscount
        this.beforeDiscount = rowData.Endorsements[rowData.Endorsements.length-1].PremiumBeforeDiscount;
        this.selectedSectionId = vehData.SectionId;
    }
    else{
      this.discountEndtSection = false;
      this.sumInsured = rowData.SumInsured;
      this.calcType = rowData.CalcType;
      this.selectedSectionId = vehData.SectionId;
      this.ratePercent = rowData.Rate;
      this.excessPercent = rowData.ExcessPercent;
      this.excessAmount = rowData.ExcessAmount;
      this.beforeDiscount = rowData.PremiumBeforeDiscount;
      this.afterDiscount = rowData.PremiumAfterDiscount;
    }
    this.excessDetailModal=true;this.discountDetailModal=false;
    // if(modal=='excess'){this.excessDetailModal=true;this.discountDetailModal=false;}
    // else{this.excessDetailModal=false;this.discountDetailModal=true;}
    //this.discountOpen(modal);
  }
  ongetTaxDetails(rowData){
    console.log("Tax Details",rowData);
    this.MinimumPremium = (rowData.MinimumPremium/rowData.ExchangeRate);
    this.premiumExcluedTax = rowData.PremiumExcluedTax;
    this.premiumIncluedTax = rowData.PremiumIncludedTax;
    this.dependantTaxList = [];this.taxList =[];
    this.premiumBeforeTax = 0;
    this.proRataPercent = rowData.ProRata;
    this.premiumAfterDiscount = rowData.PremiumAfterDiscount;
    if(rowData.Taxes){
      if(rowData.Taxes.length!=0){
        this.dependantTaxList = rowData.Taxes.filter(ele=>ele.DependentYN=='N');
        if(this.dependantTaxList.length!=0){
          let i=0;
          for(let tax of this.dependantTaxList){this.premiumBeforeTax = this.premiumBeforeTax+tax.TaxAmount;i+=1;
              if(i==this.dependantTaxList.length) this.premiumBeforeTax = this.premiumBeforeTax + this.premiumExcluedTax;
          }
        }
        this.taxList = rowData.Taxes.filter(ele=>ele.DependentYN!='N');
      }
     
    }
    this.discountDetailModal = true;this.excessDetailModal=false;
  }
  getEditQuoteDetails(){
    let i=0;
    for(let veh of this.vehicleDetailsList){
      if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId
        if(i ==0 ){ //this.remarks = veh.AdminRemarks;
           this.rejectedReason = veh.RejectReason}
        let covers = veh.CoverList;
        let j=0;
        for(let cover of covers){
          
            let entry = this.vehicleDetailsList.find(ele=>String(ele.Vehicleid)==String(veh.VehicleId))
            if(entry){
              let coverList = entry.CoverList;
              if(cover.UserOpt=='Y' ){
                let coverEntry = coverList.find(ele=>ele.CoverId == cover.CoverId)
                if(coverEntry){
                  if(this.endorsementId == 846 && veh.Status=='D'){
                    cover['selected']= false;
                   // this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                  }
                  else{
                    cover['selected']= true;
                    this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
                  }
                  console.log("Selected 2",cover);
                }
              }
              else if(this.endorseAddOnCovers || this.endorseCovers || this.endorseSIModification){
                if(cover.ModifiedYN==undefined){
                  cover['Modifiable']='N';
                  cover['ModifiedYN'] = 'Y';
                }
                
              }
            }
            j+=1;
            if(j==covers.length) i+=1;
        }

        if(i==this.vehicleDetailsList.length){
          this.showSection = true;
          if(this.vehicleDetailsList.some(ele=>ele.ManualReferalYn=='Y') && !this.adminSection && this.statusValue){
            this.isMannualReferal = "N";
          }
          this.selectedRowData = this.vehicleDetailsList[0];
          this.onSelectSection();
          this.coverSection = true;
          // if(((this.uwReferralSection && !this.adminSection && (this.statusValue=='RP' || this.statusValue=='' || this.statusValue==null || this.statusValue==undefined))  || (!this.adminSection && this.statusValue=='RP' && this.vehicleDetailsList.some(ele=>ele.Status=='RP')))){
          //   this.columnHeader = [
          //     {
          //       key: 'selected',
          //       display: 'Select',
          //       config: {
          //         isChecked:true
          //       },
          //     },
          //     { key: 'CoverName', display: 'Cover Name' },
          //     { key: 'SumInsured', display: 'Sum Insured' }
      
          //   ]
          // }
          // else{
      
           
          //}
          // if(!this.endorsementSection){
          //   this.EmiInstallment();
          // }
          
          console.log("Final Vehicle Listaaaa",this.vehicleDetailsList,this.selectedCoverList)
        }
    }

  }
  checkNextBtn(rowData,index){
    console.log(index,this.vehicleDetailsList.length-1)
    return index==this.vehicleDetailsList.length-1;
  }
  onFormSubmit(index){
    console.log("Selected Covers",this.selectedCoverList);
    this.subuserType = sessionStorage.getItem('typeValue');
    if(index!=null && index!=undefined && index!='') this.tabIndex = index;
    if(this.selectedCoverList.length!=0){
      let coverList:any[]=[];
      let loginType = this.userDetails.Result.LoginType;
      let i=0;
      if(loginType){
        if(loginType=='B2CFlow' && this.sampleloginId =='guest'){
          this.customerReferenceNo = null;
          let customerObj = JSON.parse(sessionStorage.getItem('b2cCustomerObj'));
            this.customerObj = this.customerDetails
						this.customerReferenceNo = sessionStorage.getItem('customerReferenceNo');
						this.generateOtp();
          //this.onCustomerSave(customerObj);
        }
        else this.onProceed(this.selectedCoverList);
      }
      else this.onProceed(this.selectedCoverList);

    }
  }
  onProceed(coverList:any){
    if(this.statusValue == 'RA' && !this.adminSection){
      if(this.productId!='4'){
        console.log('Referral Approved',coverList);
         if(this.productId=='59' || this.productId=='19' || this.productId=='39' || this.productId=='32' || this.productId=='14' || this.productId=='1' || this.productId=='6' || this.productId=='16' || this.productId=='42' || this.productId=='43' || this.productId=='25' || this.productId=='60' || this.productId=='57' || this.productId=='56'){
          let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if(homeSession){
            if(this.loginType=='B2CFlow' && this.loginId=='guest'){
              window.location.reload();
            }
            else  this.router.navigate(['quotation/plan/main/accessories']);
          }
          else{
            if(this.productId=='59') this.getExistingBuildingList();
            else  if(this.loginType=='B2CFlow' && this.loginId=='guest'){
              window.location.reload();
            }
            else  this.router.navigate(['quotation/plan/main/accessories']);
          }

        }
        else if(this.productId == '5'){
          let i=0;let coverlist:any=[];
          for(let vehicle of coverList){
            let vehEntry = vehicle.Covers;
            console.log('VVVVVVVVV',vehEntry);
            if(vehEntry.length!=0){
              let entry = vehEntry.filter(ele=>ele.CoverId == '55');
              if(entry.length!=0){
                console.log('RRRRRRR',entry);
                coverlist.push(entry)
              }
            }
            i+=1;
          }           
         if(coverlist.length!=0){
          console.log('if entry of cover id 55',coverlist);
            sessionStorage.setItem('riskSection','additional');
            this.router.navigate(['quotation/plan/main/accessories']);
           }
           else {
            sessionStorage.setItem('riskSection','normal');
            if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
              this.router.navigate(['/quotation/plan/main/driver-info'])
            }
            else this.router.navigate(['/quotation/plan/main/document-info']);
           }
        }
  
        else{
          sessionStorage.setItem('riskSection','normal');
          if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
            this.router.navigate(['/quotation/plan/main/driver-info'])
          }
          else this.router.navigate(['/quotation/plan/main/document-info']);
        }
        //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);

      }
      else if(this.productId == '4'){
        console.log('Referral Approved');
        if(this.loginType=='B2CFlow' && this.loginId=='guest'){
          window.location.reload();
        }
        else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
      }
    
    }
    else{
      if(!this.statusValue && this.isMannualReferal=='Y'){
          if(this.remarks==null || this.remarks=='' || this.remarks == undefined){
            // let type: NbComponentStatus = 'danger';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   'Referral Remarks',
            //   'Please Enter Referral Remarks',
            //   config);
          }
      }
      
      let ReqObj:any ={},createdBy = "";
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if(quoteStatus=='AdminRP'){
            createdBy = this.vehicleDetailsList[0].CreatedBy;
        }
        else{
          createdBy = this.loginId;
        }
      //this.finalFormSubmit(ReqObj);
      if(this.endorsementSection && this.enableRemoveVehicle){
        let entry = this.vehicleDetailsList.filter(ele=>ele.Status=='D');
        if(entry){
          console.log("Entry",entry);
          let i=0,orgCoverList:any[]=[];
          for(let cover of coverList){
            let Exist = entry.some(ele=>ele.VehicleId==cover.Id);
            
            if(!Exist) orgCoverList.push(cover);
            i+=1;
            if(i==coverList.length) {
              ReqObj = {
                "RequestReferenceNo": this.quoteRefNo,
                "CreatedBy": createdBy,
                "ProductId": this.productId,
                "ManualReferralYn": this.isMannualReferal,
                "ReferralRemarks": this.remarks,
                "Vehicles" : orgCoverList
              }
              this.newcoverlist=coverList;
              this.finalFormSubmit(ReqObj);
            } 
          }
        }
      }
      else{
        ReqObj = {
          "RequestReferenceNo": this.quoteRefNo,
          "CreatedBy": createdBy,
          "ProductId": this.productId,
          "ManualReferralYn": this.isMannualReferal,
          "ReferralRemarks": this.remarks,
          "Vehicles" : coverList
        }
        this.newcoverlist=coverList;
        console.log('in else',this.newcoverlist)
        // if(this.subuserType=='B2C' && this.loginId=='guest'){
        //     sessionStorage.setItem('buyPolicyDetails',JSON.stringify(ReqObj));
        //     this.router.navigate(['./Home/existingQuotes/customerSelection/customerDetails/userDetails'])
        // }
        
        // else{
          this.finalFormSubmit(ReqObj);
        //}
        
      }
    }


  }
  updateFinalizeYN(type){
    let ReqObj = {
      "ProductId" : this.productId,
      "InsuranceId" : this.insuranceId,
      "RequestReferenceNo" : this.quoteRefNo,
      "FinalizeYn" : this.finalizeYN
    }
    let urlLink = `${this.CommonApiUrl}quote/changefinalyzestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          sessionStorage.setItem('FinalizeYN',this.finalizeYN);
              if(type=='back'){
                if(this.statusValue){
                  if(this.adminSection){
                      if(this.statusValue=='RA') this.router.navigate(['/Admin/referralApproved']);
                      //else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
                      else if(this.statusValue=='RE') this.router.navigate(['/Admin/referralReQuote']);
                      else this.router.navigate(['/Admin/referralPending']);
                  }
                  else{
                    if(this.statusValue=='RA') this.router.navigate(['/Home/referralApproved']);
                    else if(this.statusValue=='RE') this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
                    else{
                      this.onSetBackPage();
                     
                    } 
                  }
                }
                else{
                  if(this.endorsementSection && this.enableFieldsList.some(ele=>ele=='Covers' || ele=='AddOnCovers' || ele=='RemoveSection') && !this.endorseSIModification){
                    this.router.navigate(['/Home/policies/Endorsements/endorsementTypes']);
                  }
                  else{
                    this.onSetBackPage();
                  }
                }
              }
              else{
                  this.onUpdateFactor('',null);
              }
        }
      },
      (err) => { },
    );
  }
  onViewOverAllPremium(){
    this.discountList = [];this.loadingList=[];
    this.onUpdateFactor('fleetSave',null);
   
    
  }
  onUpdateFleetFactorRate(modal){
    this.fleetCoverDetails.CoverList[0].Discount = this.discountList;
    this.fleetCoverDetails.CoverList[0].Loading = this.loadingList;
    let ReqObj = {
      "VehicleId": "99999",
      "RequestReferenceNo": this.quoteRefNo,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "SectionId": "99999",
      "CoverList": this.fleetCoverDetails.CoverList
    }
    let urlLink = `${this.CommonApiUrl}quote/update/referalstatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.Result){
              this.onFleetProceed();
          }
        },
        (err) => { },
      );
  }
  onSetBackPage(){
    if(this.productId=='5' || this.productId=='29'){
      this.router.navigate(['/quotation/plan/premium-details']);
    }
    else if(this.productId=='4') this.router.navigate(['quotation/plan/premium-details']);
    else this.router.navigate(['quotation/plan/premium-details']);
  }
  onUpdateFactor(type,modal){
    if((this.statusValue!='' && this.statusValue!=null) || (this.endorsementSection && this.endorseCovers) || this.userType=='Issuer' || type=='fleetSave'){
      if(this.statusValue=='RA' || type=='calculate' || this.userType=='Issuer' || type=='fleetSave'){
        if(this.selectedCoverList.length!=0){
          let i=0;
          for(let vehicle of this.vehicleDetailsList){
              let vehEntry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.Vehicleid);
              if(vehEntry.length!=0){
                let entry = vehEntry.filter(ele=>ele.SectionId==vehicle.SectionId);
                if(entry.length!=0){
                  let j=0; let covers = [];
                  for(let veh of entry){
                      let k=0;
                      for(let selectedCover of veh.Covers){
                        let coverList = vehicle.CoverList.filter(ele=>ele.CoverId == selectedCover.CoverId)
                        covers = covers.concat(coverList);
                        k+=1;
                        if(k==veh.Covers.length){
                          j+=1;
                          if(j==entry.length){
                              let ReqObj = {
                                "RequestReferenceNo": this.quoteRefNo,
                                "VehicleId": veh.Id,
                                "SectionId": vehicle.SectionId,
                                "ProductId": this.productId,
                                "AdminLoginId": this.loginId,
                                "InsuranceId": this.insuranceId,
                                "Covers":covers
                              }
                              console.log("Final Req",vehicle,veh,ReqObj)
                              let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
                              this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                                (data: any) => {
                                    if(data.Result){
                                      i+=1;
                                      if(i==this.vehicleDetailsList.length){
                                        if(type=='calculate'){
                                          
                                          // this.getcall();
                                          //sessionStorage.removeItem('vehicleDetailsList');
                                          window.location.reload();
                                        }
                                        else if(type=='altSave'){ console.log("Finally Updated");}
                                        else if(type=='fleetSave') this.getViewPremiumCalc(modal);
                                        else if(this.subuserType=='low') this.onFormSubmit(null);
                                        else this.updateReferralStatus();
                                      }
                                    }
                                  },
                                  (err) => { },
                                );
                          }
                        }
                      }
                  }
                }
                else{
                  i+=1;
                  if(i==this.vehicleDetailsList.length){
                    if(type=='calculate'){
                      //this.getcall();
                      //sessionStorage.removeItem('vehicleDetailsList');
                        window.location.reload();
                    }
                    else this.updateReferralStatus();
                  }
                }
              }
              else{
                i+=1;
                  if(i==this.vehicleDetailsList.length){
                    if(type=='calculate'){
                      //this.getcall();
                      //sessionStorage.removeItem('vehicleDetailsList');
                        window.location.reload();
                    }
                    else this.updateReferralStatus();
                  }
              }
          }
          // for(let veh of this.selectedCoverList){
          //  let entry = this.vehicleDetailsList.find(ele=>ele.Vehicleid==veh.Id);
          //  let ReqObj = {
          //   "RequestReferenceNo": this.quoteRefNo,
          //   "VehicleId": veh.Id,
          //   "SectionId": veh.SectionId,
          //   "ProductId": this.productId,
          //   "InsuranceId": this.insuranceId,
          //   "Covers":[]
          //  }
          //  let j=0;
          //  for(let cover of veh.Covers){
          //    let coverEntry = entry.CoverList.find(ele=>ele.CoverId==cover.CoverId);
          //    coverEntry['SubCoverYn'] = cover.IsSubCover;
          //    ReqObj.Covers.push(coverEntry);
          //    j+=1;
          //    if(j==veh.Covers.length){
          //     console.log("Final Vehicle List",ReqObj)
          //     let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
          //     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          //       (data: any) => {
          //           if(data.Result){
          //             i+=1;
          //             if(i==this.selectedCoverList.length){
          //               if(type=='calculate'){
          //                 //sessionStorage.removeItem('vehicleDetailsList');
          //                 window.location.reload();
          //               }
          //               if(!this.endorsementSection) this.updateReferralStatus();
          //             }
          //           }
          //         },
          //         (err) => { },
          //       );
          //    }
          //  }
          // }
        }
      }
      else{
        this.updateReferralStatus();
      }
    }

  }
  getViewPremiumCalc(modal){
    let ReqObj = {
        "InsuranceId" : this.insuranceId,
        "ProductId" : this.productId,
        "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/view/policycalc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.fleetCoverDetails = data?.Result;
            if(this.fleetCoverDetails){
              if(this.fleetCoverDetails.CoverList){
                let minCover = this.fleetCoverDetails.CoverList.find(ele=>ele.CoverId=='945');
                if(minCover){
                  
                  this.minCoverRatePercent = minCover.Rate;
                  this.minCoverName = minCover.CoverName;
                  this.minimumPremiumYN = minCover.MinimumPremiumYn;
                  this.minBasePremium = minCover?.PremiumBeforeDiscount;
                  this.minPremiumIncludedTax =0;
                  let i=0,taxValue=0,excludedTax = null;
                  for(let cover of this.fleetCoverDetails.CoverList){
                      taxValue = taxValue+cover.PremiumExcluedTax;
                      this.minPremiumIncludedTax = this.minPremiumIncludedTax+cover.PremiumIncludedTax;
                      if(i==0){
                        this.minTaxList = cover.Taxes;
                        i+=1;
                        if(i==this.fleetCoverDetails.CoverList.length){
                          
                          this.fleetDiscountModal = true;
                          this.minPremiumExcludedTax = taxValue;
                          let cover = this.fleetCoverDetails.CoverList.find(ele=>ele.CoverId=='5');
                          if(cover){
                            //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                              this.ratePercent = cover.Rate;
                              this.CoverName = cover.CoverName;
                              this.minimumPremiumYN = cover.MinimumPremiumYn;
                              this.basePremium = cover?.PremiumBeforeDiscount;
                              this.premiumIncludedTax = cover?.PremiumIncludedTax;
                              this.premiumExcludedTax = cover?.PremiumExcluedTax;
                              if(cover.Discounts) this.discountList = cover.Discounts;
                              if(cover.Loadings) this.loadingList = cover.Loadings;
                              if(cover.Taxes) this.taxList = cover.Taxes;
                              
                            // }
                            // else this.onFleetProceed(modal);
                          }
                          else{
                            this.fleetDiscountModal = true;
                          }
                        }
                      }
                      else{
                        let j=0;
                        for(let tax of cover.Taxes){
                            if(tax.TaxAmount) this.minTaxList[j].TaxAmount = this.minTaxList[j].TaxAmount+tax.TaxAmount
                            j+=1;
                            if(j==cover.Taxes.length){
                              i+=1;
                              if(i==this.fleetCoverDetails.CoverList.length){
                                this.minPremiumExcludedTax = taxValue;
                                let cover = this.fleetCoverDetails.CoverList.find(ele=>ele.CoverId=='5');
                                if(cover){
                                  //if(cover?.PremiumBeforeDiscount!=0 && cover?.PremiumBeforeDiscount!="0"){
                                    this.ratePercent = cover.Rate;
                                    this.CoverName = cover.CoverName;
                                    this.minimumPremiumYN = cover.MinimumPremiumYn;
                                    this.basePremium = cover?.PremiumBeforeDiscount;
                                    this.premiumIncludedTax = cover?.PremiumIncludedTax;
                                    this.premiumExcludedTax = cover?.PremiumExcluedTax;
                                    if(cover.Discounts) this.discountList = cover.Discounts;
                                    if(cover.Loadings) this.loadingList = cover.Loadings;
                                    if(cover.Taxes) this.taxList = cover.Taxes;
                                    this.fleetDiscountModal = true;
                                  // }
                                  // else this.onFleetProceed(modal);
                                }
                                else{
                                  this.fleetDiscountModal = true;
                                }
                              }
                            }
                        }
                      }
                  }
                  
                  // if(minCover.Discounts) this.minDiscountList = minCover.Discounts;
                  // if(minCover.Loadings) this.minLoadingList = minCover.Loadings;
                  // if(minCover.Taxes) this.minTaxList = minCover.Taxes;
                }
                else{
                  if(!this.adminSection && this.userType=='Issuer' && this.statusValue == 'RA' && !this.endorsementSection){
                    this.updateFinalizeYN('proceed')
                  }
                  else if(!this.adminSection && (this.userType!='Issuer'  || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection))){
                    this.onFormSubmit(null);
                  }
                  else if(!this.adminSection && (this.userType!='Issuer') && this.statusValue != 'RA'){
                    this.onFormSubmit(null);
                  }
                  else if(this.userType=='Issuer' && this.subuserType=='low'  && this.statusValue != 'RA' && !this.endorsementSection){
                    this.updateFinalizeYN('proceed');
                  }
                  else if(this.adminSection){
                    this.onUpdateFactor('',null);
                  }
                }
              }
              else{
                if(!this.adminSection && this.userType=='Issuer' && this.statusValue == 'RA' && !this.endorsementSection){
                  this.updateFinalizeYN('proceed')
                }
                else if(!this.adminSection && (this.userType!='Issuer'  || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection))){
                  this.onFormSubmit(null);
                }
                else if(!this.adminSection && (this.userType!='Issuer') && this.statusValue != 'RA'){
                  this.onFormSubmit(null);
                }
                else if(this.userType=='Issuer' && this.subuserType=='low'  && this.statusValue != 'RA' && !this.endorsementSection){
                  this.updateFinalizeYN('proceed');
                }
                else if(this.adminSection){
                  this.onUpdateFactor('',null);
                }
              }
            }
            else this.onFleetProceed();
          }
        });
  }
  onFleetProceed(){
    this.fleetDiscountModal = false;
    if(!this.adminSection && this.userType=='Issuer' && this.statusValue == 'RA' && !this.endorsementSection){
      this.updateFinalizeYN('proceed')
    }
    else if(!this.adminSection && (this.userType!='Issuer'  || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection)) && (this.statusValue == 'RA' || (this.userType=='Issuer' && this.subuserType=='low' && this.endorsementSection))){
      this.onFormSubmit(null);
    }
    else if(!this.adminSection && (this.userType!='Issuer') && this.statusValue != 'RA'){
      this.onFormSubmit(null);
    }
    else if(this.userType=='Issuer' && this.subuserType=='low'  && this.statusValue != 'RA' && !this.endorsementSection){
      this.updateFinalizeYN('proceed');
    }
    else if(this.adminSection){
      this.onUpdateFactor('',null);
    }
  }
  updateReferralStatus(){
    if(this.remarks == undefined) this.remarks = "";
    if(this.rejectedReason == undefined) this.rejectedReason = "";
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "AdminLoginId": this.loginId,
        "ProductId": this.productId,
        "Status": this.statusValue,
        "AdminRemarks": this.remarks,
        "RejectReason": this.rejectedReason,
        "CommissionModifyYn" : 'N',
        "CommissionPercent" : this.commissionPercent
      }
      let urlLink = `${this.CommonApiUrl}quote/update/referalstatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
              // let type: NbComponentStatus = 'success';
              // const config = {
              //   status: type,
              //   destroyByClick: true,
              //   duration: 4000,
              //   hasIcon: true,
              //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //   preventDuplicates: false,
              // };
              // this.toastrService.show(
              //   'Referral Quote Status',
              //   'Referral Status Updated Successfully',
              //   config);
              if(this.statusValue=='RP' || this.statusValue=='RR' || this.statusValue=='RA' || this.statusValue=='RE') this.router.navigate(['/referralCases'])
              
            }
          },
          (err) => { },
        );
  }
  ongetBack(){
    if(this.statusValue=='RA' && !this.adminSection){
      this.router.navigate(['/referral']);
    }
    else{
      sessionStorage.setItem('BackType','Back');
      this.router.navigate(['/policyDetails']);
    }
  }
  finalFormSubmit(ReqObj){
    if(this.checkCurrentSection()){
      let duplicateId = null;
          let i=0,j=0;
          for(let veh of this.vehicleDetailsList){
            let duplicateVehicle = [];
            duplicateVehicle = this.vehicleDetailsList.filter((val) => val.Vehicleid === veh.Vehicleid);
            if (duplicateVehicle.length > 1) {
                duplicateId = duplicateVehicle[0].Vehicleid;
            }
            j+=1;
            if(j==this.vehicleDetailsList.length){
              if (duplicateId!=null) {
                this.selectedRowData=this.vehicleDetailsList[this.tabIndex];
                console.log(this.selectedRowData)
                let entry = ReqObj.Vehicles.find(ele=>ele.Id==duplicateId && ele.SectionId==this.selectedRowData.SectionId);
                console.log(ReqObj,entry);
                if(entry){
                  ReqObj['Vehicles'] = [entry];
                  this.onProceedBuyPolicy(ReqObj);
                }
              }
              else{ this.onProceedBuyPolicy(ReqObj);}
            }
          }
    }
    else this.onProceedBuyPolicy(ReqObj);
    
  }
  onTabClicked(event){
    let index = event.index;
    this.tabIndex = index;
  }
  onProceedBuyPolicy(ReqObj){
    let urlLink = `${this.CommonApiUrl}quote/buypolicy`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
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

          if(this.userType=='Broker'|| this.userType=='User'){
            this.onFinalProceed();
          }
          else{
            for (let v of this.vehicleDetailsList) {

              console.log('AAAAAAAAA',this.vehicleDetailsList)
              vechileId = v.VehicleId;
                sectionId = v.SectionId;
                 i++;
                if (v.Common) {
                   this.CommonMethod(v,i);
                }
                else{
                  if(i==this.vehicleDetailsList.length){
                    this.onFinalProceed();
                  }
                }

            }
          }

          // for (let v of this.vehicleDetailsList) {
          //   vechileId = v.VehicleId;
          //   sectionId = v.SectionId;
          //   i++;
          //   if (v.Common) {
          //     this.CommonMethod(v,i);
          //   }

          //   else{
          //     if(i==this.vehicleDetailsList.length) {

          //     }
          //   }

          // }

            /*if(this.productId=='59'){
              let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
              if(homeSession){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
              }
              else{
                this.getExistingBuildingList();
              }

            }
            else if(this.productId !='3' && this.productId!='4'){
              if(this.emiYN=='Y'){
                this.insertEMIDetails();
              }
              else{
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
              }

            }
            else if(this.productId == '4'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
            }*/
          }
          else if(data?.Result?.Status=='RP'){
              // let type: NbComponentStatus = 'danger';
              // const config = {
              //   status: type,
              //   destroyByClick: true,
              //   duration: 4000,
              //   hasIcon: true,
              //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //   preventDuplicates: false,
              // };
              // this.toastrService.show(
              //   'Referral Quote',
              //   'Quote Moved to Referral Pending',
              //   config);
              sessionStorage.setItem('referralRefNo',this.quoteRefNo);
              this.messageService.add({ severity: 'error', summary: 'Referral Quote', detail: 'Quote Moved to Referral Pending' });
              //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your Quote Move To Referral' });
              this.router.navigate(['/referral']);
          }
        }
      },
      (err) => {
        this.sharedService.fnToastMoveHover("Quote Moved to Referral Pending");
       },
    );
  }
  CommonMethod(rowdata,i) {
    console.log('GHJK',rowdata,i);
    console.log('TTTTHHHHJ',this.vehicleDetailsList);
    let clauses
    let common
    let index=0
    /*for (let v of rowdata){
      common=v.Common;
      clauses=common.ClausesList
      index++;
    }*/


   clauses=rowdata.Common.ClausesList;
   let exclusion=rowdata.Common.ExclusionList;
   let warranties=rowdata.Common.WarrantyList;
   if(clauses==null || clauses==undefined){
    clauses=[];
   }
   if(exclusion == null || exclusion == undefined){
    exclusion=[];
   }
   if(warranties == null || warranties == undefined){
    warranties=[];
   }

    let newArr = [];

    let subId: any;
    let subDesc: any;
    let sub: any;
    let Desc: any;
    console.log("IIIIIIII", i);
    console.log('CLLLLLLLLLLLL',clauses);
    if (this.userType != "Broker") {
      /*if (clauses.length != 0) {
        clauses.forEach((item) => (item["Id"] = "6"));
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
        console.log("iiii", clauses);
      } else if (warranties.length != 0) {
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("WWWWWWW", warranties);
      } else if (exclusion.length != 0) {
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
      }*/
      this.inserts = clauses.concat(warranties, exclusion);
    } else {

       //this.inserts=this.selected
    }


    /*insert.map((item, index) => {
      this.vehicleDetailsList.push(insert[index]);
      this.vehicleDetailsList[index]['Insert'] = insert[index];
    });
    console.log('NNEEE',this.vehicleDetailsList);*/
    //this.vehicleDetailsList.concat(insert);
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: this.quoteNo,
      RiskId: rowdata.VehicleId,
      SectionId: rowdata.SectionId,
      TermsAndConditionReq: this.inserts,
      RequestReferenceNo: this.quoteRefNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        console.log('TOOOOOOOOO',i);
        console.log('VechileLength',this.vehicleDetailsList.length);
        if(i==this.vehicleDetailsList.length) {
          this.onFinalProceed();
        }
      }
    });
  }
  onFinalProceed(){
    //this.emiYN=='Y' && this.emiPeriod!='N'
    if(this.emiYN!=null){
      if(this.emiYN=='N'){
        this.emistatus='N';
        this.emiPeriod='0';
        this.insertEMIDetails();
      }
      else if(this.emiYN=='Y'){
        if(this.emiPeriod!='0'){
          this.emistatus='Y';
          this.insertEMIDetails();
        }
        else{
          this.emistatus='N';
          this.insertEMIDetails();
        }
      }
    }
      // if(this.productId=='59'){
      //   let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      //   if(homeSession){
      //     if(this.loginType=='B2CFlow' && this.loginId=='guest'){
      //       window.location.reload();
      //     }
      //     else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
      //   }
      //   else{
      //     this.getExistingBuildingList();
      //   }

      // }

      // else if(this.productId == '4'){
      //   if(this.loginType=='B2CFlow' && this.loginId=='guest'){
      //     window.location.reload();
      //   }
      //   else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
      // }
      // else if(this.productId=='32' || this.productId=='39' || this.productId=='14' || this.productId=='15' || this.productId=='19' || this.productId=='1' || this.productId=='6' || this.productId=='16' || this.productId =='21' || this.productId =='26' || this.productId =='25'|| this.productId=='42' || this.productId=='43'){
      //   // let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      //   // if(homeSession){
      //     if(this.loginType=='B2CFlow' && this.loginId=='guest'){
      //       window.location.reload();
      //     }
      //     else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
      //   // }
      //   // else{
      //    // this.getExistingEserviceDetails();
      //   //}
      // }
      // else if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
      //   this.coverlist=[];let i=0;
      //   for(let vehicle of this.newcoverlist){
      //     let vehEntry = vehicle.Covers;
      //     console.log('VVVVVVVVV',vehEntry);
      //     if(vehEntry.length!=0){
      //       let entry = vehEntry.filter(ele=>ele.CoverId == '55');
      //       if(entry.length!=0){
      //         console.log('RRRRRRR',entry);
      //         this.coverlist.push(entry)
      //       }
      //     }
      //     i+=1;
      //   }           
      //   console.log('if entry of cover id 55',this.coverlist);
      //   if(sessionStorage.getItem('resetLoginDetails')){
      //     if(this.coverlist.length!=0){
      //         sessionStorage.setItem('riskSection','additional')
      //     }
      //     else sessionStorage.setItem('riskSection','normal')
      //         window.location.reload();
      //   }
      //   else if(this.coverlist.length!=0){
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
      //    }
      //    else {
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      //    }
      // }
      // else{
      //   console.log("BBBBBBBBBBBYYYYYYYYYYYYYY");
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      // }
  }
  insertEMIDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo,
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "PolicyType":this.emipolicytype,
      "InstallmentPeriod":this.emiPeriod,
      "PremiumWithTax":this.totalPremium,//this.localPremiumCost
      "PaymentDetails":"",
      "Status":this.emistatus,
      "CreatedBy":this.loginId,
      "Remarks":"None"
    }
    let urlLink = `${this.CommonApiUrl}api/insertemitransactiondetails`
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.Result?.Response=='Saved Successful'){
          //    if(this.onClauses=true){
          //      let Id:any;

          //      for(let clause of this.insertClause){
          //         Id= clause.Id;

          //      }

          //       let Req= {
          //     "BranchCode":this.branchCode,
          //     "CreatedBy":this.loginId,
          //     "InsuranceId":this.insuranceId,
          //     "ProductId":this.productId,
          //     "QuoteNo": this.quoteNo,
          //     "RiskId": "1",
          //     "SectionId": "2",
          //     "TermsAndConditionReq":this.insertClause

          // }
          // let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`
          // this.sharedService.onPostMethodSync(urlLink, Req).subscribe(
          //   (data: any) => {
          //       if(data.Result){
          //         this.insert=data.Result
          //       }},);
          //    }
            if(this.productId=='59'){
              let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
              if(homeSession){
                this.router.navigate(['quotation/plan/main/accessories']);
              }
              else{
                this.getExistingBuildingList();
              }

            }

            else if(this.productId == '4'){
              if(this.loginType=='B2CFlow' && this.loginId=='guest'){
                window.location.reload();
              }
              else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
            }
       
            else if(this.productId=='32' || this.productId=='39' || this.productId=='14' || this.productId=='15' || this.productId=='19' || this.productId=='1' || this.productId=='6' || this.productId=='16' || this.productId =='21' || this.productId =='26' || this.productId =='25' || this.productId =='24'|| this.productId=='42' || this.productId=='43' || this.productId=='13' || this.productId=='27' || this.productId=='59' || this.productId=='60' || this.productId=='57' || this.productId=='56'){
              this.router.navigate(['quotation/plan/main/accessories']);
              //this.router.navigate(['/quotation/plan/main/document-info']);
              //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
            }
            else if(this.productId=='5' || this.productId=='46' || this.productId=='29'){
              this.coverlist=[];let i=0;
              for(let vehicle of this.newcoverlist){
                let vehEntry = vehicle.Covers;
                console.log('VVVVVVVVV',vehEntry);
                if(vehEntry.length!=0){
                  let entry = vehEntry.filter(ele=>ele.CoverId == '55');
                  if(entry.length!=0){
                    console.log('RRRRRRR',entry);
                    this.coverlist.push(entry)
                  }
                }
                i+=1;
              }           
              console.log('if entry of cover id 55',this.coverlist);
              if(sessionStorage.getItem('resetLoginDetails')){
                if(this.coverlist.length!=0){
                    sessionStorage.setItem('riskSection','additional')
                }
                else sessionStorage.setItem('riskSection','normal')
                    window.location.reload();
              }
              else if(this.coverlist.length!=0){
                this.router.navigate(['quotation/plan/main/accessories']);
                //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
               }
               else {
                if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
                  this.router.navigate(['/quotation/plan/main/driver-info']);
                }
                else this.router.navigate(['/quotation/plan/main/document-info']);
               }
            }
            else{
              if(this.productId=='5' && this.insuranceId!='100028' && this.insuranceId!='100020'){
                this.router.navigate(['/quotation/plan/main/driver-info'])
              }
              else this.router.navigate(['/quotation/plan/main/document-info']);
            }
          }
        },
        (err) => { },
      );
  }
  getExistingBuildingList(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let customerDatas = data.Result[0];
        let commonDetails =[{
          "PolicyStartDate": customerDatas.PolicyStartDate,
          "PolicyEndDate":customerDatas.PolicyEndDate,
          "Currency":customerDatas.Currency,
          "SectionId":customerDatas.SectionId,
          "AcexecutiveId":"",
          "ExchangeRate":customerDatas.ExchangeRate,
          "StateExtent":"",
          "NoOfDays": this.noOfDays,
          "HavePromoCode":customerDatas.Havepromocode,
          "Promocode": customerDatas.Promocode,
        }]
        sessionStorage.setItem('homeCommonDetails',JSON.stringify(commonDetails));
        if(this.loginType=='B2CFlow' && this.loginId=='guest'){
          window.location.reload();
        }
        else this.router.navigate(['quotation/plan/main/accessories']);
      },
      (err) => { },
    );
  }
  generateOtp(){}
  onNext(){
      this.tabIndex+=1;
  }
  showSidebar() {
    this.sidebarVisible = true;
  }
  checkManualReferral(){
    return this.vehicleDetailsList.some(ele=>ele.ManualReferalYn=='Y')
  }
  show() {
    this.messageService.add({ severity: 'error', summary: 'Referral Quote', detail: 'Quote Moved to Referral Pending' });
  }
  addItem(){
    let entry = [{
     "TypeId":"D",
     "Id":'6',
     "SubId":null,
     "SubIdDesc":"",
     "DocRefNo":null,
    "DocumentId":null,
     
   }]
   this.jsonList = entry.concat(this.jsonList);
   }
   deleteClauses(row){
    const index = this.jsonList.indexOf(row);
    this.jsonList.splice(index, 1);
  }
  saveChanges(){

    let i=0;
      console.log("EEEEEEEE", this.ClausesData);

   let clauses
     if(this.ClausesData!=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.jsonList);
     }
     else{
      clauses= this.jsonList
     }

    console.log('QQQQQ',this.quoteNo)
        let quote
    if(this.quoteNo){
      quote=this.quoteNo;
    }
    else{
      quote="";
    }
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      RiskId:"1",
      SectionId:"99999",
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.requestReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        console.log('TOOOOOOOOO');
        this.jsonList =[
          {
            "TypeId":"D",
            "DocRefNo":null,
          "DocumentId":null,
             "Id":"6",
            "SubId":null,
             "SubIdDesc":""
          }
        ];
        this.newAddClauses=false;
        this.viewCondition(1);
        // this.close();
      }
    });

  }
  addExclusion(){
    let entry = [{
      "TypeId":"D",
      "Id":"7",
      "SubId":null,
      "SubIdDesc":"",
      "DocRefNo":null,
      "DocumentId":null,
    }]
    this.ExclusionList = entry.concat(this.ExclusionList);
  }


  saveExclusion(){
    console.log('QQQQQ',this.quoteNo)
    let quote
if(this.quoteNo){
 quote=this.quoteNo;
}
else{
  quote="";
}
    let i=0;

    let clauses
    if(this.ClausesData!=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.ExclusionList);
     }
     else{
      clauses= this.ExclusionList
     }
    //= this.ExclusionData.concat(this.ExclusionList);
    //console.log('Exclusion',this.tempData)
    console.log('Exclsuion',this.ExclusionList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: "1",
      SectionId:"99999",
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.requestReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        console.log('TOOOOOOOOO');

        this.ExclusionList =[
          {
            "TypeId":"D",
            "Id":"7",
           "SubId":null,
            "SubIdDesc":"",
            "DocRefNo":null,
            "DocumentId":null,
          }
        ];
        // this.close();
        //$('#WarrantyModel').modal('hide');
        this.newAddExclusion=false;
        this.viewCondition(1);

        //window.location.reload();
      }
    });
  }

  deleteExclusion(row){
    const index = this.ExclusionList.indexOf(row);
    this.ExclusionList.splice(index, 1);
  }
  delete(row){
    const index = this.json.indexOf(row);
    this.json.splice(index, 1);
  }

  saveWarranty(tempData,json){
    let i=0;
    console.log('QQQQQ',this.quoteNo)
    let quote
if(this.quoteNo){
 quote=this.quoteNo;
}
else{
  quote="";
}
    let clauses
    if(this.ClausesData !=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.json);
     }
     else{
      clauses= this.json
     }
    //let clauses = this.WarrantyData .concat(this.json);
    //console.log('Warranty',this.tempData)
    console.log('Warranty',this.json)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: "1",
      SectionId:"99999",
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.requestReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {

        console.log('TOOOOOOOOO');
        this.json = [
          {
            "TypeId":"D",
            "Id":"4",
           "SubId":null,
            "SubIdDesc":"",
            "DocRefNo":null,
            "DocumentId":null,
          }
        ];
        this.newAddWarranty=false;
        this.viewCondition(1);
        
        //this.close();
      }
    });
  }

  addwarranty(){
    let entry = [{
      "TypeId":"D",
      "Id":"4",
      "SubId":null,
      "SubIdDesc":"",
      "DocRefNo":null,
      "DocumentId":null,
    }]
    this.json = entry.concat(this.json);
  }


}
