import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CustomerTableComponent } from '../customer/customer-table/customer-table.component';
import { CustomerCreateFormComponent } from '../customer/customer-create-form/customer-create-form.component';
import { VehicleTableComponent } from '../vehicle/vehicle-table/vehicle-table.component';
import { VehicleCreateFormComponent } from '../vehicle/vehicle-create-form/vehicle-create-form.component';
import { CustomerDetailComponent } from '../customer/customer-detail/customer-detail.component';
import { PolicyTableComponent } from '../policy/policy-table/policy-table.component';
import { CommonQuoteDetailsComponent } from '../common-quote-details/common-quote-details.component';
import { QuotationTableComponent } from '../quotation/quotation-table/quotation-table.component';
import { TiraSearchComponent } from '../tira-search/tira-search.component';
import { ReferralComponent } from '../referral/referral.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReportComponent } from '../report/report.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'customer', component: CustomerTableComponent },
        { path: 'customer/create', component: CustomerCreateFormComponent },
        { path: 'customer/detail', component: CustomerDetailComponent },
        { path: 'vehicle', component: VehicleTableComponent },
        { path: 'vehicle/create', component: VehicleCreateFormComponent },
        { path: 'quotation', component: QuotationTableComponent },
        { path: 'quotation/plan', loadChildren: () => import('../quotation/quotation-plan/quotation-plan.module').then(m => m.QuotationPlanModule) },
        { path: 'policy', component: PolicyTableComponent },
        { path: 'policyDetails', component: CommonQuoteDetailsComponent }, 
        { path: 'tira-search', component: TiraSearchComponent }, 
        { path: 'referral', component: ReferralComponent },
        { path: 'portfolio', component: PortfolioComponent },
        { path: 'report', component: ReportComponent },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
