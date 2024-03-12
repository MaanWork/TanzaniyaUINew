import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
        <input type="text" pInputText [formControl]="formControl" 
        [formlyAttributes]="field"  class="w-full">
 `,
})
export class InputFieldType extends FieldType {}