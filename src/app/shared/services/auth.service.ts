import { Injectable, NgZone } from '@angular/core';
import { StoreAppState } from '@app/shared/common/interfaces/store';
import { AppActions } from '@app/store/actions';
import { Store } from '@ngrx/store';
import { PKEY } from '../common/constants/persinstence.constants';
import { PersistenceService } from './persistence.service';


export interface Session {
  name?: string;
  code?: string;
  expire: number;
  token?: string;
  rol?: number;
  userId: string | number;
}

@Injectable()
export class AuthService {
  public userLoginExpireAt = 0;
  private MESSAGE_EXPIRATION_TIME = 15;
  private interval: any = null;
  private showingExpiration = false;

  constructor(
    private persistence: PersistenceService,
    private store: Store<StoreAppState>,
    private zone: NgZone
  ) {

    this.userLoginExpireAt = this.persistence.get(PKEY.USER_LOGIN_EXPIRE);

    if (this.isAuthenticated) {
      this.verifyLoginExpire();
    }
  }

  get notifyExpiresAt() {
    return this.userLoginExpireAt - (this.MESSAGE_EXPIRATION_TIME * 30 * 1e3);
  }

  createSession(data: Session, renew?: boolean) {
    // this.userLoginExpireAt = data.expire * 1e3;
    this.persistence.set(PKEY.USER_CODE, data.code);
    this.persistence.set(PKEY.USER_NAME, data.name);

    this.userLoginExpireAt = data.expire;
    this.persistence.set(PKEY.PROL, data.rol);

    if (this.userLoginExpireAt > Date.now()) {
      this.persistence.set(PKEY.USER_TOKEN, data.token);

      if (!renew) {
        this.persistence.set(PKEY.USER_ID, data.userId);
      }

      this.persistence.set(PKEY.USER_LOGIN_EXPIRE, this.userLoginExpireAt);

      clearInterval(this.interval);

      this.verifyLoginExpire();
    }
  }

  closeExpirationMessage() {
    this.showingExpiration = !1;
    // this.modal.close('expire-user-session');
  }

  showExpirationMessage() {
    this.showingExpiration = !0;
    // this.modal.open('expire-user-session');
  }

  // Verificar si el login expirará pronto.
  verifyLoginExpire() {
    this.zone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        if (Date.now() >= this.userLoginExpireAt) {
          clearInterval(this.interval);
          this.clearUserSession();
          this.closeExpirationMessage();
          this.store.dispatch(AppActions.Logout());
          return;
        }

        if (Date.now() >= this.notifyExpiresAt && !this.showingExpiration) {
          this.showExpirationMessage();
          return;
        }
      }, 1e3);
    });
  }

  // is authenticated
  get isAuthenticated(): boolean {
    // return true;
    const expire = this.userLoginExpireAt;
    // const userToken = this.persistence.get(PKEY.USER_TOKEN);
    // const userId = this.persistence.get(PKEY.USER_ID);
    const rol = this.persistence.get(PKEY.PROL);
    // && userToken && userId
    console.log(rol);

    // console.log(+Date.now() < expire);
    return !!rol;
  }

  clearUserSession(): void {
    clearInterval(this.interval);
    this.persistence.remove(PKEY.USER_NAME);
    this.persistence.remove(PKEY.USER_CODE);
    this.persistence.remove(PKEY.USER_TOKEN);
    this.persistence.remove(PKEY.USER_ID);
    this.persistence.remove(PKEY.USER_LOGIN_EXPIRE);
    this.persistence.remove(PKEY.CURRENT_MODULE);
    this.persistence.remove(PKEY.PROL);
    this.persistence.removeCookie(PKEY.COOKIE_ID, false);
  }

}
