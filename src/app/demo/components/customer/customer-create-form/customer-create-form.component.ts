import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/demo/service/shared.service';
import { ProductData } from './product';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-customer-create-form',
  templateUrl: './customer-create-form.component.html',
  styles : [`
  .card .form-container .flex-column { min-width: 200px; }
  .card .form-container div label { font-weight: bold; }
  `],
  providers: [MessageService, ConfirmationService] 
})
export class CustomerCreateFormComponent implements OnInit {
  messages: Message[] = [];
  items:MenuItem[] | undefined;
  customerTypes:any[] | undefined;
  currentCustomerType:string = 'personal';
  ownerCategoryOptions: any[] | undefined;
  selectedOwnerCategory: any | undefined;
  statusOptions: string = '';
  date: Date | undefined;
  userDetails:any=null;maxDate:any=null;
  maxDobDate:any=null;loginId:any=null;
  agencyCode:any=null;branchCode:any=null;
  productId:any=null;insuranceId:any=null;
  loginType:any=null;userType:any=null;
  brokerbranchCode:any=null;typeValue:any=null;
  statusList:any[]=[];notificationList:any[]=[];
  taxExcemptedList:any[]=[];policyHolderList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  customerReferenceNo:any=null;titleList:any[]=[];
  regionList:any[]=[];stateList:any[]=[];
  countryList:any[]=[];genderList:any[]=[];
  occupationList:any[]=[];mobileCodeList:any[]=[];
  businessTypeList:any[]=[];productItem:any=null;
  policyHolderTypeList:any[]=[];dob:any=null;
  constructor(private confirmationService: ConfirmationService, private sharedService: SharedService,private datePipe: DatePipe,
    private messageService: MessageService, private router: Router) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.maxDate = new Date();
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
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
    this.statusList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Active', Code: 'Y' },
			{ CodeDesc: 'DeActive', Code: 'N' },
			{ CodeDesc: 'Pending', Code: 'P' }
		];
		this.notificationList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'SMS', Code: 'Sms' },
			{ CodeDesc: 'Mail', Code: 'Mail' },
			{ CodeDesc: 'Whatsapp', Code: 'Whatsapp' }
		];
		this.taxExcemptedList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Yes', Code: 'Y' },
			{ CodeDesc: 'No', Code: 'N' }
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
      this.getTitleList();
      this.getCountryList();
      this.getGenderList();
      this.getOccupationList();
      this.getBusinessTypeList();
      this.getMobileCodeList();
      this.getPolicyHolderList('change');
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
					let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
					this.titleList = obj.concat(data.Result);
					
				}
			},
			(err) => { },
		);
  }
  ngOnInit(): void {
    this.ownerCategoryOptions = [{name: 'Category', code: 'category'}];
    this.customerTypes = [{label: 'Personal', value: 'personal'}, {label: 'Corporate', value: 'corporate'}];
    this.items = [{ label: 'Home', routerLink:'/' }, {label:'Customer', routerLink: '/customer'}, { label: 'Create Customer' }];
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
		
		if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
		if (data.dobOrRegDate != undefined && data.dobOrRegDate != null && data.dobOrRegDate != '') {
			dobOrRegDate = data.dobOrRegDate;
		}
		if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem.TaxExemptedId;
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
			"IdNumber": data?.IdNumber,
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
			"SaveOrSubmit": 'Submit'
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
							this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
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
					let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
					this.policyHolderTypeList = defaultRow.concat(this.policyHolderTypeList)
					//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
					if (type == 'change'){this.dob = "";this.productItem.PolicyHolderTypeid='';this.productItem.IdNumber=null}
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
					let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
					this.genderList = defaultRow.concat(this.genderList)
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
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
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
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
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
					let defaulObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
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

					let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
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
									this.onTitleChange();
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
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
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
	onTitleChange(){
    alert(this.productItem.Title)
		let title = this.productItem.Title;
		if(title!='' && title!=null && title!=undefined){
				if(title=='2') this.productItem.IdType = '2';
				else this.productItem.IdType = '1';
				if(title=='1') this.productItem.Gender = 'M';
				else this.productItem.Gender = 'F';
				this.getPolicyIdTypeList(null);
		}
		else{
			this.productItem.IdType = '';
		}
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
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
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
					this.productItem.Clientstatus = customerDetails.Clientstatus;
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
					this.productItem.IdNumber = customerDetails.IdNumber;
					if(customerDetails.PolicyHolderType!=null && customerDetails.PolicyHolderType!=''){
						this.productItem.IdType = String(customerDetails.PolicyHolderType);
					}
					this.getPolicyIdTypeList(null);
					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					if(this.productItem.PreferredNotification==null) this.productItem.PreferredNotification='Sms';
					this.productItem.state = customerDetails.StateCode;
					if(this.productItem.state==null){
						this.productItem.state = '';
						
					}
					this.getStateList(null);
					this.getRegionList(null);
					
					if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
						this.productItem.dobOrRegDate = customerDetails.DobOrRegDate
						// if(new Date(this.maxDobDate).setHours(0,0,0,0) >= (new Date(customerDetails.DobOrRegDate)).setHours(0,0,0,0) ){
						// 	var dateParts = customerDetails.DobOrRegDate.split("/");
						// 	this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
						// }
						// else{
						// 	var dateParts = customerDetails.DobOrRegDate.split("/");
						// 	this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
						// }
					}
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					this.productItem.Occupation = customerDetails.Occupation;
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
  setPolicyType(){
       let value = this.productItem.IdType;
      if(value==2 || value=='2'){
        this.productItem.Gender = '';
      }
      this.getPolicyIdTypeList('change');
    }
  navigateToCustomer() {
    this.confirmationService.confirm({
      message: 'All the changes made will be lost. Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/customer']);
      },
    });
  }
  
}
