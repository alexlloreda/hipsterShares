import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { SecurityLot } from './security-lot.model';
import { SecurityLotService } from './security-lot.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-security-lot',
    templateUrl: './security-lot.component.html'
})
export class SecurityLotComponent implements OnInit, OnDestroy {
securityLots: SecurityLot[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private securityLotService: SecurityLotService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.securityLotService.query().subscribe(
            (res: Response) => {
                this.securityLots = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSecurityLots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: SecurityLot) {
        return item.id;
    }



    registerChangeInSecurityLots() {
        this.eventSubscriber = this.eventManager.subscribe('securityLotListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
