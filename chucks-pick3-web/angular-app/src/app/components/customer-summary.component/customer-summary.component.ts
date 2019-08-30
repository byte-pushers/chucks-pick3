import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from 'src/app/models/customer-info';
import {CustomerInfoModel} from '../../models/customer-info.model';


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
        state: 'Texas'
      },
      {
        firstName: 'Mark',
        lastName: 'Caroll',
        email: 'mcarroll@gmail.com',
        phone: '555-555-5555',
        city: 'Elko',
        state: 'Nevada'
      },
      {
        firstName: 'George',
        lastName: 'Anderson',
        email: 'ganderson@gmail.com',
        phone: '555-555-5555',
        city: 'Los Angeles',
        state: 'California'
      },
      {
        firstName: 'Henry',
        lastName: 'Smith',
        email: 'hsmith@gmail.com',
        phone: '555-555-5555',
        city: 'Boston',
        state: 'Massachusetts'
      }
    ];
  }


  public deleteRow(customer) {
    if (customer !== null && customer !== undefined) {
      this.customers.splice(customer, 1);
    }
  }

  public addRow(customer) {

    /* this.customers.forEach(customer => {*/
    // TODO: create a new customer.
    customer[4] = {
      firstName: 'John',
      lastName: 'Bowman',
      email: 'jbowman@gmail.com',
      phone: '555-555-5555',
      city: 'Chicago',
      state: 'Illinois'
    };
    // TODO: add new customer to array.
    customer.push();
    /*   });*/
  }
}
