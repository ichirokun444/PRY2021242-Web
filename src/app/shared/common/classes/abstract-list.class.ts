import { HttpClient } from "@angular/common/http";
import { Directive, Injector } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TableHeader } from "@app/shared/components/tables/nf-table/nf-table.component";
import { HttpService } from "@app/shared/services/http-service.service";

@Directive()

export abstract class AbstractList {
  abstract tableHeader: TableHeader[];
  abstract filters?: FormGroup;

  protected fb: FormBuilder;
  protected http: HttpService;
  protected service: HttpClient;

  onsearch = false;
  onloading = false;

  constructor(private injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.http = injector.get(HttpService);
    this.service = injector.get(HttpClient);
  }

  applyFilters(): void {
    this.filters?.updateValueAndValidity();

    if (this.filters?.valid) {
      this.disableForm();
    } else {
      alert('Filtros iválidos');
    }
  }

  disableForm(): void {
    this.filters?.disable();
  }

  enableForm(): void {
    this.filters?.enable();
  }
}