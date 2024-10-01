import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class MachineryBreakDown{
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
          props: { label: 'Machinery BreakDown' },
          fieldGroup: [
            {
              fieldGroupClassName: 'grid',
              fieldGroup: [ 
                {
                  type: 'ngselect',
                  key: 'ContentId',
                  defaultValue: '',
                  className: 'col-12 ',
                  templateOptions: {
                    label: `Electronic Item`,
                    placeholder: 'Select Content Type',
                   // disabled: true,
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
                },
                {
                  type: 'input',
                  key: 'Serial',
                  defaultValue: '',
                  className: 'col-12 ',
                  templateOptions: {
                    label: `Serial No`,
                    required: true,
                    placeholder: 'Enter Serial No',
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                }, 
                {
                  type: 'textarea',key: 'Description',
                  defaultValue: '',className: 'col-12',
                  templateOptions: { label: `Description`,required: true,placeholder: 'Enter Description'},
                  validators: {  validation: [ForceLengthValidators.maxLength(1000), ForceLengthValidators.min(1)] },
                  hooks: {
                  },
                  expressions: {
                  },
                },   
                  {
                    type: 'commaSeparator',
                    key: 'PowerPlantSi',
                    defaultValue: '',
                    className: 'col-12 md:col-12 lg:col-12',
                    templateOptions: {
                      label: `Sum Insured`,
                      placeholder: 'Enter Sum Insured',
                     // disabled: true,
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
                  },
                  // {
                  //   type: 'ngselect',
                  //   key: 'FirstLossPayee',
                  //   defaultValue: '',
                  //   className: 'col-12 md:col-4 lg:col-4',
                  //   templateOptions: {
                  //     label: `First Loss Payee`,
                  //     placeholder: 'Select First Loss Payee',
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
                ]
            }
          ]
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