import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {Directive} from '@angular/core';

// @ts-ignore
// @ts-ignore
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[specialCharactersValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SpecialCharactersValidator,
      multi: true
    }
  ]
})
export class SpecialCharactersValidator implements Validator {
  public validator: ValidatorFn;
  constructor(private formValidationService: FormValidationService) {
    this.validator = this.specialCharactersValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }

  public specialCharactersValidator(): ValidatorFn {
    return (c: FormControl) => {

      if (this.formValidationService.hasSpecialCharacters(c.value)) {
        return null;
      } else {
        return {
          specialCharactersValidator: {
            valid: false
          }
        };
      }
    };
  }
}
