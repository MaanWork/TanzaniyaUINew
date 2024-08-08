import { DatePipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-credit-controller',
  templateUrl: './credit-controller.component.html',
  styleUrls: ['./credit-controller.component.scss']
})
export class CreditControllerInfoComponent implements OnInit{
  
  Sno: any;  public AppConfig: any = (Mydatas as any).default;
  public ReInsurance: any = this.AppConfig.ReInsurance;
  insuranceName: string;quoteDetails:any=null;
  insuranceId: string;quoteNo:any=null;
  userDetails: any;remarks:any=null;
  UserType: any;statusValue:any='Y';
  ProductId: any;statusList:any[]=[];
  loginId: any;
  columnHeader: any[]=[];pendingList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  riskDetails: any=null;
  customerDetails: any;
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = '100004';
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
        this.statusList = [
          {"Code":"Y","CodeDesc":"Approve"},
          {"Code":"N","CodeDesc":"Rejected"}
        ];
     }
  ngOnInit(): void {
    let quoteNo = sessionStorage.getItem('quoteNo')
    if(quoteNo){
      this.quoteNo = quoteNo;
      this.getQuoteDetails(quoteNo);
    }
    this.columnHeader =[
      'QuoteNo',"Customer Name","Payment Type","Policy Start Date","Policy End Date","Mobile No","Premium","Action"
    ]
  }
  getQuoteDetails(quoteNo){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl1}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              this.quoteDetails = data.Result.QuoteDetails;
              this.riskDetails = data.Result.RiskDetails;
              this.customerDetails = data.Result.CustomerDetails;
          }
        })
  }
}