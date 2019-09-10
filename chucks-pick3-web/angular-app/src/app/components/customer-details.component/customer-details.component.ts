import { Component, OnInit } from '@angular/core';
import {CustomerInfo} from '../../models/customer-info';
import {MockCustomerService} from '../../services/mock-customer.service/mock-customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  public customers: CustomerInfo [] = [];
  public selectedCustomerIdArray: number [] = [];

  constructor(public customerService: MockCustomerService) {
  }

  ngOnInit() {

  }

}
