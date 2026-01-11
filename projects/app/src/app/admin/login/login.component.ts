import { Component, Inject, Optional } from '@angular/core';
import { Auth, GoogleAuthProvider, AuthProvider, signInWithPopup } from '@angular/fire/auth';
import { filter, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  constructor(
    @Optional() @Inject(Auth) private afAuth: Auth | null,
    private auth: AuthService,
    private router: Router
  ) {
  }
  
  loginGoogle() {
    this.login(new GoogleAuthProvider());
  }

  login(provider: AuthProvider) {
    if (!this.afAuth) return;
    signInWithPopup(this.afAuth, provider);
    this.auth.user.pipe(filter((user) => !!user),take(1)).subscribe(user => {
      if (user) {
        // User is logged in - redirect to home
        this.router.navigate(['/admin']);
      }
    });
  }
}
