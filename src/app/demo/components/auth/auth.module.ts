import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
