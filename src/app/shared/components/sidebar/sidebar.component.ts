import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as appSelector from '@app/store/selectors/app.selector';
import { StoreAppState } from '@app/shared/common/interfaces/store';
import { CompanyModule } from '@app/shared/common/interfaces/company-module.interface';

@Component({
  selector: 'nf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Output() hoverElement = new EventEmitter<boolean>();

  menu: any[] = []

  constructor(
    private store: Store<StoreAppState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(appSelector.selectCompanyModules)).subscribe(data => this.menu = data);
  }

  ngAfterViewInit(): void {

  }

}
