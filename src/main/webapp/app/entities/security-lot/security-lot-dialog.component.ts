import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { SecurityLot } from './security-lot.model';
import { SecurityLotPopupService } from './security-lot-popup.service';
import { SecurityLotService } from './security-lot.service';
import { Security, SecurityService } from '../security';
import { Portfolio, PortfolioService } from '../portfolio';
@Component({
    selector: 'jhi-security-lot-dialog',
    templateUrl: './security-lot-dialog.component.html'
})
export class SecurityLotDialogComponent implements OnInit {

    securityLot: SecurityLot;
    authorities: any[];
    isSaving: boolean;

    securities: Security[];

    portfolios: Portfolio[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private securityLotService: SecurityLotService,
        private securityService: SecurityService,
        private portfolioService: PortfolioService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.securityService.query().subscribe(
            (res: Response) => { this.securities = res.json(); }, (res: Response) => this.onError(res.json()));
        this.portfolioService.query().subscribe(
            (res: Response) => { this.portfolios = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.securityLot.id !== undefined) {
            this.securityLotService.update(this.securityLot)
                .subscribe((res: SecurityLot) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.securityLotService.create(this.securityLot)
                .subscribe((res: SecurityLot) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: SecurityLot) {
        this.eventManager.broadcast({ name: 'securityLotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackSecurityById(index: number, item: Security) {
        return item.id;
    }

    trackPortfolioById(index: number, item: Portfolio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-security-lot-popup',
    template: ''
})
export class SecurityLotPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private securityLotPopupService: SecurityLotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.securityLotPopupService
                    .open(SecurityLotDialogComponent, params['id']);
            } else {
                this.modalRef = this.securityLotPopupService
                    .open(SecurityLotDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
