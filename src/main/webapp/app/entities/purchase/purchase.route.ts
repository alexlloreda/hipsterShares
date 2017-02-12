import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PurchaseComponent } from './purchase.component';
import { PurchaseDetailComponent } from './purchase-detail.component';
import { PurchasePopupComponent } from './purchase-dialog.component';
import { PurchaseDeletePopupComponent } from './purchase-delete-dialog.component';

import { Principal } from '../../shared';


export const purchaseRoute: Routes = [
  {
    path: 'purchase',
    component: PurchaseComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Purchases'
    }
  }, {
    path: 'purchase/:id',
    component: PurchaseDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Purchases'
    }
  }
];

export const purchasePopupRoute: Routes = [
  {
    path: 'purchase-new',
    component: PurchasePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Purchases'
    },
    outlet: 'popup'
  },
  {
    path: 'purchase/:id/edit',
    component: PurchasePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Purchases'
    },
    outlet: 'popup'
  },
  {
    path: 'purchase/:id/delete',
    component: PurchaseDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Purchases'
    },
    outlet: 'popup'
  }
];
