import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <p-inputNumber [formControl]="formControl" class="w-full w-full1" styleClass="w-full w-full1"
 [formlyAttributes]="field" inputId="minmaxfraction" mode="decimal"
  [minFractionDigits]="2" [maxFractionDigits]="5"> </p-inputNumber>
 `,
})
export class CommaSeparatorInput extends FieldType {
    
}