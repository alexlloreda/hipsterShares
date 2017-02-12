import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Dividend } from './dividend.model';
import { DividendPopupService } from './dividend-popup.service';
import { DividendService } from './dividend.service';
import { Security, SecurityService } from '../security';
@Component({
    selector: 'jhi-dividend-dialog',
    templateUrl: './dividend-dialog.component.html'
})
export class DividendDialogComponent implements OnInit {

    dividend: Dividend;
    authorities: any[];
    isSaving: boolean;

    securities: Security[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private dividendService: DividendService,
        private securityService: SecurityService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.securityService.query().subscribe(
            (res: Response) => { this.securities = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.dividend.id !== undefined) {
            this.dividendService.update(this.dividend)
                .subscribe((res: Dividend) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.dividendService.create(this.dividend)
                .subscribe((res: Dividend) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Dividend) {
        this.eventManager.broadcast({ name: 'dividendListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-dividend-popup',
    template: ''
})
export class DividendPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private dividendPopupService: DividendPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.dividendPopupService
                    .open(DividendDialogComponent, params['id']);
            } else {
                this.modalRef = this.dividendPopupService
                    .open(DividendDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
