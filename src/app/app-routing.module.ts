import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: LandingPageComponent },
  { path: 'quote/new', component: CustomerFormComponent },
  { path: 'quote/details/:id', component: QuoteSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
