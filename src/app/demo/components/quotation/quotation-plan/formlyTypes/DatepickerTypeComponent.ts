import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-datepicker-type',
  template: `
  <p-calendar class="w-full" styleClass="w-full"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [maxDate]="to.datepickerOptions?.max"
        [minDate]="to.datepickerOptions?.min"
        dateFormat="dd/mm/yy">
    </p-calendar>
  `,
})
export class DatepickerTypeComponent extends FieldType {
  // Optional: only if you want to rely on `MatInput` implementation
  @ViewChild(MatInput) formFieldControl: MatInput;

    constructor() {
    super();
  }
}
