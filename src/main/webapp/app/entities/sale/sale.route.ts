import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SaleComponent } from './sale.component';
import { SaleDetailComponent } from './sale-detail.component';
import { SalePopupComponent } from './sale-dialog.component';
import { SaleDeletePopupComponent } from './sale-delete-dialog.component';

import { Principal } from '../../shared';


export const saleRoute: Routes = [
  {
    path: 'sale',
    component: SaleComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Sales'
    }
  }, {
    path: 'sale/:id',
    component: SaleDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Sales'
    }
  }
];

export const salePopupRoute: Routes = [
  {
    path: 'sale-new',
    component: SalePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Sales'
    },
    outlet: 'popup'
  },
  {
    path: 'sale/:id/edit',
    component: SalePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Sales'
    },
    outlet: 'popup'
  },
  {
    path: 'sale/:id/delete',
    component: SaleDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Sales'
    },
    outlet: 'popup'
  }
];
