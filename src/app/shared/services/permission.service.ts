import { Injectable } from '@angular/core';
import { StoreAppState } from '@app/shared/common/interfaces/store';
import { selectCompanyModules } from '@app/store/selectors/app.selector';
import { select, Store } from '@ngrx/store';
import { CompanyModule } from '../common/interfaces/company-module.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private modules: CompanyModule[] = [];

  constructor(
    private store: Store<StoreAppState>,
  ) {
    this.store.pipe(select(selectCompanyModules)).subscribe(modules => {
      this.modules = modules;
    });
  }

  cleanPermissions() {
    this.modules = [];
  }

  getModuleId(path: string) {
    const mod = this.modules.find(m => m.path === path);
    return mod ? mod.id : null;
  }

  initializePermissions(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.select(selectCompanyModules).subscribe(data => {
        this.modules = data;
        resolve(true);
      });
    });
  }

  hasViewPermission(path: string): boolean {
    return !!this.modules.find(it => it.path === path);
  }

  hasPermission(componentId: string, privilege: string, parentPath?: string): boolean {
    return true;
  }
}
