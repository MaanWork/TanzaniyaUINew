import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationTableComponent } from './quotation-table/quotation-table.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { QuotationPlanComponent } from './quotation-plan/quotation-plan.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [QuotationPlanComponent ],
  imports: [
    CommonModule,
    BreadcrumbModule, 
    ButtonModule,
    DividerModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    ChipModule,
    AutoCompleteModule,
    RadioButtonModule,
    CardModule,
    TreeSelectModule,
    DropdownModule
  ]
})
export class QuotationModule { }
