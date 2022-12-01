import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import {
  animate,
  group,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { concatMap, retry, Subject } from 'rxjs';

export enum OutgoingEvents {
  POKEMON_ROAR_COMPLETE = 'pokemon_roar_complete',
  DEBS_ALERT_COMPLETE = 'debs_alert_complete',
}

export enum IncomingEvents {
  POKEMON_ROAR = 'pokemon_roar',
  DEBS_ALERT = 'debs_alert',
  QUACK = 'quack',
}

export interface WSMessage {
  event: string;
  data: any;
  // PokemonRoarEventData | DebsEventData | DebsAlertCompleteData;
}

interface DebsAlertCompleteData {
  event: OutgoingEvents.DEBS_ALERT_COMPLETE;
  data: string;
}
interface DebsEventData {
  msg: string;
  name: string;
}

interface PokemonRoarEventData {
  name: string;
  color: string;
  nameId: string;
  shiny: boolean;
  level: number;
  gender: string;
  dexNum: number;
}

const pokemonRoarAnimationMS = 300;
@Component({
  selector: 'app-stream-overlay',
  templateUrl: './stream-overlay.component.html',
  styleUrls: ['./stream-overlay.component.scss'],
  animations: [
    trigger('alertBoxTrigger', [
      transition(':enter', [
        group([
          animate(
            '750ms ease-in-out',
            keyframes([
              style({ transform: 'scale(0)', opacity: 0 }),
              style({ transform: 'scale(1)', opacity: 1 }),
            ])
          ),
          query('span', [
            animate(
              '{{animDuration}}ms linear',
              keyframes([
                style({
                  transform: 'translateX(0%)',
                }),
                style({
                  transform: 'translateX(calc(-100% - 1920px))',
                }),
              ])
            ),
          ]),
        ]),
      ]),
      transition(':leave', [
        group([
          animate(
            '750ms ease-in-out',
            keyframes([
              style({ transform: 'scale(1)', opacity: 1 }),
              style({ transform: 'scale(0)', opacity: 0 }),
            ])
          ),
        ]),
      ]),
    ]),
    trigger('pokemonRoarTrigger', [
      // How the end state should be when the animation is done
      state('true', style({ opacity: 1, transform: 'scale(1)' })),
      state('false', style({ opacity: 0, transform: 'scale(0)' })),
      // How the transition happens
      transition('false => true', [
        animate(
          `${pokemonRoarAnimationMS}ms ease-in-out`,
          keyframes([
            style({ transform: 'scale(0)', opacity: 0 }),
            style({ transform: 'scale(1)', opacity: 1 }),
          ])
        ),
      ]),
      transition('true => false', [
        animate(
          `${pokemonRoarAnimationMS}ms ease-in-out`,
          keyframes([
            style({ transform: 'scale(1)', opacity: 1 }),
            style({ transform: 'scale(0)', opacity: 0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class StreamOverlayComponent implements OnInit, AfterViewInit {
  apiUrl = environment.apiUrl;
  onOpenSubject = new Subject();

  private wsSubject = webSocket<WSMessage>({
    url: environment.wsUrl,
    openObserver: this.onOpenSubject,
  });

  public audioDEBS = new Audio(
    'https://res.cloudinary.com/dsmddewxs/video/upload/v1669253835/stream-overlay/DEBS_Alert.mp3'
  );
  showDebsAlert = false;
  debsAlertMsg = '';
  debsAlertDuration = 0;
  alertCount = 0;
  queue = new Subject();

  public audioWindowsStartup = new Audio(
    'https://res.cloudinary.com/dsmddewxs/video/upload/v1669254152/stream-overlay/Windows_Startup.mp3'
  );
  // http://localhost:4200/twitch/supahot/overlay

  allowedFemaleNums = [
    111, 112, 118, 119, 12, 123, 129, 130, 154, 165, 166, 178, 185, 186, 19,
    190, 194, 195, 198, 20, 202, 203, 207, 208, 212, 214, 215, 217, 221, 224,
    229, 232, 25, 255, 256, 257, 26, 267, 269, 272, 274, 275, 3, 307, 308, 315,
    316, 317, 322, 323, 332, 350, 369, 396, 397, 398, 399, 400, 401, 402, 403,
    404, 405, 407, 41, 415, 417, 418, 419, 42, 424, 44, 443, 444, 445, 449, 45,
    450, 453, 454, 456, 457, 459, 460, 461, 464, 465, 473, 64, 65, 84, 85, 97,
  ];

  constructor(private renderer: Renderer2) {}

  @ViewChild('streamContainer') streamContainerRef!: ElementRef;

  private randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async ngAfterViewInit() {
    this.wsSubject.pipe(retry({ delay: 3000 })).subscribe({
      next: (msg) => {
        if (!msg.event) {
          return;
        }
        switch (msg.event) {
          case IncomingEvents.QUACK:
            const audioQuack = new Audio(
              'https://res.cloudinary.com/dsmddewxs/video/upload/v1669460570/stream-overlay/duck.mp3'
            );
            audioQuack.volume = 0.4;
            audioQuack.play();
            break;
          case IncomingEvents.POKEMON_ROAR:
            {
              const data = <PokemonRoarEventData>msg.data;
              const { imgUrl, soundUrl } = this.getPokemonUrls(data);
              // AUDIO
              const audioPokemonRoar = new Audio(soundUrl);
              audioPokemonRoar.volume = 0.3;
              audioPokemonRoar.load();
              // IMAGE
              const image = new Image(600, 600);
              image.style.position = 'absolute';
              const x = this.randomIntFromInterval(0, 1920 - 625);
              const y = this.randomIntFromInterval(0, 1080 - 625);
              image.style.top = `${y}px`;
              image.style.left = `${x}px`;
              image.style.opacity = '0';
              image.style.transform = 'scale(0)';
              image.onload = () => {
                try {
                  this.renderer.appendChild(
                    this.streamContainerRef.nativeElement,
                    image
                  );
                  this.renderer.setProperty(
                    image,
                    '@pokemonRoarTrigger',
                    false
                  );
                  this.renderer.setProperty(image, '@pokemonRoarTrigger', true);
                  audioPokemonRoar.play();
                } catch (err) {
                  console.error('Error Playing Audio', err);
                }
                setTimeout(() => {
                  this.renderer.setProperty(
                    image,
                    '@pokemonRoarTrigger',
                    'false'
                  );

                  setTimeout(() => {
                    this.renderer.removeChild(
                      this.streamContainerRef.nativeElement,
                      image
                    );
                  }, pokemonRoarAnimationMS);
                }, 1500);
              };
              image.src = imgUrl;
            }

            break;
          case IncomingEvents.DEBS_ALERT:
            {
              const data = <DebsEventData>msg.data;
              this.onDebsButton(data.msg, data.name);
            }
            break;
          default:
            console.error('Unknown Event Received', msg);
            break;
        }
      }, // Called whenever there is a message from the server.
      error: (err) => console.error('Error Socket', err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => {}, // Called when connection is closed (for whatever reason).
    });
  }

  async ngOnInit(): Promise<void> {
    this.audioDEBS.load();
    this.audioWindowsStartup.load();

    this.onOpenSubject.subscribe((res) => {
      this.onStartup();
    });
    this.queue
      .pipe(concatMap((item: any) => this.onDebsAlert(item)))
      .subscribe((res) => {});
  }

  getPokemonUrls(pokemon: PokemonRoarEventData): {
    imgUrl: string;
    soundUrl: string;
  } {
    let imgUrl;
    // If gender is F and it is allowed
    if (pokemon.gender === 'F') {
      if (this.allowedFemaleNums.includes(pokemon.dexNum)) {
        imgUrl = pokemon.shiny ? 'shiny_female' : 'female';
      } else {
        imgUrl = pokemon.shiny ? 'shiny' : 'default';
      }
    } else {
      imgUrl = pokemon.shiny ? 'shiny' : 'default';
    }

    return {
      imgUrl: `https://res.cloudinary.com/dsmddewxs/image/upload/v1668805125/pokemon/960x960/${imgUrl}/${pokemon.dexNum}`,
      soundUrl: `https://res.cloudinary.com/dsmddewxs/video/upload/v1669433072/stream-overlay/pokemon-sounds/${pokemon.nameId}.mp3`,
    };
  }

  async delay(t: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  }
  async onDebsButton(msg: string, name: string) {
    if (this.alertCount >= 5) {
      const debsData = {
        event: OutgoingEvents.DEBS_ALERT_COMPLETE,
        data: name,
      };
      this.wsSubject.next(<DebsAlertCompleteData>debsData);
      return;
    }
    this.alertCount++;
    this.queue.next(msg);
  }

  async onDebsAlert(msg: string) {
    this.showDebsAlert = true;
    this.debsAlertMsg = msg;
    try {
      const charCount = msg.length;
      // 500 max char - 30s, lower bound - 9s
      this.debsAlertDuration = Math.ceil(charCount / 16.7) * 1000 + 3000;
      await this.audioDEBS.play();
    } catch (err) {
      console.error('DEBS ALERT FAILED', err);
    }
    await this.delay(this.debsAlertDuration);
    this.showDebsAlert = false;
    this.debsAlertMsg = '';
    this.debsAlertDuration = 0;
    // Delay again to allow animation to finish
    await this.delay(1000);
    this.alertCount--;
  }

  async onStartup() {
    try {
      this.audioWindowsStartup.volume = 0.2;
      await this.audioWindowsStartup.play();
    } catch (err) {
      console.error('Startup Sound Failed', err);
    }
  }
}
