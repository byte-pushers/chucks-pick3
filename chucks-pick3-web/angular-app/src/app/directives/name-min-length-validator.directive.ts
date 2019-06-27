import {NG_VALIDATORS, FormControl, ValidatorFn, Validator, Form} from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service/form-validation.service';
import { Directive } from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[minLengthValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NameMinLengthValidator,
      multi: true
    }
  ]
})
export class NameMinLengthValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.minLengthValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public minLengthValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.minLength(c.value)) {
        return null;
      } else {
        return {
          minLengthValidator: {
            valid: false
          }
        };
      }
    };
  }
}
