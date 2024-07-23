import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../service/shared.service';
import * as Mydatas from '../../../app-config.json';
import { AppComponent } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
    items!: MenuItem[];rangeValue:any=1;lang:any;
    products!: Product[];rangeList:any[]=[];
    chartData: any;chart2Data:any;chartOptions: any;
    subscription!: Subscription;userDetails:any=null;agencyCode:any=null;
    insuranceId:any=null;branchCode:any=null;productId:any=null;loginId:any=null;PackageYn:any=null;
    countList:any[]=[];rangeEndtValue:any=1;endorsementList:any[]=[];
    userType:any=null;subuserType:any=null;countryId:any=null;brokerbranchCode:any=null;
    notificationList: any;rangeNotifyValue:any=1;columns:any[]=[];
    constructor(private productService: ProductService,private datePipe: DatePipe,private appComp:AppComponent,
        private translate: TranslateService,private sharedService:SharedService, public layoutService: LayoutService,
        private messageService: MessageService) {
            this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
            console.log("UserDetails",this.userDetails);
            this.loginId = this.userDetails.Result.LoginId;
            this.userType = this.userDetails?.Result?.UserType;
            this.agencyCode = this.userDetails.Result.OaCode;
            this.branchCode = this.userDetails.Result.BranchCode;
            this.countryId = this.userDetails.Result.CountryId;
            this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
            this.productId = this.userDetails.Result.ProductId;
            this.PackageYn= this.userDetails.Result.PackageYn
            this.insuranceId = this.userDetails.Result.InsuranceId;
            this.subuserType = sessionStorage.getItem('typeValue');
            // this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            //     this.initChart();
            // });
            this.rangeList = [
                {"Code":1,"CodeDesc":"Last 30 Days","CodeDescLocal":"Últimos 30 dias"},
                {"Code":2,"CodeDesc":"Last 60 Days","CodeDescLocal":"Últimos 60 dias"},
                {"Code":3,"CodeDesc":"Last 90 Days","CodeDescLocal":"Últimos 90 dias"},
                {"Code":4,"CodeDesc":"Last 120 Days","CodeDescLocal":"Últimos 120 dias"},
            ];
            
    }

    ngOnInit() {
        this.showSuccessToast();
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        //this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.columns = ['Email','PhoneNo','Date','Content'];
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));}
        this.getCountDetails();
        this.getQuoteOverview();
        this.getEndorsementRecordList();
        this.getNotificationList();
       
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
    //For Date Based Policy, Quote Counts
    getCountDetails(){
        let startDate = null,endDate=null;
        let backDate = new Date();
        var d = backDate;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        startDate = this.datePipe.transform(new Date(year, month-1, day),'dd/MM/yyyy');
        endDate = this.datePipe.transform(new Date(),'dd/MM/yyyy');
        let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "ProductId": this.productId,
            "LoginId": this.loginId,
            "UserType": this.userType,
            "SubUserType": this.subuserType,
            "StartDate": startDate,
            "EndDate": endDate
        }
        let urlLink = `${this.CommonApiUrl}api/dashboard/v1/count`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
                    this.countList = data.Result;
            }
        });
    }
    getDisplayName(){
		if(this.lang=='en') return 'CodeDesc';
		else return 'CodeDescLocal'
	}
    getQuoteOverview(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        let startDate = null,endDate=null;
        let backDate = new Date();
        var d = backDate;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        startDate = this.datePipe.transform(new Date(year, month-this.rangeValue, day),'dd/MM/yyyy');
        endDate = this.datePipe.transform(new Date(),'dd/MM/yyyy');
        let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "ProductId": this.productId,
            "LoginId": this.loginId,
            "UserType": this.userType,
            "SubUserType": this.subuserType,
            "StartDate": startDate,
            "EndDate": endDate
        }
        let urlLink = `${this.CommonApiUrl}api/dashboard/v1/chart`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
                let chartList = data.Result;
                if(chartList.length!=0){
                    let i=0,labels:any[]=[],labels2:any[]=[],quoteCount:any[]=[],quote2Count:any[]=[],policyCount:any[]=[];
                    for(let chart of chartList){
                        if(chart.Date!=null && chart.Date!=''){
                            if(chart.QuoteCount!=0){
                                //Quote Based Lables
                                let Date = this.datePipe.transform(chart.Date,'dd/MM/yyyy');
                                if(labels.some(ele=>ele==Date)){
                                    let index = labels.findIndex(ele=>ele==Date);
                                    quoteCount[index] = quoteCount[index]+chart.QuoteCount;
                                }
                                else{
                                    labels.push(this.datePipe.transform(chart.Date,'dd/MM/yyyy'));
                                    quoteCount.push(chart.QuoteCount)
                                }
                            }
                            if(chart.QuoteCount!=0 || chart.PolicyCount!=0){
                                let Date = this.datePipe.transform(chart.Date,'dd/MM/yyyy');
                                if(labels2.some(ele=>ele==Date)){
                                    let index = labels2.findIndex(ele=>ele==Date);
                                    quote2Count[index] = quote2Count[index]+chart.QuoteCount;
                                    policyCount[index] = policyCount[index] + chart.PolicyCount;
                                }
                                else{
                                    labels2.push(this.datePipe.transform(chart.Date,'dd/MM/yyyy'));
                                    quote2Count.push(chart.QuoteCount)
                                    policyCount.push(chart.PolicyCount);
                                }
                            }
                            i+=1;
                            if(i==chartList.length){
                                this.chartData = {
                                    labels:labels,
                                    datasets: [
                                        {
                                            label: 'Quotes',
                                            data: quoteCount,
                                            fill: false,
                                            backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                                            borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                                            tension: .4
                                        },
                                    ]
                                };
                                this.chart2Data = {
                                    labels:labels2,
                                    datasets: [
                                        {
                                            label: 'Quotes',
                                            data: quote2Count,
                                            fill: false,
                                            backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                                            borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                                            tension: .4
                                        },
                                        {
                                            label: 'Policies',
                                            data: policyCount,
                                            fill: false,
                                            backgroundColor: documentStyle.getPropertyValue('--green-600'),
                                            borderColor: documentStyle.getPropertyValue('--green-600'),
                                            tension: .4
                                        }
                                    ]
                                };

                            }    
                        }
                    }
                }
            }
        });
    }
    getEndorsementRecordList(){
        let startDate = null,endDate=null;
        let backDate = new Date();
        var d = backDate;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        startDate = this.datePipe.transform(new Date(year, month-this.rangeEndtValue, day),'dd/MM/yyyy');
        endDate = this.datePipe.transform(new Date(),'dd/MM/yyyy');
        let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "ProductId": this.productId,
            "LoginId": this.loginId,
            "UserType": this.userType,
            "SubUserType": this.subuserType,
            "StartDate": startDate,
            "EndDate": endDate
        }
        let urlLink = `${this.CommonApiUrl}api/dashboard/v1/endorsement`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
                    this.endorsementList = data.Result;
            }
        });
    }
    getNotificationList(){
        let startDate = null,endDate=null;
        let backDate = new Date();
        var d = backDate;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        startDate = this.datePipe.transform(new Date(year, month-this.rangeNotifyValue, day),'dd/MM/yyyy');
        endDate = this.datePipe.transform(new Date(),'dd/MM/yyyy');
        let ReqObj = {
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "ProductId": this.productId,
            "LoginId": this.loginId,
            "UserType": this.userType,
            "SubUserType": this.subuserType,
            "StartDate": startDate,
            "EndDate": endDate
        }
        let urlLink = `${this.CommonApiUrl}api/dashboard/v3/chart`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
                this.notificationList = data.Result;
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    showSuccessToast() {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Operation completed successfully'
        });
      }
}
