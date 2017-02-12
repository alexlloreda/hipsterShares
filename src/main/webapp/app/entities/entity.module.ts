import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HipsterSharesCompanyModule } from './company/company.module';
import { HipsterSharesDividendModule } from './dividend/dividend.module';
import { HipsterSharesPortfolioModule } from './portfolio/portfolio.module';
import { HipsterSharesPurchaseModule } from './purchase/purchase.module';
import { HipsterSharesSaleModule } from './sale/sale.module';
import { HipsterSharesSecurityModule } from './security/security.module';
import { HipsterSharesSecurityLotModule } from './security-lot/security-lot.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HipsterSharesCompanyModule,
        HipsterSharesDividendModule,
        HipsterSharesPortfolioModule,
        HipsterSharesPurchaseModule,
        HipsterSharesSaleModule,
        HipsterSharesSecurityModule,
        HipsterSharesSecurityLotModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipsterSharesEntityModule {}
