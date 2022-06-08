import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public async show(text: string, title?: string, options: any = {}): Promise<any> {
    const callback = options.callback;

    if (!!callback) {
      delete options.callback;
    }

    const result = await Swal.fire({
      title,
      text,
      ...options
    });

    const resultValue = !!result.value;

    if (callback && 'function' === typeof callback) {
      callback(resultValue);
    }
    return resultValue;
  }

  public success(text: string, title = '¡Buen trabajo!', options?: any): any {
    return this.show(text, title, { type: 'success', ...options });
  }

  public error(text: string, title = 'Ups...', options?: any): any {
    return this.show(text, title, { type: 'error', ...options });
  }

}
