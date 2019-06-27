import {
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[emailValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidator,
      multi: true
    }
  ]
})

export class EmailValidator implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = this.emailValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  emailValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,30})$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          emailValidator: {
            valid: false
          }
        };
      }
    };
  }
}
