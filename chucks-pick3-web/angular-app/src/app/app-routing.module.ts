import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from 'src/app/shared/components/app.component/app.component';
import {AppHeaderComponent} from 'src/app/shared/components/app-header.component/app-header.component';
import {AppBodyComponent} from 'src/app/shared/components/app-body.component/app-body.component';
import {HomeComponent} from 'src/app/components/home.component/home.component';
import {InfoComponent} from 'src/app/components/info.component/info.component';
import {DemoComponent} from 'src/app/components/demo.component/demo.component';
import {SignUpComponent} from 'src/app/components/sign-up.component/sign-up.component';
import {LogInComponent} from 'src/app/components/log-in.component/log-in.component';
import {InfoGenerateComponent} from 'src/app/components/info-generate.component/info-generate.component';
import {InfoInterfaceComponent} from 'src/app/components/info-interface.component/info-interface.component';
import {InfoRequirementsComponent} from 'src/app/components/info-requirements.component/info-requirements.component';
import {InfoViewComponent} from 'src/app/components/info-view.component/info-view.component';
import {SignUpConfirmationComponent} from 'src/app/components/sign-up-confirmation.component/sign-up-confirmation.component';
import {CustomerSummaryComponent} from './components/customer-summary.component/customer-summary.component';
import {CustomerDetailsComponent} from './components/customer-details.component/customer-details.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'info', component: InfoComponent},
  {path: 'generate', component: InfoGenerateComponent},
  {path: 'interface', component: InfoInterfaceComponent},
  {path: 'requirements', component: InfoRequirementsComponent},
  {path: 'view', component: InfoViewComponent},
  {path: 'demo', component: DemoComponent},
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
  InfoComponent,
  DemoComponent,
  SignUpComponent,
  LogInComponent,
  SignUpConfirmationComponent,
  CustomerSummaryComponent,
  InfoGenerateComponent,
  InfoRequirementsComponent,
  InfoGenerateComponent,
  InfoViewComponent,
  CustomerDetailsComponent
];
