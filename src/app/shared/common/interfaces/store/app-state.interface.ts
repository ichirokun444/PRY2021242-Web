import { CompanyModule } from "../company-module.interface";

export interface AppState {
  currentModule?: CompanyModule;
  company_modules: CompanyModule[];
}
