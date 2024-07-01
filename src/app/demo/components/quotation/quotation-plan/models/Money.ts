import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Money{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';
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
        this.fields = {
          props: { label: 'Money' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
                // fieldGroup: [
                  
                //   {
                //     className: 'col-12 md:col-3 lg:col-3 col-offset-3 endText',
                //     type: 'displays',
            
                //     templateOptions: {
                //       label: `Premises`,
                //       required: false,
  
                //     },
                //   },
                //   {
                //     className: 'col-12 md:col-6 lg:col-6',
                //     type: 'commaSeparator',
                //     key: 'MoneyDirectorResidence',
                //     props: { 
                //       label: `Sum Insured`,
                //       maxLength: 15
                //     },
                //     templateOptions: {
                //       disabled: this.checkDisable('SumInsured')
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
    
                //     expressions: {
                    
                //     },
                //   }
                // ],
                fieldGroup:[
                //   {
                //     type: 'input',
                //     key: 'LocationName',
                //     defaultValue: '',
                //     className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //     templateOptions: {
                //       label: `Location`,
                //       required: true,
                //       placeholder: 'Enter LocationName',
                //     },
                //     validators: {
                //       validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                //     },
                //     hooks: {
                //     },
                //     expressions: {
                //     },
                // },
                // {
                //   type: 'ngselect',
                //   key: 'Region',
                //   defaultValue: '',
                //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //   templateOptions: {
                //     label: `Region`,
                //     placeholder: 'Select Region',
                //    // disabled: true,
                //     required: true,
                //     options: [
    
                //     ],
    
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
                //   expressions: {
                //   },
                // },
                // {
                //   type: 'ngselect',
                //   key: 'District',
                //   defaultValue: '',
                //   className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                //   templateOptions: {
                //     label: `District`,
                //     placeholder: 'Select District',
                //    // disabled: true,
                //     required: true,
                //     options: [
    
                //     ],
    
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //   },
                //   expressions: {
                //   },
                // },
                {
                  className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                  type: 'commaSeparator',
                  key: 'MoneyDirectorResidence',
                  props: { 
                    label: `Premises Sum Insured`,
                    maxLength: 15
                  },
                  templateOptions: {
                    disabled: this.checkDisable('SumInsured')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                  
                  },
                },
                {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'MoneyMajorLoss',
                    props: { 
                      label: `Money in Transit Sum Insured`,
                      maxLength: 15
                    },
                    templateOptions: {
                      disabled: this.checkDisable('SumInsured')
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                  },
                  {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'StrongroomSi',
                    props: { 
                      label: `Strong Room Sum Insured`,
                      maxLength: 15
                    },
                    templateOptions: {
                      disabled: this.checkDisable('SumInsured')
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                  },
                  {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'MoneySafeLimit',
                    props: { 
                      label: `Safe Limit Sum Insured`,
                      maxLength: 15
                    },
                    templateOptions: {
                      disabled: this.checkDisable('SumInsured')
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                  },
                  {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'MoneyCollector',
                    props: { 
                      label: `Collector Amount Sum Insured`,
                      maxLength: 15
                    },
                    templateOptions: {
                      disabled: this.checkDisable('SumInsured')
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                  },
                  {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'MoneyAnnualEstimate',
                    props: { 
                      label: `Estimated Annual Carry Amount Sum Insured`,
                      maxLength: 15
                    },
                    templateOptions: {
                      disabled: this.checkDisable('SumInsured')
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                    
                    },
                  },

                ]
              },
             
              
          ],
        }
    }
    fields:FormlyFieldConfig;
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}