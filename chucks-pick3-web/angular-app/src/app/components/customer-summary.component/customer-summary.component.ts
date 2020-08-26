import {Component, OnInit} from '@angular/core';
import {MockCustomerService} from '../../services/mock-customer.service';



@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.css']
})
export class CustomerSummaryComponent implements OnInit {
  public selectedCustomerIdArray: number [] = [];


  constructor(public customerService: MockCustomerService) {
  }

  ngOnInit() {
    const summaryActive = document.getElementById('summary');
    summaryActive.classList.add('active');
    summaryActive.classList.remove('allow-hover');
    const howToActive = document.getElementById('howTo');
    howToActive.classList.remove('active');
    howToActive.classList.add('allow-hover');
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

  public deleteSelected() {
    this.selectedCustomerIdArray.forEach((selectedCustomerId) => {
      const targetCustomer = this.customerService.getCustomers().find(customer => {
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
    this.customerService.deleteCustomer(targetCustomer);
  }

  public addRow() {
    const aCustomer = this.customerService.createCustomer(null);
    this.customerService.addCustomer(aCustomer);
  }


}

