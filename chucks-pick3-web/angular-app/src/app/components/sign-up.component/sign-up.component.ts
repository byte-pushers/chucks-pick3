import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';
import * as Object from 'bytepushers-js-obj-extensions';
import { Subscription } from 'rxjs';
import { CustomerInfo } from '../../models/customer-info';
import { CustomerInfoModel } from '../../models/customer-info.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Overlay } from '@angular/cdk/overlay';
import { AppAlertOverlayModalService } from '../../shared/components/app-alert-overlay-modal.component/app-alert-overlay-modal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  private signUpSubscription: Subscription;
  @ViewChild('signUpForm', {static: false}) signUpForm: any;
  public customerInfo: CustomerInfo = new CustomerInfoModel(CustomerInfoModel.DEFAULT_CONFIG);

  constructor(private formValidationService: FormValidationService,
              private memberService: MemberService,
              public router: Router,
              private spinner: NgxSpinnerService,
              private overlay: Overlay,
              private viewContainerRef: ViewContainerRef,
              private appAlertOverlayModalService: AppAlertOverlayModalService) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');

    if (Object.isDefinedAndNotNull(howToActive)) {
      howToActive.classList.remove('active');
      howToActive.classList.add('allow-hover');
    }
  }

  ngOnDestroy() {
    this.signUpSubscription = null;
  }

  public isMobileResolution(): boolean {
    let isMobileResolution: boolean = false;

    if (window.innerWidth < 768) {
      isMobileResolution = true;
    } else {
      isMobileResolution = false;
    }

    return isMobileResolution;
  }

  public isDesktopResolution(): boolean {
    let isDesktopResolution: boolean = false;

    if (window.innerWidth > 768) {
      isDesktopResolution = true;
    } else {
      isDesktopResolution = false;
    }

    return isDesktopResolution;
  }

  public onSubmit() {
    this.showOverlayModal('Account was not created, internal error.');

    /*if (!this.signUpForm.valid) {
      this.errorMessage = 'Form was not processed, internal error.';
      return false;
    } else {
      this.spinner.show();
      this.signUpSubscription = this.memberService.createCustomer(this.customerInfo).subscribe(customerInfo => {
        this.router.navigate(['/sign-up-confirmation']);
        this.spinner.hide();
      }, error => {
        this.errorMessage = 'Account was not created, internal error.';
        console.log(this.errorMessage + ': ' + error);
        this.showOverlayModal(this.errorMessage);
        this.spinner.hide();
      });
    }*/
  }

  public showOverlayModal(message?: string) {
    this.appAlertOverlayModalService.setMessage(message);
    this.appAlertOverlayModalService.open();
  }
}
