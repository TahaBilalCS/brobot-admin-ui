import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  apiUrl = environment.apiUrl;
  twitchLoginUrl = `${this.apiUrl}/api/auth/twitch/login`;

  constructor(private router: Router, private authService: AuthService) {
    console.log(
      'LoginComponent Constructor',
      this.authService.twitchUserStatus.value
    );
  }

  async ngOnInit(): Promise<void> {
    // this.twitchUser$ = this.authService.twitchUserStatus;
    // console.log('LoginComponent Constructor', this.twitchUser$.value);
    console.log('LoginComponent NgOnInit');
  }

  onNav() {
    console.log('LoginComponent onNav');
    this.router
      .navigate(['/'])
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
