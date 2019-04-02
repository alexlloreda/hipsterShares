import { NgModule } from '@angular/core';

import { HipsterSharesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [HipsterSharesSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [HipsterSharesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class HipsterSharesSharedCommonModule {}
