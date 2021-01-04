import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormValidationService} from 'src/app/services/form-validation.service';
import {MemberService} from 'src/app/services/member.service';
import {Router} from '@angular/router';
import * as Object from 'bytepushers-js-obj-extensions';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  private signUpSubscription: Subscription;

  @ViewChild('signUpForm', {static: false}) signUpForm: any;

  constructor(public formValidationService: FormValidationService,
              private memberService: MemberService,
              public router: Router) {
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
    /*const isFormValid = this.formValidationService.validateForm();
    const isAccountCreated = this.memberService.createAccount();

    if (isFormValid === true) {
      if (isAccountCreated === true) {
        this.router.navigate(['/sign-up-confirmation']);
      } else if (isAccountCreated === false) {
        this.errorMessage = 'Account was not created, internal error.';
      }
    } else if (isFormValid === false) {
      this.errorMessage = 'Form was not processed, internal error.';
    }*/

    if (!this.signUpForm.valid) {
      this.errorMessage = 'Form was not processed, internal error.';
      return false;
    } else {
      this.signUpSubscription = this.memberService.createCustomer(null).subscribe(customerInfo => {
        this.router.navigate(['/sign-up-confirmation']);
      }, error => {
        this.errorMessage = 'Account was not created, internal error.';
        console.log(this.errorMessage + ': ' + error);
      });
    }
  }
}
