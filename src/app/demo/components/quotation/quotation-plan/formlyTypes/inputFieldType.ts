import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
        <input type="text" [id]="field.key" pInputText [formControl]="formControl" 
        [formlyAttributes]="field"  class="w-full w-full1">
         <div class="text-danger"  *ngIf="to.errors==true && to.required==true">This field is Required</div>
 `,
})
export class InputFieldType extends FieldType {}