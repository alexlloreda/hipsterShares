import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Dividend } from './dividend.model';
import { DividendService } from './dividend.service';
@Injectable()
export class DividendPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private dividendService: DividendService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.dividendService.find(id).subscribe(dividend => {
                if (dividend.recordLocalDate) {
                    dividend.recordLocalDate = {
                        year: dividend.recordLocalDate.getFullYear(),
                        month: dividend.recordLocalDate.getMonth() + 1,
                        day: dividend.recordLocalDate.getDate()
                    };
                }
                if (dividend.exLocalDate) {
                    dividend.exLocalDate = {
                        year: dividend.exLocalDate.getFullYear(),
                        month: dividend.exLocalDate.getMonth() + 1,
                        day: dividend.exLocalDate.getDate()
                    };
                }
                if (dividend.paymentLocalDate) {
                    dividend.paymentLocalDate = {
                        year: dividend.paymentLocalDate.getFullYear(),
                        month: dividend.paymentLocalDate.getMonth() + 1,
                        day: dividend.paymentLocalDate.getDate()
                    };
                }
                this.dividendModalRef(component, dividend);
            });
        } else {
            return this.dividendModalRef(component, new Dividend());
        }
    }

    dividendModalRef(component: Component, dividend: Dividend): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dividend = dividend;
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
