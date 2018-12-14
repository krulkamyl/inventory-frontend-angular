import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentService {
    constructor(private  http: HttpClient) {}

    getRents() {
        return this.http.get('http://127.0.0.1:8000/api/rent');
    }

    getSingleRent(id) {
        return this.http.get('http://127.0.0.1:8000/api/rent/' + id);
    }

    addRent(data) {
        return this.http.post('http://127.0.0.1:8000/api/rent', data, {
            observe: 'response'
        });
    }

    changeDenuncation(id) {
        return this.http.put('http://127.0.0.1:8000/api/rent/' + id + '/denuncation', {}, {
            observe: 'response'
        });
    }
    updateRent(id, data) {
        return this.http.put('http://127.0.0.1:8000/api/rent/' + id, data, {
            observe: 'response'
        });
    }

    removeRent(id) {
        return this.http.delete('http://127.0.0.1:8000/api/rent/' + id, {
            observe: 'response'
        });
    }
}
