import { Component, OnInit, ViewChild } from '@angular/core';
import { NfTableComponent, TableHeader } from '@app/shared/components/tables/nf-table/nf-table.component';
import { HttpService } from '@app/shared/services/http-service.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import 'moment/locale/es';  // without this line it didn't work
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';

moment.locale('es');

@Component({
  selector: 'nf-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss']
})
export class HistoriasComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: NfTableComponent;


  tableHeader: TableHeader[] = [
    { label: '#', field: 'id' },
    { label: 'Historia', field: 'code' },
    { label: 'Doctor', field: 'doctor_l' },
    { label: 'Paciente', field: 'paciente_l' },
    { label: 'Fecha', field: 'fecha_l' },
    { label: 'Diagnóstico', field: 'diagnostico' },
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
    }
  ];

  tableControlsDoctor = [
    {
      function: (e: any) => this.router.navigate([`${e.id}`], { relativeTo: this.route }),
      label: 'Ver',
      icon: '',
      style: 'btn-info'
    }
  ];

  tableData = [];
  organizations = [];
  data$: any;

  centrosSelect: any = [];
  doctoresSelect: any = [];
  pacientesSelect: any = [];

  // selectedCentro: any;
  selectedDoctor: any;
  selectedPaciente: any;
  selectedDate = null;

  doctor: any;


  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);

    if (this.user.rol == 2) {
      this.doctor = this.user.userId;
      this.selectedDoctor = this.doctor;
      // this.selectedCentro = true;
    }

    this.loadData();
  }

  loadData() {
    this.data$ = forkJoin({
      historias: this.http.get(environment.endpoints.historias),
      users: this.http.get(environment.endpoints.users),
      centers: this.http.get(environment.endpoints.centers),
    }).subscribe((data) => {
      const users = data.users.reduce((result, filter) => {
        const fullname = `${filter.nombres} ${filter.apellidos}`;

        if (filter.rol == 2) {
          this.doctoresSelect.push({
            label: fullname, value: filter.id
          });
        } else if (filter.rol == 3) {
          const medicos = data.historias.filter(it => it.paciente === filter.id).map(it => it.medico);

          this.pacientesSelect.push({
            label: fullname, value: filter.id, medicos
          });
        }
        result[filter.id] = fullname;
        return result;
      }, {});

      this.centrosSelect = data.centers.map(it => ({ label: it.nombre, value: it.id }));


      this.tableData = data.historias.map((it) => ({
        ...it,
        doctor_l: users[it.medico],
        fecha_l: moment(it.fecha).fromNow(),
        paciente_l: users[it.paciente]
      }));
    });
  }

  async delete(e: any): Promise<void> {
    const confirm = await Swal.fire({
      title: `Eliminar ${e.id}`,
      text: `Desea eliminar la historia ${e.code}`,
      icon: 'error',
      confirmButtonText: 'Eliminar'
    });


    if (confirm.isConfirmed) {
      this.http.delete(`${environment.endpoints.historias}/${e.id}`).subscribe(() => this.loadData());
    }
  }

  get doctoresF() {
    // if (!this.selectedCentro) return this.doctoresSelect
    return this.doctoresSelect;
    // .filter(it => +it.centro_id === +this.selectedCentro);
  }

  get pacientesF(): any[] {
    if (!this.selectedDoctor) { return this.pacientesSelect; }
    return this.pacientesSelect.filter((it: any) => it.medicos.includes(this.selectedDoctor));
  }

  get tableDataF(): any[] {
    const doctores = this.doctoresF.map((it: any) => it.value);
    let filteredDoctors = this.tableData.filter((it: any) => doctores.includes(it.medico));

    if (!this.selectedDoctor) { return filteredDoctors; }
    filteredDoctors = filteredDoctors.filter((it: any) => it.medico === this.selectedDoctor);

    if (!this.selectedPaciente) { return filteredDoctors; }
    filteredDoctors = filteredDoctors.filter((it: any) => it.paciente === this.selectedPaciente);
    return filteredDoctors;
  }


  get tableDataFDate() {
    if (!this.selectedDate) {
      return this.tableDataF;
    }
    return this.tableDataF.filter(it => {
      return it.fecha.split(' ')[0] === this.selectedDate;
    });
  }


}
