import {ReactiveFormsModule,
  NG_VALIDATORS,
  FormControl,
  ValidatorFn,
  Validator } from '@angular/forms';
import {CheckFirstNameService} from './services/check-first-name.service/check-first-name.service';
import {Directive} from '@angular/core';
@Directive({
  selector: '[appFirstNameValid] [ngModel}',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckFirstNameDirective,
      multi: true
    }
]
})
export class CheckFirstNameDirective implements Validator {
  private firstName: string;
  constructor(private checkFirstNameService: CheckFirstNameService) {
    this.validate = this.checkFirstName();
  }

  validate(c: FormControl) {
    return this.validate(c);
  }

  public checkFirstName(): { appFirstNameValid: { valid: boolean } } { // create a function for first name // use input parameter
    const a: boolean = this.checkFirstNameService.isFirstNameValid(this.firstName);
    if (a === true) {
      return null;
    } else if (a === false) {
      return {
        appFirstNameValid: {
          valid: false
        }
      };
    }
  }
}
