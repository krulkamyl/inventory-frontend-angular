import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private  http: HttpClient) {

    }

    getProducts() {
        return this.http.get('http://127.0.0.1:8000/api/product');
    }

    searchProducts(data) {
        return this.http.post('http://127.0.0.1:8000/api/product/search', data, {
            observe: 'response'
        });
    }

    getSingleProduct(id) {
        return this.http.get('http://127.0.0.1:8000/api/product/' + id);
    }


    getHistory(id) {
        return this.http.get('http://127.0.0.1:8000/api/product/' + id + '/history');
    }

    addProduct(data) {
        return this.http.post('http://127.0.0.1:8000/api/product', data, {
            observe: 'response'
        });
    }

    updateProduct(id,data) {
        return this.http.put('http://127.0.0.1:8000/api/product/' + id, data, {
            observe: 'response'
        });
    }

    removeProduct(id) {
        return this.http.delete('http://127.0.0.1:8000/api/product/' + id, {
            observe: 'response'
        });
    }
}
