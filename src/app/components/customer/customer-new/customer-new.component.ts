import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {FormControl, Validators} from '@angular/forms';
import {Customer} from '../../../models/customer';
import {Router} from '@angular/router';

@Component({
    selector: 'app-customer-new',
    templateUrl: './customer-new.component.html'
})
export class CustomerNewComponent implements OnInit {
    customers = [];
    name = new FormControl('', [
        Validators.required,
        Validators.minLength(2)
    ]);

    constructor(
        private customerService: CustomerService,
        private router: Router) {
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe((data: any[]) => {
            for (let i = 0; i <= data.length - 1; i++) {
                this.customers.push(new Customer(data[i].id, data[i].name, data[i].created_at, data[i].updated_at));
            }
        });
    }

    addCustomer() {
        if (this.name.valid) {
            this.customerService.addCustomer(this.name.value.toString()).subscribe(
                data => {
                    alert('Customer has saved!');
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
