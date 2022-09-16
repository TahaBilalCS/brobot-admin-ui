import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brobot-admin-ui';

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/api/', {responseType: 'text'}).subscribe((data) => {
      console.log("Dev", data);
    });
    this.http.get('https://brobot.live/api/', {responseType: 'text'}).subscribe((data) => {
      console.log("Live", data);
    });
  }
   onClick1() {
    console.log("Click")
    this.http.get('http://localhost:3000/api/auth/twitch/login').subscribe(res => {
      console.log("AUTH LOGIN RES", res)
    })
  }
}
