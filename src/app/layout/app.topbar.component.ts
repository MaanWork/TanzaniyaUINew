import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { LoginService } from '../demo/components/auth/login/login.service';
import { AuthService } from '../demo/components/auth/Auth/auth.service';
import { SharedService } from '../demo/service/shared.service';
import * as Mydatas from '../app-config.json';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
declare var $:any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    branches!: MenuItem[];
    userOptions !: any[];
    selectedOption !: '';
    productName:any=null;userDetails:any=null;
    loginId:any=null;
    productId:any=null;userType:any=null;
    productname:any=null;
    branchName:any=null;
    @Input('typeList') typeList: any[] = [];
    @Input('typeValue') typeValue: any=null;
    @Output('onTypeValueChange') onTypeValueChange = new EventEmitter();
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    branchValue:any=null;branchList:any[]=[];typeName:any=null;
    loginType:any=null;customerCode:any=null;customerName:any=null;
    insuranceid: any;
    constructor(public layoutService: LayoutService, private router: Router,private loginService: LoginService,private appComp:AppComponent,
        private authService: AuthService,private cookieService: CookieService,private SharedService: SharedService) { 
        this.productName = sessionStorage.getItem('productName');
        this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        console.log("UserDetails",this.userDetails);
        this.loginId = this.userDetails.Result.LoginId;
        this.userType = this.userDetails?.Result?.UserType;
        let language =  sessionStorage.getItem('language');
        if(language) this.appComp.setLanguage(language);
        else this.appComp.setLanguage('en');
        if(this.userDetails.Result.LoginBranchDetails.length!=0) this.insuranceid = this.userDetails.Result.LoginBranchDetails[0].InsuranceId;
      
        if(sessionStorage.getItem('Userdetails')){
          this.productName = sessionStorage.getItem('productName');
          this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          this.typeValue = sessionStorage.getItem('typeValue');
          this.loginId = this.userDetails.Result.LoginId;
          this.productId = this.userDetails.Result.ProductId;
          this.userType = this.userDetails.Result.UserType;
          this.productname = this.userDetails.Result.ProductName;
          if(this.userDetails.Result.LoginType) this.loginType = this.userDetails.Result.LoginType;
          if(this.userType!='Issuer'){
            this.customerCode = this.userDetails.Result.CustomerCode;
            this.customerName = this.userDetails.Result.UserName;
          }
          }
          else this.router.navigate(['/auth/login'])
        
    }

    ngOnInit() {
      this.getBranchList();
      
        this.branches = [{label: 'Branch 1'}, {label: 'Branch 2'}];
        this.userOptions = [
            {label: 'Logout', value: 'logout', icon: 'pi pi-power-off', command: () => {this.setLogout();}},
        ]
    }
    
    onProductRedirect(){
      this.router.navigate(['/auth/login/product']);
    }
    getBranchList() {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      let branchList: any[] = userDetails.Result.LoginBranchDetails;
      if (this.userType == 'Issuer') {
        this.branchValue = userDetails?.Result?.BranchCode;
      }
      else {
        this.branchValue = userDetails?.Result?.BrokerBranchCode;
      }
      if(branchList.length!=0){
        let i=0;
        for(let branch of branchList){
          branch['label']=branch['BranchName'];
          i+=1;
          if(i==branchList.length) this.branchList = branchList;
        }
      }
      if (this.userType == 'Issuer') {
        let branch = this.branchList.filter(ele => ele.BranchCode == this.branchValue);
        if (branch) this.finaliseBranchValue(branch[0], 'direct');
      }
      else {
        let branch = this.branchList.filter(ele => ele.BrokerBranchCode == this.branchValue);
        if (branch) this.finaliseBranchValue(branch[0], 'direct');
      }
    }
    finaliseBranchValue(branch, type) {
      if(type=='change'){
        branch = this.branchList.find(ele=>ele.BranchName==this.branchName);
      }
      if (this.userType == 'Issuer') {
        this.branchValue = branch?.BranchCode;
        this.branchName = branch?.BranchName;
        this.onBranchChange(type);
      }
      else {
        this.branchValue = branch?.BrokerBranchCode;
        this.branchName = branch?.BranchName;
        this.onBranchChange(type);
      }
    }
    onBranchChange(type) {
      if (this.branchValue != '' && this.branchValue != undefined) {
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (this.userType == 'Issuer') {
          userDetails.Result['BranchCode'] = this.branchValue;
          let branchData: any = this.branchList.find(ele => ele.BranchCode == this.branchValue);
          userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        }
        else {
          userDetails.Result['BrokerBranchCode'] = this.branchValue;
          let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
          userDetails.Result['BranchCode'] = branchData?.BranchCode;
          userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        }
  
        if (type == 'change'){this.router.navigate(['/auth/login/product']);}
      }
    }
    finaliseTypeValue(types, changeType) {
      if(types==null) types = this.typeList.find(ele=>ele.CodeDesc  = this.typeValue)  
      else if(types.CodeDesc!='B2C Broker') this.typeValue = types.CodeDesc;
      this.typeName = types.DisplayName;
      console.log("Setted Type Value", this.typeValue);
      //$("#subUserTypes").hide();
      this.onTypeChange(changeType);
    }
    onTypeChange(changeType) {
      let type = sessionStorage.getItem('typeValue');
      console.log("1", type)
      if (type != undefined) {
        sessionStorage.setItem('typeValue', this.typeValue);
        type = sessionStorage.getItem('typeValue');
        console.log("2", type)
        this.onTypeValueChange.emit('change');
      }
      else {
        sessionStorage.setItem('typeValue', this.typeValue);
        this.onTypeValueChange.emit('change');
      }
      if (changeType == 'direct') {
        this.getBranchList();
      }
      else {
        this.router.navigate(['/auth/login/product']);
      }
    }
    onRedirect(){
      if(this.loginId!='guest'){
        if(this.typeValue=='SuperAdmin'){this.router.navigate(['/'])}
        else{this.router.navigate(['/'])}
      }
      else{
        sessionStorage.clear();
        this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
        window.location.href='https://apps.alliance.co.tz/';
      }
    }
    setLanguage(value){
        sessionStorage.setItem('language',value);
        this.appComp.setLanguage(value);
    }
    showUserDetails(){
      if(this.router.url=='/auth/login/product') return false;
      else return true;
    }
    setLogout(){
            //sessionStorage.clear();
            //this.authService.logout();
      
            //this.router.navigate(['/login']);
            let Req = {
              "LoginId": this.loginId,
              "Token": this.loginService.getToken()
            };
            const urlLink = `${this.CommonApiUrl}authentication/logout`;
            this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
              (data: any) => {
                let res: any = data;
                console.log(data);
                this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
                  sessionStorage.clear();
                   this.authService.logout();
                   this.router.navigate(['auth/login'])
                  // if(this.typeValue=='b2c' || this.typeValue=='B2C' || this.loginType=='B2CFlow'){
                  //   this.router.navigate(['/b2clogin']);
                  // }
                  // else 
                //
              },
              (err: any) => {
                sessionStorage.clear();
                this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
                  this.authService.logout();
                  this.router.navigate(['/login']);
                // console.log(err);
              },
              );
      
          }
}
