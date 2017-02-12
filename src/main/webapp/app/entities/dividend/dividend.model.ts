import { Security } from '../security';
export class Dividend {
    constructor(
        public id?: number,
        public recordLocalDate?: any,
        public exLocalDate?: any,
        public paymentLocalDate?: any,
        public dps?: number,
        public franking?: number,
        public ofSecurity?: Security,
    ) { }
}
