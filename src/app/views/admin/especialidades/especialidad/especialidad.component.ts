import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services/http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {
  form = this.fb.group({
    code: ["", Validators.required],
    name: ["", Validators.required],
  })


  onEdit = false;
  currentId: any;

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
  }

  loadData() {
    this.http.get(environment.endpoints.especialidad, this.currentId).subscribe((data) => {
      this.form.patchValue({
        code: data.code,
        name: data.nombre,
      });
    })
  }

  save() {
    if (!this.form.valid)
      return alert('Revisar datos')
    this.http.post(environment.endpoints.especialidad, this.form.value).subscribe((data) => {
      const { id } = data
      this.router.navigate([`../${id}`], { relativeTo: this.route });
    });
  }

  update() {
    this.http.put(`${environment.endpoints.especialidad}/${this.currentId}`, this.form.value).subscribe();
  }


}
