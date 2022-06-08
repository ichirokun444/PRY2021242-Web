import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './shared/interceptors';
import { AppService } from './shared/services/app.service';
import { AuthService } from './shared/services/auth.service';
import { HttpService, httpServiceCreator } from './shared/services/http-service.service';
import { AuthEffects } from './store/effects/auth.effects';
import { storeReducers } from './store/reducers/store.reducer';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const InitAppServiceFactory = (service: AppService) => {
  return () => service.initApp();
};

export const SettingsAppServiceFactory = (service: AppService) => {
  return () => service.initApp();
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,

    RouterModule,
    BrowserModule,

    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot(storeReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),

    // EFECTOS
    EffectsModule.forRoot([
      AuthEffects
    ]),

    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
      stateKey: 'router'
    }),

    SweetAlert2Module.forRoot(),
    NgbModule,
    // StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpServiceCreator,
      deps: [HttpClient, AppService]
    },
    httpInterceptorProviders,
    AppService,
    AuthService,
    {
      provide: APP_INITIALIZER, useFactory: InitAppServiceFactory,
      deps: [AppService],
      multi: true
    },
    {
      provide: APP_INITIALIZER, useFactory: SettingsAppServiceFactory,
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
