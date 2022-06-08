import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SerializeQuery } from '../common/utils/serialize-query.util';
import { AppService } from './app.service';


export function httpServiceCreator(http: HttpClient, app: AppService) {
  return new HttpService(http, app);
}

export class HttpRequestOptions {
  body?: any;
  params?: HttpParams | { [param: string]: any };
  headers?: { [param: string]: string };
  method?: HttpMethods | string;
  url?: string;
}

export type HttpMethodOptions = Omit<HttpRequestOptions, 'method'>;

export enum HttpMethods {
  GET, POST, PUT, PATCH, DELETE, OPTIONS
}

@Injectable()
export class HttpService {
  API_URL = '';

  constructor(private readonly service: HttpClient, public app: AppService) { }

  setAPIURL(url: string): void {
    this.API_URL = url;
  }

  request(endpoint: string, options?: HttpRequestOptions): Observable<any> {
    if (!endpoint) {
      return throwError('HttpService: The URL was not specified');
    }

    const API_URL = this.API_URL;

    options ||= new HttpRequestOptions();
    options.method = ('string' === typeof options.method ? HttpMethods[options.method as any] : options.method) || HttpMethods.GET;

    const timestamp = (new Date()).toISOString().split('.')[0] + 'Z';

    options.headers ??= {
      transactionId: String(+(new Date())),
      userId: String(this.app.user.userId),
    };


    endpoint = `${API_URL}/${endpoint}`;


    if (options.params && !(options.params instanceof HttpParams)) {
      options.params = new HttpParams({ fromString: SerializeQuery(options.params) });
    }

    return this.service
      .request(HttpMethods[options.method as any], endpoint, options)
      .pipe();
  }

  /**
   * Obtener un recurso,
   * realiza una solicitud http utilizando el metodo GET
   * @param endpoint Path del recurso
   * @param id Id del recurso
   * @param options Opciones http del recurso
   */
  get(endpoint: string, id: string | number, options?: HttpMethodOptions): Observable<any>;
  get(endpoint: string, options?: HttpMethodOptions): Observable<any>;
  get(endpoint: string, arg1?: string | number | HttpMethodOptions, arg2?: HttpMethodOptions): Observable<any> {
    let options = arg2;

    if (arg1 && 'object' === typeof arg1 && !Array.isArray(arg1)) {
      options = arg1;
    }

    if (['string', 'number'].includes(typeof arg1)) {
      endpoint = this.parsePath(arg1, endpoint);
    }

    return this.request(endpoint, {
      method: HttpMethods.GET,
      ...options
    });
  }

  /**
   * Crear un recurso,
   * realiza una solicitud http utilizando el metodo POST
   * @param endpoint Path del recurso
   * @param id Id del recurso
   * @param data Carga útil para el recurso
   * @param options Opciones http del recurso
   */
  post(endpoint: string, data?: any, options?: HttpMethodOptions) {
    return this.request(endpoint, {
      method: HttpMethods.POST,
      body: data,
      ...options
    });
  }

  put(endpoint: string, data?: any, options?: HttpMethodOptions) {
    return this.request(endpoint, {
      method: HttpMethods.PUT,
      body: data,
      ...options
    });
  }

  patch(endpoint: string, data?: any, options?: HttpMethodOptions) {
    return this.request(endpoint, {
      method: HttpMethods.PATCH,
      body: data,
      ...options
    });
  }

  delete(endpoint: string, options?: HttpMethodOptions): Observable<any>;
  delete(endpoint: string, id: string | number, options?: HttpMethodOptions): Observable<any>;
  delete(endpoint: string, arg1?: string | number | HttpMethodOptions, arg2?: HttpMethodOptions): Observable<any> {
    let options = arg2;

    return this.request(endpoint, {
      method: HttpMethods.DELETE,
      ...options
    });
  }

  private parsePath(id: any, endpoint: string): string {
    if (endpoint.includes(':id')) {
      endpoint = endpoint.replace(/:id/g, id ?? '');
      return endpoint.split('/').filter(Boolean).join('/');
    }
    return [endpoint, id].filter(Boolean).join('/');
  }
}
