import { AppState } from '@app/shared/common/interfaces/store/app-state.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.action';
import { initialAppState } from '../state/app.state';

export const reducer = createReducer(
  initialAppState,

  on(appActions.SetCompanyModules, (state, { modules }) => {
    return {
      ...state,
      company_modules: modules
    };
  }),

  on(appActions.SetCurrentModule, (state, { module }) => {
    if ('number' === typeof module) {
      const mod = state.company_modules.find(m => m.id === module);
      return { ...state, currentModule: mod };
    }
    return { ...state, currentModule: module };
  }),
);

export function appReducers(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
