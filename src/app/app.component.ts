import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {isDevMode} from "@angular/core";
import {AuthService, TwitchUser} from "src/app/services/auth.service";
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'brobot-admin-ui';
  isDevMode = isDevMode();

  twitchUser$ = new BehaviorSubject<TwitchUser | null>(null)

  apiUrl = environment.apiUrl;
  siteUrl = environment.siteUrl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log("App Auth User")
    this.twitchUser$ = this.authService.twitchUser;
    this.authService.authenticateTwitchUser()
  }
}
