import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';
import { InitService } from './init.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteConfigToken } from './services/routeConfig.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
    { provide: RouteConfigToken, useValue: { title: 'Home' } },
    provideHttpClient(withInterceptors([requestInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true,
    },
    provideAnimationsAsync(),
  ],
};

function initFactory(InitService: InitService) {
  return () => InitService.init();
}
