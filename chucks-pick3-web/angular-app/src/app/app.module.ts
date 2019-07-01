import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './shared/components/app.component/app.component';
import {AppHeaderComponent} from './shared/components/header.component/app-header.component';
import {AppBodyComponent} from './shared/components/app-body.component/app-body.component';
import {AppHomeComponent} from './components/app-home.component/app-home.component';
import {AppInfoComponent} from './components/app-info.component/app-info.component';
import {DemoComponent} from './components/demo.component/demo.component';
import {SignUpComponent} from './components/sign-up.component/sign-up.component';
import {LogInComponent} from './components/log-in.component/log-in.component';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {FormValidationService} from 'src/app/services/form-validation.service/form-validation.service';
import {NameValidator} from 'src/app/directives/name-validator.directive';
import {EmailValidator} from './directives/email-validator.directive';
import {NumberValidator} from './directives/number-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppHomeComponent,
    AppInfoComponent,
    DemoComponent,
    SignUpComponent,
    LogInComponent,
    NameValidator,
    EmailValidator,
    NumberValidator
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FormValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
