import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInValidationService {

  constructor() { }
  public logIn() {
    document.getElementById('log-in').style.display = 'none';
    document.getElementById('sign-up').style.display = 'none';
    document.getElementById('log-out').style.display = 'inline-block';
    document.getElementById('summary').style.display = 'inline-block';
    document.getElementById('log-in-mobile').style.display = 'none';
    document.getElementById('sign-up-mobile').style.display = 'none';
    document.getElementById('log-out-mobile').style.display = 'inline-block';
    document.getElementById('summary-mobile').style.display = 'inline-block';
  }
  public logOut() {
    document.getElementById('log-in').style.display = 'inline-block';
    document.getElementById('sign-up').style.display = 'inline-block';
    document.getElementById('log-out').style.display = 'none';
    document.getElementById('summary').style.display = 'none';
    document.getElementById('log-in-mobile').style.display = 'inline-block';
    document.getElementById('sign-up-mobile').style.display = 'inline-block';
    document.getElementById('log-out-mobile').style.display = 'none';
    document.getElementById('summary-mobile').style.display = 'none';
  }
}
