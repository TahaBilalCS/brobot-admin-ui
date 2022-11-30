import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  throwError,
} from 'rxjs';

export interface TwitchUserStatus {
  displayName: string;
  scope: string[];
  roles: string[];
  oauthId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  public twitchUserStatus$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private router: Router, private http: HttpClient) {}

  public authenticateTwitchUser(): Observable<TwitchUserStatus | null> {
    this.loading$.next(true);
    return this.http
      .get<TwitchUserStatus>(`${this.apiUrl}/api/auth/twitch/status`, {
        withCredentials: true,
        observe: 'response', // So we can look at response headers
      })
      .pipe(
        catchError((err) => {
          let errorMsg = '';
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              errorMsg = 'Unable to connect to server';
            } else {
              errorMsg = err.error.message;
            }
          }
          return throwError(() => {
            return errorMsg;
          });
        }),
        map((res: HttpResponse<TwitchUserStatus>) => {
          if (res.status === 200) {
            this.twitchUserStatus$.next(res.body);
            return res.body;
          } else {
            this.twitchUserStatus$.next(null);
            return null;
          }
        }),
        finalize(() => {
          this.loading$.next(false);
        })
      );
  }

  public logout() {
    this.http
      .get(`${this.apiUrl}/api/auth/twitch/logout`, {
        withCredentials: true,
        observe: 'response',
      })
      .subscribe((res) => {
        if (res.status === 200) {
          this.twitchUserStatus$.next(null);
          this.router.navigate(['/commands']);
        }
      });
  }
}
