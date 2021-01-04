import {CustomerInfo} from '../models/customer-info';
import {Observable} from "rxjs";

export interface CustomerService {
  addCustomer(newCustomerInfo: CustomerInfo): void;
  deleteCustomer(targetCustomerInfo: CustomerInfo): void;
  getSelectedCustomer(selectedCustomerInfoId: number): Observable<CustomerInfo>;
  getCustomers(): Observable<CustomerInfo[]>;
  createCustomer(customerInfo: CustomerInfo): Observable<CustomerInfo>;
}
