import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObsWebsocketService {
  // private wsSubject = webSocket({
  //   url: environment.wsUrl,
  // });
  constructor() {
    console.log('ObsWebsocketService Constructor');
    // const audio = new Audio('https://play.pokemonshowdown.com/audio/cries/abomasnow.mp3')
    // audio.play()

    // this.wsSubject.subscribe(
    //   msg => {
    //     console.log("WS Message", msg)
    //   },
    //   err => console.error("ERROR SOCKET", err),
    //   () => console.warn('SOCKET complete')
    // )

    // this.wsSubject.next({event: 'message', data: 'Sup'})
  }
}
