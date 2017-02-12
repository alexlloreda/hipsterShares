import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SecurityLot } from './security-lot.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class SecurityLotService {

    private resourceUrl = 'api/security-lots';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(securityLot: SecurityLot): Observable<SecurityLot> {
        let copy: SecurityLot = Object.assign({}, securityLot);
        copy.purchaseLocalDate = this.dateUtils
            .convertLocalDateToServer(securityLot.purchaseLocalDate);
        copy.sellLocalDate = this.dateUtils
            .convertLocalDateToServer(securityLot.sellLocalDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(securityLot: SecurityLot): Observable<SecurityLot> {
        let copy: SecurityLot = Object.assign({}, securityLot);
        copy.purchaseLocalDate = this.dateUtils
            .convertLocalDateToServer(securityLot.purchaseLocalDate);
        copy.sellLocalDate = this.dateUtils
            .convertLocalDateToServer(securityLot.sellLocalDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SecurityLot> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.purchaseLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.purchaseLocalDate);
            jsonResponse.sellLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.sellLocalDate);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].purchaseLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].purchaseLocalDate);
            jsonResponse[i].sellLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].sellLocalDate);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
