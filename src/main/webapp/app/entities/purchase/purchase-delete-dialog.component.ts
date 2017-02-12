import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Purchase } from './purchase.model';
import { PurchasePopupService } from './purchase-popup.service';
import { PurchaseService } from './purchase.service';

@Component({
    selector: 'jhi-purchase-delete-dialog',
    templateUrl: './purchase-delete-dialog.component.html'
})
export class PurchaseDeleteDialogComponent {

    purchase: Purchase;

    constructor(
        private purchaseService: PurchaseService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.purchaseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'purchaseListModification',
                content: 'Deleted an purchase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-purchase-delete-popup',
    template: ''
})
export class PurchaseDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private purchasePopupService: PurchasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.purchasePopupService
                .open(PurchaseDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
