import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppBodyContainerComponent } from './components/app-body/app-body-container.component';
import { AppMainContentComponent } from './components/app-main-content/app-main-content.component';
import { AppLinkContainerComponent } from './components/app-link-container/app-link-container.component';
import { AppHowToContainerComponent } from './components/app-how-to-container.component/app-how-to-container.component';
import { AppDemoContainerComponent } from './components/app-demo-container.component/app-demo-container.component';
import { AppSignUpContainerComponent } from './components/app-sign-up-container.component/app-sign-up-container.component';
import { AppInfoContentComponent } from './components/app-info-content.component/app-info-content.component';
import { AppDemoContentComponent } from './components/app-demo-content.component/app-demo-content.component';
import { AppSignUpContentComponent } from './components/app-sign-up-content.component/app-sign-up-content.component';
import { AppLogInContentContainer } from './components/app-log-in-content-container/app-log-in-content-container';
import { AppRoutingModule, routingComponents } from './components/app-routing/app-routing.component';
import { AppHomeContentComponent } from './components/app-home-content.component/app-home-content.component';
import { FormsModule } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service/form-validation.service';
import { HasDataService } from 'src/app/services/has-data.service/has-data.service';
import { NameValidator } from 'src/app/directives/name-validator.directive';
import {DataValidator} from './directives/data-validator.directive';
import {NameMinLengthValidator} from './directives/name-min-length-validator.directive';
import {EmailValidator} from './directives/email-validator.directive';
import {NumberValidator} from './directives/number-validator.directive';
import {PhoneNumberMinLengthValidator} from './directives/phone-number-min-length-validator.directive';
import {ZipMinLengthValidator} from './directives/zip-min-length-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyContainerComponent,
    AppMainContentComponent,
    AppLinkContainerComponent,
    AppHowToContainerComponent,
    AppDemoContainerComponent,
    AppSignUpContainerComponent,
    AppInfoContentComponent,
    AppDemoContentComponent,
    AppSignUpContentComponent,
    AppLogInContentContainer,
    AppHomeContentComponent,
    NameValidator,
    DataValidator,
    NameMinLengthValidator,
    EmailValidator,
    NumberValidator,
    PhoneNumberMinLengthValidator,
    ZipMinLengthValidator
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FormValidationService,
    HasDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
