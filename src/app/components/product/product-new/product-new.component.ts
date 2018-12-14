import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product.service';
import {Parameter} from '../../../models/parameter';
import {ParamService} from '../../../service/param.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-new.component.html'
})
export class ProductNewComponent implements OnInit {
    parameters: Array<Parameter>;
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

    constructor(
        private productService: ProductService,
        private parameterService: ParamService,
        private formBuilder: FormBuilder,
        private router: Router) {
    }

    ngOnInit() {
        this.parameters = [];
        this.parameterService.getParams().subscribe((data: any[]) => {
            for (let i = 0; i <= data.length - 1; i++) {
                this.parameters.push(new Parameter(data[i].id, data[i].name, data[i].created_at, data[i].updated_at));
                this.productForm.addControl(data[i].id.toString(), new FormControl('', Validators.required));
            }
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

        this.productService.addProduct(postData).subscribe(
            data => {
                alert('Product has saved!');
                this.router.navigate(['/products']);
            },
            error => {
                alert(error.message);
            }
        );
    }

}
