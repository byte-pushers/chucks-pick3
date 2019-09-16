import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from 'src/app/models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service/mock-customer.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  public customers: CustomerInfo [] = [];
  public selectedCustomerIdArray: number [] = [];


  constructor(public customerService: MockCustomerService) {
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  public selectCustomer(event) {
    const checkBoxElement = event.target;
    const targetId = Number(checkBoxElement.id);
    if (checkBoxElement !== null && checkBoxElement !== undefined) {
      if (checkBoxElement.checked === true) {
        this.selectedCustomerIdArray.push(targetId);
      } else {
        this.selectedCustomerIdArray.forEach((selectedCustomerId, selectedCustomerIdIndex) => {
          if (selectedCustomerId === targetId) {
            this.selectedCustomerIdArray.splice(selectedCustomerIdIndex, 1);
          }
        });
      }
    }
  }

  public selectCustomerData(targetCustomer) {
    const aCustomer = this.customerService.selectedCustomerIdArray;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      console.log(targetCustomer);
      aCustomer.push(targetCustomer);
    }
  }

  public deleteSelected() {
    this.selectedCustomerIdArray.forEach((selectedCustomerId) => {
      const targetCustomer = this.customers.find(customer => {
        let foundCustomer = false;
        if (customer.id === selectedCustomerId) {
          foundCustomer = true;
        }
        return foundCustomer;
      });

      if (targetCustomer !== null && targetCustomer !== undefined) {
        this.deleteRow(targetCustomer);
      }
    });
  }


  public deleteRow(targetCustomer) {
    let targetCustomerIndex;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      this.customerService.customers.forEach((customer, customerIndex) => {
        if (customer.id === targetCustomer.id) {
          targetCustomerIndex = customerIndex;
        }
      });
      this.customerService.customers.splice(targetCustomerIndex, 1);
    }
  }

  public addRow() {
    const customer = this.customerService.customers;
    const aCustomer = this.customerService.generateCustomer();
    customer.push(aCustomer);
  }


}

