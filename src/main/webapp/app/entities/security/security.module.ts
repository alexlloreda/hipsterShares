import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipsterSharesSharedModule } from '../../shared';

import {
    SecurityService,
    SecurityPopupService,
    SecurityComponent,
    SecurityDetailComponent,
    SecurityDialogComponent,
    SecurityPopupComponent,
    SecurityDeletePopupComponent,
    SecurityDeleteDialogComponent,
    securityRoute,
    securityPopupRoute,
} from './';

let ENTITY_STATES = [
    ...securityRoute,
    ...securityPopupRoute,
];

@NgModule({
    imports: [
        HipsterSharesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SecurityComponent,
        SecurityDetailComponent,
        SecurityDialogComponent,
        SecurityDeleteDialogComponent,
        SecurityPopupComponent,
        SecurityDeletePopupComponent,
    ],
    entryComponents: [
        SecurityComponent,
        SecurityDialogComponent,
        SecurityPopupComponent,
        SecurityDeleteDialogComponent,
        SecurityDeletePopupComponent,
    ],
    providers: [
        SecurityService,
        SecurityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterSharesSecurityModule {}
