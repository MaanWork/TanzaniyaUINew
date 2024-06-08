import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { QuotationPlanComponent } from '../quotation-plan.component';

import * as Mydatas from '../../../../../app-config.json';
import { AddPassenger } from '../models/addPassenger';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProductData } from '../models/product';
@Component({
  selector: 'app-travel-quote-details',
  templateUrl: './travel-quote-details.component.html',
  styleUrls: ['./travel-quote-details.component.scss']
})
export class TravelQuoteDetailsComponent {
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  visible:boolean=false;
  visibleUp:boolean=false;
  passengerGrid:boolean=false;
  quoteRefNo: string;
  quoteNo: string;
  subuserType: string;
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  insuranceId: any;
  loginType: any;
  imageUrl: any;
  individualDocumentList: any;
  uploadListDoc: any;
  uploadedDocList: any;
  uploadedIndividualList: any;
  customerDetails: any;
  titleValue: any;
  clientName: any;
  clientStatus: any;
  idTypeDesc: any;
  idNumber: any;
  mobileNumber: any;
  customerquoteRefNo: string;
  policyStartDate: any;
  policyEndDate: any;
  form = new FormGroup({});

  model = {};
  AddPassengerField: any;
  addPassengerItem: any;
  PassengerFirstName: any;
  PassengerLastName: any;
  GenderId: any;
  RelationId: any;
  Dob: any;
  Nationality: any;
  PassportNo: any;
  firstNameError: boolean;
  lastNameError: boolean;
  DobError: boolean;
  NationalityError: boolean;
  genderError: boolean;
  relationShipError: boolean;
  passportError: boolean;
  GroupIdError: boolean;
  relationshipDesc: any;
  relationShipList: any;
  datePipe: any;
  GroupId: any;
  PassengerId: any;
  historyRecordsList: any[]=[];
  constructor(private sharedService: SharedService,
    private router:Router,
   ) {}
  //   //this.vehicleId = sessionStorage.getItem('editVehicleId');
  //   //this.quoteNo = sessionStorage.getItem('quoteNo');
  //   //this.updateComponent.quoteNo = this.quoteNo;
  //   this.subuserType = sessionStorage.getItem('typeValue');
  //   this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  //   this.loginId = this.userDetails.Result.LoginId;
  //   this.userType = this.userDetails?.Result?.UserType;
  //   this.agencyCode = this.userDetails.Result.OaCode;
  //   this.branchCode = this.userDetails.Result.BranchCode;
  //   this.branchList = this.userDetails.Result.LoginBranchDetails;
  //   this.productId = this.userDetails.Result.ProductId;
  //   this.insuranceId = this.userDetails.Result.InsuranceId;
  //   this.loginType = this.userDetails.Result.LoginType;
  //   }
  ngOnInit(){
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     this.customerquoteRefNo = sessionStorage.getItem('customerReferenceNo');
     
     this.getCustomerDetails(this.customerquoteRefNo);
     this.getExistingTravelDetails();
  }
 
  addPassenger(){
    this.visible=true;
    this.passengerGrid=false;
    let fireData = new AddPassenger();
            let entry = [];
            this.AddPassengerField = [fireData?.fields];
            console.log("Final Fields",this.AddPassengerField)

            // let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            //   field.formControl.valueChanges.subscribe(() => {
            //     this.individualCommaFormatted('AddPassenger');
            //   });
            // } }
  }

