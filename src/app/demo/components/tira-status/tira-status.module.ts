import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TreeSelectModule } from 'primeng/treeselect';
import { TiraStatusComponent } from './tira-status.component';
import { TiraStatusRoutingModule } from './tira-status-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { TiraSuccessComponent } from './tira-success/tira-success.component';
import { TiraFailureComponent } from './tira-failure/tira-failure.component';



@NgModule({
  declarations: [TiraStatusComponent, TiraSuccessComponent, TiraFailureComponent],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    FormsModule,
    DialogModule,
    CheckboxModule,
    ChipModule,
    AutoCompleteModule,
    RadioButtonModule,
    CardModule,
    TreeSelectModule,
    SelectButtonModule,
    ReactiveFormsModule,
    FormlyModule,
    TiraStatusRoutingModule,
    TabViewModule,
    CalendarModule
  ]
})
export class TiraStatusModule { }
