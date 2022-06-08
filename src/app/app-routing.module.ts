import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@views/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { ModuleGuard } from './shared/guards/module.guard';
import { ModuleResolver } from './shared/services/module.resolve.service';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '404',
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [ModuleResolver]
})
export class AppRoutingModule { }
