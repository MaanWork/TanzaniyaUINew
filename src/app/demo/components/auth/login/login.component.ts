import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../Auth/auth.service';
import * as Mydatas from '../../../../app-config.json';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        
    `]
})
export class LoginComponent {
    messages: Message[] = [];
    password:string | undefined;
    password1:string | undefined;
    username:string | undefined;
    username1:string | undefined;
    password2:string | undefined;Email:any;username2:any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    userType: any;
    branchList: any[];  forget: boolean=false; loginfirst:any=false;
    branchValue: any;errorSection:boolean=false;
  messageText: any;pa:any;changePasswordSection: boolean;pass:any;
  temps: boolean;lang:any=null;
  passExpiredError: boolean;
    constructor(public layoutService: LayoutService, private router: Router,private loginService:LoginService,
        private authService: AuthService,private translate: TranslateService,private appComp:AppComponent) { 
          this.appComp.getLanguage().subscribe((res:any)=>{  
            this.lang=res;
            translate.setDefaultLang(res);
           });
           if(!this.lang){this.lang='en';translate.setDefaultLang('en');}
        }
    setLanguage(value){
          this.lang=value;
          sessionStorage.setItem('language',value);
          this.appComp.setLanguage(value);
    }
    getTranslateName(value){
      return 'LOGIN.Signintocontinue'
    }
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
                          this.passExpiredError = true;
                          this.username1 = this.username;
                          this.Forget('change','ChangePassword');
                          this.changepass('ChangePassword')
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

    cancel(v){
      this.errorSection=false;
      this.changePasswordSection=false;this.forget=false;
    }
    forgetSubmit(){
      const urlLink = `${this.CommonApiUrl}api/forgotpassword`;
      // const formData = this.ForgetForm.value;
  
      const reqData = {
          EmailId: this.Email,
          LoginId: this.username2
      };
  
      this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Result) {
            Swal.fire({
              title: '<strong>Forget Password </strong>',
              icon: 'info',
              html:
                `Temporary Password Notification Sent to <span class='text-success'>${this.Email}</span>`,
              showCancelButton: false,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Okay',
            })
            // this.ForgetForm.reset();
            //this.loginForm.reset();
            //this.loginSection = false;
            this.username2=null;this.Email=null;
           this.changePasswordSection = true;
           this.forget = false;
           this.loginfirst = true;
            this.temps=true;
          }
          if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
            const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
            let ulList:any='';
            let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
            for (let index = 0; index < errorList.length; index++) {
  
              const element = errorList[index];
               ulList +=`<li class="list-group-login-field">
                 <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                 <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
               </li>`
            }
            if(entry.length==0){
                Swal.fire({
                title: '<strong>Form Validation</strong>',
                icon: 'info',
                html:
                  `<ul class="list-group errorlist">
                    ${ulList}
                </ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-down"></i> Errors!',
                confirmButtonAriaLabel: 'Thumbs down, Errors!',
              })
            }
            else {
              console.log("entered multiiiiiiiiiiiiiiiiiiii");
              Swal.fire({
                  title: '<strong>Session Error</strong>',
                  icon: 'info',
                  html:
                    `<ul class="list-group errorlist">
                    ${ulList}
                </ul>`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:true,
  
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Proceed Login!',
                cancelButtonText: 'Cancel',
              })
              .then((result) => {
                if (result.isConfirmed) {
                // this.loginSection=false;
                this.submit('Y');
                this.username2=null;this.Email=null;
              }
  
              });
  
            }
          }
  
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
  
    }

    onsubmit() {

      let p=this.pa
      if(this.password2!=this.password1){
        const urlLink = `${this.CommonApiUrl}api/changepassword`;
        const reqData = {
          "LoginId": this.username1,
          "NewPassword": this.password1,
          "OldPassword": this.password2,
          "Type":this.pa
        };
        this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
          (data: any) => {
            let res: any = data;
            console.log(data);
            if (data.Result) {
              Swal.fire({
                title: '<strong>Change Password </strong>',
                icon: 'info',
                html:
                  `Password Updated Successfully`,
                //showCloseButton: true,
                //focusConfirm: false,
                showCancelButton: false,
  
                //confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
              })
              // this.changeForm.reset();
              // this.loginForm.reset();
              // this.loginSection = false;
              this.loginfirst = false;
              this.forget = false;
              this.changePasswordSection = false;
            }
            else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
              const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
              let ulList:any='';
               let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
               console.log("checked entry",entry);
                  for (let index = 0; index < errorList.length; index++) {
    
                    const element = errorList[index];
                     ulList +=`<li class="list-group-login-field">
                       <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                       <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                     </li>`
                  }
                 if(entry.length==0){
                    Swal.fire({
                     title: '<strong>Form Validation</strong>',
                     icon: 'info',
                     html:
                       `<ul class="list-group errorlist">
                        ${ulList}
                     </ul>`,
                     showCloseButton: true,
                     focusConfirm: false,
                     confirmButtonText:
                       '<i class="fa fa-thumbs-down"></i> Errors!',
                     confirmButtonAriaLabel: 'Thumbs down, Errors!',
                   })
                 }
            }
          });
      }
      else{
        console.log('pppppp',p)
        if(p){
          if( p =='ChangePassword' && this.password2=='' || this.password2==null || this.password2 == undefined){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                <li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>Old Password</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Old Password</div>
               </li>
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
          else if(p =='ForgotPassword' && this.password2=='' || this.password2==null || this.password2 == undefined){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                <li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>Temporary Password</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Temporary Password</div>
               </li>
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
          if( p =='ChangePassword' && this.password2 == this.password1){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                <li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>Password Details</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>New Password cannot Be same as Old Password</div>
               </li>
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
        }
  
        else if(this.password1=='' || this.password1==null || this.password1 == undefined){
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>New Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter New Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
        else{
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Mismatch Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Old Password Cannot Be New Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
  
      }
  
    }
    resetForm(){
      this.username=null;this.password=null;this.password1=null;
      this.username1=null;
      this.password2=null;
    }
    onCancelLogin(){
      this.username=null;this.password=null;
      this.errorSection=false;this.messages=[];
    }
    onBranchProceed() {
       
    }
    Forget(type,change){

      console.log(change)
      this.pa=change
        if(type=='change') {this.changePasswordSection = true;this.forget=false;this.loginfirst=true;this.errorSection=false}
        else  {this.changePasswordSection = false;this.forget=true;this.loginfirst=false;this.errorSection=false}
  
        if(change=='ChangePassword'){
          this.pass=true;
        }
        else if(change=='ForgotPassword'){
          this.pass=false;
        }
    }
    changepass(type){

      console.log(type)
      this.pa=type;
      if(type=='ChangePassword'){
        this.pass=true;
      }
      else{
      this.pass=false;
      }
  
    }
}
