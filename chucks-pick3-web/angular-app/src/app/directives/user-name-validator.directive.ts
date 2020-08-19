import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[userNameValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UserNameValidator,
      multi: true
    }
  ]
})
export class UserNameValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.userNameValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public userNameValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.isUserNameValid(c.value)) {
        return null;
      } else {
        return {
          userNameValidator: {
            valid: false
          }
        };
      }
    };
  }
}
