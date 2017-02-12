import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SecurityLot } from './security-lot.model';
import { SecurityLotService } from './security-lot.service';
@Injectable()
export class SecurityLotPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private securityLotService: SecurityLotService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.securityLotService.find(id).subscribe(securityLot => {
                if (securityLot.purchaseLocalDate) {
                    securityLot.purchaseLocalDate = {
                        year: securityLot.purchaseLocalDate.getFullYear(),
                        month: securityLot.purchaseLocalDate.getMonth() + 1,
                        day: securityLot.purchaseLocalDate.getDate()
                    };
                }
                if (securityLot.sellLocalDate) {
                    securityLot.sellLocalDate = {
                        year: securityLot.sellLocalDate.getFullYear(),
                        month: securityLot.sellLocalDate.getMonth() + 1,
                        day: securityLot.sellLocalDate.getDate()
                    };
                }
                this.securityLotModalRef(component, securityLot);
            });
        } else {
            return this.securityLotModalRef(component, new SecurityLot());
        }
    }

    securityLotModalRef(component: Component, securityLot: SecurityLot): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.securityLot = securityLot;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
