import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {isDevMode} from "@angular/core";
import {AuthService, TwitchUserStatus} from "src/app/services/auth.service";
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'brobot-admin-ui';
  isDevMode = isDevMode();

  twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null)

  apiUrl = environment.apiUrl;
  siteUrl = environment.siteUrl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // const audio = new Audio('https://play.pokemonshowdown.com/audio/cries/abomasnow.mp3')
    // audio.play()
    console.log("App Auth User")
    this.twitchUser$ = this.authService.twitchUserStatus;
    this.authService.authenticateTwitchUser()
  }
}
