import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  //Todo: create an errorMessage attribute so that it can be use later if and when the memberService.createAccount() return false.


  //Todo: inject both the FormValidationService & MemberService to be able to delegate to later.
  constructor() {}

  ngOnInit() {
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
  }

  //Todo: create onSubmit() method that delegates call to:
  //Todo: 1. formValidationService.validateForm() method.
  //Todo: 2. memberService.createAccount() method.
  //Todo: formValidationService.validateForm() method
  //Todo: returns true continue on and call the memberService.createAccount() method.
  //Todo: If formValidationService.validateForm() returns false keep user on sign up age and display error message.
  //Todo: If memberService.createAccount() method
  //Todo: returns true forward user to the successful sign up page via correct route.  If memberService.createAccount() return
  //Todo: returns false keep user on sign up age and display error message.
}



