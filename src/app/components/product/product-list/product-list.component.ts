import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {Product} from '../../../models/product';
import {Parameter} from '../../../models/parameter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParamService} from '../../../service/param.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('resetForm') resetForm: ElementRef;
  products: Array<Product>;
  parameters: Array<Parameter>;

  productForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
      ])
    })
  });

  constructor(private productService: ProductService,
              private parameterService: ParamService,
              private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.products = [];
    this.parameters = [];
    this.productService.getProducts().subscribe((data: Array<Product>) => {
      this.products = data;
    });
    this.parameterService.getParams().subscribe((data: Array<Parameter>) => {
      this.parameters = data;
      for (let i = 0; i <= data.length - 1; i++) {
        this.productForm.addControl(data[i].id.toString(), new FormControl('', Validators.required));
      }
    });
  }

  onSearch(value) {
    this.products = [];
    this.closeModal.nativeElement.click();
    this.resetForm.nativeElement.click();
    const postData = {
      name: value.name
    };
    delete value.name;
    postData['params'] = value;
    this.productService.searchProducts(postData).subscribe((data: any) => {
      this.products = data.body;
    });
  }

  deleteProduct(id) {
    const decision = confirm('Are you sure you want to delete product?');
    if (decision === true) {
      this.productService.removeProduct(id).subscribe(
          data => {
            alert('Product has deleted!');
            this.ngOnInit();
          },
          error => {
            alert(error.message);
          }
      );
    }
  }
}
