import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from 'src/app/shared/components/app.component/app.component';
import {AppHeaderComponent} from 'src/app/shared/components/app-header.component/app-header.component';
import {AppBodyComponent} from 'src/app/shared/components/app-body.component/app-body.component';
import {HomeComponent} from 'src/app/components/home.component/home.component';
import {SignUpComponent} from 'src/app/components/sign-up.component/sign-up.component';
import {LogInComponent} from 'src/app/components/log-in.component/log-in.component';
import {SignUpConfirmationComponent} from 'src/app/components/sign-up-confirmation.component/sign-up-confirmation.component';
import {CustomerSummaryComponent} from './components/customer-summary.component/customer-summary.component';
import {CustomerDetailsComponent} from './components/customer-details.component/customer-details.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up-confirmation', component: SignUpConfirmationComponent},
  {path: 'customers', component: CustomerSummaryComponent},
  {path: 'customers/:id', component: CustomerDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  HomeComponent,
  SignUpComponent,
  LogInComponent,
  SignUpConfirmationComponent,
  CustomerSummaryComponent,
  CustomerDetailsComponent
];
