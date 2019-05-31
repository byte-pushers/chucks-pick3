import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router/';
import {AppInfoContentComponent} from '../app-info-content.component/app-info-content.component';
import {AppDemoContentComponent} from '../app-demo-content.component/app-demo-content.component';
import {AppSignUpContentComponent} from '../app-sign-up-content.component/app-sign-up-content.component';
import {AppLogInContentContainer} from '../app-log-in-content-container/app-log-in-content-container';

const routes: Routes = [
  { path: 'how-to', component: AppInfoContentComponent},
  { path: 'demo', component: AppDemoContentComponent},
  { path: 'sign-up', component: AppSignUpContentComponent},
  { path: 'log-in', component: AppLogInContentContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: {RouterModule}
})
export  class AppRoutingModule { }

