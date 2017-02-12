import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Security } from './security.model';
import { SecurityService } from './security.service';

@Component({
    selector: 'jhi-security-detail',
    templateUrl: './security-detail.component.html'
})
export class SecurityDetailComponent implements OnInit, OnDestroy {

    security: Security;
    private subscription: any;

    constructor(
        private securityService: SecurityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.securityService.find(id).subscribe(security => {
            this.security = security;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
