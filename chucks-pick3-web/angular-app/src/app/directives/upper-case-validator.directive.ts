import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {Directive} from '@angular/core';

// @ts-ignore
// @ts-ignore
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uppercaseValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UppercaseValidator,
      multi: true
    }
  ]
})
export class UppercaseValidator implements Validator {
public validator: ValidatorFn;
  constructor(private formValidationService: FormValidationService) {
    this.validator = this.uppercaseValidator();
  }
validate(c: FormControl) {
    return this.validator(c);
}

  public uppercaseValidator(): ValidatorFn {
    return (c: FormControl) => {

      if (this.formValidationService.isUppercase(c.value)) {
        return null;
      } else {
        return {
          uppercaseValidator: {
            valid: false
          }
        };
      }
    };
  }
}
