import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipsterSharesSharedModule } from '../../shared';

import {
    PurchaseService,
    PurchasePopupService,
    PurchaseComponent,
    PurchaseDetailComponent,
    PurchaseDialogComponent,
    PurchasePopupComponent,
    PurchaseDeletePopupComponent,
    PurchaseDeleteDialogComponent,
    purchaseRoute,
    purchasePopupRoute,
} from './';

let ENTITY_STATES = [
    ...purchaseRoute,
    ...purchasePopupRoute,
];

@NgModule({
    imports: [
        HipsterSharesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PurchaseComponent,
        PurchaseDetailComponent,
        PurchaseDialogComponent,
        PurchaseDeleteDialogComponent,
        PurchasePopupComponent,
        PurchaseDeletePopupComponent,
    ],
    entryComponents: [
        PurchaseComponent,
        PurchaseDialogComponent,
        PurchasePopupComponent,
        PurchaseDeleteDialogComponent,
        PurchaseDeletePopupComponent,
    ],
    providers: [
        PurchaseService,
        PurchasePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterSharesPurchaseModule {}
