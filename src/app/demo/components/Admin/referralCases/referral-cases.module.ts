import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ReferralCasesComponent } from './referral-cases.component';


@NgModule({
  declarations: [
    ReferralCasesComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule,
    TableModule
  ]
})
export class ReferralModule { }
