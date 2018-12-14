import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ParamService} from '../../../service/param.service';
import {Parameter} from '../../../models/parameter';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../models/product';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
    id: number;
    private sub: any;
    parameters = [];
    validation_messages = {
        'name': [
            {type: 'required', message: 'Name is required'},
            {type: 'minlength', message: 'Name must be at least 5 characters long'},
            {type: 'maxlength', message: 'Name cannot be more than 25 characters long'}
        ],
        'price': [
            {type: 'required', message: 'Price is required'},
            {type: 'pattern', message: 'Enter a valid price'},
            {type: 'minlength', message: 'Price must be at least 1 character long'},
            {type: 'maxlength', message: 'Price cannot be more than 25 characters long'}
        ]
    };

    productForm: FormGroup = this.formBuilder.group({
        name: new FormControl('', {
            validators: Validators.compose([
                Validators.required,
                Validators.maxLength(25),
                Validators.minLength(3),
            ])
        }),
        price: new FormControl('', {
            validators: Validators.compose([
                Validators.required,
                Validators.maxLength(25),
                Validators.minLength(1),
                Validators.pattern('^[0-9]*$'),
            ])
        })
    });

    constructor(private parameterService: ParamService,
                private productService: ProductService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.parameters = [];

        this.productService.getSingleProduct(this.id).subscribe((data: Product) => {
            this.productForm.get('name').setValue(data.name);
            this.productForm.get('price').setValue(data.price);
            for (let i = 0; i <= data.parameters.length - 1; i++) {
                const parameter: any = data.parameters[i];
                this.parameters.push(new Parameter(parameter.id, parameter.name, parameter.created_at, parameter.updated_at));
                this.productForm.addControl(parameter.id.toString(), new FormControl(parameter.value, Validators.required));
            }
            this.parameterService.getParams().subscribe((data: any[]) => {
                for (let i = 0; i <= data.length - 1; i++) {
                    const control = this.productForm.get(data[i].id.toString());
                    if (!control) {
                        this.parameters.push(new Parameter(data[i].id, data[i].name, data[i].created_at, data[i].updated_at));
                        this.productForm.addControl(data[i].id.toString(), new FormControl('', Validators.required));
                    }
                }
            });
        });
    }

    onSubmit(value) {
        let postData = {
            name: value.name,
            price: value.price
        };
        delete value.name;
        delete value.price;
        postData['params'] = value;

        this.productService.updateProduct(this.id, postData).subscribe(
            data => {
                alert('Product has updated!');
                this.router.navigate(['/products']);
            },
            error => {
                alert(error.message);
            }
        );
    }
}
