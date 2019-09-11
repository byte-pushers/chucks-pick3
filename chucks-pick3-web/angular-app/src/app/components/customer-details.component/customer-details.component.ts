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
  constructor() { }

  ngOnInit() {
  }
  public toggleEditMode(editMode) {
if (editMode === false) {
this.enableEdit();
} else if (editMode === true) {
  this.disableEdit();
}
  }
  public enableEdit(  ) {
    if (this.editMode !== false) {
      console.log('enabled');
    }
  }
  public disableEdit() {
    if (this.editMode !== true) {
      console.log('disabled');
    }
  }
}
