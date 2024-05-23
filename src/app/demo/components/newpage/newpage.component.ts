import { Component, OnInit, Input, Output,OnChanges,AfterViewInit,ViewChild} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
//import {NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-newpage',
  templateUrl: './newpage.component.html',
  styleUrls: ['./newpage.component.scss'],
})

export class NewComponent implements OnInit,OnChanges, AfterViewInit{
  
  StartDate:any;minDate:any;TemplateList:any[]=[];EndDate:any;bussinesstype:any;
  branchValue:any;branchList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  insuranceId: any;
  productId: any;
  tableData:any[]=[];
  quoteHeader:any[]=[];
  loginId: any;
  tableData1:any[]=[];
  show:boolean=false;
  quotesHeader:any[]=[];
  enddate: string;
  startDate: string;
  ProductName: string;
  dataSource: any;
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
  @ViewChild('paginatorSecond') paginatorSecond: MatPaginator;
  BrokerName: any;
  newlogin: any;
  newproductId: any;
  page: any;rowdata:any;
  ProductId: any;
  // @Output('Currency') Currency:any=sessionStorage.getItem('CurrencyidLogin');;
  constructor(private datePipe:DatePipe,public sharedService: SharedService,private router:Router){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
 this.minDate=new Date();
 this.insuranceId = this.userDetails.Result.InsuranceId;
 this.productId = this.userDetails.Result.ProductId;
 this.loginId = this.userDetails.Result.LoginId;
  }
    ngOnInit(): void {
    
    //   let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
    //   console.log('HHHHHHHHHHHH',CustomerObj);
      
    //   if (CustomerObj){
    //   this.newproductId=CustomerObj?.ProductId,
    //   this.ProductName=CustomerObj?.ProductName,
    //     this.bussinesstype=CustomerObj?.BusinessType,
    //     this.startDate=CustomerObj?.StartDate,
    //   this.enddate=CustomerObj?.EndDate,
    //   this.branchValue=CustomerObj?.BranchCode,
    //   this.newlogin=CustomerObj?.Login,
    //   this.page=CustomerObj?.page,
    //   console.log('ooooooooo',this.page);
    //   this.rowdata=CustomerObj?.rowData
    //   if(this.page=='new'){
    //     this.show=true;
    //     this.onTotal(this.rowdata,this.ProductName,this.newproductId);
    //   }
    // }
    let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
    console.log('HHHHHHHHHHHH',CustomerObj);
    let bussinesstype
    if (CustomerObj){
      bussinesstype=CustomerObj?.BusinessType;
      this.newlogin=CustomerObj?.Login;
    }
      if(bussinesstype!='NB2C'){
        this.onTotal();
      } 
      else{
        this.onTotalb2c();
      } 
 
    }

