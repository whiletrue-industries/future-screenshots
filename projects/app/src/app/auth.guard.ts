import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { PlatformService } from '../platform.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private platform: PlatformService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const path = route.routeConfig?.path || '';
    if (path.indexOf('admin/moderate') !== -1) {
      return true;
    }
    if (this.platform.server()) {
      console.log('On server, skipping auth guard');
      return false;
    }
    const workspaceId = route.queryParams['workspace'] || null;
    if (workspaceId) {
      console.log('Redirecting to workspace-specific admin:', workspaceId);
      this.router.navigate(['/admin/moderate'], { queryParams: { ...route.queryParams } });
      return false;
    } 

    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('User not logged in, redirecting to login');
          this.router.navigate(['/admin/login']);
        }
      })
    );
  }
}
