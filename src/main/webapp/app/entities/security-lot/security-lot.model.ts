import { Security } from '../security';
import { Portfolio } from '../portfolio';
export class SecurityLot {
    constructor(
        public id?: number,
        public purchasePrice?: number,
        public purchaseLocalDate?: any,
        public sellLocalDate?: any,
        public sellPrice?: number,
        public units?: number,
        public ofSecurity?: Security,
        public portfolio?: Portfolio,
    ) { }
}
