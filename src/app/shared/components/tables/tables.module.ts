import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NfPaginateComponent } from './nf-paginate/nf-paginate.component';
import { NfTableComponent } from './nf-table/nf-table.component';



@NgModule({
  declarations: [
    NfTableComponent,
    NfPaginateComponent,
  ],
  exports: [
    NfTableComponent,
    NfPaginateComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    PipesModule
  ]
})
export class TablesModule { }
