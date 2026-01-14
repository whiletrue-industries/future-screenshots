import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import * as Sentry from "@sentry/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (request) => {
          return !request.url.includes('config.json');
        }
      })
    ),
    provideHttpClient(withFetch()),
    // {
    //   provide: ErrorHandler,
    //   useValue: Sentry.createErrorHandler({showDialog: false}),
    // },
    // {
    //   provide: Sentry.TraceService,
    //   deps: [Router],
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => () => {},
    //   deps: [Sentry.TraceService],
    //   multi: true,
    // },    
  ]
};
