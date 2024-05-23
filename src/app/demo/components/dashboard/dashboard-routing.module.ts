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
import { ReferralCasesComponent } from '../Admin/referralCases/referral-cases.component';
import { SearchComponent } from '../Search/search.component';
import { EndorsementComponent } from '../portfolio/endorsement/endorsement.component';
import { EndorsementTypeComponent } from '../portfolio/endorsement-type/endorsement-type.component';
import { MotorDocumentsDetailComponent } from '../MotorDocuments/motor-documents-detail/motor-documents-detail.component';
// import { ApproverPortfolioComponent } from '../approverportfolio/approverportfolio.component';


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
        { path: 'portfolio/endorsement', component: EndorsementComponent },
        { path: 'portfolio/endorsementtype', component: EndorsementTypeComponent},
        { path: 'portfolio/motorDocuments', component: MotorDocumentsDetailComponent},
        { path: 'report', component: ReportComponent },
        { path: 'referralCases', component: ReferralCasesComponent },
        { path: 'Search', component : SearchComponent},
        { path: 'Admin', loadChildren: () => import('../Admin/admin.module').then(m => m.AdminModule) },
        // {
        //     path:'ApproverPortfolio',
        //     component:ApproverPortfolioComponent,
        //     loadChildren: () => import('../approverportfolio/approverportfolio.module').then(m => m.ApproverPortfolioModule),
        //   },
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
