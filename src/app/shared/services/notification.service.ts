import { Injectable } from '@angular/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import { alert, defaultModules } from '@pnotify/core';


defaultModules.set(PNotifyBootstrap4, {});

export interface NotificationOptions {
  type?: NotificationType;
}

export enum NotificationType {
  NOTICE = 'notice', SUCCESS = 'success', ERROR = 'error', INFO = 'info'
}

const typeTitleList = {
  [NotificationType.NOTICE]: 'Advertencia!',
  [NotificationType.SUCCESS]: 'Éxito',
  [NotificationType.ERROR]: 'Error!',
  [NotificationType.INFO]: 'Información'
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notify(
    text: string,
    title?: string,
    options: NotificationOptions = {} as NotificationOptions,
    type: NotificationType = NotificationType.INFO) {

    return alert({
      title: title || typeTitleList[type],
      text: text || '',
      type,
      ...options,
    });
  }

  notice(text: string, title?: string, options?: NotificationOptions) {
    return this.notify(text, title, {
      ...options,
    }, NotificationType.NOTICE);
  }

  success(text: string, title?: string, options?: NotificationOptions) {
    return this.notify(text, title, {
      ...options,
    }, NotificationType.SUCCESS);
  }

  error(text: string, title?: string, options?: NotificationOptions) {
    return this.notify(text, title, {
      ...options,
    }, NotificationType.ERROR);
  }

  info(text: string, title?: string, options?: NotificationOptions) {
    return this.notify(text, title, {
      ...options,
    }, NotificationType.INFO);
  }

}
