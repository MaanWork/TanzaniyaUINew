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
            // fieldGroup: [
            //   {
            //     fieldGroupClassName: 'newclassname',
            //       fieldGroup: [
            //         {
            //           className: 'w-full md:mt-0 mt-3 md\:w-1\/4',
            //           type: 'displays',
              
            //           templateOptions: {
            //             label: `Occupation`,
            //             required: true,
    
            //           },
            //         },
            //         {
            //           type: 'ngselect',
            //         key: 'OccupationType',
            //         defaultValue: '',
            //         className: 'w-full md:mt-0 mt-3 md\:w-1\/4',
            //         props: {
            //           //label: `Occupation`,
            //           disabled: this.checkDisable('OccupationType'),
            //           //required: true,
            //           options: [
      
            //           ],
      
            //         },
            //         validators: {
            //           validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
            //         }
                   
            //       ]
            //   },
            //   {
            //     fieldGroupClassName: 'grid mt-2',
            //       fieldGroup: [
            //         {
            //           className: 'col-12 md:col-6 lg:col-6 p-2',
            //           type: 'displays',
              
            //           templateOptions: {
            //             label: `Sum Insured`,
            //             required: false,
    
            //           },
            //         },
            //  {
            //   type: 'commaSeparator',
            //         className: 'col-12 md:col-6 lg:col-6',
            //         key: 'PersonalAccidentSuminsured',
            //         defaultValue: '0',
            //         props: {
            //           //label: `Sum Insured`,
            //           maxLength: 15,
            //           disabled: this.checkDisable('PersonalAccidentSuminsured'),
            //           //required: true,
            //           options: [
      
            //           ],
      
            //         },
            //         validators: {
            //           validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //         },
            //         hooks: {
            //         },
            //         expressions: {
            //         },
            //  }
            //       ]
            //   },
            // ]
            fieldGroup: [
              {
                fieldGroupClassName: 'newclassname',
                fieldGroup: [
                  // {
                  //   type: 'ngselect',
                  //   key: 'OccupationType',
                  //   defaultValue: '',
                  //   className: 'w-full md:mt-0 mt-3 md\:w-1\/4',
                  //   props: {
                  //     label: `Occupation`,
                  //     disabled: true,
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
                    type: 'commaSeparator',
                    className: 'w-full md:mt-0 mt-3 md\:w-1\/4',
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