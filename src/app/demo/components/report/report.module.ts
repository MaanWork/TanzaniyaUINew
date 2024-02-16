import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from '../report/report.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';



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
    DropdownModule
  ]
})
export class ReportModule { }
