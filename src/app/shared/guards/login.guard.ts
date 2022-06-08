import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import * as appSelector from '@app/store/selectors/app.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompanyModule } from '../common/interfaces/company-module.interface';
import { StoreAppState } from '../common/interfaces/store';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  companyModules: CompanyModule[] = [];

  constructor(
    private auth: AuthService,
    private user: UserService,
    private store: Store<StoreAppState>,
    private router: Router) {
    this.store.pipe(select(appSelector.selectCompanyModules)).subscribe(data => this.companyModules = data);
    this.user.initialize();
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.isAuthenticated) {
      return true;
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated) {
      this.store.pipe(select(appSelector.selectCompanyModules)).subscribe((data) => {
        const [first] = data;
        this.router.navigate([first.path]);
      });
      return true;
    }
    return true;
  }


}