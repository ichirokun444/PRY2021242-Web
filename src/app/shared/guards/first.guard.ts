import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_PATH } from '../common/constants';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FirstGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) {
    this.user.initialize();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated) {
      return true;
    } else {
      this.router.navigate([LOGIN_PATH]);
      return true;
    }
  }

}
