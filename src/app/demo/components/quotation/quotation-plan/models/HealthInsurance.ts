import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class HealthInsurance{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  subuserType: any=null;
  finalizeYN: any='N';dobDate:any=null;
    constructor() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
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
                props: { label: 'Health Insurance' },
                fieldGroup: [
                  {
                    key: 'patientList',
                    type: 'repeat',
                    
                    templateOptions: {
                      addText: 'Add Patient',
                    },
                    fieldArray: {
                      fieldGroup: [
                        {
                          fieldGroupClassName: 'row',
                          fieldGroup: [
                            {
                              type: 'ngselect',
                              key: 'RelationType',
                              defaultValue: '',
                              className: 'col-sm-12 col-md-6 col-lg-4',
                              props: {
                                label: `Relation Type`,
                                disabled: this.checkDisable('RelationType'),
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
                              className: 'col-sm-12 col-md-6 col-lg-4',
                                key: 'DateOfBirth',
                                type: 'datepicker',
                                defaultValue: '',
                                templateOptions: {
                                  defaultValue: '',
                                },
                                props: {
                                  label: 'Date Of Birth',
                                  
                                  required: true,
                                  type: 'date',
                                  datepickerOptions: {
                                    defaultValue: '',
                                    max: ''
                                  },
                                }
                              },
                            {
                              type: 'input',
                              className: 'col-sm-12 col-md-6 col-lg-4',
                              key: 'NickName',
                              defaultValue: '',
                              props: {
                                label: `Nickname`,
                                maxLength: 15,
                                disabled: this.checkDisable('NickName'),
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
                      ],
                    },
                  },
                ]
              }
            ]
          }
          
        ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}