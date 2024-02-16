import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclePlanComponent } from './vehicle-plan/vehicle-plan.component';
import { QuotationPlanComponent } from './quotation-plan.component';
import { AccesoriesComponent } from './accesories/accesories.component';
import { QuotationTypeInfoComponent } from './quotation-type-info/quotation-type-info.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { CoverDetailsComponent } from './cover-details/cover-details.component';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { VehicleCreateFormComponent } from './vehicle-create-form/vehicle-create-form.component';
import { PolicyInfoComponent } from './policy-info/policy-info.component';

const routes: Routes = [
  { 
    path: 'main', 
    component: QuotationPlanComponent, 
    children: [
      { path: 'vehicle', component: VehiclePlanComponent },
      { path: 'accessories', component: AccesoriesComponent },
      { path: 'quote-type', component: QuotationTypeInfoComponent },
      { path: 'driver-info', component: DriverInfoComponent },
      { path: 'document-info', component: DocumentInfoComponent },
      { path: 'payment', component: PaymentInfoComponent },
      { path: 'policy-info', component: PolicyInfoComponent },
      
    ] 
  },
  { path: 'motor-details', component: VehicleCreateFormComponent },
  { 
    path: 'premium-details', 
    component: CoverDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationPlanRoutingModule { }
