import { RouterReducerState } from '@ngrx/router-store';
import { AppState } from './app-state.interface';

export interface StoreAppState {
  router?: RouterReducerState;
  app: AppState;
}
