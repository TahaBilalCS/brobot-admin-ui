import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  login = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.login = event.url === '/login';
      }
    });
  }

  ngOnInit() {
    console.log('APP INIT');
    // this.authService.loading$.subscribe((loading) => {
    // });
  }
}
