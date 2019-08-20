import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() {

  }

/* Add Create Account Here*/
  public createAccount(): boolean {
    console.log('memberServiceTest');
    return false;
  }

}
