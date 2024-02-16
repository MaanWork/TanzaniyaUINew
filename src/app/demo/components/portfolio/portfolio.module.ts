import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    PortfolioComponent
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
    TableModule,
    MenuModule,
  ]
})
export class PortfolioModule { }
