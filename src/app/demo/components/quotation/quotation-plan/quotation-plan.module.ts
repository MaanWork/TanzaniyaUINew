import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationPlanRoutingModule } from './quotation-plan-routing.module';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { VehiclePlanComponent } from './vehicle-plan/vehicle-plan.component';
import { AccesoriesComponent } from './accesories/accesories.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { QuotationTypeInfoComponent } from './quotation-type-info/quotation-type-info.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { PipesModule } from 'src/app/demo/pipes/pipes.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { SharedModule } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/demo/service/directives.module';
import { PolicyInfoComponent } from './policy-info/policy-info.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ExcessDiscountComponent } from './excess-discount/excess-discount.component';
import { MaterialModule } from 'src/app/material/material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    VehicleCreateFormComponent,
    PolicyInfoComponent,
    CoverDetailsComponent,
    VehiclePlanComponent, 
    AccesoriesComponent,
    DocumentInfoComponent, 
    DriverInfoComponent, 
    QuotationTypeInfoComponent, 
    PaymentInfoComponent,
    ExcessDiscountComponent
  ],
  imports: [
    CommonModule,
    QuotationPlanRoutingModule,
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
    SidebarModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    FileUploadModule,
    ToastModule,
    PipesModule,
    SelectButtonModule,
    RadioButtonModule,
    DirectivesModule,
    AccordionModule,
    SplitButtonModule,
    SpeedDialModule,
    CalendarModule,
    ConfirmDialogModule,
    InputNumberModule,
    MatDialogModule,
    MaterialModule,
    NgbModule
  ]
})
export class QuotationPlanModule { }
