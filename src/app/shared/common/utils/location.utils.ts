import { getIPs } from '@assets/js/ip_validator.js';

export const httpGetIP = new Promise((resolve, reject) => {
  getIPs().then((res: any[]) => resolve('' + res[0]));
});