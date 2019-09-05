import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from 'src/app/shared/components/app.component/app.component';
import {AppHeaderComponent} from 'src/app/shared/components/app-header.component/app-header.component';
import {AppBodyComponent} from 'src/app/shared/components/app-body.component/app-body.component';
import {HomeComponent} from 'src/app/components/home.component/home.component';
import {InfoComponent} from 'src/app/components/info.component/info.component';
import {DemoComponent} from 'src/app/components/demo.component/demo.component';
import {SignUpComponent} from 'src/app/components/sign-up.component/sign-up.component';
import {LogInComponent} from 'src/app/components/log-in.component/log-in.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {FormsModule} from '@angular/forms';
import {FormValidationService} from 'src/app/services/form-validation.service/form-validation.service';
import {NameValidator} from 'src/app/directives/name-validator.directive';
import {EmailValidator} from 'src/app/directives/email-validator.directive';
import {NumberValidator} from 'src/app/directives/number-validator.directive';
import {InfoViewComponent} from 'src/app/components/info-view.component/info-view.component';
import {InfoInterfaceComponent} from 'src/app/components/info-interface.component/info-interface.component';
import {InfoGenerateComponent} from 'src/app/components/info-generate.component/info-generate.component';
import {InfoRequirementsComponent} from 'src/app/components/info-requirements.component/info-requirements.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {ScrollEventModule} from 'ngx-scroll-event';
import {SubNavBarService} from './services/show-sub-nav-bar.service/sub-nav-bar.service';
import {UppercaseValidator} from './directives/upper-case-validator.directive';
import { LowercaseValidator } from './directives/lower-case-validator.directive';
import { SpecialCharactersValidator } from './directives/special-characters-validator.directive';
import { CustomerSummaryComponent } from './components/customer-summary.component/customer-summary.component';
import { SpaceValidator } from './directives/space-validator.directive';
import {SignUpConfirmationComponent} from 'src/app/components/sign-up-confirmation.component/sign-up-confirmation.component';
import {MemberService} from 'src/app/services/member.service/member.service';
import { UserNameValidator } from './directives/user-name-validator.directive';
import { PasswordValidator } from './directives/password.directive';
import { MockCustomerService } from './services/mock-customer.service/mock-customer.service';

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
    InfoRequirementsComponent,
    SignUpConfirmationComponent,
    SpaceValidator,
    UppercaseValidator,
    LowercaseValidator,
    SpecialCharactersValidator,
    CustomerSummaryComponent,
    UserNameValidator,
    PasswordValidator
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ClickOutsideModule,
    ScrollEventModule
  ],
  providers: [
    MemberService,
    SubNavBarService,
    FormValidationService,
    MockCustomerService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
