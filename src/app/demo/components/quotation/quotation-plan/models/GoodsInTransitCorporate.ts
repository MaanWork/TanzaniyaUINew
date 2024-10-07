import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class GoodsInTransitCorporate {
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
        this.fields = [
          {
              fieldGroup: [
                {
                  fieldGroupClassName: 'grid',
                  fieldGroup: [
                    {
                      type: 'commaSeparator',
                      key: 'Singleroadlimit',
                      id: 'Singleroadlimit',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6',
                      props: {
                        label: `Single Road Limit`,
                        disabled: this.checkDisable('Singleroadlimit'),
                        required: true,
                        options: [
        
                        ],
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(15), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
  
                    {
                      type: 'commaSeparator',
                      className: 'col-12 md:col-6 lg:col-6',
                      key: 'EstimatedAnnualCarries',
                      id: 'EstimatedAnnualCarries',
                      props: {
                        label: `Estimated Annual Carries`,
                        maxLength: 15,
                        disabled: this.checkDisable('EstimatedAnnualCarries'),
                        required: true,
                        options: [
        
                        ],
        
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(15), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                      type: 'ngselect',
                      key: 'ModeOfTransport',
                      id: 'ModeOfTransport',
                      defaultValue: '',
                      className: 'col-12 md:col-6 lg:col-6 xl:col-6 pl-2 pr-2 pt-1',
                      props: {
                        label: `Mode Of Transport`,
                        disabled: this.checkDisable('ModeOfTransport'),
                        required: true,
                        options: [
        
                        ],
        
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    }
                  ]
                }
              ],
          },
        ];
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