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
    this.http.get('https://brobot.live/api/auth/twitch/status', {withCredentials: true}).subscribe((data) => {
      console.log("Live", data);
    });
  }
   onLogin() {
    // this.http.get('https://brobot.live/api/auth/twitch/login', {withCredentials: true}).subscribe(res => {
    //   console.log("AUTH LOGIN RES", res)
    // })
     fetch('https://brobot.live/api/auth/twitch/login', {  mode: 'no-cors' }).then(res=> {
       console.log("RES", res.status)
       res.json().then(data => {console.log("DATA", data)}).catch(err => {console.log("ERR", err)})
     }
     )
  }

  onStatus() {
    // this.http.get('https://brobot.live/api/auth/twitch/login', {withCredentials: true}).subscribe(res => {
    //   console.log("AUTH LOGIN RES", res)
    // })
    fetch('https://brobot.live/api/auth/twitch/status', {  mode: 'no-cors' }).then(res=> {
        console.log("RES", res.status)
        res.json().then(data => {console.log("DATA", data)}).catch(err => {console.log("ERR", err)})
      }
    )
  }
}
