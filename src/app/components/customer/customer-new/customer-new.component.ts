import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Customer } from '../../../models/customer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-new',
    templateUrl: './customer-new.component.html'
})
export class CustomerNewComponent implements OnInit {
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
        private router: Router,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    onSubmit(value) {
        this.customerService.addCustomer(value.name).subscribe(
            data => {
                alert('Customer has saved!');
                this.router.navigate(['/customers']);
            },
            error => {
                alert(error.message);
            }
        );
    }
}
