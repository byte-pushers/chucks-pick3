import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { CustomerInfo } from '../models/customer-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retry, retryWhen, shareReplay } from 'rxjs/operators';
import { DelayedRetryOperator } from '../shared/operators/delayed-retry/delayed-retry.operator';

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
    }).pipe(
      DelayedRetryOperator.operate(1000, 3),
      catchError(() => EMPTY),
      shareReplay()
    );
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
}
