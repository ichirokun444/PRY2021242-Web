import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpMethods } from '../services/http-service.service';
import { NotificationService } from '../services/notification.service';

export enum HttpStatusCode {
  OK = 200,
  CREATED,
  ACCEPTED,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  PAYMENT_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

@Injectable()
export class HttpConfig implements HttpInterceptor {
  debugMap = new Map<string, any>();

  constructor(
    private notification: NotificationService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isTransaction = request.headers.has('transactionId') && (request.method != 'GET');

    return next
      .handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (isTransaction) {
                const message = event?.body?.responseStatus?.mensajeRespuesta;
                this.notification.success(message || 'Operación exitosa');
              }
            }
            return event;
          },

          err => {
            if (err instanceof HttpErrorResponse) {
              const errMessage = err?.error.message;
              let text = `${errMessage || err.statusText}`;

              this.notification.error(text);
            }
            return err;
          })
      );
  }
}
