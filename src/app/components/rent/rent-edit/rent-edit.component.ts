import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ParamService} from '../../../service/param.service';
import {Parameter} from '../../../models/parameter';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../models/product';
import {CustomerService} from '../../../service/customer.service';
import {RentService} from '../../../service/rent.service';
import {DatePipe} from '@angular/common';
import {Customer} from '../../../models/customer';
import {Rent} from '../../../models/rent';

@Component({
    selector: 'app-rent-edit',
    templateUrl: './rent-edit.component.html'
})
export class RentEditComponent implements OnInit {
    id: number;
    private sub: any;
    timeDurations = [3, 7, 14, 30, 60, 90, 180, 365];
    customers = [];
    products = [];
    rent: Rent;

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


    constructor(private productService: ProductService,
                private customerService: CustomerService,
                private rentService: RentService,
                private formBuilder: FormBuilder,
                private router: Router,
                private datePipe: DatePipe,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.customers = [];
        this.products = [];

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
        this.rentService.getSingleRent(this.id).subscribe((data: Rent) => {
            this.rent = data;
            this.rentForm.get('id_product').setValue(data.product.id);
            this.rentForm.get('id_customer').setValue(data.customer.id);
            this.rentForm.get('rented_time').setValue(data.rented_time);
            this.rentForm.get('duration_time').setValue(data.duration_time);
        });
    }

    onSubmit(value) {
        value.rented_time = this.datePipe.transform(value.rented_time, 'yyyy-MM-dd\'T\'HH:mm:ssZ');
        this.rentService.updateRent(this.id, value).subscribe(
            data => {
                alert('Rent has updated!');
                this.router.navigate(['/rents']);
            },
            error => {
                alert(error.message);
            }
        );
    }
}
