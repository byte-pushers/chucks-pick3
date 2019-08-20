import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../../services/form-validation.service/form-validation.service';
import {MemberService} from '../../services/member.service/member.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  public errorMessage: string;



  constructor(public formValidationService: FormValidationService,
              private memberService: MemberService,
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
              this.router.navigate(['/thank-you']);
      } else if (isAccountCreated === false) {
        /*show error message here, dont let user move on*/
        this.errorMessage = 'Account was not created, internal error.';
      }
    } else if (isFormValid === false) {
      /*show error message here, dont let user move on*/
      this.errorMessage = 'Form was not processed, internal error.';
    }

  }


}



