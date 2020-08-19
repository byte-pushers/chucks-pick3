import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {Directive} from '@angular/core';

// @ts-ignore
// @ts-ignore
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[lowercaseValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LowercaseValidator,
      multi: true
    }
  ]
})
export class LowercaseValidator implements Validator {
  public validator: ValidatorFn;
  constructor(private formValidationService: FormValidationService) {
    this.validator = this.lowercaseValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }

  public lowercaseValidator(): ValidatorFn {
    return (c: FormControl) => {

      if (this.formValidationService.isLowercase(c.value)) {
        return null;
      } else {
        return {
          lowercaseValidator: {
            valid: false
          }
        };
      }
    };
  }
}
