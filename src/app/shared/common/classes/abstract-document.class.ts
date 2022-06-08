import { Directive, Injector } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpService } from "@app/shared/services/http-service.service";

@Directive()

export abstract class AbstractDocument {
  public documentId: string = '';
  public documentLabel: string = '';

  public documentControllerId: string = '';

  protected fb: FormBuilder;
  protected http: HttpService;

  abstract form: FormGroup;

  constructor(private injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.http = injector.get(HttpService);
  }
}