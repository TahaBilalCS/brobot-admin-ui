import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  apiUrl = environment.apiUrl;
  twitchStreamerLoginUrl = `${this.apiUrl}/api/auth/twitch/login2`;
  twitchBotLoginUrl = `${this.apiUrl}/api/auth/twitch/login3`;

  allowedStreamer = isDevMode() ? 'lebrotherbill' : 'tramadc';
  allowedBot = 'b_robot';

  public twitchUserStatus$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('HEADER INIT');
    this.twitchUserStatus$ = this.authService.twitchUserStatus$;
    this.loading$ = this.authService.loading$;
  }

  logout() {
    this.authService.logout();
  }

  navHome() {
    this.router.navigate(['/home']).then();
  }
}
