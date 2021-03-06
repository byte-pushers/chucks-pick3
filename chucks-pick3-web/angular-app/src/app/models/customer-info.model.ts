import {CustomerInfo} from './customer-info';

export class CustomerInfoModel implements CustomerInfo {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public id: number;
  public gambleFrequency: string;
  public cellPhoneType: string;

  static readonly DEFAULT_CONFIG: CustomerInfo = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    city: null,
    state: null,
    zipCode: null,
    gambleFrequency: null,
    cellPhoneType: null
  };

  constructor(config: CustomerInfo) {
    this.firstName =  (config !== null && config !== undefined) ? config.firstName : undefined;
    this.lastName =  (config !== null && config !== undefined) ? config.lastName : undefined;
    this.email =  (config !== null && config !== undefined) ? config.email : undefined;
    this.phone =  (config !== null && config !== undefined) ? config.phone : undefined;
    this.city =  (config !== null && config !== undefined) ? config.city : undefined;
    this.state =  (config !== null && config !== undefined) ? config.state : undefined;
    this.id =  (config !== null && config !== undefined) ? config.id : undefined;
    this.zipCode =  (config !== null && config !== undefined) ? config.zipCode : undefined;
    this.gambleFrequency =  (config !== null && config !== undefined) ? config.gambleFrequency : undefined;
    this.cellPhoneType =  (config !== null && config !== undefined) ? config.cellPhoneType : undefined;
  }
}
