import { Component, OnInit } from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service/mock-customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  editMode = false;
  readOnlyMode = true;
  constructor() { }

  ngOnInit() {
  }
  public toggleEditMode() {
if (this.editMode === false) {
this.enableEdit();
} else if (this.editMode === true) {
  this.disableEdit();
}
  }
  private enableEdit(  ) {
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
}
