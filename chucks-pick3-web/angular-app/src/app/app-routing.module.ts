import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './shared/components/app.component/app.component';
import {AppHeaderComponent} from './shared/components/header.component/app-header.component';
import {AppBodyComponent} from './shared/components/app-body.component/app-body.component';
import {AppHomeComponent} from './components/app-home.component/app-home.component';
import {AppInfoComponent} from './components/app-info.component/app-info.component';
import {DemoComponent} from './components/demo.component/demo.component';
import {SignUpComponent} from './components/sign-up.component/sign-up.component';
import {LogInComponent} from './components/log-in.component/log-in.component';
import {SplashPageComponent} from './components/splash-page.component/splash-page.component';

const routes: Routes = [
  { path: '', component: SplashPageComponent, outlet: 'body'},
  { path: 'home', component: AppHomeComponent, outlet: 'body'},
  { path: 'info', component: AppInfoComponent, outlet: 'body'},
  { path: 'demo', component: DemoComponent, outlet: 'body'},
  { path: 'sign-up', component: SignUpComponent, outlet: 'body'},
  { path: 'log-in', component: LogInComponent, outlet: 'body'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export  class AppRoutingModule { }
export const routingComponents = [
  AppHomeComponent,
  AppInfoComponent,
  DemoComponent,
  SignUpComponent,
  LogInComponent
];
