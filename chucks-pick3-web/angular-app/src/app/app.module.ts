import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './shared/components/app.component/app.component';
import {AppHeaderComponent} from './shared/components/app-header.component/app-header.component';
import {AppBodyComponent} from './shared/components/app-body.component/app-body.component';
import {HomeComponent} from './components/home.component/home.component';
import {InfoComponent} from './components/info.component/info.component';
import {DemoComponent} from './components/demo.component/demo.component';
import {SignUpComponent} from './components/sign-up.component/sign-up.component';
import {LogInComponent} from './components/log-in.component/log-in.component';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {FormValidationService} from 'src/app/services/form-validation.service/form-validation.service';
import {NameValidator} from 'src/app/directives/name-validator.directive';
import {EmailValidator} from './directives/email-validator.directive';
import {NumberValidator} from './directives/number-validator.directive';
import {InfoViewComponent} from './components/info-view.component/info-view.component';
import {InfoInterfaceComponent} from './components/info-interface.component/info-interface.component';
import {InfoGenerateComponent} from './components/info-generate.component/info-generate.component';
import {InfoRequirementsComponent} from './components/info-requirements.component/info-requirements.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyComponent,
    HomeComponent,
    InfoComponent,
    DemoComponent,
    SignUpComponent,
    LogInComponent,
    NameValidator,
    EmailValidator,
    NumberValidator,
    InfoViewComponent,
    InfoInterfaceComponent,
    InfoGenerateComponent,
    InfoRequirementsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ClickOutsideModule
  ],
  providers: [
    FormValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
