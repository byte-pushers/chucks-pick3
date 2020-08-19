import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../../services/form-validation.service';
import {MemberService} from '../../services/member.service';
import {Router} from '@angular/router';
import {LogInValidationService} from '../../services/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {


  public errorMessage: string;

  constructor(public formValidationService: FormValidationService,
              public memberService: MemberService,
              public router: Router,
              public logInService: LogInValidationService) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
    const summaryActive = document.getElementById('summary');
    summaryActive.classList.remove('active');
    summaryActive.classList.add('allow-hover');
  }

  public onSubmit() {
    const isFormValid = this.formValidationService.validateForm();
    if (isFormValid === true) {
      const isLogInSuccessful = this.memberService.performLogIn();
      if (isLogInSuccessful === true) {
        this.router.navigate(['/customers']);
        this.logInService.logIn();
      } else if (isLogInSuccessful === false) {
        /*show error message here, dont let user move on*/
        this.errorMessage = 'Account was not created, internal error.';
      }
    } else if (isFormValid === false) {
      /*show error message here, dont let user move on*/
      this.errorMessage = 'Form was not processed, internal error.';
    }
  }

}
