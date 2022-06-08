import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-poderdante',
  templateUrl: './poderdante.component.html',
  styleUrls: ['./poderdante.component.scss']
})
export class PoderdanteComponent implements OnInit {
  data$: any;
  userId: any;

  poderdantes: any[] = [];

  constructor(
    private http: HttpService,
    private user: UserService
  ) {
    this.userId = this.user.userId;
  }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);

    this.data$ = forkJoin({
      poderdantes: this.http.get(`user/${this.userId}/poderdante`),
      users: this.http.get(environment.endpoints.users),
      historias: this.http.get(environment.endpoints.historias)
    }).subscribe((data) => {
      this.poderdantes = data.poderdantes.map(it => {
        it.historias = data.historias.filter(it2 => it2.paciente === it.usuario);
        it.apoderado_d = data.users.find(it2 => it2.id === it.usuario);
        return it;
      });
      console.log(data.poderdantes);
    });
  }

  cargarCitas(id: string) {
    alert(id);
    console.log(id);
  }

  parseDate(str: string) {
    return moment(str).fromNow();
  }

}
