import { Component, isDevMode, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

interface NavSubcategory {
  iconName: string;
  route: string;
  title: string;
}
interface NavCategory {
  type: 'Main' | 'Group';
  groupName?: string; // todo how to type these differences better? If group, guaranteed to have groupName
  subcategories: NavSubcategory[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  categories: NavCategory[] = [];

  allowedStreamer = isDevMode() ? 'lebrotherbill' : 'tramadc';
  twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);

  hideHeaderAndSideNav = false;
  sideNavOpen = true;
  isTwitchOverlay = false;

  currentRouteUrl?: string;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRouteUrl = event.urlAfterRedirects;
        this.hideHeaderAndSideNav =
          event.urlAfterRedirects === '/login' ||
          event.urlAfterRedirects === '/twitch/supahot/overlay';
        this.isTwitchOverlay = event.url === '/twitch/supahot/overlay';
      }
    });

    this.twitchUser$ = this.authService.twitchUserStatus$;
    this.authService.loading$.subscribe((loading) => {
      if (!loading) {
        this.categories = [
          {
            type: 'Group',
            groupName: 'Pokemon',
            subcategories: [
              {
                iconName: 'people_alt',
                route: '/pokemon/team',
                title: 'Team Search',
              },
              {
                iconName: 'sports_esports',
                route: '/pokemon/battleoutcome',
                title: 'Battle Results',
              },
              {
                iconName: 'leaderboard',
                route: '/pokemon/leaderboard',
                title: 'Leaderboard',
              },
            ],
          },
          {
            type: 'Group',
            groupName: 'Info',
            subcategories: [
              {
                iconName: 'edit_note',
                route: '/commands',
                title: 'Chat Commands',
              },
              // {
              //   iconName: 'people_alt',
              //   route: '/twitch/supahot/overlay',
              //   title: 'Stream Overlay',
              // },
            ],
          },
        ];
        const twitchUser = this.authService.twitchUserStatus$.value;

        if (
          twitchUser &&
          twitchUser.displayName.toLowerCase() === this.allowedStreamer
        ) {
          this.categories.unshift({
            type: 'Main',
            subcategories: [{ iconName: 'home', route: '/', title: 'Home' }],
          });
        }
      }
    });
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 961px)'])
      .subscribe((state: BreakpointState) => {
        // True when Viewport width is 900px or greater, false when smaller
        if (!state.matches) {
          this.sideNavOpen = false;
        }
      });
  }

  toggleSidenav() {
    this.sideNavOpen = !this.sideNavOpen;
  }
}
