import { Injectable, signal, Injector, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, ReplaySubject, switchMap, tap } from 'rxjs';
import { PlatformService } from '../platform.service';
import { FIREBASE_AUTH } from './auth.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new ReplaySubject<User | null>(1);
  token = signal<string | null>(null);
  private _afAuth: any = null;
  private injector = inject(Injector);
  
  private get afAuth() {
    if (this._afAuth === null) {
      this._afAuth = this.injector.get(FIREBASE_AUTH, null);
    }
    return this._afAuth;
  }
  
  constructor(private router: Router, private platform: PlatformService) {
    this.platform.browser(() => {
      if (!this.afAuth) {
        console.error('Firebase Auth not available');
        return;
      }
      this.afAuth.onAuthStateChanged((user: User | null) => {
        this.user.next(user);
      });
      this.user.pipe(
        tap((user: User | null) => {
          if (!user) {
            console.log('User is not logged in');
            this.token.set(null);
          }
        }),
        filter(user => !!user),
        switchMap(user => {
          const authToken = user.getIdToken();
          return authToken;
        }),
      ).subscribe((token) => {
        this.token.set(token);
      });
    });
  }

  logout() {
    if (!this.afAuth) {
      console.error('Firebase Auth not available');
      return;
    }
    this.afAuth.signOut();
    this.router.navigate(['/admin/login']);
  }
}
