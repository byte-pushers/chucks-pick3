import {Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private subject: BehaviorSubject<string> = <BehaviorSubject<string>>new BehaviorSubject(null);

  constructor() {

  }

  public saveFragment(fragment: string): void {
    this.subject.next(fragment);
  }

  public fragment(): Observable<string> {
    return this.subject.asObservable();
  }
}
