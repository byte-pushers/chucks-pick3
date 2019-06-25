import {Component, OnInit, Directive} from '@angular/core';
import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import {CheckFirstNameService} from 'src/app/services/check-first-name.service/check-first-name.service';

@Component({
  selector: 'app-sign-up-content-component',
  templateUrl: './app-sign-up-content.component.html',
  styleUrls: ['./app-sign-up-content.component.css']
})
export class AppSignUpContentComponent implements OnInit {
  public input: string;


  ngOnInit() {

  }

  public log(x): void {
    console.log(x);
  }

@Directive({
  selector: '[firstnamevalid] [ngModel}',
  providers: [
    provide: NG_VALIDATORS,
  useExisting: CheckFirstNameService,
  multi: true
]
}

)

export class FirstNameValidator implements Validator {
  constructor(private checkFirstNameService: CheckFirstNameService) {
    this.validator = this.checkFirstName();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public checkFirstName(): ValidatorFn { // create a function for first name // use input parameter
    const a: boolean = this.checkFirstNameService.isFirstNameValid(firstName);
    if (a === true) {
      return null;
    } else if (a === false) {
      return {
        firstnamevalid: {
          valid: false
        }
      };
    }
  }
}
}




