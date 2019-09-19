import {Component, NgModule, OnInit} from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NgForm, FormsModule} from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})

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

  public deleteCustomer(targetCustomer) {
    this.customerService.deleteCustomer(targetCustomer);
  }
}
