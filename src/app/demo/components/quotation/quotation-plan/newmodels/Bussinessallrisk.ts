import { FormlyFieldConfig } from "@ngx-formly/core";

export class BussinessAllRisk{
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
      this.fields = {
          props: { label: 'Business All Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                // {
                //   className: "splitCardHeaderss",
                //   type: 'displays',

                //   templateOptions: {
                //     label: `Equipment`,
                //     //on premises out of business hrs
                //     required: false,

                //   },
                // },
                {
                  //className: 'col-12 col-lg-4 col-md-4 offset-lg-2 offset-md-2',
                  className:"labelsum",
                  type: 'commaSeparator',
                  key: 'EquipmentSi',
                  props: {
                    label: 'SumInsured',
                     disabled: this.checkDisable('SumInsured'),
                    required: true,
                    maxLength: 15,
                    options: [
                    ],
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