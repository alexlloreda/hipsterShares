import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Dividend } from './dividend.model';
import { DividendService } from './dividend.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-dividend',
    templateUrl: './dividend.component.html'
})
export class DividendComponent implements OnInit, OnDestroy {
dividends: Dividend[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dividendService: DividendService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dividendService.query().subscribe(
            (res: Response) => {
                this.dividends = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDividends();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Dividend) {
        return item.id;
    }



    registerChangeInDividends() {
        this.eventSubscriber = this.eventManager.subscribe('dividendListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
