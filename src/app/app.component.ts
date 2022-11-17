import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('App Init - Authenticate User');
    this.twitchUser$ = this.authService.twitchUserStatus;
    this.authService.authenticateTwitchUser();
  }
}
