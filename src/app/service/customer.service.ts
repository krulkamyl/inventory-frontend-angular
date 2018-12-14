import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {
    constructor(private  http: HttpClient) {

    }

    getCustomers() {
        return this.http.get('http://127.0.0.1:8000/api/customer');
    }

    getSingleCustomer(id) {
        return this.http.get('http://127.0.0.1:8000/api/customer/' + id);
    }

    addCustomer(name) {
        return this.http.post('http://127.0.0.1:8000/api/customer', {
            'name': name
        }, {
            observe: 'response'
        });
    }

    updateCustomer(id, name) {
        return this.http.put('http://127.0.0.1:8000/api/customer/' + id, {
            'name': name
        }, {
            observe: 'response'
        });
    }

    removeCustomer(id) {
        return this.http.delete('http://127.0.0.1:8000/api/customer/' + id, {
            observe: 'response'
        });
    }
}
