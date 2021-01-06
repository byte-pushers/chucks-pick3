import {Injectable} from '@angular/core';
import {CustomerService} from "./customer.service";
import {CustomerInfo} from "../models/customer-info";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retry, retryWhen, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemberService implements CustomerService {

  constructor(private http: HttpClient) {

  }


  public createAccount(): boolean {
    return false;
  }

  public performLogIn() {
    return true;
  }

  createCustomer(customerInfo: CustomerInfo): Observable<CustomerInfo>{
    const header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Accept','application/json');
    const maxRetry = 3;
    let retries = maxRetry;

    return this.http.post<CustomerInfo>(environment.SIGN_UP.API.HOST, customerInfo, {
      headers: header,
      responseType: 'json'
    }).pipe(retryWhen((errors: Observable<any>) => errors.pipe(
      delay(3),
      mergeMap(error => retries-- > 0 ? of(error) : throwError(this.getErrorMessage(maxRetry))))
    ), catchError(() => EMPTY), shareReplay());
  }

  addCustomer(newCustomerInfo: CustomerInfo): void {
  }

  deleteCustomer(targetCustomerInfo: CustomerInfo): void {
  }

  getCustomers(): Observable<CustomerInfo[]> {
    return undefined;
  }

  getSelectedCustomer(selectedCustomerInfoId: number): Observable<CustomerInfo> {
    return undefined;
  }

  private getErrorMessage(maxRetry: number) {
    return `Tried to load Resource over XHR for ${maxRetry} times without success.  Giving up.`;
  }
}
