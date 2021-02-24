import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {phoneNumberValidator} from "./phone-number-validator.directive";

@Directive({
  selector: '[phoneNumber] [ngModel]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: PhoneNumberDirective, multi: true
  }]
})
export class PhoneNumberDirective implements Validator {
  private validator = phoneNumberValidator(new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/));

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.validator(control);
  }
}
