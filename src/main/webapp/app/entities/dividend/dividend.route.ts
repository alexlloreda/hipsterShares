import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DividendComponent } from './dividend.component';
import { DividendDetailComponent } from './dividend-detail.component';
import { DividendPopupComponent } from './dividend-dialog.component';
import { DividendDeletePopupComponent } from './dividend-delete-dialog.component';

import { Principal } from '../../shared';


export const dividendRoute: Routes = [
  {
    path: 'dividend',
    component: DividendComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dividends'
    }
  }, {
    path: 'dividend/:id',
    component: DividendDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dividends'
    }
  }
];

export const dividendPopupRoute: Routes = [
  {
    path: 'dividend-new',
    component: DividendPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dividends'
    },
    outlet: 'popup'
  },
  {
    path: 'dividend/:id/edit',
    component: DividendPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dividends'
    },
    outlet: 'popup'
  },
  {
    path: 'dividend/:id/delete',
    component: DividendDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dividends'
    },
    outlet: 'popup'
  }
];
