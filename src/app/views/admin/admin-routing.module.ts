import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '@app/shared/layouts/admin-layout/admin-layout.component';
import { CentroComponent } from './centros/centro/centro.component';
import { CentrosComponent } from './centros/centros.component';
import { EspecialidadComponent } from './especialidades/especialidad/especialidad.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { DoctorComponent } from './historias/doctor/doctor.component';
import { HistoriaComponent } from './historias/historia/historia.component';
import { HistoriasComponent } from './historias/historias.component';
import { PacienteComponent } from './historias/paciente/paciente.component';
import { PasswordComponent } from './password/password.component';
import { PoderdanteComponent } from './poderdante/poderdante.component';
import { RolComponent } from './roles/rol/rol.component';
import { RolesComponent } from './roles/roles.component';
import { ApoderadoComponent } from './usuarios/usuario/apoderado/apoderado.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            component: UsuariosComponent
          },
          {
            path: 'nuevo',
            component: UsuarioComponent
          },
          {
            path: ':id',
            component: UsuarioComponent
          }
        ]
      },
      {
        path: 'especialidades',
        children: [
          {
            path: '',
            component: EspecialidadesComponent
          },
          {
            path: 'nuevo',
            component: EspecialidadComponent
          },
          {
            path: ':id',
            component: EspecialidadComponent
          }
        ]
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            component: RolesComponent
          },
          {
            path: 'nuevo',
            component: RolComponent
          },
          {
            path: ':id',
            component: RolComponent
          }
        ]
      },
      {
        path: 'centros',
        children: [
          {
            path: '',
            component: CentrosComponent
          },
          {
            path: 'nuevo',
            component: CentroComponent
          },
          {
            path: ':id',
            component: CentroComponent
          }
        ]
      },
      {
        path: 'historias',
        children: [
          {
            path: '',
            component: HistoriasComponent
          },
          {
            path: 'nuevo',
            component: HistoriaComponent
          },
          {
            path: ':id',
            component: HistoriaComponent
          }
        ]
      },
      {
        path: 'paciente',
        children: [
          {
            path: '',
            component: PacienteComponent,
          },
          {
            path: ':id',
            data: {
              readonly: true
            },
            component: HistoriaComponent,
          }
        ]
      },
      {
        path: 'doctor',
        component: DoctorComponent,
      },
      {
        path: 'doctor-historia',
        component: HistoriaComponent
      },
      {
        path: 'doctor-paciente',
        children: [
          {
            path: '',
            component: HistoriasComponent
          },
          {
            path: ':id',
            data: {
              readonly: true
            },
            component: HistoriaComponent,
          }
        ]
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'poderdantes',
        component: PoderdanteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
