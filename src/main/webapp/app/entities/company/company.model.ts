import { Security } from '../security';
export class Company {
    constructor(
        public id?: number,
        public name?: string,
        public issues?: Security,
    ) { }
}
