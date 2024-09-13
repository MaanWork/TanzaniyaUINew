import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display',
 template: `<div>
      <p-inputNumber [formControl]="formControl" [id]="field.key" pInputNumber class="w-full w-full1"
       [formlyAttributes]="field" [maxlength]="to.maxLength" maxValue="999999"> 
       </p-inputNumber>
        <div class="text-danger"  *ngIf="to.errors==true && to.required==true">This field is Required</div>
 </div>`,
  //  <label>{{to.label}}</label><span *ngIf="to.required==true" class="text-danger">&nbsp;*</span>
})
export class InputNumber extends FieldType {}