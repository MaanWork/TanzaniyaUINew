

import { FormlyFieldConfig } from "@ngx-formly/core";
import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";

export class MotorVehicleSanlam{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
       
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields={
            props: { label: 'All Risk' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    type: 'ngselect',
                    key: 'InsuranceType',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Insurance Type`,
                      disabled: this.checkDisable('InsuranceType'),
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
                    type: 'ngselect',
                    key: 'MotorUsage',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Motor Usage`,
                      disabled: this.checkDisable('MotorUsage'),
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
                    type: 'ngselect',
                    key: 'Deductibles',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Deductibles`,
                      disabled: this.checkDisable('Deductibles'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                      key: 'PurchaseDate',
                      type: 'datepicker',
                      defaultValue: '',
                      templateOptions: {
                        defaultValue: '',
                      },
                      props: {
                        label: 'Purchase Date',
                        
                        required: true,
                        type: 'date',
                        datepickerOptions: {
                          defaultValue: '',
                        },
                      }
                  },
                  {
                    type: 'ngselect',
                    key: 'DefenceCost',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Defence Cost`,
                      disabled: this.checkDisable('DefenceCost'),
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
                    type: 'ngselect',
                    key: 'VehicleValue',
                    defaultValue: '',
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    props: {
                      label: `Vehicle Value`,
                      disabled: this.checkDisable('VehicleValue'),
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
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'Inflation',
  
                    props: {
                      label: `Inflation`,
                      maxLength: 15,
                      disabled: this.checkDisable('Inflation'),
                      required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'commaSeparator',
                    key: 'VehicleSI',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `SumInsured`,
                      maxLength: 15,
                      disabled: this.checkDisable('VehicleSI'),
                      required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  // {
                  //   className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                  //   type: 'commaSeparator',
                  //   key: 'InflationSumInsured',
                  //   hide: false,
                  //   hideExpression:false,
                  //   props: {
                  //     label: `Inflation SumInsured`,
                  //     maxLength: 15,
                  //     disabled: this.checkDisable('InflationSumInsured'),
                  //     required: true,
                  //     options: [
  
                  //     ],
  
                  //   },
                  //   validators: {
                  //   },
                  //   hooks: {
                  //   },
                  //   expressions: {
                  //   },
                  // },
                  
                 
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'commaSeparator',
                    key: 'AccessoriesSI',
                    hide: true,
                    hideExpression:true,
                    props: {
                      label: `Accessories SumInured`,
                      maxLength: 15,
                      disabled: this.checkDisable('AccessoriesSI'),
                      required: false,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'commaSeparator',
                    key: 'WindShieldSI',
                    hide: true,
                   // hideExpression:true,
                    props: {
                      label: `WindShield SumInured`,
                      maxLength: 15,
                      disabled: this.checkDisable('WindShieldSI'),
                      required: false,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },

                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'NoOfPassengers',
  
                    props: {
                      label: `Number Of Passengers's `,
                      maxLength: 15,
                      disabled: this.checkDisable('NumberOfPassengers'),
                    //  required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },

                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'Mileage',
                    props: {
                      label: `Mileage (Km/lit)`,
                      maxLength: 15,
                      disabled: this.checkDisable('Mileage'),
                    //  required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },

                  {
                    className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                    type: 'input',
                    key: 'NoOfClaimYears',
  
                    props: {
                      label: `Number Of Claim Years`,
                      maxLength: 15,
                      disabled: this.checkDisable('NumberOfClaimYears'),
                    //  required: true,
                      options: [
  
                      ],
  
                    },
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                




                  // {
                  //   type: 'ngselect',
                  //   key: 'ExtendedTPPDSI',
                  //   defaultValue: '',
                  //   className: 'col-12 col-md-4 col-lg-4 col-xl-4',
                  //   hide: true,
                  //   hideExpression:true,
                  //   props: {
                  //     label: `Extended TPPD SumInsured`,
                  //     disabled: this.checkDisable('ExtendedTPPDSI'),
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
                      className: 'col-12 md:col-4 lg:col-4 xl:col-4 p-2',
                      key: 'ClaimsYN',
                      type: 'radioList',
                      templateOptions: {
                        type: 'radioList',
                        label: 'Claims YN ?',
                        required: true,
                        disabled: this.checkDisable('ClaimsYN'),
                       
                        name: 'ClaimsYN',
                        options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                      }
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
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}