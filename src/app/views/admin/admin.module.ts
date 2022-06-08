import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NfFormControlsModule } from '@app/shared/components/form-controls/form-controls.module';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { TablesModule } from '@app/shared/components/tables/tables.module';
import { AdminLayoutModule } from '@app/shared/layouts/admin-layout/admin-layout.module';
import { BasicLayoutModule } from '@app/shared/layouts/basic-layout/basic-layout.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CentrosComponent } from './centros/centros.component';
import { RolesComponent } from './roles/roles.component';
import { HistoriasComponent } from './historias/historias.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { RolComponent } from './roles/rol/rol.component';
import { CentroComponent } from './centros/centro/centro.component';
import { HistoriaComponent } from './historias/historia/historia.component';
import { PacienteComponent } from './historias/paciente/paciente.component';
import { DoctorComponent } from './historias/doctor/doctor.component';
import { PasswordComponent } from './password/password.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { EspecialidadComponent } from './especialidades/especialidad/especialidad.component';
import { ApoderadoComponent } from './usuarios/usuario/apoderado/apoderado.component';
import { UsuarioCentroComponent } from './usuarios/usuario/centro/centro.component';
import { PoderdanteComponent } from './poderdante/poderdante.component';




@NgModule({
  declarations: [
    UsuariosComponent,
    ModalComponent,
    CentrosComponent,
    RolesComponent,
    HistoriasComponent,
    UsuarioComponent,
    RolComponent,
    CentroComponent,
    HistoriaComponent,
    PacienteComponent,
    DoctorComponent,
    PasswordComponent,
    EspecialidadesComponent,
    EspecialidadComponent,
    ApoderadoComponent,
    UsuarioCentroComponent,
    PoderdanteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminLayoutModule,
    BasicLayoutModule,
    TablesModule,
    NfFormControlsModule,
    NgbModule,
    NgbModalModule,
  ]
})
export class AdminModule { }
