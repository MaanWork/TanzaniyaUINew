import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PersonalAccident{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    finalizeYN: any='N';
    subuserType: any=null;
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
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'OccupationType',
                    defaultValue: '',
                    className: 'col-12',
                    props: {
                      label: `Occupation`,
                      disabled: this.checkDisable('OccupationType'),
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
                    type: 'commaSeparator',
                    className: 'col-12',
                    key: 'PersonalAccidentSuminsured',
                    defaultValue: '0',
                    props: {
                      label: `Sum Insured`,
                      maxLength: 15,
                      disabled: this.checkDisable('PersonalAccidentSuminsured'),
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
                  //   type: 'input',
                  //   key: 'otheroptionPer',
                  //   defaultValue: '',
                  //   className: 'col-12',
                  //   props: {
                  //     label: `Others Description`,
                  //     disabled: this.checkDisable('OccupationType'),
                  //   },
                  //   validators: {
                  //     validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
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
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}