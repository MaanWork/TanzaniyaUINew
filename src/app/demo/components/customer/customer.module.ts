import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { CustomerCreateFormComponent } from './customer-create-form/customer-create-form.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ChipModule } from 'primeng/chip';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [CustomerCreateFormComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    BreadcrumbModule,
    DividerModule,
    CheckboxModule,
    SplitButtonModule,
    InputTextModule,
    SpeedDialModule,
    SelectButtonModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ChipModule
  ]
})
export class CustomerModule { }
