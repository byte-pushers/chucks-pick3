import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() {

  }


  public createAccount(): boolean {
    return false;
  }
  public logInSuccessful() {
    return true;
  }

}
