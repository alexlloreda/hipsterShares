import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityLot } from './security-lot.model';
import { SecurityLotService } from './security-lot.service';

@Component({
    selector: 'jhi-security-lot-detail',
    templateUrl: './security-lot-detail.component.html'
})
export class SecurityLotDetailComponent implements OnInit, OnDestroy {

    securityLot: SecurityLot;
    private subscription: any;

    constructor(
        private securityLotService: SecurityLotService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.securityLotService.find(id).subscribe(securityLot => {
            this.securityLot = securityLot;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
