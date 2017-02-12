import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { SecurityLot } from './security-lot.model';
import { SecurityLotPopupService } from './security-lot-popup.service';
import { SecurityLotService } from './security-lot.service';

@Component({
    selector: 'jhi-security-lot-delete-dialog',
    templateUrl: './security-lot-delete-dialog.component.html'
})
export class SecurityLotDeleteDialogComponent {

    securityLot: SecurityLot;

    constructor(
        private securityLotService: SecurityLotService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.securityLotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'securityLotListModification',
                content: 'Deleted an securityLot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-security-lot-delete-popup',
    template: ''
})
export class SecurityLotDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private securityLotPopupService: SecurityLotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.securityLotPopupService
                .open(SecurityLotDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
