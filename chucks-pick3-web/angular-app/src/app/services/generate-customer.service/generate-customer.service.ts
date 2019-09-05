import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateCustomerService {

  constructor() { }
  public generateCustomer() {
    // TODO: create a new customer.
    const newCust = {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      email: this.generateEmail(),
      phone: '555-555-5555',
      city: this.generateCity(),
      state: this.generateState(),
      id: this.generateId()
    };
    return newCust;
  }
  public generateFirstName() {
    const firstName =
      [
        'Harvey',
        'Murray',
        'Jack'
      ];
    return firstName[Math.floor(Math.random() * firstName.length)];
  }

  public generateLastName() {
    const lastName =
      [
        'Pliskin',
        'Smith',
        'Gallegos'
      ];
    return lastName[Math.floor(Math.random() * lastName.length)];
  }

  public generateEmail() {
    const email =
      // these are temps
      [
        'baseballstar@gmail.com',
        'rockets@gmail.com',
        'supernintendo@gmail.com'
      ];
    // TODO find way to combine first and last name in order to create email.
    const chosenEmail = [Math.floor(Math.random() * email.length)];

  }

  public generateCity() {
    const cityName =
      [
        'Tampa',
        'Los Angeles',
        'Portland'
      ];
    return cityName[Math.floor(Math.random() * cityName.length)];
  }

  public generateState() {
    const stateName =
      [
        'Florida',
        'California',
        'Oregon'
      ];
    return stateName[Math.floor(Math.random() * stateName.length)];
  }

  public generateId() {
    const idName =
      [
        234,
        45,
        97
      ];
    return idName[Math.floor(Math.random() * idName.length)];
  }
}