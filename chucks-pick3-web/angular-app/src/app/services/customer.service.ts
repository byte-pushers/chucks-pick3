import {CustomerInfo} from '../models/customer-info';

export interface CustomerService {
  addCustomer(newCustomer: CustomerInfo): void;
  deleteCustomer(targetCustomer: CustomerInfo): void;
  getSelectedCustomer(selectedCustomerId: number): CustomerInfo;
  getCustomers(): CustomerInfo[];
  createCustomer(customer: CustomerInfo): CustomerInfo;
}
