import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../../services/form-validation.service/form-validation.service';
import {MemberService} from '../../services/member.service/member.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // Todo: create an errorMessage attribute so that it can be use later if and when the memberService.createAccount() return false.
 public setErrorMessage(querySelector, errorMessage, input) {
    document.querySelector(querySelector).innerHTML = errorMessage;
    input.setCustomValidity(errorMessage);

  }

  // Todo: inject both the FormValidationService & MemberService to be able to delegate to later.
  constructor(public formValidationService: FormValidationService ,
              private memberService: MemberService ) {
  }

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
  }
  public onSubmit(input) {
   const isFormValid =  this.formValidationService.validateForm();
   if (isFormValid === true) {
     isFormValid.memberService.createAccount();
   } else if (isFormValid === false) {
     this.setErrorMessage(".invalid-feedback." + input.name, '', input);
   }

  }

  // Todo: create onSubmit() method that delegates call to:
  // Todo: 1. formValidationService.validateForm() method.
  // Todo: 2. memberService.createAccount() method.
  // Todo: returns true continue on and call the memberService.createAccount() method.
  // Todo: If formValidationService.validateForm() returns false keep user on sign up age and display error message.
  // Todo: If memberService.createAccount() method
  // Todo: returns true forward user to the successful sign up page via correct route.  If memberService.createAccount() return
  // Todo: returns false keep user on sign up age and display error message.
}



