import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParamService {
    constructor(private  http: HttpClient) {

    }

    getParams() {
        return this.http.get('http://127.0.0.1:8000/api/parameter');
    }

    getSingleParam(id) {
        return this.http.get('http://127.0.0.1:8000/api/parameter/' + id);
    }

    addParam(name) {
        return this.http.post('http://127.0.0.1:8000/api/parameter', {
            'name': name
        }, {
            observe: 'response'
        });
    }

    updateParam(id, name) {
        return this.http.put('http://127.0.0.1:8000/api/parameter/' + id, {
            'name': name
        }, {
            observe: 'response'
        });
    }

    removeParam(id) {
        return this.http.delete('http://127.0.0.1:8000/api/parameter/' + id, {
            observe: 'response'
        });
    }
}
