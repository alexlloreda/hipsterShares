import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Sale } from './sale.model';
import { SalePopupService } from './sale-popup.service';
import { SaleService } from './sale.service';
import { Security, SecurityService } from '../security';
@Component({
    selector: 'jhi-sale-dialog',
    templateUrl: './sale-dialog.component.html'
})
export class SaleDialogComponent implements OnInit {

    sale: Sale;
    authorities: any[];
    isSaving: boolean;

    securities: Security[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private saleService: SaleService,
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
        if (this.sale.id !== undefined) {
            this.saleService.update(this.sale)
                .subscribe((res: Sale) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.saleService.create(this.sale)
                .subscribe((res: Sale) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Sale) {
        this.eventManager.broadcast({ name: 'saleListModification', content: 'OK'});
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
    selector: 'jhi-sale-popup',
    template: ''
})
export class SalePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private salePopupService: SalePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.salePopupService
                    .open(SaleDialogComponent, params['id']);
            } else {
                this.modalRef = this.salePopupService
                    .open(SaleDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
