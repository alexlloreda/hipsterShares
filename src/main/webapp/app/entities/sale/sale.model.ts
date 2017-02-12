import { Security } from '../security';
export class Sale {
    constructor(
        public id?: number,
        public units?: number,
        public price?: number,
        public saleDate?: any,
        public ofSecurity?: Security,
    ) { }
}
