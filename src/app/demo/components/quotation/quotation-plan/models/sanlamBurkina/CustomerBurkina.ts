import { FormlyFieldConfig } from "@ngx-formly/core";

export class CustomerBurkina{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
      let finalize = sessionStorage.getItem('FinalizeYN');
      if(finalize) this.finalizeYN = finalize;
      this.subuserType = sessionStorage.getItem('typeValue');
      this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      if (commonDetails) this.commonDetails = commonDetails;
      if (sessionStorage.getItem('endorsePolicyNo')) {
          this.endorsementSection = true;
          let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
          if (endorseObj) {
            this.enableFieldsList = endorseObj.FieldsAllowed;
          }
      }
      this.fields={
          props: { label: 'Personal Information' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'CustomerTitle',
                  key: 'Title',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `Customer Title`,
                    // placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('Title'),
                    maxLength: 15,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-9 lg:col-9 xl:col-9 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'FirstName',
                  key: 'ClientName',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    label: `Client Name`,
                    // placeholder: 'Enter Client Name',
                    required: true,
                    disabled: this.checkDisable('ClientName'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'CompanyName',
                  key: 'CompanyName',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    label: `Company Name`,
                    // placeholder: 'Enter Company Name',
                    required: true,
                    disabled: this.checkDisable('CompanyName'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 ',
                  type: 'ngselect',
                  id: 'Gender',
                  key: 'Gender',
                  hide: false,
                  hideExpression:false,
                  props: {
                    label: `Gender`,
                    // placeholder: '-Select-',
                    required: false,
                    disabled: this.checkDisable('Gender'),
                    maxLength: 15,
                    options:[]
                  },
                 
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2',
                  type: 'datepicker',
                  id: 'DateOfBirth',
                  key: 'dobOrRegDate',
                  hide: false,
                  hideExpression:false,
                  templateOptions: {
                    type:'date',
                    label: `Date Of Birth`,
                    required: true,
                    disabled: this.checkDisable('dobOrRegDate'),
                    maxLength: 15,
                    
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Nationality',
                  key: 'Nationality',
                  hide: false,
                  hideExpression:false,
                  props: {
                    label: `Nationality`,
                    required: false,
                    disabled: this.checkDisable('Nationality'),
                    maxLength: 50,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Activities',
                  key: 'BusinessType',
                  hide: true,
                  hideExpression:true,
                  props: {
                    label: `Activities`,
                    // placeholder: '-Select Activities-',
                    required: true,
                    disabled: this.checkDisable('BusinessType'),
                    maxLength: 50,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Occupation',
                  key: 'Occupation',
                  hide: false,
                  hideExpression:false,
                  props: {
                    label: `Occupation`,
                    // placeholder: '-Select Occupation-',
                    required: false,
                    disabled: this.checkDisable('Occupation'),
                    maxLength: 50,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'SocioProfessionalcategory',
                  key: 'SocioProfessionalcategory',
                  hide: false,
                  hideExpression:false,
                  props: {
                    label: `Socio Professional category`,
                    // placeholder: 'Enter Socio Professional category',
                    required: false,
                    disabled: this.checkDisable('SocioProfessionalcategory'),
                    maxLength: 50,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'EmailId',
                  key: 'EmailId',
                  templateOptions: {
                    label: `Email Id`,
                    // placeholder: 'Enter EmailId',
                    required: false,
                    disabled: this.checkDisable('EmailId'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-23pr-2 pt-1',
                  type: 'ngselect',
                  id: 'CountryCode',
                  key: 'MobileCode',
                  props: {
                    label: `Country Code`,
                    // placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('CountryCode'),
                    maxLength: 15,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'MobileNumber',
                  key: 'MobileNo',
                  templateOptions: {
                    label: `Mobile Number`,
                    // placeholder: 'Enter MobileNo',
                    required: true,
                    disabled: this.checkDisable('MobileNo'),
                    maxLength: 10
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            },
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'IdentityType',
                  key: 'PolicyHolderTypeid',
                  props: {
                    label: `Identity Type`,
                    // placeholder: '-Select-',
                    required: false,
                    disabled: this.checkDisable('PolicyHolderTypeid'),
                    maxLength: 15,
                    options:[]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'IDNumber',
                  key: 'IdNumber',
                  templateOptions: {
                    label: `ID Number`,
                    // placeholder: 'Enter ID Number',
                    required: true,
                    disabled: this.checkDisable('IdNumber'),
                    maxLength: 16
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'datepicker',
                  id: 'RegistrationDate',
                  key: 'dobOrRegDate',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    type:'date',
                    label: `Registration Date`,
                    // placeholder: 'Select Registration Date',
                    required: true,
                    disabled: this.checkDisable('dobOrRegDate'),
                    maxLength: 15
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  key: 'isTaxExempted',
                  id: 'TaxExcempted',
                  type: 'radioList',
                  templateOptions: {
                    type: 'radioList',
                    required: true,
                    disabled: this.checkDisable('isTaxExempted'),
                    name: 'isTaxExempted',
                  },
                  props: {
                    label: 'Tax Excempted',
                    options: [{ value: 'Y', label: 'Yes', 'CodeDesc':'Yes', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'No','CodeDesc':'No', 'CodeDescLocal':'Não' }],
                  }
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'TaxExcemptedNo',
                  key: 'TaxExemptedId',
                  hide: true,
                  hideExpression:true,
                  templateOptions: {
                    label: `Tax Excempted No`,
                    // placeholder: 'Enter Tax Excempted Number',
                    required: true,
                    disabled: this.checkDisable('TaxExcemptedNo'),
                    maxLength: 50
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'PreferedNotification',
                  key: 'PreferredNotification',
                  templateOptions: {
                    label: `Preferred Notification`,
                    // placeholder: '-Select-',
                    required: true,
                    disabled: this.checkDisable('PreferredNotification'),
                    maxLength: 15,
                    options:[
                      { label: 'Select', value: '','CodeDescLocal':'Selecione' },
                      { label: 'SMS', value: 'Sms','CodeDescLocal':'Sms -P' },
                      { label: 'Mail', value: 'Mail','CodeDescLocal':'E-mail -P' },
                      { label: 'Whatsapp', value: 'Whatsapp','CodeDescLocal':'Whatsapp -P' }
                    ]
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                  key: 'Clientstatus',
                  id: 'Status',
                  type: 'radioList',
                  templateOptions: {
                    type: 'radioList',
                    required: true,
                    disabled: this.checkDisable('Clientstatus'),
                    name: 'Status',
                  },
                  props: {
                    label: 'Status',
                    options: [{ value: 'Y', label: 'Active', 'CodeDesc':'Active', 'CodeDescLocal':'Sim' }, { value: 'N', label: 'DeActive','CodeDesc':'DeActive', 'CodeDescLocal':'Não' },{ value: 'P', label: 'Pending','CodeDesc':'Pending', 'CodeDescLocal':'Não' }],
                  }
                },
              ]
            },
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'Street',
                  key: 'Address1',
                  templateOptions: {
                    label: `Street`,
                    // placeholder: 'Enter Street',
                    required: true,
                    disabled: this.checkDisable('Address1'),
                    maxLength: 150
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3  lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'Country',
                  key: 'Country',
                  props: {
                    label: `Country`,
                    // placeholder: '-Select-',
                    required: false,
                    disabled: this.checkDisable('Country'),
                    maxLength: 15,
                    options:[]
                  },
                
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                // {
                //   className: 'col-12 md:col-2 lg:col-2 xl:col-2 pl-2 pr-2 pt-1',
                //   type: 'ngselect',
                //   id: 'Region',
                //   key: 'Region',
                //   templateOptions: {
                //     label: `Region`,
                //     required: true,
                //     disabled: this.checkDisable('Region'),
                //     maxLength: 15
                //   },
                  
                //   validators: {
                //   },
                //   hooks: {
                //   },
                //   expressions: {
                //   },
                // },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'ngselect',
                  id: 'City',
                  key: 'CityName',
                  props: {
                    label: `City`,
                    required: false,
                    disabled: this.checkDisable('CityName'),
                    maxLength: 15,
                    options:[]
                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
                {
                  className: 'col-12 md:col-3 lg:col-3 xl:col-3 pl-2 pr-2 pt-1',
                  type: 'input',
                  id: 'PoBox',
                  key: 'PinCode',
                  templateOptions: {
                    label: `PoBox`,
                    // placeholder: 'Enter PoBox',
                    required: false,
                    disabled: this.checkDisable('PinCode'),
                    maxLength: 150
                  },
                  
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                }
              ]
            }
          ]
          // fieldGroup: [
          //   {
          //     fieldGroupClassName: 'newclassname',
          //     fieldGroup: [
          //       {
          //         className: 'w-full md:mt-0 mt-3 md:w-1/3',
          //         type: 'displays',
          
          //         templateOptions: {
          //           label: `Sum Insured`,
          //           required: true,

          //         },
          //       },
          //       {
          //         className: 'w-full md:mt-0 mt-5 mdw-5',
          //         type: 'commaSeparator',
          //         key: 'AllriskSumInsured',

          //         props: {
          //           //label: `Sum Insured`,
          //           //(${this.commonDetails[0].Currency})`,
          //           maxLength: 15,
          //           disabled: this.checkDisable('AllriskSumInsured'),
          //           //required: true,
          //           options: [

          //           ],

          //         },
          //         validators: {
          //         },
          //         hooks: {
          //         },
          //         expressions: {
          //         },
          //       },
          //     ]
          //   }
          // ]
        }
  }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}