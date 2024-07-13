import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
       selector: 'display',
       template: `
       <div>
              <label>{{to.label}}</label><span *ngIf="to.required==true" class="text-danger">&nbsp;*</span>
                     <p-dropdown [filter]="true" filterBy="label" inputId="make"  appendTo="body" class="w-full w-full1" styleClass="w-full w-full1" [formControl]="formControl" [options]="to.options"
                        optionLabel="label" optionValue="value">
                     </p-dropdown>
                     <div class="text-danger" *ngIf="formControl.errors">This field is Required</div>
       </div>
 `,
})
export class NgSelect extends FieldType {

}