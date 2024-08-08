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
export class CreditControllerComponent implements OnInit{
  
  Sno: any;  public AppConfig: any = (Mydatas as any).default;
  public ReInsurance: any = this.AppConfig.ReInsurance;
  insuranceName: string;
  insuranceId: string;
  userDetails: any;
  UserType: any;
  ProductId: any;
  loginId: any;
  columnHeader: any[]=[];pendingList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = '100004';
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
      this.getProductList();
     }
  ngOnInit(): void {
    this.columnHeader =[
      'QuoteNo',"Customer Name","Payment Type","Policy Start Date","Policy End Date","Mobile No","Premium","Action"
    ]
  }
  getProductList(){
    let urlLink = `${this.CommonApiUrl1}paymentprocess/get/creditcontroller/CCP`;
    let ReqObj = {
      "ProductId": this.ProductId
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.pendingList = data.Result;
        }
      });
  }
  getPendingList(){
    let urlLink = `${this.CommonApiUrl1}paymentprocess/get/creditcontroller/CCP`;
    let ReqObj = {
      "ProductId": this.ProductId
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
        }
    })
  }
  creditPending(){}
  onEditCCPending(rowData){
    sessionStorage.setItem('quoteNo',rowData.QuoteNo)
    this.router.navigate(['Home/credit-controller/Info'])
  }
}