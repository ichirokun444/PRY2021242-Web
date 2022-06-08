import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  providers: []
})
export class SidebarModule { }
