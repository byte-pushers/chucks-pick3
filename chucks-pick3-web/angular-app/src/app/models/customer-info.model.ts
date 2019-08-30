import {CustomerInfo} from './customer-info';

export class CustomerInfoModel implements CustomerInfo {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public city: string;
  public state: string;

  constructor(config: CustomerInfo) {
    this.firstName = config.firstName;
    this.lastName = config.lastName;
    this.email = config.email;
    this.phone = config.phone;
    this.city = config.city;
    this.state = config.state;
  }
}
