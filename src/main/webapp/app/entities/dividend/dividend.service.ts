import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Dividend } from './dividend.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class DividendService {

    private resourceUrl = 'api/dividends';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(dividend: Dividend): Observable<Dividend> {
        let copy: Dividend = Object.assign({}, dividend);
        copy.recordLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.recordLocalDate);
        copy.exLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.exLocalDate);
        copy.paymentLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.paymentLocalDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(dividend: Dividend): Observable<Dividend> {
        let copy: Dividend = Object.assign({}, dividend);
        copy.recordLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.recordLocalDate);
        copy.exLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.exLocalDate);
        copy.paymentLocalDate = this.dateUtils
            .convertLocalDateToServer(dividend.paymentLocalDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Dividend> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.recordLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.recordLocalDate);
            jsonResponse.exLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.exLocalDate);
            jsonResponse.paymentLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.paymentLocalDate);
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
            jsonResponse[i].recordLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].recordLocalDate);
            jsonResponse[i].exLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].exLocalDate);
            jsonResponse[i].paymentLocalDate = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].paymentLocalDate);
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
