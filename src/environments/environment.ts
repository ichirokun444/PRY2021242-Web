export const environment = {
  production: false,

  urlBase: {
    domain: 'http://localhost:40000',
    // domain: 'http://137.184.153.110:40000',
  },

  endpoints: {
    login: 'login',
    users: 'user',
    centers: 'center',
    rol: 'rol',
    especialidad: 'especialidad',
    clinic: 'clinic',
    historias: 'historia',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
