import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  twitchLoginUrl = `${this.apiUrl}/api/auth/twitch/login`;
  twitchStreamerLoginUrl = `${this.apiUrl}/api/auth/twitch/login2`;
  twitchBotLoginUrl = `${this.apiUrl}/api/auth/twitch/login3`;

  isAuthenticated = false;

  allowedStreamer = isDevMode() ? 'lebrotherbill' : 'tramadc';
  allowedBot = 'b_robot';

  public twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.twitchUser$ = this.authService.twitchUserStatus;

    this.authService.twitchUserStatus.subscribe((twitchUser) => {
      console.log('Header Status', twitchUser);
      this.isAuthenticated = !!twitchUser;
    });
  }

  logout() {
    this.authService.logout();
  }
}
