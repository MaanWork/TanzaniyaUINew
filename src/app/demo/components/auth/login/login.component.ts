import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../Auth/auth.service';
import * as Mydatas from '../../../../app-config.json';
import { LoginService } from './login.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        
    `]
})
export class LoginComponent {
    messages: Message[] = [];
    password:string | undefined;
    username:string | undefined;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    userType: any;
    branchList: any[];
    branchValue: any;errorSection:boolean=false;
  messageText: any;
    constructor(public layoutService: LayoutService, private router: Router,private loginService:LoginService,
        private authService: AuthService) { }

    submit(val) {
        if(this.password && this.username) {
            let urlLink =  `${this.CommonApiUrl}authentication/login`;
            let ReqObj = {
                "LoginId":  this.username,
                "Password": this.password,
                "ReLoginKey": val
            }
            this.loginService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                    this.messages = [];
                  let res: any = data;
                  console.log(data);
                  if (data.Result) {
                    const Token = data?.Result?.Token;
                    this.authService.login(data);
                    this.authService.UserToken(Token);
                    sessionStorage.setItem('Userdetails', JSON.stringify(data));
                    sessionStorage.setItem('UserToken', Token);
                    sessionStorage.setItem('menuSection', 'navMenu');
                    this.userType = data.Result.UserType;
                    if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {
                      let currencyId=data?.Result?.CurrencyId;
                      console.log('IIIIIIIIIIIIIIII',currencyId);
                      sessionStorage.setItem('CurrencyidLogin',currencyId);
                      this.router.navigate(['/auth/login/product']);
                      let branchList: any[] = data?.Result?.LoginBranchDetails;
                      if (branchList.length != 0 && branchList.length > 1) {
                        console.log("Entered Branch", branchList)
                        // this.router.navigate(['/branch']);
                        
                      }
                      else {
                        this.branchList = branchList;
                        // if (this.userType == 'Issuer') {
                        //   this.branchValue = branchList[0].BranchCode;
                        //   this.onBranchProceed();
                        // }
                        // else {
                        //   this.branchValue = branchList[0].BrokerBranchCode;
                        //   this.onBranchProceed();
                        // }
                      }
                    }
                    else{
                      this.router.navigate(['/auth/login/product']);
                    }
                  }
                  else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
                    const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
                    let ulList:any='';
                    let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
                    console.log("checked entry",errorList);
                        if(res.ChangePasswordYn=='Y'){
                                
                        }
                        else{
                          if(entry.length==0){
                            this.errorSection = false;
                            for (let index = 0; index < errorList.length; index++) {
                              const element = errorList[index];
                              this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
                             
                            }
                          }
                          else{
                            this.errorSection = true;
                              this.messageText = errorList[0].Message;
                          }
                        }
                  }
                },
                (err: any) => {
                  alert("Error")
                  // console.log(err);
                },
              );
            // this.messages = [{ severity: 'success', summary: 'Success', detail: 'Signin Successfull' }];
            // setTimeout(() => {
            //     this.router.navigate(['/auth/login/product']);
            // }, 2000);
        } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
        }
    }
    onCancelLogin(){
      this.username=null;this.password=null;
      this.errorSection=false;this.messages=[];
    }
    onBranchProceed() {
       
    }
}
