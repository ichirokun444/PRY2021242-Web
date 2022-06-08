import { CompanyModule } from "@app/shared/common/interfaces/company-module.interface";
import { AppState } from "@app/shared/common/interfaces/store/app-state.interface";
import { StoreAppState } from "@app/shared/common/interfaces/store/store-state.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const appState = createFeatureSelector<StoreAppState, AppState>('app');

export const selectCompanyModules = createSelector(appState, app => app.company_modules || []);
export const selectCurrentModule = createSelector(appState, app => (app.currentModule || {} as CompanyModule));
