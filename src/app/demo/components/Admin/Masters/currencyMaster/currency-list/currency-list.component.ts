import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; 
  stateValue:any;cityValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;cityList:any;
  currencyData:any[]=[];currencyHeader:any[]=[];
  userDetails: any;
  UserType: any;
  ProductId: any;
  MenuMasterList: any[]=[];
  InsuranceId: any;
  LoginId: any;
  constructor(private router:Router,private sharedService:SharedService,private layoutService:LayoutService ) {
    this.activeMenu = "Currency Master";
    
    this.stateList = [
      { "Code":"01","CodeDesc":"TamilNadu"},
      { "Code":"02","CodeDesc":"Kerala"},
      { "Code":"03","CodeDesc":"Andhra Pradesh"},
    ];
    this.cityList = [
      { "Code":"01","CodeDesc":"Trichy"},
      { "Code":"02","CodeDesc":"Chennai"},
      { "Code":"03","CodeDesc":"Madurai"},
    ];
    this.currencyHeader = [
    'Currency Name' ,
     'Currency Code' ,
   'Effective Date' ,
  'Status' , 'Action',

    ];
    this.currencyData = [
      {
        "CurrencyId": "100001",
        "CurrencyName": "Rupees",
        "MobileCode":"+91",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CurrencyId": "100002",
        "CurrencyName": "EURO",
        "MobileCode":"+114",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CurrencyId": "100003",
        "CurrencyName": "Dollar",
        "MobileCode":"+811",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "3",
        "AmendId": 1,
        "Remarks": "Ok"
       },
    ];
   }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
  }
  // onRedirect(value){
  //   if(value == 'State'){
  //     this.router.navigate(['/Admin/countryMaster/stateList']);
  //   }
  //   else if(value == 'City'){
  //     this.router.navigate(['/Admin/countryMaster/cityList']);
  //   }
  //   else if(value == 'Country'){
  //     this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
  //   }
  //   else if(value == 'Currency'){
  //     this.router.navigate(['/Admin/countryMaster/currencyList']);
  //   }
  //   else if(value == 'Region'){
  //     this.router.navigate(['/Admin/countryMaster/regionList']);
  //   }
  // }
  onAddNew(){
    this.router.navigate(['/Admin/currencyMaster/newCurrencyDetails']);
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/currencyMaster/']);
  }
  EditStatus(event){
    console.log("Status Changed",event)
}
 getMenu(rowData){
  this.layoutService.setMaster(rowData);
}

}
