import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service/mock-customer.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public testCustomer: CustomerInfo [] = [];
  editMode = false;
  readOnlyMode = true;
  public customers: CustomerInfo [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public customerService: MockCustomerService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.customers = this.customerService.getSelectedCustomer(id);
  }

  public toggleEditMode() {
    if (this.editMode === false) {
      this.enableEdit();
    } else if (this.editMode === true) {
      this.disableEdit();
    }
  }

  private enableEdit() {
    if (this.editMode === false) {
      this.editMode = true;
      if (this.editMode === true) {
        this.readOnlyMode = false;
      }
    }
  }

  private disableEdit() {
    if (this.editMode === true) {
      this.editMode = false;
      if (this.editMode === false) {
        this.readOnlyMode = true;
      }
    }
  }

  public removeCustomerDetail(targetCustomer) {
    let targetCustomerIndex;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      this.customerService.selectedCustomerIdArray.forEach((customer, customerIndex) => {
        if (customer.id === targetCustomer.id) {
          targetCustomerIndex = customerIndex;
        }
      });
      this.customerService.selectedCustomerIdArray.splice(targetCustomerIndex, 1);
    }
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

  public deleteCustomer(targetCustomer) {
    let targetCustomerIndex;
    if (targetCustomer !== null && targetCustomer !== undefined) {
      /*if (this.customers.includes(customer)) {
          const customerIndex = this.customers.indexOf(customer);
          this.customers.splice(customerIndex, 1);
        }*/
      this.customerService.selectedCustomerIdArray.forEach((customer, customerIndex) => {
        if (customer.id === targetCustomer.id) {
          targetCustomerIndex = customerIndex;
        }
      });
      this.customerService.selectedCustomerIdArray.splice(targetCustomerIndex, 1);
    }
  }

}
