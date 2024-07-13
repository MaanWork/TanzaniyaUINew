import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
export class currency{
  "CurrencyId":null;
"CurrencyName":null;
  "CurrencyShortCode":null;
"Remarks":null;
"ShortName":null;
"Rfactor":null;
"SubCurrency":null;
"ExMinlmt":null;
"ExMaxlmt":null;
"MinDiscount": null;
"MaxLoading": null;
"Status":"Y";
"EffectiveDateStart":any;
"EffectiveDateEnd":any;
"CoreAppCode":null;
"DecimalDigit":null;
}
@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

  activeMenu:any;statusValue:any="YES";minDate:any=null;
  insuranceName:any=null;productId:any=null;
  loginId: any=null;CurrencyId:any=null;
  CurrencyDetails: any=null;insuranceId:any=null;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe, private router: Router) {
      this.activeMenu="Currency";
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.CurrencyDetails = new currency();
    this.CurrencyId = sessionStorage.getItem('editCurrencyId');
    console.log(this.CurrencyId);
    this.insuranceId=sessionStorage.getItem('Insuranceid');
  }

  ngOnInit(): void {
  }
  ongetBack(){
    this.router.navigate(['/Admin/countryMaster/currencyList'])
  }
  onProceed(){
    this.router.navigate(['/Admin/countryMaster/currencyList'])
  }
  onRedirect(value){
    if(value == 'State'){
      this.router.navigate(['/Admin/countryMaster/stateList']);
    }
    else if(value == 'City'){
      this.router.navigate(['/Admin/countryMaster/cityList']);
    }
    else if(value == 'Country'){
      this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
    }
    else if(value == 'Currency'){
      this.router.navigate(['/Admin/countryMaster/currencyList']);
    }
    else if(value == 'Region'){
      this.router.navigate(['/Admin/countryMaster/regionList']);
    }
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }
}
