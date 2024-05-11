import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <p-inputNumber [formControl]="formControl" class="w-full" styleClass="w-full"
 [formlyAttributes]="field" inputId="integeronly"> </p-inputNumber>
 `,
})
export class CommaSeparatorInput extends FieldType {
    
}