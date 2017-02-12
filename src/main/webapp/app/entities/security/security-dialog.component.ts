import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Security } from './security.model';
import { SecurityPopupService } from './security-popup.service';
import { SecurityService } from './security.service';
import { Company, CompanyService } from '../company';
@Component({
    selector: 'jhi-security-dialog',
    templateUrl: './security-dialog.component.html'
})
export class SecurityDialogComponent implements OnInit {

    security: Security;
    authorities: any[];
    isSaving: boolean;

    companies: Company[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private securityService: SecurityService,
        private companyService: CompanyService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.companyService.query().subscribe(
            (res: Response) => { this.companies = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.security.id !== undefined) {
            this.securityService.update(this.security)
                .subscribe((res: Security) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.securityService.create(this.security)
                .subscribe((res: Security) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Security) {
        this.eventManager.broadcast({ name: 'securityListModification', content: 'OK'});
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

    trackCompanyById(index: number, item: Company) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-security-popup',
    template: ''
})
export class SecurityPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private securityPopupService: SecurityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.securityPopupService
                    .open(SecurityDialogComponent, params['id']);
            } else {
                this.modalRef = this.securityPopupService
                    .open(SecurityDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
