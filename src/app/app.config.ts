import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { authExpired } from './core/auth/auth-expired.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(
      withInterceptors([authExpired]),
      withXsrfConfiguration({cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN"}),
    ),
  ]
};
