import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '@app/shared/services/app.service';
import { includes } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private app: AppService,
    private notification: NotificationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.app.user.userToken;
    let authReq = req.clone({
      setHeaders: {
        ...(authToken ? { access_token: authToken } : {}),
      },
    });

    // if (!includes(authReq.url, environment.endpoints.auth.login)) {
    //   return next.handle(authReq);
    // }

    authReq = req.clone({
      setHeaders: {
        // access_token: req.body.MessageRequest.Body.token.access_token
      }
    });

    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpErrorResponse) {
        this.notification.error('Hubo un error al momento de iniciar sesión');
      }

      if (event instanceof HttpResponse) {
        if (event && includes(event.url, environment.endpoints.login) && event.body) {
          const data = event.body;

          const date = new Date();
          date.setDate(date.getDate() + 4);

          const user: any = data;

          this.app.user.login({
            code: user.dni,
            name: `${user.nombres} ${user.apellidos}`,
            expire: +date,
            userId: user.id,
            rol: +user.rol,
            token: 'token'
          });
        }
      }
      return event;
    }));
  }
}
