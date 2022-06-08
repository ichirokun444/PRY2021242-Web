import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_PATH, SECURE_PATH } from '@app/shared/common/constants';
import { AuthService } from '@app/shared/services/auth.service';
import { HttpService } from '@app/shared/services/http-service.service';
import { PermissionService } from '@app/shared/services/permission.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { AppActions } from '../actions';

@Injectable()
export class AuthEffects {

  toLoginPath$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.ToLoginPath),
    tap(() => {
      this.router.navigate([LOGIN_PATH]);
    })
  ), { dispatch: false });

  toSecurePath$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.ToSecurePath),
    tap(() => {
      this.router.navigate([SECURE_PATH]);
    })
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.Logout),
    tap(() => {
      this.permission.cleanPermissions();
      this.auth.clearUserSession();
    }),
    map(() => AppActions.ClearApp())
  ));

  clearApp$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.ClearApp),
    tap(() => {
      this.router.navigate([LOGIN_PATH]);
    })
  ), { dispatch: false });


  login$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.Login),
    tap(() => {
      // this.router.navigate([LOGIN_PATH]);
      location.reload();
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private permission: PermissionService,
    private http: HttpService
  ) { }
}
