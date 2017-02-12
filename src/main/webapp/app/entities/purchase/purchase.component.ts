import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Purchase } from './purchase.model';
import { PurchaseService } from './purchase.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-purchase',
    templateUrl: './purchase.component.html'
})
export class PurchaseComponent implements OnInit, OnDestroy {
purchases: Purchase[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private purchaseService: PurchaseService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.purchaseService.query().subscribe(
            (res: Response) => {
                this.purchases = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPurchases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Purchase) {
        return item.id;
    }



    registerChangeInPurchases() {
        this.eventSubscriber = this.eventManager.subscribe('purchaseListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
