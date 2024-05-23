import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { ApproverPortfolioComponent } from './approverportfolio.component';
import { ApproverRoutingModule } from './approverportfolio-routing.module';
import { DirectivesModule } from '../../service/directives.module';
import { TableModule } from 'primeng/table';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

//import { RejectedQuotesComponent } from './rejected-quotes.component';
//import { RejectedQuotesRoutingModule } from './rejected-quotes-routing.module';
@NgModule({
  declarations: [
    ApproverPortfolioComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ApproverRoutingModule,
    TableModule,
    MaterialModule,
    PipesModule,
    PipesModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    InputTextModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    BreadcrumbModule, 
    InputTextareaModule,
  ],
  bootstrap: [ApproverPortfolioComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class ApproverPortfolioModule { }
