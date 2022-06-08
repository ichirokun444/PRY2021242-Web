import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalConfig } from '@app/shared/components/modal/modal.config';
import { TableHeader } from '@app/shared/components/tables/nf-table/nf-table.component';
import { HttpService } from '@app/shared/services/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'nf-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.scss']
})
export class ApoderadoComponent implements OnInit {
  @Input() userId!: number;
  @Input() apoderados!: any[];

  tableHeader: TableHeader[] = [
    { label: 'Registro', field: 'id' },
    { label: 'Apoderado', field: 'apoderado_l' }
  ];

  tableData = [];

  tableControls = [
    {
      function: (e: any) => this.delete(e),
      label: 'Eliminar',
      icon: '',
      style: 'btn-danger'
    },
  ];

  form: any;

  modalConfig: ModalConfig = {
    modalTitle: 'Registrar nuevo apoderado',
    closeButtonLabel: 'Guardar',
    onClose: () => this.save(),
    hideDismissButton: () => true,
  };

  constructor(
    private http: HttpService,
    private fb: FormBuilder
  ) {
    this.http.setAPIURL(environment.urlBase.domain);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: this.userId,
      apoderado: ''
    });
    this.loadData();
  }

  loadData(): void {
    this.http.get(`user/${this.userId}/apoderado`).subscribe((data) => {
      this.tableData = data.map(it => {
        const apoderados = this.apoderados.reduce((result, filter) => {
          result[filter.value] = filter.label;
          return result;
        }, {});
        return { ...it, apoderado_l: apoderados[it.apoderado] };
      });
    });
  }

  async save(): Promise<boolean> {
    this.http.post(`user/${this.userId}/apoderado`, this.form.value).subscribe((data) => {
      this.loadData();
    });
    return true;
  }

  async delete(e: any): Promise<void> {
    const confirm = await Swal.fire({
      title: `Eliminar ${e.apoderado_l}`,
      text: `Desea eliminar este registro?`,
      icon: 'error',
      confirmButtonText: 'Eliminar'
    });


    if (confirm.isConfirmed) {
      this.http.delete(`user/${this.userId}/apoderado/${e.id}`).subscribe(() => {
        this.loadData();
      });
    }
  }
}
