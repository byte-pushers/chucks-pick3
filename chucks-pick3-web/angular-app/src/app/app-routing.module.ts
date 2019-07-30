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
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'info', component: InfoComponent, },
  { path: 'generate', component: InfoGenerateComponent},
  { path: 'interface', component: InfoInterfaceComponent},
  { path: 'requirements', component: InfoRequirementsComponent},
  { path: 'view', component: InfoViewComponent},
  { path: 'demo', component: DemoComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'log-in', component: LogInComponent}
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
