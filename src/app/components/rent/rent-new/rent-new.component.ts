import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {RentService} from '../../../service/rent.service';
import {Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../models/customer';
import {Product} from '../../../models/product';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-rent-add',
    templateUrl: './rent-new.component.html'
})
export class RentNewComponent implements OnInit {
    timeDurations = [3, 7, 14, 30, 60, 90, 180, 365];
    customers = [];
    products = [];

    rentForm: FormGroup = this.formBuilder.group({
        id_product: new FormControl('', {
            validators: Validators.compose([
                Validators.required
            ])
        }),
        id_customer: new FormControl('', {
            validators: Validators.compose([
                Validators.required
            ])
        }),
        rented_time: new FormControl('', {
            validators: Validators.compose([
                Validators.required
            ])
        }),
        duration_time: new FormControl('', {
            validators: Validators.compose([
                Validators.required
            ])
        })
    });

    constructor(
        private productService: ProductService,
        private customerService: CustomerService,
        private rentService: RentService,
        private formBuilder: FormBuilder,
        private router: Router,
        private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe((data: any[]) => {
            for (let i = 0 ; i <= data.length - 1; i++) {
                const customer: Customer = data[i];
                this.customers.push(customer);
            }
        });
        this.productService.getProducts().subscribe((data: any[]) => {
            for (let i = 0 ; i <= data.length - 1; i++) {
                const product: Product = data[i];
                this.products.push(product);
            }
        });
    }

    onSubmit(value) {
        value.rented_time = this.datePipe.transform(value.rented_time, 'yyyy-MM-dd\'T\'HH:mm:ssZ');

        this.rentService.addRent(value).subscribe(
            data => {
                alert('Rent has saved!');
                this.router.navigate(['/rents']);
            },
            error => {
                alert(error.message);
            }
        );
    }

}
