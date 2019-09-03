import {CustomerInfo} from './customer-info';

export class CustomerInfoModel implements CustomerInfo {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public city: string;
  public state: string;
  public id: string;

  constructor(config: CustomerInfo) {
    if (config != null && config !== undefined) {
      this.firstName = config.firstName;
    }
    if (config != null && config !== undefined) {
      this.lastName = config.lastName;
    }
    if (config != null && config !== undefined) {
      this.email = config.email;
    }
    if (config != null && config !== undefined) {
      this.phone = config.phone;
    }
    if (config != null && config !== undefined) {
      this.city = config.city;
    }
    if (config != null && config !== undefined) {
      this.state = config.state;
    }
    if (config != null && config !== undefined) {
      this.id = config.id;
    }
    }
  }
