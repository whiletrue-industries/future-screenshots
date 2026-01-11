import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { Auth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: FirebaseApp,
      useValue: null
    },
    {
      provide: Auth,
      useValue: null
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
