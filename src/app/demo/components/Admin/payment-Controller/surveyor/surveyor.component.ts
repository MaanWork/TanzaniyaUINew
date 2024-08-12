import { DatePipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-surveyor',
  templateUrl: './surveyor.component.html',
  styleUrls: ['./surveyor.component.scss']
})
export class SurveyorComponent implements OnInit{
  
  Sno: any;  public AppConfig: any = (Mydatas as any).default;
  public ReInsurance: any = this.AppConfig.ReInsurance;
  insuranceName: string;
  insuranceId: string;
  userDetails: any;
  UserType: any;
  ProductId: any;
  loginId: any;
  
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
     }
  ngOnInit(): void {
    
  }
}