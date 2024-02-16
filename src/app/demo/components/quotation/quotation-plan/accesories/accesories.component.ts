import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'src/app/demo/service/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { ProductData } from './Accessories';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accesories',
  templateUrl: './accesories.component.html',
})
export class AccesoriesComponent {
  sidebarVisible:boolean = false;
  accessories: MenuItem[] = [];loginId:any=null;
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
  quoteDetails:any=null;Riskdetails:any=null;customerDetails:any
  accessoriesSection: boolean=false;
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
          if(this.productId!='19') {
            this.getbuilding();
          }
          if(this.productId=='5' || this.productId=='29'){
            this.getAccesroies();
            this.getchassisAcc();
            this.getAccessories();
          }
        }
      },
      (err) => { },
    );
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
  }
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
        }
        else {
        }
      })
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
}
