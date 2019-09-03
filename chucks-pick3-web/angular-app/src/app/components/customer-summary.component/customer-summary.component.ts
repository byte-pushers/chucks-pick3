import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from 'src/app/models/customer-info';
import {CustomerInfoModel} from '../../models/customer-info.model';
import index from "@angular/cli/lib/cli";
import {queueComponentIndexForCheck} from "@angular/core/src/render3/instructions";


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
        id: '22'
      }];
  }


  public deleteRow(customer) {
    const customerArray = this.customers;
    const customerValue = customer.id;
    if (customer !== null && customer !== undefined) {
      for (const customerIndex of customerArray) {
        if (customerIndex.id.includes(customerValue)) {
          this.customers.splice(this.customers.indexOf(customer), 1);
        }
      }
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
      id: '76'
    };
    // TODO: const aCustomer = this.generateCustomer()

    // TODO: add new customer to array.
    customer.push(johnBowman);
    /*   });*/
  }
}
