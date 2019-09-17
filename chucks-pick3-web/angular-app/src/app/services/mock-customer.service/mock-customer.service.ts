import {Injectable} from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {CustomerService} from '../customer.service';

@Injectable({
  providedIn: 'root'
})
export class MockCustomerService implements CustomerService {
  public customers: CustomerInfo [] = [];

  constructor() {
  }

  public createCustomer(customer: CustomerInfo): CustomerInfo {
    return this.generateCustomer();
  }

  public generateCustomer() {
    const firstName = this.generateFirstName();
    const lastName = this.generateLastName();
    const newCustomer = {
      firstName,
      lastName,
      email: this.generateEmail(firstName, lastName),
      phone: this.generatePhone(),
      city: this.generateCity(),
      state: this.generateState(),
      id: this.generateId()
    };
    return newCustomer;
  }

  public getSelectedCustomer(selectedCustomerId: number): CustomerInfo {
    let selectedCustomer: CustomerInfo = null;
    this.customers.forEach((customer) => {
      if (customer.id === selectedCustomerId) {
        selectedCustomer = customer;
      }
    });
    return selectedCustomer;
  }

  public getCustomers(): CustomerInfo[] {
    return this.customers;
  }

  public generateFirstName() {
    const firstName =
      [
        'Harvey',
        'Murray',
        'Jack',
        'Janet',
        'Terry',
        'Daniel'
      ];
    return firstName[Math.floor(Math.random() * firstName.length)];
  }

  public generateLastName(): string {
    const lastName =
      [
        'Pliskin',
        'Smith',
        'Gallegos',
        'Johnson',
        'Bogard',
        'Hall'
      ];
    return lastName[Math.floor(Math.random() * lastName.length)];
  }

  public generateEmail(firstName: string, lastName: string): string {
    const email =
      // these are temps
      [
        '@gmail.com',
        '@yahoo.com',
        '@bytepushers.software',
        '@aol.com',
        '@hotmail.com'
      ];
    // TODO find way to combine first and last name in order to create email.
    return firstName + '.' + lastName + email[Math.floor(Math.random() * email.length)];
  }

  public generateCity() {
    const cityName =
      [
        'Tampa',
        'Los Angeles',
        'Portland',
        'San Fransisco',
        'Washington DC'
      ];
    return cityName[Math.floor(Math.random() * cityName.length)];
  }

  public generateState() {
    const stateName =
      [
        'Florida',
        'California',
        'Oregon',
        'Maryland',
        'Montana'
      ];
    return stateName[Math.floor(Math.random() * stateName.length)];
  }

  public generateId() {
    const idName = Math.floor(Math.random() * 999);
    return idName;
  }

  public generatePhone() {
    const areaCode =
      [
        214,
        469,
        972,
      ];
    const selectedAreaCode = areaCode[Math.floor(Math.random() * areaCode.length)];
    const selectedPhoneNumberA = Math.floor(Math.random() * 999 - 100);
    const selectedPhoneNumberB = Math.floor(Math.random() * 9999 - 1000);
    return '(' + selectedAreaCode + ')' + ' ' + selectedPhoneNumberA + '-' + selectedPhoneNumberB;
  }

  public deleteCustomer(targetCustomer): void {
    let targetCustomerIndex;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      this.customers.forEach((customer, customerIndex) => {
        if (customer.id === targetCustomer.id) {
          targetCustomerIndex = customerIndex;
        }
      });
      this.customers.splice(targetCustomerIndex, 1);
    }
  }

  public addCustomer(newCustomer: CustomerInfo): void {
    this.customers.push(newCustomer);
  }
}
