import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  userData: any = {};

  data$: any;
  tableData = [];

  constructor(
    private http: HttpService,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
    this.userData.id = this.user.userId;
    this.userData.name = this.user.userName;

    this.data$ = forkJoin({
      users: this.http.get(environment.endpoints.users),
      especialidades: this.http.get(environment.endpoints.especialidad),
      historias: this.http.get(`${environment.endpoints.historias}/paciente`, this.userData.id),
    }).subscribe((data) => {
      const especialidades = data.especialidades.reduce((result, filter) => {
        result[filter.id] = filter.nombre;
        return result;
      }, {});

      const users = data.users.reduce((result, filter) => {
        result[filter.id] = `${filter.nombres} ${filter.apellidos}`;
        return result;
      }, {});

      this.tableData = data.historias.map(it => {
        it.paciente_l = users[it.paciente];
        it.doctor_f = users[it.medico];
        const especialidad = data.users.find(it2 => it2.id === it.medico).especialidad;
        it.doctor_e = especialidad ? especialidades[especialidad] : 'Sin especialidad';
        return it;
      });
      console.log(data);
    });
  }


  get citasHoy() {
    return this.tableData.filter((it: any) => moment(it.fecha).isSame(moment(), 'day'));

  }

  get citasProximas() {
    return this.tableData.filter((it: any) => moment(it.fecha).isAfter(moment(), 'day'));
  }

  get citasAnteriores() {
    return this.tableData.filter((it: any) => moment(it.fecha).isBefore(moment(), 'day'));
  }

  navigateTo(item: any): void {
    this.router.navigate([item.id], { relativeTo: this.route });
  }

  formatDate(str: string) {
    return moment(str).fromNow();
  }
}
