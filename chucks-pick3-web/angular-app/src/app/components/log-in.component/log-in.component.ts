import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../../services/form-validation.service/form-validation.service';
import {MemberService} from '../../services/member.service/member.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  public errorMessage: string;
  constructor(public formValidationService: FormValidationService,
              public memberService: MemberService,
              public router: Router) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
  }
  public onSubmit() {
    const isFormValid = this.formValidationService.validateForm();
    const isAccountCreated = this.memberService.createAccount();
    if (isFormValid === true) {
      if (isAccountCreated === true) {
        this.router.navigate(['/sign-up-confirmation']);
      } else if (isAccountCreated === false) {
        this.errorMessage = 'Account was not created, internal error.';
      }
    } else if (isFormValid === false) {
      this.errorMessage = 'Form was not processed, internal error.';
    }

  }

}
