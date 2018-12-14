import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: any;
  constructor(private customerService: CustomerService) { }
  ngOnInit() {
    this.customerService.getCustomers().subscribe((data: Array<Customer>) => {
      this.customers = data;
    });
  }

  deleteCustomer(id) {
    const decision = confirm('Are you sure you want to delete customer?');
    if (decision === true) {
      this.customerService.removeCustomer(id).subscribe(
          data => {
            alert('Customer has deleted!');
            this.customers = data.body;
          },
          error => {
            alert(error.message);
          }
      );
    }
  }
}