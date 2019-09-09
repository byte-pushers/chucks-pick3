import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockCustomerService {

  constructor() { }
  public generateCustomer() {
    let generateCustomer;
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
    generateCustomer = newCustomer;
    return generateCustomer;
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

  public generateLastName(): string {
    const lastName =
      [
        'Pliskin',
        'Smith',
        'Gallegos'
      ];
    return lastName[Math.floor(Math.random() * lastName.length)];
  }

  public generateEmail(firstName: string, lastName: string): string {
    const email =
      // these are temps
      [
        '@gmail.com',
        '@yahoo.com',
        '@bytepushers.software'
      ];
    // TODO find way to combine first and last name in order to create email.
    return firstName + '.' + lastName + email[Math.floor(Math.random() * email.length)];
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
    const idName =  Math.floor(Math.random() * 999);
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
    const selectedPhoneNumberA = Math.floor(Math.random() * 999);
    const selectedPhoneNumberB = Math.floor(Math.random() * 9999);
    return '(' + selectedAreaCode + ')' + selectedPhoneNumberA + '-' + selectedPhoneNumberB;
  }
}
