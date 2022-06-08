import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_PATH } from '../common/constants';
import { AppService } from '../services/app.service';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate, CanLoad {
  constructor(
    private location: Location,
    private app: AppService,
    private permission: PermissionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permission.hasViewPermission(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.app.user.isAuthenticated) {
      // if (!this.app.initialAppLoaded) {
      //   return this.app.waitInitialData();
      // }
      return true;
    }

    // if (this.location.path() !== LOGIN_PATH) {
    //   this.app.user.logout();
    //   return true;
    // }

    return false;
  }

}
