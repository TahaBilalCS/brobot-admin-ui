import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TwitchAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.twitchUserStatus.getValue()) {
      return true;
    }

    console.log('Auth Guard Check');
    return this.authService.authenticateTwitchUser().pipe(
      catchError(() => {
        return of(null);
      }),
      map((twitchUser) => {
        console.log('Twitch User', twitchUser);
        if (twitchUser) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
