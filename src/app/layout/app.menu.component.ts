import { OnInit, Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import * as Mydatas from '../../app/app-config.json';
import { Router } from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: ['']
})
export class AppMenuComponent implements OnInit {
    isMenuExpanded = true;

    model: any[] = [];
    productName: string;
    userDetails: any;
    typeValue: string;
    loginId: any;insuranceid:any=null;
    productId: any;loginType:any=null;
    userType: any;productname:any=null;
    customerCode:any=null;customerName:any=null;
    public AppConfig: any = (Mydatas as any).default;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    menuSection: boolean = true;menu:any[]=[];typeList:any[]=[];
    parentSection:boolean = true;submenuList:any[]=[];
    typeName: any;
    branchValue: any;
    branchList: any[]=[];
    branchName: any;
    constructor(public layoutService: LayoutService,private router:Router) { 
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
        let type = sessionStorage.getItem('typeValue');
        if(type) this.typeValue = type;
        this.insuranceid = this.userDetails.Result.LoginBranchDetails[0].InsuranceId;
        this.getTypeList();

    }
    getTypeList() {
        let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (userDetails) {
          let ReqObj = {
            "InsuranceId": userDetails?.Result?.InsuranceId,
            "LoginId": userDetails?.Result?.LoginId,
            "BranchCode": userDetails?.Result?.BranchCode,
            "UserType": userDetails?.Result?.UserType
          }
          this.layoutService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if (data.Result) {
                this.typeList = data?.Result;
                
                if (this.typeValue == undefined || this.typeValue == 'undefined') {
                  this.typeValue = this.typeList[0].CodeDesc;
                  
                  sessionStorage.setItem('typeValue',this.typeValue);
                  //this.getMenuList();
                }
                let types = this.typeList.filter(ele => ele.CodeDesc == this.typeValue || ele.DisplayName == this.typeValue);
                console.log("Filtered Types",types,this.typeList,this.typeValue)
                if (types){this.finaliseTypeValue(types[0], 'direct');}
              }
            },
            (err: any) => { console.log(err); },
          );
        }
      }
      finaliseTypeValue(types, changeType) {
        
        if(types.CodeDesc!='B2C Broker') this.typeValue = types.CodeDesc;
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
          this.getMenuList(changeType);
        }
        else {
          sessionStorage.setItem('typeValue', this.typeValue);
          this.getMenuList(changeType);
        }
        if (changeType == 'direct') {
          this.getBranchList();
        }
        else {
          this.router.navigate(['/'])
        }
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
        this.branchList = branchList;
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
        if (this.userType == 'Issuer') {
          this.branchValue = branch.BranchCode;
          this.branchName = branch.BranchName;
          this.onBranchChange(type);
        }
        else {
          this.branchValue = branch.BrokerBranchCode;
          this.branchName = branch.BrokerBranchName;
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
    
          if (type == null){this.router.navigate(['/product']);}
        }
      }
      getMenuList(changeType) {
        let urlLink = `${this.CommonApiUrl}admin/getmenulist`
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        let ReqObj = {
          "LoginId": this.loginId,
          "UserType": this.userType,
          "SubUserType": this.typeValue,
          "InsuranceId": this.insuranceid,
          "ProductId": this.productId
        }
        this.layoutService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if (data.Result) {
              if(this.productId=='45'){
                if(this.typeValue=='low'){
                  let obj:any[]=[
                    {
                      "link": "/Home/life-risk-details",
                      "title": "Illustrate",
                      "icon": "fas fa-clipboard-list",
                      "id": "331",
                      "parent": "99999",
                      "orderby": 2,
                      "IsDesti": false,
                      "children": null
                    }
                  ];
                  data.Result= obj.concat(data.Result);
                }
              }
              this.layoutService.menuList = data?.Result;
               this.layoutService.MenuMasterList = data?.Result[2]?.children;
              let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
              if (userDetails) {
                userDetails.Result['menuList'] = data.Result;
                userDetails.Result['MenuMasterList'] = data.Result[2].children;
                sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                this.setMenuSection(data.Result);
               // this.setMaster(data.Result[2].children)
              }
            }
          },
    
          (err: any) => { console.log(err); },
        );
      }
    
      setMenuSection(menuList) {
        if (menuList.length != 0) {
          let menus = [], i = 0;
          for (let menu of menuList) {
            let entry: any;
            entry = {
              "label": menu.title,
              "icon": 'pi pi-car',
              "routerLink": [menu.link]
            }
            if (menu.children && menu.title!='Quote Register' && menu.title!='Login Creation' && menu.title!='Referral' && menu.title!='Portfolio' && menu.title!='Referal Management' && menu.title!='Masters') {

              entry['items'] = [];
              let j = 0;
              for (let child of menu.children) {
                let subEntry = {
                  "label": child.title,
                  "faIcon": child.icon,
                  "link": child.link
                }
                entry.items.push(subEntry);
                j += 1;
                console.log("Entry,", j)
                if (j == menu.children.length) {
                  console.log("Entry in Child", menu)
                  menus.push(entry);
                  i += 1;
                  if (i == menuList.length) {
                    this.model = [
                      {
                          label: 'UI Components',
                          items:menus
                      }
                  ]
                    this.menuSection = true;
                    this.parentSection = true;
                    this.submenuList = [];
                    console.log("Menusaaassss 3", this.menu)
                    console.log("Menusaaassss 2", this.menu)
                  }
                }
              }
            }
            else {
              entry["icon"] = menu.icon;
              if(menu.title=='Quote Register') entry["routerLink"] =  ['/quotation'];
              if(menu.title=='Login Creation') entry["routerLink"] =  ['/logincreation'];
              else if(menu.title=='Customer') entry["routerLink"] =  ['/customer'];
              else if(menu.title=='New Quote'){
                if(this.productId=='5')  entry['routerLink'] = ['/policyDetails']
                else entry['routerLink'] = ['/quotation/plan/quote-details']
              }
              else if(menu.title=='Referal Management') entry["routerLink"] =  ['/referralCases']
              else if(menu.title=='Customer') entry["routerLink"] =  ['/customer']
              else if(menu.title=='Referral') entry["routerLink"] =  ['/referral']
              else if(menu.title=='Portfolio') entry["routerLink"] =  ['/portfolio']
              else if(menu.title=='Copy Quote') entry["routerLink"] =  ['/quotation/plan/copy-quote']
              else if(menu.title=='Short Quote') entry["routerLink"] =  ['/quotation/plan/shortQuote']
              else if(menu.title=='Report') entry["routerLink"] =  ['/report']
              else if(menu.title=='Search') entry["routerLink"] =  ['/Search']
              else if(menu.title=='Masters') entry["routerLink"] =  ['/Admin/bankMaster']
              else if(menu.title=='Tira Vehicle Search'){entry["routerLink"] =  ['/tira-search']}
              else entry["routerLink"] =  [menu.link]
              entry['link'] = menu.link;
              menus.push(entry);
              i += 1;
              if (i == menuList.length) {
                this.menuSection = true;
                this.model= [
                    {
                        label: 'UI Components',
                        items:menus
                    }
                ]
                this.menu = menus;
                this.parentSection = true;
                this.submenuList = [];
                console.log("Menusaaassss", this.menu)
              }
            }
          }
          console.log("Final ", this.menu)
        }
        //this.menu = userDetails?.Result?.menuList;
        //}
        else {
          console.log("Final 2", this.menu)
          this.menuSection = false;
          this.menu = [];
          this.parentSection = true;
          this.submenuList = [];
        }
        //}
        //}
          console.log("Final Menu 2",this.model)
      }
    ngOnInit() {
        // this.model = [
        //     {
        //         label: 'UI Components',
        //         items: [
        //             { label: 'Tira Vehicle Search', icon: 'pi pi-car', routerLink: ['/tira-search'] },
        //             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        //             { label: 'Customer', icon: 'pi pi-users', routerLink: ['/customer'] },
        //             //{ label: 'Vehicle', icon: 'pi pi-compass', routerLink: ['/vehicle'] },
        //             { label: 'Quotation', icon: 'pi pi-inbox', routerLink: ['/quotation'] },
        //             { label: 'Referral', icon: 'pi pi-user-plus', routerLink: ['/referral'] },
        //             { label: 'Portfolio', icon: 'pi pi-credit-card', routerLink: ['/portfolio'] },
        //             { label: 'Policy', icon: 'pi pi-folder-open', routerLink: ['/policy'] },
        //             { label: 'Report', icon: 'pi pi-eject', routerLink: ['/report'] },
        //             { label: 'Logout', icon: 'pi pi-power-off', routerLink: ['/auth/login'] },
        //         ]
        //     },
        // ];
        console.log("Final Menu",this.model)
    }
}
