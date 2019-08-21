import {Component, OnInit} from '@angular/core';
import {FormValidationService} from 'src/app/services/form-validation.service/form-validation.service';
import {MemberService} from 'src/app/services/member.service/member.service';
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
        this.errorMessage = 'Account was not created, internal error.';
      }
    } else if (isFormValid === false) {
      this.errorMessage = 'Form was not processed, internal error.';
    }

  }


}



