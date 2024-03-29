import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <input pInputText 
        type="input" class="w-full"
        [formControl]="formControl" 
        [formlyAttributes]="field"
        mask="separator" thousandSeparator=","
        >
 `,
})
export class CommaSeparatorInput extends FieldType {
    
}