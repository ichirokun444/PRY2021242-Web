import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NfTableComponent, TableHeader } from '@app/shared/components/tables/nf-table/nf-table.component';
import { HttpService } from '@app/shared/services/http-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'nf-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss']
})
export class CentrosComponent implements OnInit {
  @ViewChild('table', { static: true }) table!: NfTableComponent;

  tableHeader: TableHeader[] = [
    { label: 'Id', field: 'id' },
    { label: 'Código', field: 'code' },
    { label: 'Centro', field: 'nombre' },
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

  tableData = [];


  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
    this.loadData();
  }


  loadData() {
    this.http.get(environment.endpoints.centers).subscribe((data) => this.tableData = data);
  }

  async delete(e: any): Promise<void> {
    const confirm = await Swal.fire({
      title: `Eliminar ${e.code}`,
      text: `Desea eliminar el centro ${e.nombre}`,
      icon: 'error',
      confirmButtonText: 'Eliminar'
    });


    if (confirm.isConfirmed) {
      this.http.delete(`${environment.endpoints.centers}/${e.id}`).subscribe(() => this.loadData());
    }
  }
}
