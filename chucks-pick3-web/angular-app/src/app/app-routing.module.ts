import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './shared/components/app.component/app.component';
import {AppHeaderComponent} from './shared/components/app-header.component/app-header.component';
import {AppBodyComponent} from './shared/components/app-body.component/app-body.component';
import {HomeComponent} from './components/home.component/home.component';
import {InfoComponent} from './components/info.component/info.component';
import {DemoComponent} from './components/demo.component/demo.component';
import {SignUpComponent} from './components/sign-up.component/sign-up.component';
import {LogInComponent} from './components/log-in.component/log-in.component';
import {InfoGenerateComponent} from './components/info-generate.component/info-generate.component';
import {InfoInterfaceComponent} from './components/info-interface.component/info-interface.component';
import {InfoRequirementsComponent} from './components/info-requirements.component/info-requirements.component';
import {InfoViewComponent} from './components/info-view.component/info-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent, outlet: 'body'},
  { path: 'home', component: HomeComponent, outlet: 'body'},
  { path: 'home/:requirements', component: InfoRequirementsComponent, outlet: 'body'},
  { path: 'home/:demo', component: DemoComponent, outlet: 'body'},
  { path: 'home/:sign-up', component: SignUpComponent, outlet: 'body'},
  { path: 'info', component: InfoComponent, outlet: 'body'},
  { path: 'demo', component: DemoComponent, outlet: 'body'},
  { path: 'sign-up', component: SignUpComponent, outlet: 'body'},
  { path: 'log-in', component: LogInComponent, outlet: 'body'},
  { path: 'generate', component: InfoGenerateComponent, outlet: 'body'},
  { path: 'interface', component: InfoInterfaceComponent, outlet: 'body'},
  { path: 'requirements', component: InfoRequirementsComponent, outlet: 'body'},
  { path: 'view', component: InfoViewComponent, outlet: 'body'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export  class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  InfoComponent,
  DemoComponent,
  SignUpComponent,
  LogInComponent
];
