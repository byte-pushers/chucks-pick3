import { Injectable } from '@angular/core';
import {publish} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  public logInSuccessful() {
    return true;
  }
}

// tslint:disable-next-line:align
