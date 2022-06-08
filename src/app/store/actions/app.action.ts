import { createAction, props } from '@ngrx/store';
import { CompanyModule } from 'src/app/shared/common/interfaces/company-module.interface';

export const SetCurrentModule = createAction(
  '[App] Set current module', props<{ module?: CompanyModule }>()
);

export const SetCompanyModules = createAction(
  '[App] Set company modules', props<{ modules: CompanyModule[] }>()
);

export const ClearApp = createAction('[App] clear app');
export const ToLoginPath = createAction('[App] to login path app');
export const ToSecurePath = createAction('[App] to logout path app');
export const Logout = createAction('[App] logout app');
export const Login = createAction('[App] login app');