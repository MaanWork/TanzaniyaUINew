import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import { ProductData } from './product';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-customer-create-form',
  templateUrl: './customer-create-form.component.html',
  styles : [`
  .card .form-container .flex-column { min-width: 200px; }
  .card .form-container div label { font-weight: bold; }
  `],
  providers: [MessageService, ConfirmationService,TranslateService] 
})
export class CustomerCreateFormComponent implements OnInit {
  messages: Message[] = [];
  items:MenuItem[] | undefined;
  customerTypes:any[] | undefined;
  currentCustomerType:string = 'personal';
  ownerCategoryOptions: any[] | undefined;
  selectedOwnerCategory: any | undefined;
  statusOptions: string = '';maxTextLen:any='10';
  date: Date | undefined;
  userDetails:any=null;maxDate:any=null;
  maxDobDate:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  loginType:any=null;userType:any=null;quoteNo:any=null;
  brokerbranchCode:any=null;typeValue:any=null;
  statusList:any[]=[];notificationList:any[]=[];
  taxExcemptedList:any[]=[];policyHolderList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  customerReferenceNo:any=null;titleList:any[]=[];
  regionList:any[]=[];stateList:any[]=[];enableFieldsList:any[]=[];
  countryList:any[]=[];genderList:any[]=[];
  occupationList:any[]=[];mobileCodeList:any[]=[];
  businessTypeList:any[]=[];productItem:any=null;endorsementName:any=null;
  policyHolderTypeList:any[]=[];dob:any=null;stateOptions: any[]=[];
  value1: string = 'en';final1: boolean=false;final2: any=false;final3: any=false;final4: any=false;final5: any=false;
  final6: any=false;final7: any=false;endorseCategory:any=null;
  shows: boolean=false;final:boolean=false;endorsementId:any=null;
	Idnumber: any;shortQuoteYN:boolean=false;enableCustomerDetails:boolean=false;
	Idnumber1: any;endorsementSection:boolean=false;
	Idnumber2: any;lang:any=null;
  constructor(private confirmationService: ConfirmationService, private sharedService: SharedService,private datePipe: DatePipe,
    private messageService: MessageService, private router: Router, private translate: TranslateService,private appComp:AppComponent,
    private primeNGConfig: PrimeNGConfig) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
	  let type = sessionStorage.getItem('QuoteType')
	  if(type) this.shortQuoteYN = true;
    	this.maxDate = new Date();
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		this.appComp.getLanguage().subscribe((res:any)=>{  
			if(res) this.lang=res;
			else this.lang='en';
			this.translate.setDefaultLang(this.lang);
		  });
		if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
		else this.lang='en';
		sessionStorage.setItem('language',this.lang)
		this.translate.setDefaultLang(sessionStorage.getItem('language'));
		this.setHeaders();}
     	this.maxDobDate = new Date(year - 18,month, day );
		this.loginId = this.userDetails.Result.LoginId;
		this.agencyCode = this.userDetails.Result.OaCode;
		this.branchCode = this.userDetails.Result.BranchCode;
		this.productId = this.userDetails.Result.ProductId;
		this.insuranceId = this.userDetails.Result.InsuranceId;
		this.loginType = this.userDetails.Result.LoginType;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue')
		this.stateOptions = [
			{ label: 'English', value: 'en' },
			{ label: 'Portugese', value: 'po' },
			// { label: 'French', value: 'fr' },
			// { label: 'Telugu', value: 'te' },
			// { label: 'Urdu', value: 'ur' },
		  ];
		  // this language will be used as a fallback when a translation isn't found in the current language
		 
		
    	this.statusList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Active', Code: 'Y' },
			{ CodeDesc: 'DeActive', Code: 'N' },
			{ CodeDesc: 'Pending', Code: 'P' }
		];
		this.notificationList = [
			{ CodeDesc: 'Select', Code: '','CodeDescLocal':'Selecione' },
			{ CodeDesc: 'SMS', Code: 'Sms','CodeDescLocal':'Sms -P' },
			{ CodeDesc: 'Mail', Code: 'Mail','CodeDescLocal':'E-mail -P' },
			{ CodeDesc: 'Whatsapp', Code: 'Whatsapp','CodeDescLocal':'Whatsapp -P' }
		];
		this.taxExcemptedList = [
			{ CodeDesc: '-Select-', Code: '','CodeDescLocal':'Selecione' },
			{ CodeDesc: 'Yes', Code: 'Y','CodeDescLocal':'Sim' },
			{ CodeDesc: 'No', Code: 'N','CodeDescLocal':'Não'  }
		];
    let refNo = sessionStorage.getItem('customerReferenceNo');
		if (refNo) {
			 this.productItem = new ProductData()
			this.customerReferenceNo = refNo;
		}
		else {
			
			this.customerReferenceNo = null;
			this.productItem = new ProductData()
			this.productItem.IdType='1';
		}
      //this.getTitleList();
      this.getCountryList();
      this.getGenderList();
      //this.getOccupationList();
      this.getBusinessTypeList();
      this.getMobileCodeList();
      this.getPolicyHolderList('change');
	  if(this.insuranceId=='100004'){
		this.getType3('direct');
	
	}
		else {
			this.getTitleList();
		}
    }
	getHeaders(codeDesc){
		return 'HOME.'+codeDesc
	}
	setHeaders(){
		if(this.lang=='en'){this.items = [{ label: 'Home', routerLink:'/' }, {label:'Customer', routerLink: '/customer'}, { label: 'Create Customer' }];}
		else if(this.lang=='po'){this.items = [{ label: 'Lar', routerLink:'/' }, {label:'Cliente', routerLink: '/customer'}, { label: 'Criar cliente' }];}
	}
	onLanguageChange(item: any) {
		this.translate.use(item.value);
	}
	getTitleList(){
		let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode
			}
			let urlLink = `${this.CommonApiUrl}dropdown/title`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					if (data.Result) {
						let obj = [{ "Code": '', "CodeDesc": "-Select-", 'CodeDescLocal':'-Selecione-' }]
						this.titleList = obj.concat(data.Result);
						
					}
				},
				(err) => { },
			);
	}
	ngOnView(){
		
	}
	ngOnInit(): void {
		let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
		if(endorseObj){
			this.endorsementSection = true;
			this.endorseCategory = endorseObj.Category;
			this.endorsementName = endorseObj?.EndtName;
			this.enableFieldsList = endorseObj.FieldsAllowed;
			this.endorsementId = endorseObj.EndtTypeId;
			if(endorseObj.QuoteNo) this.quoteNo = endorseObj.QuoteNo;
			if(this.endorsementId!=42 && this.endorsementId!=842){
			this.enableCustomerDetails = this.enableFieldsList.some(ele=>ele=='customerName' || ele=='Title');
			}
		}
		else{
			this.endorsementSection = false;this.enableCustomerDetails = false;
		}
		this.primeNGConfig.ripple = true;
		this.ownerCategoryOptions = [{name: 'Category', code: 'category'}];
		this.customerTypes = [{label: 'Personal', value: 'personal'}, {label: 'Corporate', value: 'corporate'}];
		
	}
	getDisplayName(){
		if(this.lang=='en') return 'CodeDesc';
		else return 'CodeDescLocal'
	}
  	public async onSubmit(data) {
		console.log("Total Data", data);
		this.messages=[];
		let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
		//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
		// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
		//  }
		if(this.insuranceId!='100004'){
			if(data.CityName!=null && data.CityName!='') cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
		}
		else if(this.insuranceId=='100004'){
			if(data?.districtcode==null || data?.districtcode=='' || data?.districtcode==undefined){
				if(data.CityName!='' && data.CityName!=null && data.CityName!='99999'){
					cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else if(data.CityName!='99999'){
				if(data.CityName!='' && data.CityName!=null){
					cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else cityName=data?.districtcode;
		}
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		if(this.productItem.IdType != 2 && this.productItem.IdType != '2'){
			
			data.dobOrRegDate = new Date(year - 18,month, day-2 );
		}
		if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
		if (data.dobOrRegDate != undefined && data.dobOrRegDate != null && data.dobOrRegDate != '') {
			if(String(dobOrRegDate).includes('/')){
				dobOrRegDate = data.dobOrRegDate;
			}
			else dobOrRegDate = this.datePipe.transform(data.dobOrRegDate,'dd/MM/yyyy')
		}
		if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
		//this.productItem.TaxExemptedId;
		if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
		console.log("Appointment Date", appointmentDate);
		console.log('mobile code', this.productItem.MobileCode)
		let codes = this.productItem.MobileCode
		if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
			
			let code = this.mobileCodeList.find(ele => ele.Code == codes)
			if(code){ 
				if(code?.label) this.productItem.MobileCodeDesc = code.label;
				else this.productItem.MobileCodeDesc = '';
			}
			else this.productItem.MobileCodeDesc = '';
		}
		if(data.vrngst=='' || data.vrngst== undefined || data.vrngst==null){data.vrngst=null};
		if(this.loginType=='B2CFlow') data.Clientstatus = 'Y';
		let type = null;
		if(this.productId=='46' && (this.productItem?.PolicyHolderTypeid==null || this.productItem?.PolicyHolderTypeid=='' || this.productItem?.PolicyHolderTypeid==undefined)){
		  	if(this.productItem.IdType==1 || this.productItem.IdType=='1'){ this.productItem.PolicyHolderTypeid = '3';}
			else{this.productItem.PolicyHolderTypeid = '6';}
			var minm = 1000000000; 
    		var maxm = 9876543210; 
			this.productItem.IdNumber = Math.floor(Math 
				.random() * (maxm - minm + 1)) + minm; 
		}
		if(this.productItem.IdType=='2' || this.productItem.IdType==2){
      		if(dobOrRegDate=='' || dobOrRegDate==null || dobOrRegDate==undefined || (new Date(dobOrRegDate)).setHours(0,0,0,0)<=new Date().setHours(0,0,0,0) || dobOrRegDate==null || dobOrRegDate==''){
			  var d= new Date();
			  var year = d.getFullYear();
			  var month = d.getMonth();
			  var day = d.getDate();
			  var sysDay = new Date(year,month, day-2 );
			  dobOrRegDate = this.datePipe.transform(sysDay,'dd/MM/yyyy');
			}
		}
		if(data.IdType=='1'){
			if(this.productItem?.PolicyHolderTypeid=='1'){
			  if(this.productItem.IdNumber!=null && this.productItem.IdNumber!=''){
				let year = this.productItem.IdNumber.substr(0, 4);
				let month = this.productItem.IdNumber.substr(4,2);
				let day = this.productItem.IdNumber.substr(6,2);
				if(year!=null && year!=undefined && month!=null && month!=undefined && day!=null && day!=undefined){
				  dobOrRegDate = day+'/'+month+'/'+year;
				}
			  }
			}
		  }
		let policyid:any;
		if(data?.PolicyHolderTypeid == '1'){
         policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
		}
		else{
			policyid = data?.IdNumber;
		}
		
		let ReqObj = {
			"BrokerBranchCode": this.brokerbranchCode,
			"CustomerReferenceNo": this.customerReferenceNo,
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId": "5",
			"AppointmentDate": appointmentDate,
			"Address1": data?.Address1,
			"Address2": data?.Address2,
			"BusinessType": businessType,
			"CityCode": data?.CityName,
			"CityName": cityName,
			"ClientName": data?.ClientName,
			"Clientstatus": data?.Clientstatus,
			"CreatedBy": this.loginId,
			"DobOrRegDate": dobOrRegDate,
			"Email1": data?.EmailId,
			"Email2": null,
			"Email3": null,
			"Fax": null,
			"Gender": data?.Gender,
			"IdNumber": policyid,
			"IdType": data.IdType,
			"IsTaxExempted": data.isTaxExempted,
			"Language": "1",
			"MobileNo1": data.MobileNo,
			"MobileNo2": null,
			"MobileNo3": null,
			"Nationality": data.Country,
			"Occupation": data?.Occupation,
			"OtherOccupation":data?.occupationdesc,
			"Placeofbirth": "Chennai",
			"PolicyHolderType": data.IdType,
			"PolicyHolderTypeid": data?.PolicyHolderTypeid,
			"PreferredNotification": data?.PreferredNotification,
			"RegionCode": "01",
			"MobileCode1": data?.MobileCode,
			"WhatsappCode": data?.MobileCode,
			"MobileCodeDesc1": "1",
			"WhatsappDesc": "1",
			"WhatsappNo": data.MobileNo,
			"StateCode": data?.state,
			"StateName": stateName,
			"Status": data?.Clientstatus,
			"Street": data?.Street,
			"Type":type,
			"TaxExemptedId": taxExemptedId,
			"TelephoneNo1": data?.TelephoneNo,
			"PinCode": data?.PinCode,
			"TelephoneNo2": null,
			"TelephoneNo3": null,
			"Title": data.Title,
			"VrTinNo": data.vrngst,
			"SaveOrSubmit": 'Submit',
			"MiddleName":data?.MiddleName,
			"LastName":data?.LastName,
			"Zone":"1",
		}
		let quoteNo = sessionStorage.getItem('quoteNo'),refNo = null;
		if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
				
				ReqObj['Type'] = 'b2c';
				if(quoteNo!=undefined) ReqObj['QuoteNo'] = quoteNo;
				else ReqObj['QuoteNo'] = null;
				ReqObj['RequestReferenceNo'] = sessionStorage.getItem('quoteReferenceNo')
		}
		// if(this.endorsementSection){
		// 	ReqObj['EndtStatus'] = this.endtStatus;
		// 	ReqObj['EndorsementTypeDesc'] = this.endorsementName;
		// 	ReqObj['EndorsementType'] = this.endorsementId;
		// 	ReqObj['EndtCategoryDesc'] = this.endorseCategory;
		// 	ReqObj['EndtCount'] = this.endtcount;
		// 	ReqObj['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
		// 	ReqObj['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
		//   }
		let urlLink = `${this.CommonApiUrl}api/savecustomerdetails`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				let res: any = data;
				console.log(data);
				if (data.ErrorMessage.length != 0) {
					if (res.ErrorMessage) {
						const errorList: any[] = res.ErrorMessage;
            				let ulList:any='';
							for (let index = 0; index < errorList.length; index++) {
							const element = errorList[index];
							//this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
							this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
							console.log('Final Messages',this.messages)
							
							 }
							// Swal.fire({
							// title: '<strong>Form Validation</strong>',
							// icon: 'info',
							// html:
							// 	`<ul class="list-group errorlist">
							// 	${ulList}
							// </ul>`,
							// showCloseButton: true,
							// focusConfirm: false,
							// confirmButtonText:
							// 	'<i class="fa fa-thumbs-down"></i> Errors!',
							// confirmButtonAriaLabel: 'Thumbs down, Errors!',
							// })
						}
				}
				else {
					// if(this.endorsementSection){
					// 	this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);	
					// }
					// else{
						let quoteNo = sessionStorage.getItem('quoteNo');
						if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2' && quoteNo!=undefined && quoteNo!=null)){
							this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
						}
						else if(sessionStorage.getItem('VechileDetails')){
							sessionStorage.setItem('customerReferenceNo',data.Result.SuccessId);
							this.router.navigate(['/policyDetails']);
						}
						else if(sessionStorage.getItem('QuoteType') || this.endorsementSection){
						  if(this.productId=='5')	this.router.navigate(['/policyDetails']);
						  else this.router.navigate(['/quotation/plan/quote-details']);
						}
						else this.router.navigate(['/customer/'])
					//}
				}
			},

			(err: any) => { console.log(err); },
		);
	}
	submit() {
		this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Added Successfully' });
	}
	getPolicyHolderList(type){
		let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode
			}

			let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.policyHolderList = data.Result;
								let defaultRow = []
								this.policyHolderList = defaultRow.concat(this.policyHolderList);
			}
		});  
	}
	getPolicyIdTypeList(type) {
			let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode,
				"PolicyTypeId": this.productItem.IdType
			}
			let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						//this.holderTypeValue = null;
						this.policyHolderTypeList = data.Result;
						let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
						this.policyHolderTypeList = defaultRow.concat(this.policyHolderTypeList)
						//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
						if (type == 'change'){this.dob = "";this.productItem.PolicyHolderTypeid='';
						//this.productItem.IdNumber=null
					}
					}
				},
				(err) => { },
			);
	}
	getGenderList() {
			let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode,
			}
			let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.genderList = data.Result;
						let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
						this.genderList = defaultRow.concat(this.genderList);
						if(this.insuranceId=='100004'){
							this.getOccupationLists('direct');
						}
						else {
							this.getOccupationList();
						}
						
						//this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
						
					}
				},
				(err) => { },
			);
	}
	getCountryList() {
			let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode
			}
			let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.countryList = data.Result;
								let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
								this.countryList = defaultRow.concat(this.countryList);
								//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[6].props.options = defaultRow.concat(this.countryList);
								
						//this.getGenderList();
					}
				},
				(err) => { },
			);
	}
	getOccupationList(){
		let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.occupationList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
							this.occupationList = defaultRow.concat(this.occupationList)
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[0].props.options = defaultRow.concat(this.occupationList);
							
							//this.getBusinessTypeList();
				}
			},
			(err) => { },
		);
	}
	getBusinessTypeList(){
		let ReqObj = {
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode,
			}
			let urlLink = `${this.CommonApiUrl}dropdown/businesstype`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.businessTypeList = data.Result;
						let defaulObj = [{ 'CodeDesc': '-Select-', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
						this.businessTypeList = defaulObj.concat(this.businessTypeList);
						//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[10].props.options = defaulObj.concat(this.businessTypeList);
						
						
					}
				},
				(err) => { },
			);
	}
	getMobileCodeList() {
			let ReqObj = { "InsuranceId": this.insuranceId }
			let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {

						let obj = [{ "Code": '', "CodeDesc": "-Select-", 'CodeDescLocal':'-Selecione-' }]
						this.mobileCodeList = obj.concat(data.Result);
								if (this.customerReferenceNo) {
									this.setValues();
								}
								else {
									this.productItem = new ProductData();
									this.productItem.Clientstatus = 'Y';
									this.productItem.isTaxExempted = 'N'; 
									this.productItem.PreferredNotification = 'Sms';
									this.productItem.Gender = '';
									this.productItem.PolicyHolderTypeid = '';
									this.productItem.IdType = '1';
									if(this.mobileCodeList.length!=0 && this.mobileCodeList.length>1){
										this.productItem.MobileCode = this.mobileCodeList[1].Code;
									}
									if(this.countryList.length!=0 && this.countryList.length>1){
										this.productItem.Country = this.countryList[1].Code;
											this.getRegionList('change');
									}
									this.productItem.state = '';
									this.productItem.CityName = '';
									this.productItem.Occupation = '';
									this.productItem.BusinessType='';
									this.productItem.Title='';
									this.getPolicyIdTypeList('change');
									if(sessionStorage.getItem('VechileDetails')){
										let motorDetails = JSON.parse(sessionStorage.getItem('VechileDetails'));
										this.productItem.ClientName = motorDetails.ResOwnerName;
										this.productItem.Title = '1';
										this.onTitleChange('direct');
									}
								}

					}
				},
				(err) => { },
			);
	}
	getStateList(type) {
			let ReqObj = {
				"CountryId": this.productItem.Country,
				"RegionCode": this.productItem.state
			}
			let urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
			this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Result) {
						this.stateList = data.Result;
								let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
								//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[8].props.options = defaultRow.concat(this.stateList);
								this.stateList = defaultRow.concat(this.stateList)
								if(type=='change'){ this.productItem.CityName = '';}
								// this.getGenderList();
						//this.getCityList();
					}
				},
				(err) => { },
			);
	}
	omit_special_char(event){   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 47); 
	}
	onTitleChange(type){
		let title = this.productItem.Title;
		if(title!='' && title!=null && title!=undefined){
				if(title=='2') this.productItem.IdType = '2';
				else this.productItem.IdType = '1';
				if(title=='1') this.productItem.Gender = 'M';
				else this.productItem.Gender = 'F';
				if(type!='direct') this.getPolicyIdTypeList(null);
		}
		else{
			this.productItem.IdType = '';
		}
	}
	newidtype(){
		if(this.productItem.PolicyHolderTypeid=='1' && this.insuranceId=='100004'){
			this.shows=true;
		}
		else {
		this.shows=false;
		}
		this.productItem.IdNumber='';
		if(this.productItem.PolicyHolderTypeid=='7') this.maxTextLen = '14';
		else this.maxTextLen = '10';
	  }
	getRegionList(type){
		let ReqObj = {
			"CountryId": this.productItem.Country
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.regionList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
							this.regionList = defaultRow.concat(this.regionList);
							if(type=='change'){this.productItem.state = '';this.productItem.CityName=''};
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[7].props.options = defaultRow.concat(this.regionList);

					//this.getCityList();
				}
			},
			(err) => { },
		);
	}
	setValues() {
		let ReqObj = {
			"CustomerReferenceNo": this.customerReferenceNo
		}
		let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					let customerDetails = data.Result;
					this.productItem = new ProductData();
					this.productItem.ClientName = customerDetails.ClientName;
					this.productItem.MiddleName = customerDetails.MiddleName;
					this.productItem.LastName = customerDetails.LastName;
					// if(customerDetails.AppointmentDate!=null && customerDetails.AppointmentDate!=undefined){
					// 	var dateParts = customerDetails.AppointmentDate.split("/");
					// 	 this.productItem.AppointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
					// }
					this.productItem.Address1 = customerDetails.Address1;
					this.productItem.Address2 = customerDetails.Address2;
					this.productItem.BusinessType = customerDetails.BusinessType;
					this.productItem.CityName = customerDetails.CityCode;
					if(this.productItem.CityName==null) this.productItem.CityName = '';
					this.productItem.districtcode = customerDetails.CityName;
					if(customerDetails.Clientstatus) this.productItem.Clientstatus = customerDetails.Clientstatus;
					else this.productItem.Clientstatus = 'Y';
					this.productItem.EmailId = customerDetails.Email1;
					this.productItem.occupationdesc = customerDetails?.OtherOccupation;
					if(customerDetails.Nationality!=null){
						this.productItem.Country = customerDetails.Nationality;
					}
					else if(this.countryList.length!=0 && this.countryList.length>1){
						this.productItem.Country = this.countryList[1].Code;
							
					}
					if(this.productItem.Country==null) this.productItem.Country='';
					this.productItem.PinCode = customerDetails.PinCode;
					this.productItem.Gender = customerDetails.Gender;
					//this.productItem.IdNumber = customerDetails.IdNumber;
					if(customerDetails.PolicyHolderType!=null && customerDetails.PolicyHolderType!=''){
						this.productItem.IdType = customerDetails.PolicyHolderType;
					}
					this.getPolicyIdTypeList(null);
					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					if(this.productItem.PolicyHolderTypeid =='1' && this.insuranceId=='100004'){
						this.shows=true;
						if(customerDetails.IdNumber!='NA'){
							this.Idnumber= customerDetails.IdNumber.substr(0, 5);
							this.Idnumber1= customerDetails.IdNumber.substr(5, 3);
							this.Idnumber2= customerDetails.IdNumber.substr(8, 1);
						}
						
					}
					else{
						this.shows=false;
						if(customerDetails.IdNumber!='NA') this.productItem.IdNumber = customerDetails.IdNumber;
					}
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					if(this.productItem.PreferredNotification==null) this.productItem.PreferredNotification='Sms';
					this.productItem.state = customerDetails.StateCode;
					if(this.productItem.state==null){
						this.productItem.state = '';
						
					}
					this.getStateList(null);
					this.getRegionList(null);
					if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
						if(new Date(this.maxDobDate).setHours(0,0,0,0) >= (new Date(customerDetails.DobOrRegDate)).setHours(0,0,0,0) ){
							var dateParts = customerDetails.DobOrRegDate.split("/");
							this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
						}
						else{
							var dateParts = customerDetails.DobOrRegDate.split("/");
							this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
						}
					}
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					if(this.shortQuoteYN && customerDetails.Occupation=='99999') this.productItem.Occupation = '';
					else this.productItem.Occupation = customerDetails.Occupation;
					this.productItem.Title = customerDetails.Title;
					this.productItem.vrngst = customerDetails.VrTinNo;
					if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
						if(this.productItem.Address1==null || this.productItem.Address1==''){
							this.productItem.Occupation = '';
							if(this.productItem.Title=='1') this.productItem.Gender = 'M';
							else this.productItem.Gender = 'F';
						}
					}
					console.log("Final Edit Data", this.productItem)
				}
			},
			(err) => { },
		);
	}
	idfieldvalidate(){
		let customer:any;
		if(this.productItem.IdType=='1'){
			customer='corporate'
		}
		else if(this.productItem.IdType=='2'){
			customer='Individual'
		}
		let policy:any;
		if(this.productItem.PolicyHolderTypeid!=null && this.productItem.PolicyHolderTypeid!='' && this.productItem.PolicyHolderTypeid!=undefined){
			let p=this.policyHolderTypeList.find(ele => ele.Code == this.productItem.PolicyHolderTypeid);
			if(p){
				policy=p.CodeDesc;
			}
			else{
				policy=null;
			}
		}	
		if(this.productItem.PolicyHolderTypeid=='3'){
			let urlLink = `${this.CommonApiUrl}api/validatecustomerid?accounttype=${customer}&identifytype=${policy}&companyid=${this.insuranceId}&id=${this.productItem.IdNumber}&saveOrsubmit=Submit`;
			this.sharedService.onGetMethodSync(urlLink).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Message== "Success") {
						this.final1=false;
						this.final=false;
					}
					else {
						this.final1=true;
						this.final=true;
					}
				},
				(err) => { },
			);
		}
	}
	Adressvalidate(){
			let urlLink = `${this.CommonApiUrl}api/validateaddress?address=${this.productItem.Address1}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
			this.sharedService.onGetMethodSync(urlLink).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Message== "Success") {
						this.final2=false;
						this.final=false;
					}
					else {
						this.final2=true;
						this.final=true;
					}
				},
				(err) => { },
			);
	}
	occupationchange(){

		let occupation:any;
		if(this.productItem.Occupation!=null){
		let occupationa = this.occupationList.find(ele => ele.Code == this.productItem?.Occupation);
		if(occupationa){
           occupation = occupationa?.CodeDesc;
		}
		}
		let urlLink = `${this.CommonApiUrl}api/validateOccupation?occupation=${occupation}&companyid=${this.insuranceId}&otheroccupation=${this.productItem.occupationdesc}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message== "Success") {
					this.final3=false;
					this.final=false;
				}
				else {
					this.final3=true;
					this.final=true;
				}
			},
			(err) => { },
		);
	}

	StatusChange(){
		let urlLink = `${this.CommonApiUrl}api/validatestatus?status=${this.productItem.Clientstatus}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message== "Success") {
					this.final4=false;
					this.final=false;
				}
				else {
					this.final4=true;
					this.final=true;
				}
			},
			(err) => { },
		);
	}

	Customervalidate(){	
		let urlLink = `${this.CommonApiUrl}api/validateCustomerName?name=${this.productItem.ClientName}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
		this.sharedService.onGetMethodSync(urlLink).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Message== "Success") {
					this.final5=false;
					this.final=false;
				}
				else {
					this.final5=true;
					this.final=true;
				}
			},
			(err) => { },
		);
	}
	Emailvalidate(){	
			let urlLink = `${this.CommonApiUrl}api/ValidateEmail?email=${this.productItem.EmailId}&companyid=${this.insuranceId}&saveOrsubmit=Submit`;
			this.sharedService.onGetMethodSync(urlLink).subscribe(
				(data: any) => {
					console.log(data);
					if (data.Message== "Success") {
						this.final6=false;
						this.final=false;
					}
					else {
						this.final6=true;
						this.final=true;
					}
				},
				(err) => { },
			);
	
	}
	Mobilevalidate(){	
				let urlLink = `${this.CommonApiUrl}api/validatemobilenumber?number=${this.productItem.MobileNo}&companyid=${this.insuranceId}&code=${this.productItem.MobileCode}&saveOrsubmit=Submit`;
				this.sharedService.onGetMethodSync(urlLink).subscribe(
					(data: any) => {
						console.log(data);
						if (data.Message== "Success") {
							this.final7=false;
							this.final=false;
						}
						else {
							this.final7=true;
							this.final=true;
						}
					},
					(err) => { },
				);
	}
	
	blankvalidationcheck(datas){
		console.log("Total Data", datas);
		
		let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
		//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
		// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
		//  }
		if(this.insuranceId!='100004'){
			if(datas.CityName!=null && datas.CityName!='') cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
		}
		else if(this.insuranceId=='100004'){
			if(datas?.districtcode==null || datas?.districtcode=='' || datas?.districtcode==undefined){
				if(datas.CityName!='' && datas.CityName!=null && datas.CityName!='99999'){
					cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else if(datas.CityName!='99999'){
				if(datas.CityName!='' && datas.CityName!=null){
					cityName = this.stateList.find(ele=>ele.Code==datas.CityName)?.CodeDesc;
				}
				else cityName = '';
			}
			else cityName=datas?.districtcode;
		}
		
		if(datas.state!=null && datas.state!='') stateName = this.regionList.find(ele=>ele.Code==datas.state)?.CodeDesc;
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
		if(this.productItem.IdType != 2){
			
			datas.dobOrRegDate = new Date(year - 18,month, day-2 );
		}
		if (datas.dobOrRegDate != undefined && datas.dobOrRegDate != null && datas.dobOrRegDate != '') {
			dobOrRegDate = this.datePipe.transform(datas.dobOrRegDate, "dd/MM/yyyy");
		}
		if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem?.TaxExemptedId;
			//taxExemptedId = this.productItem.TaxExemptedId;
		if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
		let codes = this.productItem.MobileCode
		if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
			//let code = this.productItem
			let code = this.mobileCodeList.find(ele => ele.Code == codes)
			if(code){ 
				if(code?.label) this.productItem.MobileCodeDesc = code.label;
				else this.productItem.MobileCodeDesc = '';
			}
			else this.productItem.MobileCodeDesc = '';

			//this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
		}
		let type = null;
		if(datas.vrngst=='' || datas.vrngst== undefined || datas.vrngst==null){datas.vrngst=null};
		if(this.loginType=='B2CFlow') datas.Clientstatus = 'Y';
		if(this.productId=='46' && (this.productItem?.PolicyHolderTypeid==null || this.productItem?.PolicyHolderTypeid=='' || this.productItem?.PolicyHolderTypeid==undefined)){
		  	if(this.productItem.IdType==1 || this.productItem.IdType=='1'){ this.productItem.PolicyHolderTypeid = '3';}
			else{this.productItem.PolicyHolderTypeid = '6';}
			var minm = 1000000000; 
    		var maxm = 9876543210; 
			this.productItem.IdNumber = Math.floor(Math 
				.random() * (maxm - minm + 1)) + minm; 
		}
		let policyid:any;
		if(datas?.PolicyHolderTypeid == '1'){
         policyid = this.Idnumber.concat(this.Idnumber1).concat(this.Idnumber2);
		}
		else{
			policyid = datas?.IdNumber;
		}
            
		let ReqObj = {
			"BrokerBranchCode": this.brokerbranchCode,
			"CustomerReferenceNo": this.customerReferenceNo,
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId": "5",
			"AppointmentDate": appointmentDate,
			"Address1": datas?.Address1,
			"Address2": datas?.Address2,
			"BusinessType": businessType,
			"CityCode": datas?.CityName,
			"CityName": cityName,
			"ClientName": datas?.ClientName,
			"Clientstatus": datas?.Clientstatus,
			"CreatedBy": this.loginId,
			"DobOrRegDate": dobOrRegDate,
			"Email1": datas?.EmailId,
			"Email2": null,
			"Email3": null,
			"Fax": null,
			"Gender": datas?.Gender,
			"IdNumber": policyid,
			"IdType": datas.IdType,
			"IsTaxExempted": datas.isTaxExempted,
			"Language": "1",
			"MobileNo1": datas.MobileNo,
			"MobileNo2": null,
			"MobileNo3": null,
			"Nationality": datas.Country,
			"Occupation": datas?.Occupation,
			"OtherOccupation":datas?.occupationdesc,
			"Placeofbirth": "Chennai",
			"PolicyHolderType": datas.IdType,
			"PolicyHolderTypeid": datas?.PolicyHolderTypeid,
			"PreferredNotification": datas?.PreferredNotification,
			"RegionCode": "01",
			"MobileCode1": datas?.MobileCode,
			"WhatsappCode": datas?.MobileCode,
			"MobileCodeDesc1": "1",
			"WhatsappDesc": "1",
			"WhatsappNo": datas.MobileNo,
			"StateCode": datas?.state,
			"StateName": stateName,
			"Status": datas?.Clientstatus,
			"Street": datas?.Street,
			"Type":type,
			"TaxExemptedId": taxExemptedId,
			"TelephoneNo1": datas?.TelephoneNo,
			"PinCode": datas?.PinCode,
			"TelephoneNo2": null,
			"TelephoneNo3": null,
			"Title": datas.Title,
			"VrTinNo": datas.vrngst,
			"SaveOrSubmit": 'Submit',
			"MiddleName":datas?.MiddleName,
    		"LastName":datas?.LastName,
		}
		let urlLink = `${this.CommonApiUrl}api/blankvalidation`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				let res: any = data;
				console.log(data);
				if (data.ErrorMessage.length != 0) {
					if (res.ErrorMessage) {
						const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
            				let ulList:any='';
							for (let index = 0; index < errorList.length; index++) {
			
							const element = errorList[index];
							ulList +=`<li class="list-group-login-field">
								<div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}&nbsp;(${element?.Code})</div>
								<div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
							</li>`
							}
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
				else{
					this.onSubmit(datas);
				}
				
			},

			(err: any) => { console.log(err); },
		);
	}
  setPolicyType(){
       let value = this.productItem.IdType;
      if(value==2 || value=='2'){
        this.productItem.Gender = '';
      }
      this.getPolicyIdTypeList('change');
	  this.getOccupationLists('change');
	if(this.insuranceId=='100004'){
		this.getType3('change');
		
	}
    }
  navigateToCustomer() {
    this.confirmationService.confirm({
      message: 'All the changes made will be lost. Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
		if(this.shortQuoteYN) this.router.navigate(['/quotation/plan/shortQuote']);
        else this.router.navigate(['/customer']);
      },
    });
  }
  onsavedatas(type,data){

	console.log('GGGGGGG',type)
	if(type=='Address'){
		this.Adressvalidate();
	}
	else if(type=='IdValue'){
		this.idfieldvalidate();
	}
	else if(type=='Email'){
		this.Emailvalidate();
	}
	else if(type=='Mobile'){
		this.Mobilevalidate();
	}
	else if(type=='Occupation'){
		this.occupationchange();
	}
	else if(type=='Status'){
		this.StatusChange();
	}
	else if(type=='Customer'){
		this.Customervalidate();
	}
	else if(type=='direct' && !this.final){
		//this.blankvalidationcheck(data);
		this.onSubmit(data);
	}
	else if(type=='direct' && this.final){
   if(this.final1)this.idfieldvalidate();
   if(this.final2) this.Adressvalidate();
   if(this.final3) this.occupationchange();
   if(this.final4) this.StatusChange();
   if(this.final5) this.Customervalidate();
   if(this.final6) this.Emailvalidate();
   if(this.final7) this.Mobilevalidate();
	}
}
getType3(type){
	let product:any;this.titleList =[];
	if(this.productItem.IdType == '1'){
	product = 'I'
	}
	else if(this.productItem.IdType == '2'){
		product = 'C'
	}
	else {
		product ='I'
	}
	let ReqObj = {
	  "InsuranceId": this.insuranceId,
	  "ItemType": "NAME_TITLE",
	   "BranchCode":"99999",
	   "ItemCode":"null",
	   "TitleType":product
	}
	let urlLink = `${this.CommonApiUrl}master/getbyitemvalue`;
	this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
	  (data: any) => {
		console.log(data);
		if(data.Result){
		  let obj = [{ "Code": '', "CodeDesc": "-Select-", 'CodeDescLocal':'-Selecione-' }]
		  this.titleList = obj.concat(data.Result);
		}
	  },
	  (err) => { },
	);
  }
  
	getOccupationLists(type) {
		let product:any;this.occupationList=[];let productId=this.productId
		if(this.productItem.IdType == '1'){
        product = 'I'
		}
		else if(this.productItem.IdType == '2'){
			product = 'C'
		}
		if(type=='change'){
			this.productItem.Occupation = '';
		}
		if(this.insuranceId=='100004') {
			productId=''
			product='';
		}
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"ProductId":productId,
		    "TitleType":product
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
		this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.occupationList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '', 'CodeDescLocal':'-Selecione-' }]
							this.occupationList = defaultRow.concat(this.occupationList)
							if(type!='change'){
								this.getBusinessTypeList();
							}
				}
			},
			(err) => { },
		);
	}
}
