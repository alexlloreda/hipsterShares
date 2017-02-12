import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipsterSharesSharedModule } from '../../shared';

import {
    SecurityLotService,
    SecurityLotPopupService,
    SecurityLotComponent,
    SecurityLotDetailComponent,
    SecurityLotDialogComponent,
    SecurityLotPopupComponent,
    SecurityLotDeletePopupComponent,
    SecurityLotDeleteDialogComponent,
    securityLotRoute,
    securityLotPopupRoute,
} from './';

let ENTITY_STATES = [
    ...securityLotRoute,
    ...securityLotPopupRoute,
];

@NgModule({
    imports: [
        HipsterSharesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SecurityLotComponent,
        SecurityLotDetailComponent,
        SecurityLotDialogComponent,
        SecurityLotDeleteDialogComponent,
        SecurityLotPopupComponent,
        SecurityLotDeletePopupComponent,
    ],
    entryComponents: [
        SecurityLotComponent,
        SecurityLotDialogComponent,
        SecurityLotPopupComponent,
        SecurityLotDeleteDialogComponent,
        SecurityLotDeletePopupComponent,
    ],
    providers: [
        SecurityLotService,
        SecurityLotPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterSharesSecurityLotModule {}
