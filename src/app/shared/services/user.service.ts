import { Injectable } from "@angular/core";
import { AppActions } from "@app/store/actions";
import { Store } from "@ngrx/store";
import { PKEY } from "../common/constants/persinstence.constants";
import { StoreAppState } from "../common/interfaces/store";
import { AuthService, Session } from "./auth.service";
import { PersistenceService } from "./persistence.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userId = 0;
  userCode = 0;
  userName = 'Guest';
  currentModule = 0;
  userToken = '';
  rol = 0;

  constructor(
    private persistence: PersistenceService,
    private auth: AuthService,
    private store: Store<StoreAppState>
  ) { }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }

  initialize(): void {
    this.userCode = this.persistence.get(PKEY.USER_CODE);
    this.userName = this.persistence.get(PKEY.USER_NAME);
    this.userId = this.persistence.get(PKEY.USER_ID);
    this.currentModule = this.persistence.get(PKEY.CURRENT_MODULE);
    this.userToken = this.persistence.get(PKEY.USER_TOKEN);
    this.rol = this.persistence.get(PKEY.PROL);
  }

  login(data: Session, renew?: boolean): void {
    this.auth.createSession(data, renew);
    this.store.dispatch(AppActions.Login());
  }

  logout(): void {
    this.auth.clearUserSession();
    this.store.dispatch(AppActions.Logout());
  }
}