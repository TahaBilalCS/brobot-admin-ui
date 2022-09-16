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
   onLogin() {
    console.log("Click")
    // this.http.get('https://brobot.live/api/auth/twitch/login', {withCredentials: true}).subscribe(res => {
    //   console.log("AUTH LOGIN RES", res)
    // })
     fetch('https://brobot.live/api/auth/twitch/login', {  mode: 'no-cors', redirect: 'follow' }).then(res=> {
       res.json().then(data => {
         console.log("DATA", data)
       })
     })
  }
}
