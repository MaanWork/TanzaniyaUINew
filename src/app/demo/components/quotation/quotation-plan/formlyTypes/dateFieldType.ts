import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-radio',
 template: `
    <div class="input-form-box">
        <input type="date" [formControl]="formControl"  appendTo="body"
        [formlyAttributes]="field"  class="input-form-control without-icon">
    </div>
 `,
})
export class DateFieldType extends FieldType {}