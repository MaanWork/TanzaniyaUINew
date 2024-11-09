import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class MoneyCorprate{
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
        this.fields =[
            {
                fieldGroup: [
                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [ 
                  {
                    className: 'col-12 lg:col-4 md:col-4 xl:col-4',
                    type: 'commaSeparator',
                    key: 'MoneyinTransit',
                    id: 'MoneyinTransit',
                    props: { 
                      label: `Money in Transit`,
                      maxLength: 15
                    },
                    templateOptions: {
                    // disabled: this.checkDisable('SumInsured')
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
                      key: 'MoneyinPremises',
                      id: 'MoneyinPremises',
                      props: { 
                        label: `Money in Premises`,
                        maxLength: 15
                      },
                      templateOptions: {
                      // disabled: this.checkDisable('SumInsured')
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
                      key: 'MoneyInSafe',
                      id: 'MoneyInSafe',
                      props: { 
                        label: `Money In Safe`,
                        maxLength: 15
                      },
                      templateOptions: {
                        //disabled: this.checkDisable('SumInsured')
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
                      key: 'MoneyStrongroom',
                      props: { 
                        label: `Money in Strongroom`,
                        maxLength: 15
                      },
                      templateOptions: {
                      // disabled: this.checkDisable('SumInsured')
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
                      key: 'Estimatedannualcashcarryings',
                      props: { 
                        label: `Estimated Annual Cash Carryings`,
                        maxLength: 15
                      },
                      templateOptions: {
                      // disabled: this.checkDisable('SumInsured')
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
        ]
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}