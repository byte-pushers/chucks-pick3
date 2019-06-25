import { NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { CheckFirstNameService }  from '../services/check-first-name.service/check-first-name.service';
import { Directive } from '@angular/core';

@Directive({
  selector: '[nameValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameValidator,
      multi: true
    }
]
})
export class NameValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private checkFirstNameService: CheckFirstNameService) {
    this.validator = this.nameValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public nameValidator(): ValidatorFn {
    return (c: FormControl) => {
        if (this.checkFirstNameService.isFirstNameValid(c.value)) {
          return null;
        } else {
          return {
            emailvalidator: {
              valid: false
            }
          };
        }
    };
  }
}
