import { Security } from '../security';
export class Purchase {
    constructor(
        public id?: number,
        public units?: number,
        public price?: number,
        public purchaseDate?: any,
        public ofSecurity?: Security,
    ) { }
}
