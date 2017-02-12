import { SecurityLot } from '../security-lot';
export class Portfolio {
    constructor(
        public id?: number,
        public name?: string,
        public owns?: SecurityLot,
    ) { }
}
