import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sale } from './sale.model';
import { SaleService } from './sale.service';
@Injectable()
export class SalePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private saleService: SaleService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.saleService.find(id).subscribe(sale => {
                if (sale.saleDate) {
                    sale.saleDate = {
                        year: sale.saleDate.getFullYear(),
                        month: sale.saleDate.getMonth() + 1,
                        day: sale.saleDate.getDate()
                    };
                }
                this.saleModalRef(component, sale);
            });
        } else {
            return this.saleModalRef(component, new Sale());
        }
    }

    saleModalRef(component: Component, sale: Sale): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sale = sale;
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
