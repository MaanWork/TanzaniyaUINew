import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
       selector: 'display',
       template: `
              <div class="input-control-container mt-2">
                     <label class="input-form-label">{{to.label}}</label><span *ngIf="to.required==true" class="text-dark">&nbsp;*</span>
                     <p-dropdown inputId="make" class="w-full" styleClass="w-full" [formControl]="formControl" [options]="to.options"
                        optionLabel="label" optionValue="value">
                     </p-dropdown>
              </div> 
 `,
})
export class NgSelect extends FieldType {

}