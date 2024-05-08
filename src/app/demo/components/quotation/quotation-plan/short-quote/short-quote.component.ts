import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './short-quote.component.html',
  styleUrls: ['./short-quote.component.scss']
})
export class ShortQuoteComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  
  insuranceId: any[]=[];
  productId: any;
  countryCode: { CodeDesc: string; Code: string; }[];
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
  agencyCode: any;
  branchCode: any;
  modelColumns: string[];
  vehicleDetailsList: any;
  editSectionAlt: boolean;
  makeValue: any;
  editdata: any;
  bodyTypeId: any;
  bodyTypeValue: any;
  bodyTypeIdcode: any;
  form:any;
  model:any;
  fields:any[]=[];
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
    this.onGetFormControl();
  }
  onGetFormControl(){
    this.fields = [];
    let fireData:any=null;
    
  }


  // getCountryCode(){
  //   let ReqObj = {
  //     "InsuranceId":this.insuranceId,
  //     // "ProductId": this.productId
  //   }
  //   let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.countryCode = data.Result;
  //       }
        
  //     },
  //     (err) => { },
  //   );
  // }

  // getInsurenceType(){
  //   let ReqObj = {
  //     "ProductId": this.productId,
  //      "InsuranceId": this.insuranceId,
  //       "BranchCode": this.branchCode
  //   }
  //   let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.insurenceTypeList = data.Result;
  //       }
  //     }
  //     ,
  //     (err) => { },);
  // }
  // getInsurenceClass(){
  //   let ReqObj = {
  //     "ProductId": this.productId,
  //      "InsuranceId": this.insuranceId,
  //       "BranchCode": this.branchCode,
  //       "LoginId": this.loginId
  //   }
  //   let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.insurenceClassList = data.Result;
  //       }
  //     },
  //     (err) => { },);
  // }

  // getBodyType(){
  //   let ReqObj = {
  //     "SectionId": null,
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //     "LoginId": this.loginId
  //   }
  //   let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.bodyTypeList = data.Result;
  //       }
       
  //     },
  //     (err) => { },);
  // }
  // onBodyTypeChange(type){
  //   console.log(type)
  //   {
  //      this.bodyTypeId = this.bodyTypeValue;
  //      this.bodyTypeIdcode = this.bodyTypeList.find(option => option.Code === this.bodyTypeId);
  //     //const selectedCodeDesc = selectedOption ? selectedOption.CodeDesc : null;
  //     //this.bodyTypeId = this.bodyTypeList.find((ele: { CodeDesc: any; })=>ele.CodeDesc==this.bodyTypeValue)?.Code;
     
  //     if(this.bodyTypeIdcode )
  //       {
  //          this.getMake(); 
  //         } 
  //     console.log(this.bodyTypeId);
  //   }

  //    // this.getMake();
      
  // }

  // getMotorUsageList(){
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //   }
  //   let urlLink = `${this.CommonApiUrl}api/dropdown/induvidual/vehicleusage`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.motorUsageList = data.Result;
  //       }
  //     },
  //     (err) => { },);
  // }
  // getMake(){
  //   // console.log("this.bodyTypeList.bodyTypeId"+this.bodyTypeId);
    
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //     "BodyId" : this.bodyTypeId,

  //   }
  //   let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //           this.makeList = data.Result;
  //           let entry = this.makeList.find((ele: { CodeDesc: any; })=>ele.CodeDesc==this.editdata?.Vehiclemake);
  //           this.makeValue = entry.Code;
  //           this.editSectionAlt = true;
  //           this.getModel('direct',this.vehicleDetailsList?.VehicleModelDesc);
        
  //       }
        
  //     },
  //     (err) => { },);
  // }
  // onChangemake(){
  //   this.getModel('direct',this.vehicleDetailsList?.VehicleModelDesc);
  // }
  // getModel(type: any, _modelValue: any){
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //     "BodyId" : this.bodyTypeId,
  //      "MakeId": this.makeValue,
  //   }
  //   let urlLink = `${this.CommonApiUrl}master/dropdown/motormakemodel`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       if(data.Result){
  //         // let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
  //         this.modelList = data.Result;
  //       }
  //     },
  //     (err) => { },);
  // }


  // getYearList(){
  //   var d = new Date();
  //   var year = d.getFullYear();
  //   var month = d.getMonth();
  //   var day = d.getDate();
  //   const currentYear = new Date().getFullYear()-20, years = [];
  //   while ( year >= currentYear ) {
  //     let yearEntry = year--
  //     years.push({"Code":String(yearEntry),"CodeDesc":String(yearEntry)});
  //   }   
  //   return years;
  // }
}
