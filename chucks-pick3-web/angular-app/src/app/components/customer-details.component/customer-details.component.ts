import {Component, OnInit} from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  editMode = false;
  readOnlyMode = true;
  public selectedCustomer: CustomerInfo = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public customerService: MockCustomerService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.selectedCustomer = this.customerService.getSelectedCustomer(parseInt(id, 10));
  }

  public toggleEditMode() {
    if (this.editMode === false) {
      this.enableEdit();
    } else if (this.editMode === true) {
      this.disableEdit();
    }
  }

  public resetCustomerInfo(details: NgForm) {
    details.reset(this.selectedCustomer);
  }

  private enableEdit() {
    if (this.editMode === false) {
      this.editMode = true;
      document.getElementById('email').classList.toggle('bg-secondary');
      document.getElementById('phone').classList.toggle('bg-secondary');
      document.getElementById('city').classList.toggle('bg-secondary');
      document.getElementById('state').classList.toggle('bg-secondary');
      document.getElementById('howOften').classList.toggle('bg-secondary');
      document.getElementById('phoneType').classList.toggle('bg-secondary');
      document.getElementById('email').classList.toggle('bg-dark');
      document.getElementById('phone').classList.toggle('bg-dark');
      document.getElementById('city').classList.toggle('bg-dark');
      document.getElementById('state').classList.toggle('bg-dark');
      document.getElementById('howOften').classList.toggle('bg-dark');
      document.getElementById('phoneType').classList.toggle('bg-dark');
      if (this.editMode === true) {
        this.readOnlyMode = false;
      }
    }
  }

  private disableEdit() {
    if (this.editMode === true) {
      this.editMode = false;
      document.getElementById('email').classList.toggle('bg-secondary');
      document.getElementById('phone').classList.toggle('bg-secondary');
      document.getElementById('city').classList.toggle('bg-secondary');
      document.getElementById('state').classList.toggle('bg-secondary');
      document.getElementById('howOften').classList.toggle('bg-secondary');
      document.getElementById('phoneType').classList.toggle('bg-secondary');
      document.getElementById('email').classList.toggle('bg-dark');
      document.getElementById('phone').classList.toggle('bg-dark');
      document.getElementById('city').classList.toggle('bg-dark');
      document.getElementById('state').classList.toggle('bg-dark');
      document.getElementById('howOften').classList.toggle('bg-dark');
      document.getElementById('phoneType').classList.toggle('bg-dark');

      if (this.editMode === false) {
        this.readOnlyMode = true;
      }
    }
  }

  public deleteCustomer(targetCustomer) {
    this.customerService.deleteCustomer(targetCustomer);
  }
}
