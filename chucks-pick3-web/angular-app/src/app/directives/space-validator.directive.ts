import {NG_VALIDATORS, FormControl, ValidatorFn, Validator} from '@angular/forms';
import {FormValidationService} from '../services/form-validation.service';
import {Directive} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[spaceValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SpaceValidator,
      multi: true
    }
  ]
})
export class SpaceValidator implements Validator {
  public validator: ValidatorFn;

  constructor(private formValidationService: FormValidationService) {
    this.validator = this.spaceValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public spaceValidator(): ValidatorFn {
    return (c: FormControl) => {
      if (this.formValidationService.hasInvalidSpace(c.value)) {
        return null;
      } else {
        return {
          spaceValidator: {
            valid: false
          }
        };
      }
    };
  }
}
