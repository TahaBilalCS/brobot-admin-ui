import { Injectable } from '@angular/core';
import {environment} from "src/environments/environment";
import {isDevMode} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";

export interface TwitchUser {
  accountCreated: Date;
  displayName: string;
  email: string;
  id: string;
  oauthId: string;
  profileImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  twitchUser = new BehaviorSubject<TwitchUser | null>(null)

  constructor(private router: Router, private http: HttpClient) { }

  public authenticateTwitchUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/twitch/status`, {withCredentials: true, observe: "response"}).pipe(map((res) => {
      console.log("Auth Twitch User", res)
      if(res.status === 200){
        this.twitchUser.next(res.body as TwitchUser)
        return res.body;
      } else {
        this.twitchUser.next(null)
        return null;
      }
    }))


  }

  public logout() {
    this.http.get(`${this.apiUrl}/api/auth/twitch/logout`, {withCredentials: true, observe: "response"}).subscribe((res) => {
      if(res.status === 200) {
        this.twitchUser.next(null)
        this.router.navigate(['/login'])
      }
    })
  }

  public login() {
    this.router.navigate(['/'])
  }
}
