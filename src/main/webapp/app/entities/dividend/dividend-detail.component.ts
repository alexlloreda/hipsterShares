import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dividend } from './dividend.model';
import { DividendService } from './dividend.service';

@Component({
    selector: 'jhi-dividend-detail',
    templateUrl: './dividend-detail.component.html'
})
export class DividendDetailComponent implements OnInit, OnDestroy {

    dividend: Dividend;
    private subscription: any;

    constructor(
        private dividendService: DividendService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.dividendService.find(id).subscribe(dividend => {
            this.dividend = dividend;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
