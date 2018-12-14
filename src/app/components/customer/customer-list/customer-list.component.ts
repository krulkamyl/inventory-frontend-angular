import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers = [];
  constructor(private customerService: CustomerService) { }
  ngOnInit() {
    this.customers = [];
    this.customerService.getCustomers().subscribe((data : any[]) => {
      for (let i = 0 ; i <= data.length - 1; i++) {
        const customer: Customer = data[i];
        this.customers.push(customer);
      }
    });
  }

  deleteCustomer(id) {
    const decision = confirm('Are you sure you want to delete customer?');
    if (decision === true) {
      this.customerService.removeCustomer(id).subscribe(
          data => {
            alert('Customer has deleted!');
            this.ngOnInit();
          },
          error => {
            alert(error.message);
          }
      );
    }
  }
}