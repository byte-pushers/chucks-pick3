import {AbstractControl, ValidatorFn} from '@angular/forms';

export function phoneNumberValidator (expression: RegExp) : ValidatorFn {
  return (control: AbstractControl): {[key:string]: any} | null => {
    const valid = expression.test(control.value) && control.value.length;

    return valid ? null : {phoneNumber: {
        valid: false,
        value: control.value
      }};
  }
}
