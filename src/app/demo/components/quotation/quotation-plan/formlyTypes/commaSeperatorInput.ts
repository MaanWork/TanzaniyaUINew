import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <p-inputNumber [formControl]="formControl" class="w-full" styleClass="w-full"
 [formlyAttributes]="field" inputId="integeronly" (keydown)="onKeyDown($event)"> </p-inputNumber>
 `,
})
export class CommaSeparatorInput extends FieldType {
    myNumber: number;

onKeyDown(event: KeyboardEvent) {
  const inputElement = event.target as HTMLInputElement;
  const maxLength = 19; 

  if (inputElement.value.length >= maxLength) {
    event.preventDefault();
  }
}
}