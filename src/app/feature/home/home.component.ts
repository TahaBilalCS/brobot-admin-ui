import { Component, isDevMode, OnInit } from '@angular/core';

import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  apiUrl = environment.apiUrl;
  siteUrl = environment.siteUrl;
  isDevMode = isDevMode();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.twitchUser$ = this.authService.twitchUserStatus;
  }
}
