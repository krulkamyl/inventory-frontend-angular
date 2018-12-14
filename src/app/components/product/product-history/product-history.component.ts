import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {Rent} from '../../../models/rent';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html'
})
export class ProductHistoryComponent implements OnInit {
  id: number;
  private sub: any;
  rents: Array<Rent>;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.rents = [];
    this.productService.getHistory(this.id).subscribe((data: Array<Rent>) => {
      this.rents = data;
    });
  }
}
