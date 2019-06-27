import {NG_VALIDATORS, FormControl, ValidatorFn, Validator, Form} from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service/form-validation.service';
import { Directive } from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[phoneNumberMinLengthValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneNumberMinLengthValidator,
      multi: true
    }
  ]
})
export class PhoneNumberMinLengthValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.phoneNumberMinLengthValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public phoneNumberMinLengthValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.phoneMinLength(c.value)) {
        return null;
      } else {
        return {
          phoneNumberMinLengthValidator: {
            valid: false
          }
        };
      }
    };
  }
}
