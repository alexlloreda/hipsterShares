import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Security } from './security.model';
import { SecurityPopupService } from './security-popup.service';
import { SecurityService } from './security.service';

@Component({
    selector: 'jhi-security-delete-dialog',
    templateUrl: './security-delete-dialog.component.html'
})
export class SecurityDeleteDialogComponent {

    security: Security;

    constructor(
        private securityService: SecurityService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.securityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'securityListModification',
                content: 'Deleted an security'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-security-delete-popup',
    template: ''
})
export class SecurityDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private securityPopupService: SecurityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.securityPopupService
                .open(SecurityDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
