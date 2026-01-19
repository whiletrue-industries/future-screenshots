import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import * as Sentry from "@sentry/angular";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

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
    provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({ projectId: "chronomaps3", appId: "1:815296345105:web:78e29a3b24d788c9162db0", storageBucket: "chronomaps3.firebasestorage.app", apiKey: "AIzaSyCvFFOSsL36ra0r4cCdNbGL_lAeJhmuqR0", authDomain: "chronomaps3.firebaseapp.com", messagingSenderId: "815296345105", measurementId: "G-JDGT5FJ3EB" })), provideAuth(() => getAuth()),
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
