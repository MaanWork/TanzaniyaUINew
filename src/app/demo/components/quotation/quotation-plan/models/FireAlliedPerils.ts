
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FireAlliedPerils{
    customerDetails: any;
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId') || '')
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields = {
          props: { label: 'Fire & Allied Perils'},
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                  {
                  fieldGroupClassName: 'grid',
                    fieldGroup: [
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displays',
                
                        templateOptions: {
                          label: `On Asset`,
                          required: false,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-4 lg:col-4',
                        type: 'commaSeparator',
                        key: 'onAssetSumInsured',
                        props: { 
                          label: `Sum Insured`,
                          maxLength: 15
                        },
                        templateOptions: {
                          disabled: this.checkDisable('BuildingSuminsured')
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
        
                        expressions: {
                        
                        },
                      }
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displays',
                
                        templateOptions: {
                          label: `On Stock`,
                          required: false,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-4 lg:col-4',
                        type: 'commaSeparator',
                        key: 'onStockSumInsured',
                        props: { 
                          label: `Sum Insured`,
                          maxLength: 15
                        },
                        templateOptions: {
                          disabled: this.checkDisable('BuildingSuminsured')
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
        
                        expressions: {
                        
                        },
                      }
                    ],
                  },
                  {
                    fieldGroupClassName: 'grid',
                    fieldGroup: [
                      {
                        className: 'col-12 md:col-6 lg:col-6 p-2',
                        type: 'displays',
                
                        templateOptions: {
                          label: `On Building`,
                          required: false,
      
                        },
                      },
                      {
                        className: 'col-12 md:col-4 lg:col-4',
                        type: 'commaSeparator',
                        key: 'BuildingSuminsured',
                        props: { 
                          label: `Sum Insured`,
                          maxLength: 15
                        },
                        templateOptions: {
                          disabled: this.checkDisable('BuildingSuminsured')
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
        
                        expressions: {
                        
                        },
                      }
                    ],
                  }
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