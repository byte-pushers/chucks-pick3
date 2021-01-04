import {Injectable} from '@angular/core';
import {CustomerService} from "./customer.service";
import {Observable} from "rxjs";
import {CustomerInfo} from "../models/customer-info";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";


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

    return this.http.post<CustomerInfo>(environment.SIGN_UP.API.HOST, customerInfo, {
      headers: header,
      responseType: 'json'
    });
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
