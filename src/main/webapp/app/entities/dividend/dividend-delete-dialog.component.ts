import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Dividend } from './dividend.model';
import { DividendPopupService } from './dividend-popup.service';
import { DividendService } from './dividend.service';

@Component({
    selector: 'jhi-dividend-delete-dialog',
    templateUrl: './dividend-delete-dialog.component.html'
})
export class DividendDeleteDialogComponent {

    dividend: Dividend;

    constructor(
        private dividendService: DividendService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.dividendService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dividendListModification',
                content: 'Deleted an dividend'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dividend-delete-popup',
    template: ''
})
export class DividendDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private dividendPopupService: DividendPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.dividendPopupService
                .open(DividendDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
