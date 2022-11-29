import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, delay } from 'rxjs';
import {
  AuthService,
  TwitchUserStatus,
} from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0' })),
      transition('* => *', [animate(2000)]),
    ]),
  ],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  twitchUserStatus$ = new BehaviorSubject<TwitchUserStatus | null>(null);
  loading$ = new BehaviorSubject<boolean>(true);
  btnHovered = false;
  logoutHovered = false;
  apiUrl = environment.apiUrl;
  twitchLoginUrl = `${this.apiUrl}/api/auth/twitch/login`;

  @ViewChild('loginBtn') loginBtn: ElementRef | undefined;

  ////
  audio?: HTMLAudioElement;

  private bgImgs: Array<any>;
  private current: number = 0;
  currentImage;
  state = 'in';
  counter = 0;
  enableAnimation = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private sanitize: DomSanitizer,
    private renderer: Renderer2,
    private bottomSheet: MatBottomSheet
  ) {
    this.bgImgs = [
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668829382/login/drew-beamer-Vc1pJfvoQvY-unsplash.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668829378/login/syed-hussaini-7VAfikKe9kU-unsplash.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668829385/login/pexels-olena-bohovyk-3806690.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668673337/login/1234_dges9y.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668829386/login/randy-tarampi-U2eUlPEKIgU-unsplash.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668829374/login/cat_caviar.jpg',
      'https://res.cloudinary.com/dsmddewxs/image/upload/v1668833540/login/surprised-pikachu.gif',
    ];
    this.currentImage = this.bgImgs[0];
  }

  loading = true;
  ngOnInit(): void {
    // We auth in here to see if should show the login button since this page is shared by logged in/non logged in users
    this.authService.authenticateTwitchUser().subscribe();
    this.twitchUserStatus$ = this.authService.twitchUserStatus$;
    this.loading$ = this.authService.loading$;

    this.audio = new Audio(
      'https://res.cloudinary.com/dsmddewxs/video/upload/v1668840551/login/ZomboxWazzing.mp3'
    );

    this.audio.loop = true;
    this.audio.currentTime = 0;
    this.audio.load();

    this.bottomSheet
      .open(BottomSheetAudioComponent, {
        hasBackdrop: true,
        backdropClass: 'bottom-sheet-audio-backdrop',
        data: {
          audio: this.audio,
          text: 'ANOTHER BUTTON WILL BE SOMEWHERE IN THE MIDDLE',
        },
        disableClose: true,
      })
      .afterOpened()
      .pipe(delay(500))
      .subscribe(() => {
        this.loading = false;
      });

    // todo dont forget to unsub from eveyrthing
    interval(5669).subscribe((x) => {
      this.runAnimation();
    });
  }

  ngOnDestroy() {
    this.audio?.pause();
  }

  ngAfterViewInit() {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const coinFlipX = Math.random() < 0.5;
    const coinFlipY = Math.random() < 0.5;

    if (coinFlipX) {
      x += 100;
    } else {
      x -= 100;
    }
    if (coinFlipY) {
      y += 100;
    } else {
      y -= 100;
    }

    const el = this.loginBtn?.nativeElement;
    this.renderer.setStyle(el, 'top', `${y}px`);
    this.renderer.setStyle(el, 'left', `${x}px`);
  }

  runAnimation() {
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }

  toggleImg() {
    this.currentImage = this.sanitize.bypassSecurityTrustStyle(
      `url(${this.bgImgs[this.current]})`
    );
    this.current == this.bgImgs.length - 1
      ? (this.current = 0)
      : ++this.current;
  }

  onDone() {
    if (this.enableAnimation) {
      if (this.counter === 1) {
        this.toggleImg();
      }
      this.toggleState();
    }
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
  }
}

@Component({
  selector: 'app-bottom-sheet-audio',
  template: `<h1 style="color: red; text-align: center; height: 70vh;">
    <span> YOU MUST CLICK THIS BUTTON TO ALLOW AUDIO. </span> <br />
    <br />
    <span> YOU MUST CLICK THIS BUTTON IN ORDER TO PROCEED. </span> <br />
    <br />
    <span> YOU MUST CLICK THIS BUTTON.</span> <br />
    <br />

    <span>
      <br />
      {{ data.text }}
    </span>

    <br />
    <button (click)="playAudio()">CLICCCCCCCCKKKKKKK MEEEEEEEEEEEE</button>
  </h1>`,
})
export class BottomSheetAudioComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { audio: HTMLAudioElement; text: string },
    private bottomSheetRef: MatBottomSheetRef<BottomSheetAudioComponent>
  ) {}

  async playAudio() {
    try {
      await this.data.audio.play();
      this.bottomSheetRef.dismiss(true);
    } catch (err) {
      console.log('error', err);
    }
  }
}
