import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from 'src/app/models/customer-info';
import {CustomerInfoModel} from '../../models/customer-info.model';
import index from "@angular/cli/lib/cli";
import {queueComponentIndexForCheck} from "@angular/core/src/render3/instructions";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  public customers: CustomerInfo [] = [];

  constructor() {
  }

  ngOnInit() {
    this.customers = [
      {
        firstName: 'David',
        lastName: 'Ocampo',
        email: 'docampo@bytepushers.software',
        phone: '555-555-5555',
        city: 'Denton',
        state: 'Texas',
        id: 22
      }];
  }

  /*  private matchIndex(indexEntry) {
      const customerArray = this.customers.indexOf(indexEntry, 0);
      if (customerArray.match(indexEntry)) {
        console.log(indexEntry);
  } else {
        return false;
      }
      return;
    }*/

  public deleteRow(targetCustomer) {
    let targetCustomerIndex;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      /*if (this.customers.includes(customer)) {
          const customerIndex = this.customers.indexOf(customer);
          this.customers.splice(customerIndex, 1);
        }*/
      this.customers.forEach((customer, customerIndex) => {
        if (customer.id === targetCustomer.id) {
          targetCustomerIndex = customerIndex;
        }
      });
      this.customers.splice(targetCustomerIndex, 1);
    }
  }

  public addRow() {
    const customer = this.customers;
    // TODO: create a new customer.
    const johnBowman = {
      firstName: 'John',
      lastName: 'Bowman',
      email: 'jbowman@gmail.com',
      phone: '555-555-5555',
      city: 'Chicago',
      state: 'Illinois',
      id: 76
    };
    // TODO: const aCustomer = this.generateCustomer()

    // TODO: add new customer to array.
    customer.push(johnBowman);
    /*   });*/
  }
}
