import { DatePipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-re-insurance',
  templateUrl: './re-insurance.component.html',
  styleUrls: ['./re-insurance.component.scss']
})
export class ReInsuranceComponent implements OnInit{
  
  columnHeader: any[];
  columnHeader1: any[];
  columnHeader2: any[];
  columnHeader3: any[];
  visible1:boolean=false;
  visible2:boolean=false;
  visible3:boolean=false;
  visible4:boolean=false;
  insuranceName: string;
  insuranceId: string;
  activeMenu: string;
  userDetails: any;
  UserType: any;
  ProductId: any;
  MenuMasterList: any;
  loginId: any;
  CommonApiUrl1: any;
  branchList:any[]=[];
  branchValue: any;
  treatyTypeMasterList: any[]=[];
  TreatyName: any;
  TreatyNumber: any;
  EffectiveStartDate: any;
  Status: any;
  TreatyEditSection: boolean=false;
  LayerNo: any;
  treatyMasterList: any[]=[];
  AmendId: any;
  Cover: any;
  EffectiveDate: any;
  EndDate: any;
  LeadershipYn: any;
  NumberOfLines: any;
  OverallLimit: any;
  Product: any;
  RetentionPercentage: any;
  Section: any;
  StartDate: any;
  TreatyCode: any;
  TreatyPercentage: any;
  TreatyType: any;
  Year: any;
  constructor(private router:Router,private sharedService: SharedService,private layoutService:LayoutService,
    private datePipe:DatePipe,/*private toastrService:NbToastrService,*/) {
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.activeMenu="Bank Master";
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.UserType = this.userDetails?.Result?.UserType;
      this.ProductId = this.userDetails?.Result?.ProductId;
      //this.MenuMasterList = this.userDetails?.Result?.MenuMasterList;
     // console.log(this.userDetails?.Result?.MenuMasterList);
      
    //  console.log("MMListMMListMMList",this.MMList)
      this.loginId = user?.LoginId;
      if(user.AttachedCompanies){
        if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
      }
      //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }
  ngOnInit(): void {
    this.columnHeader=[
      'Treaty Name','Treaty Number','Start Date','Status','Action'
    ]
    this.columnHeader1=[
      'Treaty Code','Year','Product','Section','Cover','Treaty Percentage','Retention Percentage'
    ]
    this.columnHeader2=[
      'Reinsurance Company Id','Company Short Code','Address1','Address2','City','Country','Phone No','Product Name'
    ]
    this.columnHeader3=[
      'Retention Percentage','Commission Percentage','Amend Id','Effective Date','Start Date','End Date','Status'
    ]
    this.getTreatyTypeMaster();
    this.getAllTreatyType();
  }
  openPopup(type){
    if(type=='TTM'){
      this.visible1=true;
    }
    else if(type=='TM'){
      this.visible2=true;
    }
    else if(type=='RCM'){
      this.visible3=true;
    }
    else if(type=='RM'){
      this.visible4=true;
    }
  }

  getTreatyTypeMaster(){
    let ReqObj ={
      "UWYear": "2020"
    }
      let urlLink = `http://192.168.1.15:2321/master/treatyTypeMaster/list`;
    this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.TreatyTypeMasterList){
          this.treatyTypeMasterList = data?.TreatyTypeMasterList;
         
        }
      },
      (err) => { },
    
    );
    }
    
  getAllTreatyType(){
    let ReqObj ={
      "UWYear": ""
    }
      let urlLink = `http://192.168.1.15:2321/master/treatyMaster/list`;
    this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.TreatyMaster){
          this.treatyMasterList = data?.TreatyMaster;
         
        }
      },
      (err) => { },
    
    );
    }

    saveTreatyTypeMaster(){
      let layer;
     if(this.TreatyEditSection){
      layer =this.LayerNo
     }
     else{
      layer =this.treatyTypeMasterList.length+1;
     }
      let ReqObj ={
        "TreatyNumber": this.TreatyNumber,
        "LayerNo": layer,
        "TreatyName": this.TreatyName,
        "TreatyType": "string",
        "TreatyTypeDesc": "string",
        "EffectiveStartDate":this.EffectiveStartDate,
        "Status": this.Status
      }
        let urlLink = `http://192.168.1.15:2321/master/treatyTypeMaster/save`;
      this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Success=true){
            this.visible1=false;
            this.getTreatyTypeMaster();
          }
        },
        (err) => { },
      
      );
    }
    saveTreatyMaster(){
      let layer;
     if(this.TreatyEditSection){
      layer =this.LayerNo
     }
     else{
      layer =this.treatyTypeMasterList.length+1;
     }
      let ReqObj ={
        "TreatyCode": "string",
        "Product": "string",
        "Section": "string",
        "Cover": "string",
        "Year": "string",
        "TreatyCodeSetupList": [
          {
            "TreatyNumber": "string",
            "TreatyName": "string",
            "TreatyType": "string",
            "TreatyTypeDesc": "string",
            "TreatyPercentage": "string",
            "RetentionPercentage": "string",
            "OverallLimit": "string",
            "NumberOfLines": "string",
            "AmendId": "string",
            "EffectiveDate": "string",
            "StartDate": "string",
            "EndDate": "string",
            "Status": "string",
            "LeadershipYn": "string"
          }
        ]
      }
        let urlLink = `http://192.168.1.15:2321/master/treatyTypeMaster/save`;
      this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Success=true){
            this.visible1=false;
            this.getTreatyTypeMaster();
          }
        },
        (err) => { },
      
      );
    }
 
    treatyTypeMasterEdit(rowData,index){
      this.TreatyEditSection=true;
      this.visible1=true;
      let ReqObj ={
        "TreatyNumber": rowData.TreatyNumber,
        "TreatyName": rowData.TreatyName
      }
        let urlLink = `http://192.168.1.15:2321/master/treatyTypeMaster/edit`;
        this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
           this.TreatyNumber=data.TreatyNumber;
           this.TreatyName=data.TreatyName;
           let startDate;
           if(String(data.EffectiveStartDate).includes('/')) startDate = data.EffectiveStartDate
           else startDate = this.datePipe.transform(data.EffectiveStartDate,'dd/MM/yyyy');
          // this.treatyTypeMasterList['EffectiveStartDate']=startDate;
           this.EffectiveStartDate=startDate;
           this.Status=data.Status;
           this.LayerNo=data.LayerNo;
           
          
        },
        (err) => { },
      
      );
    }
    editTreatyMaster(rowData){
      this.visible2=true;
      this.TreatyEditSection=true;
      let ReqObj ={
        "TreatyCode": rowData.TreatyCode,
        "ProductId": rowData.Product,
        "SectionId": rowData.Section,
        "CoverId": rowData.Cover,
        "UWYear": rowData.Year,
      }
        let urlLink = `http://192.168.1.15:2321/master/treatyMaster/edit`;
        this.sharedService.onPostMethodWithOutAuth(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data){
          this.AmendId=data.AmendId;
          this.Cover=data.Cover;
          this.EffectiveDate=data.EffectiveDate;
          this.EndDate=data.EndDate;
          this.LeadershipYn=data.LeadershipYn;
          this.NumberOfLines=data.NumberOfLines;
          this.OverallLimit=data.OverallLimit;
          this.Product=data.Product;
          this.RetentionPercentage=data.RetentionPercentage;
          this.Section=data.Section;
          this.StartDate=data.StartDate;
          this.Status=data.Status;
          this.TreatyCode=data.TreatyCode;
          this.TreatyName=data.TreatyName;
          this.TreatyNumber=data.TreatyNumber;
          this.TreatyPercentage=data.TreatyPercentage;
          this.TreatyType=data.TreatyType;
          this.Year=data.Year;
        }
        },
        (err) => { },
      
      );
    }
}
