import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  userData: any = {};

  data$: any;
  tableData = [];

  constructor(
    private http: HttpService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
    this.userData.id = this.user.userId;
    this.userData.name = this.user.userName;

    this.data$ = forkJoin({
      users: this.http.get(environment.endpoints.users),
      historias: this.http.get(`${environment.endpoints.historias}/doctor`, this.userData.id),
    }).subscribe((data) => {
      const users = data.users.reduce((result, filter) => {
        result[filter.id] = `${filter.nombres} ${filter.apellidos}`;
        return result;
      }, {});

      this.tableData = data.historias.map(it => {
        it.paciente_l = users[it.paciente]
        it.doctor_f = users[it.medico]
        return it;
      })
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


  formatDate(str: string) {
    return moment(str).fromNow();
  }
}
