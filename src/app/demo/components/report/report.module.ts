import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from '../report/report.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    TableModule,
    TabViewModule
  ]
})
export class ReportModule { }
