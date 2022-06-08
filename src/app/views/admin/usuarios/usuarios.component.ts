import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NfTableComponent, TableHeader } from '@app/shared/components/tables/nf-table/nf-table.component';
import { HttpService } from '@app/shared/services/http-service.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'nf-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: NfTableComponent;

  tableHeader: TableHeader[] = [
    { label: 'Usuario', field: 'id' },
    { label: 'Rol', field: 'rol_l' },
    { label: '# Documento', field: 'dni' },
    { label: 'Nombre(s)', field: 'nombres' },
    { label: 'Apellido(s)', field: 'apellidos' },
    { label: 'Correo', field: 'correo' },
    { label: 'Estado', field: 'status_l' },
  ];

  tableControls = [
    {
      function: (e: any) => this.delete(e),
      label: 'Eliminar',
      icon: '',
      style: 'btn-danger'
    },
    {
      function: (e: any) => this.router.navigate([`${e.id}`], { relativeTo: this.route }),
      label: 'Editar',
      icon: '',
      style: 'btn-warning'
    },
    {
      function: (e: any) => this.updateStatus(e),
      label: 'Cambiar estado',
      icon: '',
      style: 'btn-info'
    }
  ];

  tableData = [];
  organizations = [];
  data$: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
    this.loadData()
  }

  loadData() {
    this.data$ = forkJoin({
      users: this.http.get(environment.endpoints.users),
      centers: this.http.get(environment.endpoints.centers),
      roles: this.http.get(environment.endpoints.rol),
    }).subscribe((data) => {
      const centerskey = data.centers.reduce((result, filter) => {
        result[filter.id] = filter.nombre;
        return result;
      }, {});

      const roleskey = data.roles.reduce((result, filter) => {
        result[filter.id] = filter.nombre;
        return result;
      }, {});

      this.tableData = data.users.map((it) => ({
        ...it,
        status_l: it.status === 'D' ? 'Inactivo' : 'Activo',
        centro_salud_l: centerskey[it.centro_salud],
        rol_l: roleskey[it.rol],
        style: it.status === 'D' ? 'pale-danger' : ''
      }));
    });
  }


  async delete(e: any): Promise<void> {
    const confirm = await Swal.fire({
      title: `Eliminar ${e.dni}`,
      text: `Desea eliminar el usuario ${e.nombres} ${e.apellidos}`,
      icon: 'error',
      confirmButtonText: 'Eliminar'
    });


    if (confirm.isConfirmed) {
      this.http.delete(`${environment.endpoints.users}/${e.id}`).subscribe(() => this.loadData());
    }
  }

  async updateStatus(e: any) {
    const confirm = await Swal.fire({
      title: `Actualizar estado ${e.dni}`,
      text: `Desea ${e.status === 'D' ? 'habilitar' : 'inhabilitar'} al usuario ${e.nombres} ${e.apellidos}`,
      icon: 'warning',
      confirmButtonText: 'Cambiar estado'
    });

    if (confirm.isConfirmed) {
      this.http.patch(`user/${e.id}/status`,
        {
          status: e.status === 'D' ? 'E' : 'D'
        }
      ).subscribe(() => this.loadData());
    }
  }

}
