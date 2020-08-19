import {SelectedCustomerId} from './selected-customer-id';

export class SelectedCustomerIdModel implements SelectedCustomerId {
  public id: number;

  constructor(config: SelectedCustomerId) {
    this.id =  (config !== null && config !== undefined) ? config.id : undefined;
  }
}
