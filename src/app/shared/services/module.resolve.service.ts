import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { StoreAppState } from '@app/shared/common/interfaces/store';
import { AppActions } from '@app/store/actions';
import { selectCompanyModules } from '@app/store/selectors/app.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ModuleResolver implements Resolve<any> {
  constructor(
    private store: Store<StoreAppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return new Observable(subject => {
      this.store
        .pipe(
          select(selectCompanyModules),
          filter(routes => routes.length > 0),
          map(routes => {
            return routes.find(module => module.path?.split('/')[1] === route.url[0].path);
          })
        ).subscribe(module => {
          this.store.dispatch(AppActions.SetCurrentModule({ module }));
          subject.next(module);
          subject.complete();
        });
    });
  }

}
