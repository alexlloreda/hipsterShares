import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Purchase } from './purchase.model';
import { PurchaseService } from './purchase.service';
@Injectable()
export class PurchasePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private purchaseService: PurchaseService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.purchaseService.find(id).subscribe(purchase => {
                if (purchase.purchaseDate) {
                    purchase.purchaseDate = {
                        year: purchase.purchaseDate.getFullYear(),
                        month: purchase.purchaseDate.getMonth() + 1,
                        day: purchase.purchaseDate.getDate()
                    };
                }
                this.purchaseModalRef(component, purchase);
            });
        } else {
            return this.purchaseModalRef(component, new Purchase());
        }
    }

    purchaseModalRef(component: Component, purchase: Purchase): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.purchase = purchase;
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
