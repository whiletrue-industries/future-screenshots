/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from "@sentry/angular";
import { mergeApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, Auth } from '@angular/fire/auth';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { FIREBASE_AUTH } from './app/auth.token';

Sentry.init({
  dsn: "https://9d7e8aa0d51101008271d36419391e6c@o367221.ingest.us.sentry.io/4509518184579072",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const browserConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideFirebaseApp(() => initializeApp({ 
      projectId: "chronomaps3", 
      appId: "1:815296345105:web:78e29a3b24d788c9162db0", 
      storageBucket: "chronomaps3.firebasestorage.app", 
      apiKey: "AIzaSyCvFFOSsL36ra0r4cCdNbGL_lAeJhmuqR0", 
      authDomain: "chronomaps3.firebaseapp.com", 
      messagingSenderId: "815296345105", 
      measurementId: "G-JDGT5FJ3EB" 
    })), 
    provideAuth(() => getAuth()),
    {
      provide: FIREBASE_AUTH,
      useFactory: (auth: Auth) => auth,
      deps: [Auth]
    }
  ]
});

bootstrapApplication(AppComponent, browserConfig)
  .catch((err) => console.error(err));
