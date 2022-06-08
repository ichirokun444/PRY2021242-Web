import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '@app/shared/components/navbar/navbar.module';
import { SidebarModule } from '@app/shared/components/sidebar/sidebar.module';
import { AdminLayoutComponent } from './admin-layout.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  exports: [
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    SidebarModule
  ],
  providers: []
})
export class AdminLayoutModule { }
