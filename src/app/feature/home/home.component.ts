import {
  AfterViewInit,
  Component,
  ElementRef,
  isDevMode,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { BottomSheetAudioComponent } from 'src/app/feature/login/login.component';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject, catchError, delay, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('crippyTrigger', [
      // How the end state should be when the animation is done
      state('true', style({ opacity: 1, transform: 'scale(1)' })),
      state('false', style({ opacity: 0, transform: 'scale(0)' })),
      // How the transition happens
      transition(':enter', [
        animate(
          `750ms ease-in-out`,
          keyframes([
            style({ transform: 'scale(0)', opacity: 0 }),
            style({ transform: 'scale(1)', opacity: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          `750ms ease-in-out`,
          keyframes([
            style({ transform: 'scale(1)', opacity: 1 }),
            style({ transform: 'scale(0)', opacity: 0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  twitchUser$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  apiUrl = environment.apiUrl;
  siteUrl = environment.siteUrl;
  isDevMode = isDevMode();

  allowedStreamer = isDevMode() ? 'lebrotherbill' : 'tramadc';

  ///////DVD BOUNCE
  private dvd?: ElementRef;
  private black?: ElementRef;
  private streamerEl?: ElementRef;
  @ViewChild('dvdEl') set content(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.dvd = content;
    }
  }

  @ViewChild('blackEl') set content2(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.black = content;
    }
  }

  @ViewChild('streamerEl') set content3(content: ElementRef) {
    if (content) {
      // initially setter gets called with undefined
      this.streamerEl = content;
    }
  }

  x = 0;
  y = 0;
  dirX = 1;
  dirY = 1;
  speed = 3;
  prevColorChoiceIndex = 0;
  pallete = [
    '#ff8800',
    '#e124ff',
    '#6a19ff',
    '#ff2188',
    '#408000',
    '#deb90a',
    '#0a3fc4',
    '#ffffff',
  ];
  dvdWidth = 0;
  dvdHeight = 0;
  ////////////

  showPage = false;
  showClippy = false;
  // TODO - Note Dont need loading because all pages with Authguard will load status before component loads
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private bottomSheet: MatBottomSheet
  ) {}

  audio?: HTMLAudioElement;

  ngOnInit(): void {
    this.twitchUser$ = this.authService.twitchUserStatus$;
    if (
      this.twitchUser$.value?.displayName.toLowerCase() === this.allowedStreamer
    ) {
      this.audio = new Audio(
        'https://res.cloudinary.com/dsmddewxs/video/upload/v1669618409/streamer-home/009-Sound-System.mp3'
      );

      this.audio.loop = true;
      this.audio.currentTime = 0;
      this.audio.volume = 0.3;
      this.audio.load();

      this.bottomSheet
        .open(BottomSheetAudioComponent, {
          hasBackdrop: true,
          backdropClass: 'bottom-sheet-audio-backdrop',
          data: { audio: this.audio, text: 'cheers my friends' },
          disableClose: true,
        })
        .afterOpened()
        .pipe(delay(500))
        .subscribe(() => {
          // this.showPage = true;
          setTimeout(() => {
            this.showClippy = true;
          }, 10000);
        });
    } else {
      this.showPage = true;
    }
  }
  ngOnDestroy() {
    this.audio?.pause();
  }
  ngAfterViewInit() {
    if (this.dvd) {
      this.dvd.nativeElement.style.backgroundColor = this.pallete[0];
      this.prevColorChoiceIndex = 0;
      this.dvdWidth = this.dvd.nativeElement.clientWidth;
      this.dvdHeight = this.dvd.nativeElement.clientHeight;
      this.dvd.nativeElement.style.display = 'none';
      setTimeout(() => {
        if (this.dvd) this.dvd.nativeElement.style.display = 'block';
      }, 500);
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  getNewRandomColor() {
    const currentPallete = [...this.pallete];
    currentPallete.splice(this.prevColorChoiceIndex, 1);
    const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
    this.prevColorChoiceIndex =
      colorChoiceIndex < this.prevColorChoiceIndex
        ? colorChoiceIndex
        : colorChoiceIndex + 1;
    return currentPallete[colorChoiceIndex];
  }

  animate() {
    if (this.dvd) {
      const screenHeight = this.streamerEl?.nativeElement.clientHeight - 10;
      const screenWidth = this.streamerEl?.nativeElement.clientWidth - 10;

      if (this.y + this.dvdHeight >= screenHeight || this.y < 0) {
        this.dirY *= -1;
        this.dvd.nativeElement.style.backgroundColor = this.getNewRandomColor();
      }
      if (this.x + this.dvdWidth >= screenWidth || this.x < 0) {
        this.dirX *= -1;

        this.dvd.nativeElement.style.backgroundColor = this.getNewRandomColor();
      }
      this.x += this.dirX * this.speed;
      this.y += this.dirY * this.speed;
      this.dvd.nativeElement.style.left = this.x + 'px';
      this.dvd.nativeElement.style.top = this.y + 'px';
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }
  onDisableQuack() {
    // If the dvd color is white, then allow quacks to be disabled
    if (this.prevColorChoiceIndex === this.pallete.length - 1) {
      this.http
        .post(`${this.apiUrl}/api/disableQuack`, {}, { withCredentials: true })
        .subscribe((res) => {
          window.alert('QUACKS HAVE BEEN DISABLED!! HAPPY STREAMING :)');
        });
    } else {
      window.alert('FAILED! FAILED TO DISABLE QUACKS! FAILURE!');
    }
  }

  onCreateChannelRedemptions() {
    this.http
      .post(
        `${this.apiUrl}/api/createChannelPointRedeems`,
        {},
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          window.alert('Error Creating Redemptions');
          return;
        }
        window.alert('Created Channel Point Redeems');
      });
  }

  onDeleteChannelRedemptions() {
    this.http
      .post(
        `${this.apiUrl}/api/deleteChannelPointRedeems`,
        {},
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          window.alert('Error Deleting Redemptions');
          return;
        }
        window.alert('Deleted Channel Point Redeems');
      });
  }

  onReloadBrowserSource() {
    this.http
      .post(
        `${this.apiUrl}/api/reloadBrowserSource`,
        {},
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          console.log(res);
          window.alert('Error Reloading Browser Source');
          return;
        }
        window.alert('Reloaded Browser Source');
      });
  }

  onDisableChannelRedemptions() {
    this.http
      .post(
        `${this.apiUrl}/api/updateRewardsStatus`,
        { isPaused: true },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          window.alert('Error Disabling Redemptions');
          return;
        }
        window.alert('Disabled Channel Point Redeems');
      });
  }

  onEnableChannelRedemptions() {
    this.http
      .post(
        `${this.apiUrl}/api/updateRewardsStatus`,
        { isPaused: false },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          window.alert('Error Enabling Redemptions');
          return;
        }
        window.alert('Enabled Channel Point Redeems');
      });
  }
}
