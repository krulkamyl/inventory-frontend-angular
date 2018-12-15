import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from '../../../models/customer';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  id: number;
  private sub: any;

  customerForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
      ])
    })
  });

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.customerService.getSingleCustomer(this.id).subscribe((data: Customer) => {
      this.customerForm.get('name').setValue(data.name);
    });
  }

  onSubmit(value) {
    this.customerService.updateCustomer(this.id, value.name).subscribe(
      data => {
        alert('Customer has updated!');
        this.router.navigate(['/customers']);
      },
      error => {
        alert(error.message);
      }
    );
  }
}
