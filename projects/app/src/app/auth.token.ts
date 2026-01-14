import { InjectionToken } from '@angular/core';
import { Auth } from '@angular/fire/auth';

export const FIREBASE_AUTH = new InjectionToken<Auth | null>('Firebase Auth', {
  providedIn: 'root',
  factory: () => null
});
