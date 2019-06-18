import {Component, OnInit} from '@angular/core';
import {CheckFirstNameService} from 'src/app/services/check-first-name.service/check-first-name.service';

@Component({
  selector: 'app-sign-up-content-component',
  templateUrl: './app-sign-up-content.component.html',
  styleUrls: ['./app-sign-up-content.component.css']
})
export class AppSignUpContentComponent implements OnInit {
  public input: string;

  constructor(private checkFirstNameService: CheckFirstNameService) {
  }

  ngOnInit() {

  }

  public log(x): void {
    console.log(x);
  }

  public checkFirstName(firstName): void { // create a function for first name // use input parameter
    const a: boolean = this.checkFirstNameService.isFirstNameValid(firstName);
    if (a === false) {

    } else {

    }
  }

}




