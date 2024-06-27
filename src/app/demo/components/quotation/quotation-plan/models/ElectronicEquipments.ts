import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";

export class ElectronicEquipments{
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
            props: { label: 'Electronic Equipment' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
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
                {
                  type: 'ngselect',
                  key: 'ContentType',
                  defaultValue: '',
                  className: 'col-12 lg:col-6 md:col-6 xl:col-6',
                  templateOptions: {
                    label: `Content Type`,
                    placeholder: 'Select Region',
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
            //     {
            //       type: 'input',
            //       key: 'Serial',
            //       defaultValue: '',
            //       className: 'col-12 lg:col-4 md:col-4 xl:col-4',
            //       templateOptions: {
            //         label: `Serial No`,
            //         required: true,
            //         placeholder: 'Enter Serial No',
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
            //       expressions: {
            //       },
            //   },
            //   {
            //     type: 'input',
            //     key: 'Description',
            //     defaultValue: '',
            //     className: 'col-12 lg:col-4 md:col-4 xl:col-4',
            //     templateOptions: {
            //       label: `Description`,
            //       required: true,
            //       placeholder: 'Enter Description',
            //     },
            //     validators: {
            //       validation: [ForceLengthValidators.maxLength(30), ForceLengthValidators.min(1)]
            //     },
            //     hooks: {
            //     },
            //     expressions: {
            //     },
            // },
                  {
                    className: 'col-12 lg:col-6 md:col-6 xl:col-6 mt-2',
                    type: 'commaSeparator',
                    key: 'Salary',
                    templateOptions: {
                      label: `Salary`,
                      required: true,
                      disabled: this.checkDisable('Salary'),
                      maxLength: 15
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
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