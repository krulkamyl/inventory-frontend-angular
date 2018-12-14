import {Product} from './product';
import {Customer} from './customer';

export class Rent {
    constructor (
        public id: number,
        public product?: Product,
        public customer?: Customer,
        public rented_time?: string,
        public rented_cost?: number,
        public duration_time?: string,
        public duration_time_date?: string,
        public is_rented?: boolean,
        public is_denuncation?: boolean,
        public created_at?: boolean,
        public updated_at?: boolean
    ) { }
}