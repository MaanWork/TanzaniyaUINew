import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
 <p-inputNumber [formControl]="formControl" class="w-full" styleClass="w-full"
 [formlyAttributes]="field" inputId="integeronly" (keydown)="onKeyDown($event,field)"> </p-inputNumber>
 <div class="text-danger"  *ngIf="to.errors==true">This field is Required</div>
 `,
})
export class CommaSeparatorInput extends FieldType {
    myNumber: number;

    onKeyDown(event: KeyboardEvent,field) {
  const inputElement = event.target as HTMLInputElement;
  let maxLength=0; 
  if(field.key=='EngineCapacity') maxLength=6;
  else maxLength=19;
  if (inputElement.value.length >= maxLength) {
    event.preventDefault();
  }
    }
}