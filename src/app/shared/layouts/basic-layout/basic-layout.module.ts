import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '@app/shared/components/navbar/navbar.module';
import { BasicLayoutComponent } from './basic-layout.component';

@NgModule({
  declarations: [
    BasicLayoutComponent,
  ],
  exports: [
    BasicLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
  ],
  providers: []
})
export class BasicLayoutModule { }
