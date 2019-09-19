import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from 'src/app/services/form-validation.service';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[passwordValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidator,
      multi: true
    }
  ]
})
export class PasswordValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.passwordValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public passwordValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.isPasswordValid(c.value)) {
        return null;
      } else {
        return {
          passwordValidator: {
            valid: false
          }
        };
      }
    };
  }
}
