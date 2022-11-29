import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TwitchAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // These are routes where auth is not required, but needed in order to populate the header bag login
  acceptableRoutes = [
    'pokemon/team',
    'pokemon/battleoutcome',
    'pokemon/leaderboard',
    'commands',
  ];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO - Not urgent. But can set timeout for when auth will get rejected.
    if (this.authService.twitchUserStatus$.getValue()) {
      return true;
    }

    return this.authService.authenticateTwitchUser().pipe(
      catchError(() => {
        return of(null);
      }),
      map((twitchUser) => {
        if (twitchUser) {
          return true;
        }

        if (!route.routeConfig?.path) {
          this.router.navigate(['/commands']);
          return false;
        }
        if (this.acceptableRoutes.includes(route.routeConfig.path)) {
          return true;
        }
        this.router.navigate(['/commands']);
        return false;
      })
    );
  }
}
