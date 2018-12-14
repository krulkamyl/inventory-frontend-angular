import {Parameter} from './parameter';

export class Product {
    constructor (
        public id: number,
        public name?: string,
        public price?: number,
        public in_leasing?: boolean,
        public have_history?: boolean,
        public created_at?: string,
        public updated_at?: string,
        public parameters?: Array<Parameter>
    ) { }
}
