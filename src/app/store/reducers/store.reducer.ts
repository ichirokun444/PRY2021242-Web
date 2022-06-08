import { StoreAppState } from '@app/shared/common/interfaces/store/store-state.interface';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { appReducers } from './app.reducer';

export const storeReducers: ActionReducerMap<StoreAppState, any> = {
  router: routerReducer,
  app: appReducers,
};
