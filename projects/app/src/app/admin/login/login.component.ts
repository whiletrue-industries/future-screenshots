import { Component, inject, Injector } from '@angular/core';
import { GoogleAuthProvider, AuthProvider, signInWithPopup } from '@angular/fire/auth';
import { filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FIREBASE_AUTH } from '../../auth.token';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private _afAuth: any = null;
  private injector = inject(Injector);
  
  private get afAuth() {
    if (this._afAuth === null) {
      this._afAuth = this.injector.get(FIREBASE_AUTH, null);
    }
    return this._afAuth;
  }
  
  constructor(private auth: AuthService, private router: Router) {
  }
  
  loginGoogle() {
    this.login(new GoogleAuthProvider());
  }

  login(provider: AuthProvider) {
    if (!this.afAuth) {
      console.error('Firebase Auth not available');
      return;
    }
    signInWithPopup(this.afAuth, provider);
    this.auth.user.pipe(filter((user) => !!user),take(1)).subscribe(user => {
      if (user) {
        // User is logged in - redirect to home
        this.router.navigate(['/admin']);
      }
    });
  }
}
