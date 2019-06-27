import {NG_VALIDATORS, FormControl, ValidatorFn, Validator, Form} from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service/form-validation.service';
import { Directive } from '@angular/core';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[zipLengthValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ZipMinLengthValidator,
      multi: true
    }
  ]
})
export class ZipMinLengthValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.zipLengthValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public zipLengthValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.zipMinLength(c.value)) {
        return null;
      } else {
        return {
          zipLengthValidator: {
            valid: false
          }
        };
      }
    };
  }
}
