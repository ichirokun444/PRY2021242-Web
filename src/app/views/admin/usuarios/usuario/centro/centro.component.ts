import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalConfig } from '@app/shared/components/modal/modal.config';
import { TableHeader } from '@app/shared/components/tables/nf-table/nf-table.component';
import { HttpService } from '@app/shared/services/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'nf-usuario-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.scss']
})
export class UsuarioCentroComponent implements OnInit {
  @Input() userId!: number;
  @Input() centros!: any[];

  tableHeader: TableHeader[] = [
    { label: 'Registro', field: 'id' },
    { label: 'Centro de Salud', field: 'centro_l' }
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
    modalTitle: 'Registrar nuevo centro',
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
      centro: ''
    });
    this.loadData();
  }

  loadData(): void {
    this.http.get(`user/${this.userId}/centro`).subscribe((data) => {
      this.tableData = data.map(it => {
        const centros = this.centros.reduce((result, filter) => {
          result[filter.value] = filter.label;
          return result;
        }, {});
        return { ...it, centro_l: centros[it.centro] };
      });
    });
  }

  async save(): Promise<boolean> {
    this.http.post(`user/${this.userId}/centro`, this.form.value).subscribe((data) => {
      this.loadData();
    });
    return true;
  }

  async delete(e: any): Promise<void> {
    const confirm = await Swal.fire({
      title: `Eliminar ${e.centro_l}`,
      text: `Desea eliminar este registro?`,
      icon: 'error',
      confirmButtonText: 'Eliminar'
    });


    if (confirm.isConfirmed) {
      this.http.delete(`user/${this.userId}/centro/${e.id}`).subscribe(() => {
        this.loadData();
      });
    }
  }
}
