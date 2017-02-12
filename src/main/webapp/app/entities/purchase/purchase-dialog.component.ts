import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Purchase } from './purchase.model';
import { PurchasePopupService } from './purchase-popup.service';
import { PurchaseService } from './purchase.service';
import { Security, SecurityService } from '../security';
@Component({
    selector: 'jhi-purchase-dialog',
    templateUrl: './purchase-dialog.component.html'
})
export class PurchaseDialogComponent implements OnInit {

    purchase: Purchase;
    authorities: any[];
    isSaving: boolean;

    securities: Security[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private purchaseService: PurchaseService,
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
        if (this.purchase.id !== undefined) {
            this.purchaseService.update(this.purchase)
                .subscribe((res: Purchase) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.purchaseService.create(this.purchase)
                .subscribe((res: Purchase) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Purchase) {
        this.eventManager.broadcast({ name: 'purchaseListModification', content: 'OK'});
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
    selector: 'jhi-purchase-popup',
    template: ''
})
export class PurchasePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private purchasePopupService: PurchasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.purchasePopupService
                    .open(PurchaseDialogComponent, params['id']);
            } else {
                this.modalRef = this.purchasePopupService
                    .open(PurchaseDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
