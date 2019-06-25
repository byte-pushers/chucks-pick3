import {NG_VALIDATORS, FormControl, ValidatorFn, Validator, Form} from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service/form-validation.service';
import { Directive } from '@angular/core';

@Directive ({
  // tslint:disable-next-line:directive-selector
  selector: '[dataValidator] [ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DataValidator,
      multi: true
    }
  ]
})
export class DataValidator implements Validator {
  public validator: ValidatorFn;

constructor(private formValidationService: FormValidationService) {
  this.validator = this.dataValidator();
}
validate(c: FormControl) {
  return this.validator(c);
}

public dataValidator(): ValidatorFn {
  return (c: FormControl) => {
    if (this.formValidationService.hasData(c.value)) {
      return null;
    } else {
      return {
        dataValidator: {
          valid: false
        }
      };
    }
  };
}
}
