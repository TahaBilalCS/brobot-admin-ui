import { Component, OnInit } from '@angular/core';
import {AuthService, TwitchUser} from "src/app/services/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  twitchUser$ = new BehaviorSubject<TwitchUser | null>(null)

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.twitchUser$ = this.authService.twitchUser;
  }

}
