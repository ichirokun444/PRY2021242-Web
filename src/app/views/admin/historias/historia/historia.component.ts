import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import { forkJoin, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'nf-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent implements OnInit {
  form = this.fb.group({
    code: uuidv4().toString().split('-')[0],
    diagnostico: ['', Validators.required],
    antecedentes: ['', Validators.required],
    tratamiento: ['', Validators.required],
    examenes: ['', Validators.required],
    fecha: ['', Validators.required],
    medico: ['', Validators.required],
    paciente: ['', Validators.required]
  });

  onEdit = false;
  currentId: any;

  data$: any;

  pacientesSelect: any;
  medicosSelect: any;

  doctor: any;

  especialidades: any;

  readonly = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private user: UserService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
    this.route.data.subscribe((data) => {
      this.readonly = !!data?.readonly;
    });

    if (this.user.rol == 2) {
      this.doctor = this.user.userId;
      this.form.patchValue({
        medico: this.doctor
      });
    }

    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.onEdit = true;
      this.loadData();
    }

    this.data$ = forkJoin({
      users: this.http.get(environment.endpoints.users),
      especialidades: this.http.get('especialidad')
    }).subscribe((data) => {
      this.especialidades = data.especialidades.reduce((result, filter) => {
        result[filter.id] = filter.nombre;
        return result;
      }, {});

      this.pacientesSelect = data.users
        .map(it => ({ label: `${it.nombres} ${it.apellidos}`, value: it.id, rol: it.rol })).filter(it => it.rol == 3);
      this.medicosSelect = data.users
        .filter(it => it.rol == 2 && it.status === 'E')
        .map(it => ({ label: `${it.nombres} ${it.apellidos}`, value: it.id, especialidad: it.especialidad }));
    });
  }

  loadData(): void {
    this.http.get(environment.endpoints.historias, this.currentId).subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  save(): void {
    const invalid = this.findInvalidControls(this.form);
    if (invalid.length) {
      return alert('Falta completar el campo de: ' + invalid.join(', '));
    }
    this.http.post(environment.endpoints.historias, this.form.value).subscribe((data) => {
      const { id } = data;
      if (this.doctor) {
        return this.router.navigate([`../doctor-paciente`], { relativeTo: this.route });
      }
      return this.router.navigate([`../${id}`], { relativeTo: this.route });
    });
  }

  update(): void {
    const invalid = this.findInvalidControls(this.form);
    if (invalid.length) {
      return alert('Falta completar el campo de: ' + invalid.join(', '));
    }
    this.http.put(`${environment.endpoints.historias}/${this.currentId}`, this.form.value).subscribe();
  }

  getEspecialidad(especialidad?: string | number): string {
    if (!especialidad || especialidad === 'null') {
      return 'Sin especialidad';
    }
    return this.especialidades[especialidad];
  }

  findInvalidControls(form: FormGroup): string[] {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
