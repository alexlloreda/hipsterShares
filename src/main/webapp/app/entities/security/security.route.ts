import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { SecurityComponent } from './security.component';
import { SecurityDetailComponent } from './security-detail.component';
import { SecurityPopupComponent } from './security-dialog.component';
import { SecurityDeletePopupComponent } from './security-delete-dialog.component';

import { Principal } from '../../shared';


export const securityRoute: Routes = [
  {
    path: 'security',
    component: SecurityComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Securities'
    }
  }, {
    path: 'security/:id',
    component: SecurityDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Securities'
    }
  }
];

export const securityPopupRoute: Routes = [
  {
    path: 'security-new',
    component: SecurityPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Securities'
    },
    outlet: 'popup'
  },
  {
    path: 'security/:id/edit',
    component: SecurityPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Securities'
    },
    outlet: 'popup'
  },
  {
    path: 'security/:id/delete',
    component: SecurityDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Securities'
    },
    outlet: 'popup'
  }
];
