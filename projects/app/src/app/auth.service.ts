import { Injectable, signal } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, ReplaySubject, switchMap, tap } from 'rxjs';
import { PlatformService } from '../platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new ReplaySubject<User | null>(1);
  token = signal<string | null>(null);
  
  constructor(private afAuth: Auth, private router: Router, private platform: PlatformService) {
    this.platform.browser(() => {
      this.afAuth.onIdTokenChanged(user => {
        this.user.next(user);
      });
      this.user.pipe(
        tap(user => {
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
    this.afAuth.signOut();
    this.router.navigate(['/admin/login']);
  }
}
