import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {FormControl, Validators} from '@angular/forms';
import {Customer} from '../../../models/customer';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  id: number;
  private sub: any;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  constructor(
      private customerService: CustomerService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.customerService.getSingleCustomer(this.id).subscribe((data : Customer) => {
      this.name.setValue(data.name);
    });
  }

  updateCustomer() {
    if (this.name.valid) {
      this.customerService.updateCustomer(this.id,this.name.value.toString()).subscribe(
          data => {
            alert('Customer has updated!');
            this.router.navigate(['/customers']);
          },
          error => {
            alert(error.message);
          }
      );
    } else {
      alert('Field is required!');
    }

  }
}
