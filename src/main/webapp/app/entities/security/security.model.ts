const enum Currency {
    'AUD',
    'USD',
    'EUR',
    'JPY',
    'GBP'
};
import { Company } from '../company';
export class Security {
    constructor(
        public id?: number,
        public ticker?: string,
        public spotPrice?: number,
        public currency?: Currency,
        public company?: Company,
    ) { }
}
