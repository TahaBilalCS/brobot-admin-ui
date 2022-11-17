import { Injectable } from '@angular/core';
import {environment} from "src/environments/environment";
import {isDevMode} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";

export interface TwitchUserStatus {
  displayName: string;
  scope: string[];
  roles: string[];
  oauthId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  twitchUserStatus = new BehaviorSubject<TwitchUserStatus | null>(null)

  constructor(private router: Router, private http: HttpClient) { }

  public authenticateTwitchUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/twitch/status`, {withCredentials: true, observe: "response"}).pipe(map((res) => {
      console.log("Auth Twitch User", res)
      if(res.status === 200){
        this.twitchUserStatus.next(res.body as TwitchUserStatus)
        return res.body;
      } else {
        this.twitchUserStatus.next(null)
        return null;
      }
    }))


  }

  public logout() {
    this.http.get(`${this.apiUrl}/api/auth/twitch/logout`, {withCredentials: true, observe: "response"}).subscribe((res) => {
      if(res.status === 200) {
        this.twitchUserStatus.next(null)
        this.router.navigate(['/login'])
      }
    })
  }

  public login() {
    this.router.navigate(['/'])
  }
}
