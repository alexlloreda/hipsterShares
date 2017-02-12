import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SecurityLotComponent } from './security-lot.component';
import { SecurityLotDetailComponent } from './security-lot-detail.component';
import { SecurityLotPopupComponent } from './security-lot-dialog.component';
import { SecurityLotDeletePopupComponent } from './security-lot-delete-dialog.component';

import { Principal } from '../../shared';


export const securityLotRoute: Routes = [
  {
    path: 'security-lot',
    component: SecurityLotComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SecurityLots'
    }
  }, {
    path: 'security-lot/:id',
    component: SecurityLotDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SecurityLots'
    }
  }
];

export const securityLotPopupRoute: Routes = [
  {
    path: 'security-lot-new',
    component: SecurityLotPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SecurityLots'
    },
    outlet: 'popup'
  },
  {
    path: 'security-lot/:id/edit',
    component: SecurityLotPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SecurityLots'
    },
    outlet: 'popup'
  },
  {
    path: 'security-lot/:id/delete',
    component: SecurityLotDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SecurityLots'
    },
    outlet: 'popup'
  }
];
