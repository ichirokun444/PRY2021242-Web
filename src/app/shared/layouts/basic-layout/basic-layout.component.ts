import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModule } from '@app/shared/common/interfaces/company-module.interface';
import { StoreAppState } from '@app/shared/common/interfaces/store';
import { UserService } from '@app/shared/services/user.service';
import * as appSelector from '@app/store/selectors/app.selector';
import { select, Store } from '@ngrx/store';


export interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit, DoCheck {
  modules: CompanyModule[] = [];
  menu: any;
  currentModule: any;

  breadcrumb: Breadcrumb[] = [];

  codigoUsuario = '';
  nombreUsuario = '';

  constructor(
    private store: Store<StoreAppState>,
    private router: Router,
    private user: UserService,
  ) { }

  ngDoCheck(): void {
    this.store.pipe(select(appSelector.selectCurrentModule)).subscribe(data => this.currentModule = data);
    this.breadcrumb = this.buildBreadcrumb(this.router.url.split('#')[0], this.modules);
  }

  ngOnInit(): void {
    this.store.pipe(select(appSelector.selectCompanyModules)).subscribe(data => {
      this.modules = data
      this.menu = this.modules.map(it => {
        if (it.is_module) {
          const obj: any = Object.assign({}, it)
          obj.children = this.modules.filter(it => it.module_id === obj.id);
          return obj;
        }
      }).filter(Boolean);
    });


    this.codigoUsuario = String(this.user.userCode);
    this.nombreUsuario = String(this.user.userName);

  }

  logout() {
    this.user.logout();
  }

  buildBreadcrumb(path: string, modules: CompanyModule[]) {
    const acc: string[] = [];

    return path.split('/').filter(Boolean).map(it => {
      acc.push(it);
      const module = modules.find(it => it.path === '/' + acc.join('/'));
      return { label: module?.label || '', url: module?.path || '' }
    });
  }

}
