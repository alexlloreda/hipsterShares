import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { HipsterSharesSharedModule, UserRouteAccessService } from './shared';
import { HipsterSharesAppRoutingModule} from './app-routing.module';
import { HipsterSharesHomeModule } from './home/home.module';
import { HipsterSharesAdminModule } from './admin/admin.module';
import { HipsterSharesAccountModule } from './account/account.module';
import { HipsterSharesEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        HipsterSharesAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        HipsterSharesSharedModule,
        HipsterSharesHomeModule,
        HipsterSharesAdminModule,
        HipsterSharesAccountModule,
        HipsterSharesEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class HipsterSharesAppModule {}
