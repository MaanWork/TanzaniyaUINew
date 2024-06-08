import { FormlyFieldConfig } from "@ngx-formly/core";

export class AddPassenger{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;subuserType:any=null;
    enableFieldsList: any[]=[];finalizeYN:any='N';
    fields: FormlyFieldConfig = {}; 
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
            props: { label: 'Add Passenger' },
            fieldGroup: [
              {
                fieldGroupClassName: 'grid',
                fieldGroup: [
                  {
                    className: 'col-12 md:col-4 lg:col-4 ',
                    type: 'input',
                    key: 'PassengerFirstName',
                    templateOptions: {
                      label: `First Name`,
                      required: true,
                      disabled: this.checkDisable('PassengerFirstName'),
                      maxLength: 15
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'input',
                    key: 'PassengerLastName',
                    templateOptions: {
                      label: `Last Name`,
                      required: true,
                      disabled: this.checkDisable('PassengerLastName'),
                      maxLength: 15
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4 offset-3',
                    type: 'radio',
                    key: 'GenderId',
                    templateOptions: {
                     type: 'radio',
                      label: `Gender`,
                      required: true,
                      disabled: this.checkDisable('GenderId'),
                      options: [
                        {
                            value: 'Male',
                            label: 'Male'
                        },
                        {
                            value: 'Female',
                            label: 'Female'
                        }
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
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'ngselect',
                    key: 'RelationId',
                    templateOptions: {
                      label: `RelationShip`,
                      required: true,
                      disabled: this.checkDisable('RelationId'),
                      options: [
                        { label: 'Iron Man', value: 'iron_man' },
                        { label: 'Captain America', value: 'captain_america' },
                        { label: 'Black Widow', value: 'black_widow' },
                        { label: 'Hulk', value: 'hulk' },
                        { label: 'Captain Marvel', value: 'captain_marvel' },
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
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'datepicker',
                    key: 'Dob',
                    templateOptions: {
                      label: `Date Of Birth`,
                      required: true,
                      disabled: this.checkDisable('Dob'),
                      
                    },
                    
                    validators: {
                    },
                    hooks: {
                    },
                    expressions: {
                    },
                  },
                  {
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'ngselect',
                    key: 'Nationality',
                    templateOptions: {
                      label: `Nationality`,
                      required: true,
                      disabled: this.checkDisable('Nationality'),
                      options: [
                        { label: 'Iron Man', value: 'iron_man' },
                        { label: 'Captain America', value: 'captain_america' },
                        { label: 'Black Widow', value: 'black_widow' },
                        { label: 'Hulk', value: 'hulk' },
                        { label: 'Captain Marvel', value: 'captain_marvel' },
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
                    className: 'col-12 md:col-4 lg:col-4',
                    type: 'input',
                    key: 'PassportNo',
                    templateOptions: {
                      label: `Passport No`,
                      required: true,
                      disabled: this.checkDisable('PassportNo'),
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

          }
    }
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