import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-sign-up-confirmation',
  templateUrl: './sign-up-confirmation.component.html',
  styleUrls: ['./sign-up-confirmation.component.css']
})
export class SignUpConfirmationComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
    document.getElementById('sign-up-desktop').style.display = 'none';
    document.getElementById('sign-up-tablet').style.display = 'none';
    document.getElementById('sign-up-mobile').style.display = 'none';
  }

  ngOnDestroy() {
    document.getElementById('sign-up-desktop').style.display = 'flex';
    document.getElementById('sign-up-tablet').style.display = 'flex';
    document.getElementById('sign-up-mobile').style.display = 'block';
  }

}
