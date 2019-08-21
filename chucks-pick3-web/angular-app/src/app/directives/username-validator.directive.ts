import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service/form-validation.service';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[usernameValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UsernameValidator,
      multi: true
    }
  ]
})
export class UsernameValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.UsernameValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public UsernameValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.isUsernameValid(c.value)) {
        return null;
      } else {
        return {
          UsernameValidator: {
            valid: false
          }
        };
      }
    };
  }
}
