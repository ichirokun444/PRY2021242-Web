import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services/http-service.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form = this.fb.group({
    dni: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: ['', Validators.required],
    fecha_nac: ['', Validators.required],
    genero: ['', Validators.required],
    direccion: ['', Validators.required],
    num_telefonico: ['', Validators.required],
    rol: ['', Validators.required],
    status: [''],
    especialidad: [''],
  });

  data$: any;

  centrosSelect: any;
  rolesSelect: any;
  especialidadSelect: any;

  generoSelect = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
  ];

  onEdit = false;
  currentId: any;

  users: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);

    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.onEdit = true;
      this.loadData();
    }


    this.data$ = forkJoin({
      users: this.http.get(environment.endpoints.users),
      centers: this.http.get(environment.endpoints.centers),
      roles: this.http.get(environment.endpoints.rol),
      especialidades: this.http.get(environment.endpoints.especialidad),
    }).subscribe((data) => {
      this.users = data.users.filter(it => it.rol == 3 && it.id != this.currentId)
        .map(it => ({ label: `${it.nombres} ${it.apellidos}`, value: it.id }));
      this.centrosSelect = data.centers.map(it => ({ label: it.nombre, value: it.id }));
      this.rolesSelect = data.roles.map(it => ({ label: it.nombre, value: it.id }));
      this.especialidadSelect = data.especialidades.map(it => ({ label: it.nombre, value: it.id }));
      console.log(this.especialidadSelect);
    });
  }

  loadData(): void {
    this.http.get(environment.endpoints.users, this.currentId).subscribe((data) => {
      this.form.patchValue(data);
      this.checkValidators();
    });
  }

  save(): void {
    const invalid = this.findInvalidControls(this.form);
    if (invalid.length) {
      return alert('Falta completar el campo de: ' + invalid.join(', '));
    }
    this.http.post(environment.endpoints.users, this.form.value).subscribe((data) => {
      const { id } = data;
      this.router.navigate([`../${id}`], { relativeTo: this.route });
    });
  }

  update(): void {
    const invalid = this.findInvalidControls(this.form);
    if (invalid.length) {
      return alert('Falta completar el campo de: ' + invalid.join(', '));
    }
    this.http.put(`${environment.endpoints.users}/${this.currentId}`, this.form.value).subscribe();
  }

  onRolChange(): void {
    this.form.controls.especialidad.reset();
    this.checkValidators();
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

  checkValidators(): void {
    if (this.form.value.rol == 2) {
      this.form.controls.especialidad.setValidators([Validators.required]);
      this.form.controls.especialidad.updateValueAndValidity();
    } else {
      this.form.controls.especialidad.clearValidators();
      this.form.controls.especialidad.updateValueAndValidity();
    }
  }
}
