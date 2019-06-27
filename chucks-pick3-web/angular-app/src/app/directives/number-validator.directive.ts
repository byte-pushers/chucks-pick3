import { NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service/form-validation.service';
import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[numberValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberValidator,
      multi: true
    }
  ]
})
export class NumberValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.numberValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public numberValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.isPhoneNumberValid(c.value)) {
        return null;
      } else {
        return {
          numberValidator: {
            valid: false
          }
        };
      }
    };
  }
}