  close(type){
    if(type=='Add') this.visible=false;
   else if(type=='Update')
    { this.visibleUp=false;
  }
  }
  UploadOpen(){
    this.passengerGrid=false;
    this.visible=false;
    this.visibleUp=true;
  }
  passengerSave(){
    
    this.passengerGrid=true;
    this.addPassengerItem = new ProductData();
    this.addPassengerItem = this.PassengerFirstName;
    this.addPassengerItem = this.PassengerLastName;
    this.addPassengerItem = this.GenderId;
    this.addPassengerItem = this.RelationId;
    this.addPassengerItem = this.Dob;
    this.addPassengerItem = this.Nationality;
    this.addPassengerItem = this.PassportNo;
    let i=0;
    this.firstNameError=false;this.lastNameError=false;this.DobError=false;this.NationalityError=false;
    this.genderError = false;this.relationShipError =false;this.passportError = false;this.GroupIdError=false;
    // if(this.PassengerFirstName==null){i+=1;this.firstNameError=true;}
    // if(this.PassengerLastName==null){i+=1;this.lastNameError = true;}
    // if(this.GenderId==null){i+=1;this.genderError = true;}
    // if(this.RelationId==null){i+=1;this.relationShipError = true;}
    // if(this.RelationId!=null){this.relationshipDesc = this.relationShipList.find(ele=>ele.Code==this.RelationId)?.CodeDesc;}
    // if(this.Dob==null){i+=1;this.DobError = true;}
    // if(this.PassportNo==null){i+=1;this.passportError = true;}
    // if(this.Nationality==null){i+=1;this.NationalityError = true;}
    if(i==0){
      alert()
      let entry = {
        "Dob": this.Dob,
        "GenderId": this.GenderId,
        "GroupId": this.GroupId,
        "Nationality": this.Nationality,
        "PassengerFirstName": this.PassengerFirstName,
        "PassengerId": this.PassengerId,
        "RelationDesc": this.relationshipDesc,
        "PassengerLastName": this.PassengerLastName,
        "PassportNo": this.PassportNo,
        "RelationId": this.RelationId
      }
      this.historyRecordsList.push(entry);
      console.log(this.historyRecordsList,"this.historyRecordsList");
      this.visible=false;
    }
    
  }
  ProceedToDoc(){
    this.router.navigate(['/quotation/plan/main/document-info'])
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
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            console.log("Cust Details",this.customerDetails)
            sessionStorage.setItem('customerDetails',JSON.stringify(this.customerDetails));
            //this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
              this.titleValue = this.customerDetails.TitleDesc;
              this.clientName = this.customerDetails?.ClientName;
              this.clientStatus = this.customerDetails?.ClientStatusDesc;
              this.idTypeDesc = this.customerDetails?.IdTypeDesc;
              this.idNumber = this.customerDetails?.IdNumber;
              this.mobileNumber = this.customerDetails?.MobileNo1;
        }
      },
      (err) => { },
    );
  }

  getExistingTravelDetails(){
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    let ReqObj = {
      "RequestReferenceNo": referenceNo,
      "TravelId": "1"
      }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
          //   this.travelDetails = customerDatas;
          //   this.Code= customerDatas.SourceTypeId;
          //   this.sourceType = this.premium;
          //   this.branchValue = customerDatas.BranchCode;
          //   this.brokerBranchCode = customerDatas.BrokerBranchCode;
          //  // this.brokerBranchCode = this.brokerBranchCode;
          //   this.branchValue = customerDatas.BranchCode;
          //   this.brokerCode = customerDatas.BrokerCode;
          //   this.onSourceTypeChange('direct');
          //   this.premiunDropdown4(this.Code);
           
          // this.updateComponent.brokerCode = customerDatas.BrokerCode;
  //this.HavePromoCode = customerDatas.HavePromoCode;
            // this.planType = customerDatas.PlanTypeId;
            // this.promocode = customerDatas.PromoCode;
            // this.premium = customerDatas.SectionId;
            // this.customerCode = customerDatas.CustomerCode;
           // this.getPlanTypeList(this.premium );
            // this.executiveValue = customerDatas?.AcExecutiveId;
            // this.commissionValue = customerDatas?.CommissionType;
            this.policyStartDate = customerDatas?.TravelStartDate;
            this.policyEndDate = customerDatas?.TravelEndDate
      },
      (err) => { },
    );
  }





  // onUploadListDocuments(target:any,fileType:any,type:any,uploadType:any){
    
  //   console.log("Event ",target);
  //   let event:any = null;
  //   if(uploadType=='drag') event = target
  //   else event = target.target.files;
  //   let fileList = event;
  //   for (let index = 0; index < fileList.length; index++) {
  //     const element = fileList[index];

  //     var reader:any = new FileReader();
  //     reader.readAsDataURL(element);
  //       var filename = element.name;

  //       let imageUrl: any;
  //       reader.onload = (res: { target: { result: any; }; }) => {
  //         imageUrl = res.target.result;
  //         this.imageUrl = imageUrl;
  //         let entry = { 'url': element,'DocTypeId':'','Id':'','typeList':[],'sectionList':[],'sectionId':'','locationId':'','locationList':this.individualDocumentList,'docTypeList':[],'filename':element.name, 'JsonString': {} }
  //         console.log('KKKKKKKKKK',entry);
  //         console.log('OOOOOOOOOO',this.individualDocumentList.length);
  //         if(this.individualDocumentList.length==1){
  //           console.log('NNNNNNNNNNNNN',this.individualDocumentList);
  //           entry.locationId = this.individualDocumentList[0].LocationId;
  //           entry.sectionList = this.individualDocumentList[0].SectionList;
  //           this.uploadListDoc.push(entry)
  //           if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
  //         }
  //         else{
  //           // entry.sectionList = this.individualDocumentList[0].SectionList;
  //           this.uploadListDoc.push(entry)
  //           if(entry.sectionList.length==1){this.uploadListDoc[this.uploadListDoc.length-1].sectionId= entry.sectionList[0].SectionId; this.onChangeSectionType(this.uploadListDoc[this.uploadListDoc.length-1],this.uploadListDoc.length-1)}
  //         }
  //           //this.vehicleList[i].docList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });
  //       }
  //   }

  // }
  // getUploadedDocList(vehicleData:any,index:any,reqObj:any){
  //   let ReqObj = {
  //     "QuoteNo":  this.quoteNo
  //   }
  //   let urlLink = `${this.CommonApiUrl}document/getdoclist`;
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //         if(data?.Result){
  //           this.uploadedDocList = data?.Result?.CommmonDocument;
  //           this.uploadedDocList = this.uploadedDocList.filter(ele=>ele.DocumentId!='23');
  //           this.uploadedIndividualList = data?.Result?.InduvidualDocument;
  //           if(this.uploadedDocList.length!=0){
  //             this.uploadedIndividualList = this.uploadedDocList.concat(this.uploadedIndividualList)
  //           }
  //             let entry = this.uploadedIndividualList.find(ele=>ele.DocumentId=='17' && ele.VerifiedYn!='Y');
  //             // if(entry){
  //             //   this.checkMandatoryDocument(entry);
  //             // }
  //         }
  //       },
  //       (err) => { },
  //     );
  // }
  // onChangeSectionType(rowData,index){
  //   let entry = this.individualDocumentList.find(ele=>ele.LocationId==rowData.locationId);
  //    if(entry){
  //      let section = entry.SectionList.find(ele=>ele.SectionId==rowData.sectionId);
  //      if(section){
  //        rowData.Id = "";
  //        rowData['typeList'] = section.IdList;
  //        if(rowData.typeList.length==1){rowData.Id= rowData.typeList[0].Id;}
  //        if(section.docTypeList==undefined){
  //          let ReqObj = {
  //            "InsuranceId":this.insuranceId,
  //            "ProductId": this.productId,
  //            "SectionId": rowData.sectionId
  //          }
  //          let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
  //          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //            (data: any) => {
  //              console.log(data);
  //              if(data.Result){
  //                  this.uploadListDoc[index].docTypeList = data.Result;
  //                  section['docTypeList'] = data.Result;
  //              }
  //            },
  //            (err) => { },
  //          );
  //        }
  //        else rowData['docTypeList'] = section.docTypeList;
  //      }
  //    }
  //  }
}