    getBranchList(type){
      // if(type=='change'){
      //   this.tableData=[];
      //   this.branchValue='';
      // }
      let ReqObj = {
        "InsuranceId":this.insuranceId
    
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.branchList = obj.concat(data?.Result);
          //if(!this.branchValue){ this.branchValue = "99999"; this.getVehicleUsage() }
          // let docObj = JSON.parse(sessionStorage.getItem('addVehicle'))
          // if(docObj){ this.branchValue = docObj?.branch;
          //   console.log('LLLLLLLLLL',this.branchValue);
          //      }
          // else{ this.branchValue='99999';}
        }
      },
      (err) => { },
    );
    }


    getBussinessType(type){
      let ReqObj = {
        "InsuranceId":this.insuranceId,
         "BranchCode": this.branchValue
      }
      let urlLink = `${this.CommonApiUrl}dropdown/adminportfoliotypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          this.TemplateList=data.Result
        }
      },
      (err) => { },
    );
    }
    getsearchlist(bussinesstype,productId){
          if(bussinesstype == 'N' || bussinesstype == 'C' || bussinesstype == 'E'){
            this.geteditList();
          }
          else if(bussinesstype == 'Q'){
            this.getQuotationList();
          }
          let quote={
            "bussinesstype":bussinesstype,
            "startDate":this.StartDate,
            "EndDate":this.EndDate
          }
          console.log('ssssssssss',this.StartDate,this.EndDate)
          sessionStorage.setItem('datedetials',JSON.stringify(quote));
    }
    geteditList(){
      this.tableData=[];
this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
this.enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");

      let ReqObj = {
        "InsuranceId":this.insuranceId,
         "BranchCode": this.branchValue,
         "BusinessType":this.bussinesstype,
          "StartDate":this.startDate,
         "EndDate":this.enddate,
         "LoginId":"",
         "ProductId": ""//this.productId
      }
      let urlLink = `${this.CommonApiUrl}api/admin/portfoliodashboard`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          this.tableData=data.Result;
          console.log('KKKKKKKKKK',this.bussinesstype);
          console.log('LLLLLLLLLL',this.tableData);
        }
      },
      (err) => { },
    );
    }
    getQuotationList(){
      this.tableData=[];
      this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
      this.enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
            let ReqObj = {
              "InsuranceId":this.insuranceId,
               "BranchCode": this.branchValue,
               "BusinessType":this.bussinesstype,
                "StartDate":this.startDate,
               "EndDate":this.enddate,
               "LoginId":"",
               "ProductId": ""//this.productId,
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliopendings`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              if(data?.Result){
                this.tableData=data.Result;
                console.log('Bussiness Type',this.bussinesstype);
                console.log('Quotation',this.tableData);
              }
            },
            (err) => { },
          );
          }
          getPolicyItems(rowData){
            let entry:MenuItem[] =  [{
              items: [{
                  label: 'Schedule',
                  icon: 'pi pi-file-pdf',
                  command: () => {
                        this.onGetSchedule(rowData)
                  }
              },
              {
                label: 'View Quote Details',
                icon: 'pi pi-eye',
                command: () => {
                    this.onViews(rowData)
                }
              },
            ]}
            ];

            return entry;
          }
      onTotal(){
      this.show=true;
      let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
      console.log('HHHHHHHHHHHH',CustomerObj);
      
      if (CustomerObj){
      this.newproductId=CustomerObj?.ProductId,
      this.ProductName=CustomerObj?.ProductName,
      this.bussinesstype=CustomerObj?.BusinessType,
      this.startDate=CustomerObj?.StartDate,
      this.enddate=CustomerObj?.EndDate,
      this.branchValue=CustomerObj?.BranchCode,
      this.newlogin=CustomerObj?.LoginId,
      this.page=CustomerObj?.page,
      this.BrokerName=CustomerObj?.BrokerName,
      console.log('ooooooooo',this.page);
      this.rowdata=CustomerObj?.rowData
      }
          
            console.log('PPPPPPPPPP',this.ProductName);
            // this.newproductId=ProductId;
            if(this.bussinesstype == 'N' || this.bussinesstype == 'C' || this.bussinesstype == 'E'){
              this.quotesHeader=[
                // { key: 'BrokerName', display: 'Broker Name' },
                {  header: 'Quote No' },
                { header: 'Policy No' },
                {  header: 'Customer Name' },
                {  header: 'Login ID' },
                {  header: 'Policy StartDate' },
                {  header: 'Policy EndDate' },
                { header: 'Currency' },
                { header: 'Premium'},
                { header: 'Action'},
                // {
                //   key: 'actions',
                //   display: 'Schedule / View',
                //   config: {
                //     isViews:true,
                //     isEdit: true,
                    
                //   },
                // },
                // { key: 'OverallPremiumLc', display: 'Premium' }, 
                // { key:'StatusDesc', display:'Status Desc'},
                // {key:'UserType',display:'UserType'}
              ]
            }
        
              if(this.bussinesstype == 'Q'){
              this.quotesHeader=[
                { header: 'Request ReferenceNo' },
                // { key: 'BrokerName', display: 'Broker Name' },
                {  header: 'Quote No' },
                {  header: 'Policy No' },
                {  header: 'Customer Name' },
                {  header: 'Login ID' },
                {  header: 'Policy StartDate' },
                {  header: 'Policy EndDate' },
                // { key: 'OverallPremiumLc', display: 'Premium' }, 
                {
                  header: 'Premium'
                },
                {
                  header: 'Action'
                },
                // { key:'StatusDesc', display:'Status Desc'},
                // {key:'UserType',display:'UserType'}
              ]
            }
           
              //  let startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
              //  let enddate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
               let ReqObj={
                "InsuranceId":this.insuranceId,
              "BusinessType": this.bussinesstype,
               "StartDate":this.startDate,
              "EndDate":this.enddate,
              "BranchCode":this.branchValue,
              "LoginId":this.newlogin,
              "ProductId": this.newproductId,
              "Limit":"0",
              "Offset":"1000"
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliogrid`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if(data?.Result){
                  this.tableData1=data.Result;
                  console.log('Bussiness Type',this.tableData1);
                  
                }
              },
              (err) => { },
            );
           
            let quote={
              "bussinesstype":this.bussinesstype,
              "startDate":this.startDate,
              "EndDate":this.enddate
            }
            sessionStorage.setItem('datedetials',JSON.stringify(quote));
          }
          onTotalb2c(){
            this.show=true;
            let CustomerObj = JSON.parse(sessionStorage.getItem('editdetails'));
      console.log('HHHHHHHHHHHH',CustomerObj);
      
      if (CustomerObj){
      this.newproductId=CustomerObj?.ProductId,
      this.ProductName=CustomerObj?.ProductName,
        this.bussinesstype=CustomerObj?.BusinessType,
        this.startDate=CustomerObj?.StartDate,
      this.enddate=CustomerObj?.EndDate,
      this.branchValue=CustomerObj?.BranchCode,
      this.newlogin=CustomerObj?.LoginId,
      this.page=CustomerObj?.page,
      this.BrokerName=CustomerObj?.BrokerName,
      console.log('ooooooooo',this.page);
      this.rowdata=CustomerObj?.rowData
      }
            console.log('PPPPPPPPPP',this.ProductName);
              this.quotesHeader=[
                 {key:'RequestReferenceNo',display: 'Request ReferenceNo' },
                // { key: 'BrokerName', display: 'Broker Name' },
                { key: 'QuoteNo', display: 'Quote No' },
                { key: 'PolicyNo', display: 'Policy No' },
                { key: 'CustomerName', display: 'Customer Name' },
                { key: 'BrokerLoginId', display: 'Login ID' },
                { key: 'PolicyStartDate', display: 'Policy StartDate' },
                { key: 'PolicyEndDate', display: 'Policy EndDate' },
                // { key: 'OverallPremiumLc', display: 'Premium' }, 
                {
                  key: 'edit',
                  display: 'Premium',
                  config: {
                    isPremiums:true,
                  },
                },
                {
                  key: 'actions',
                  display: 'Action',
                  config: {
                    isPolicyConfig: true,
                  },
                },
              ]
               let ReqObj={
                "InsuranceId":this.insuranceId,
              "BusinessType": this.bussinesstype,
               "StartDate":this.startDate,
              "EndDate":this.enddate,
              "BranchCode":this.branchValue,
              "LoginId":this.newlogin,
              "ProductId": this.newproductId,
              "Limit":"0",
              "Offset":"1000"
            }
            let urlLink = `${this.CommonApiUrl}api/admin/portfoliob2cgrid`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                if(data?.Result){
                  this.tableData1=data.Result;
                  console.log('Bussiness Type',this.tableData1);
                  
                }
              },
              (err) => { },
            );
           
            let quote={
              "bussinesstype":this.bussinesstype,
              "startDate":this.startDate,
              "EndDate":this.enddate
            }
            sessionStorage.setItem('datedetials',JSON.stringify(quote));
          }

          ongetBack(){
           
            let quoteObj = {
             "Businesstype":this.bussinesstype,
             "StartDate":this.startDate,
             "EndDate":this.enddate,
             "BranchCode":this.branchValue
            }
            //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
            sessionStorage.setItem('datedetails',JSON.stringify(quoteObj));
            this.router.navigate(['/ApproverPortfolio']);
          }
          ngOnChanges() {
            // this.dataSource = new MatTableDataSource(this.tableData);
            // this.dataSource.paginator = this.paginatorFirst;
          }
           ngAfterViewInit() {
          //  this.dataSource.paginator = this.paginatorFirst;
          //   this.dataSource.paginator = this.paginatorSecond;
           }

           onViews(rowData){
            console.log('OOOOOOOOOOO',rowData);
        
            let quoteObj = {
              "QuoteNo": rowData.QuoteNo,
              "ProductId":rowData.ProductId,
              // "PolicyNo":null,
              // "from":'Existing',
              "CustomerReferenceNo": rowData.CustomerReferenceNo,
              "RequestReferenceNo": rowData.RequestReferenceNo,
              "pageFrom": 'Portfolio',
              "CustomerName":rowData.CustomerName,
              "PolicyNo":rowData.PolicyNo,
              "ProductName":rowData.ProductName,
              //"QuoteNo":rowData.QuoteNo
            }
            //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
            sessionStorage.setItem('editCustomer',JSON.stringify(quoteObj));
            this.router.navigate(['/portfolio/motorDocuments']);
           }

           onGetSchedule(rowData){
            let ReqObj = {
              "QuoteNo":rowData.QuoteNo
            }
            let urlLink = `${this.CommonApiUrl}pdf/policyform`;
            // let ReqObj = {
            //   "QuoteNo": rowData.QuoteNo,
            //   "ReportId": "1"
            // }
            // let urlLink = `${this.CommonApiUrl}pdf/getSchedule`;
            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                if(data?.Result?.PdfOutFile){
                    this.downloadMyFile(data.Result.PdfOutFile);
                }
                else{
                  Swal.fire({
                    title: '<strong>Schedule Pdf</strong>',
                    icon: 'error',
                    html:
                      `No Pdf Generated For this Policy`,
                    //showCloseButton: true,
                    //focusConfirm: false,
                    showCancelButton: false,
        
                    //confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancel',
                  })
                }
              },
              (err) => { },
            );
          }

          downloadMyFile(data) {
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', data);
            link.setAttribute('download', 'Schedule');
            document.body.appendChild(link);
            link.click();
            link.remove();
          }
          onCreditdownload(rowData){
            console.log('KKKKKKKKKKK',rowData.QuoteNo);
             let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`
            // let ReqObj = {
            //   "QuoteNo": rowData.QuoteNo,
            //   "ReportId": "2"
            // }
            // let urlLink = `${this.CommonApiUrl}pdf/getSchedule`;
            this.sharedService.onGetMethodSync(urlLink).subscribe(
              (data: any) => {
                console.log(data);
                const link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.setAttribute('href', data?.Result.PdfOutFile);
                link.setAttribute('download','Creditpdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
            },
              (err) => { },
            );
          }
        
          onDebitdownload(rowData){
            let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`
            console.log('KKKKKKKKKKK',rowData.QuoteNo);
            // let ReqObj = {
            //   "QuoteNo": rowData.QuoteNo,
            //   "ReportId": "2"
            // }
            // let urlLink = `${this.CommonApiUrl}pdf/getSchedule`;
            this.sharedService.onGetMethodSync(urlLink).subscribe(
              (data: any) => {
                console.log(data);
                const link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.setAttribute('href', data?.Result.PdfOutFile);
                link.setAttribute('download','DebitPdf');
                document.body.appendChild(link);
                link.click();
                link.remove();
            },
              (err) => { },
            );
          }
 }

