import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
// import { PokemonClient } from 'pokenode-ts';

interface BattleOutcomeRes {
  body: {
    outcome?: string[];
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  apiUrl = environment.apiUrl;

  outcome: string = '';
  // private wsSubject = webSocket({
  //   url: environment.wsUrl,
  // });
  // pokemonClient: PokemonClient = new PokemonClient({ cacheOptions: {} });

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    let x = 3;

    console.log('Init Login');
    // this.wsSubject.subscribe(
    //   msg => {
    //     console.log("WS Message", msg)
    //   },
    //   err => console.error("ERROR SOCKET", err),
    //   () => console.warn('SOCKET complete')
    // )

    // const p = await this.pokemonClient.getPokemonById(10)

    /**
     * if female and shiny shiny_female
     * if female front_female
     * if not female and shiny front_shiny
     * if not female and not shiny front_default
     */
    // p.sprites.front_female
    // p.sprites.front_default
    // p.sprites.front_shiny
    // p.sprites.front_shiny_female
    //   <img src="image.jpg" alt="..." loading="lazy" />

    // todo need to post twitch name to server, find team by name, and then get their team back
    // console.log('Pokemon', p);

    // this.wsSubject.next({event: 'message', data: 'Sup'})

    this.http
      .get(`${this.apiUrl}/api/pokemonTeams`, {
        withCredentials: true,
        params: { teamName: 'lebrotherbill' },
      })
      .subscribe(async (res: any) => {
        console.log('TEWAM RES', res);

        // if (res.pokemonTeam && res.pokemonTeam.pokemon && res.pokemonTeam.pokemon.length >0) {
        //   console.log('whats up')
        //   for (let i = 0; i < res.pokemonTeam.pokemon.length; i++) {
        //     const pokemon = res.pokemonTeam.pokemon[i];
        //     const pokemonUI = await this.pokemonClient.getPokemonById(pokemon.nameId)
        //     console.log('Pokemon UI', pokemonUI)
        //     console.log(`DB NAME: ${pokemon.nameId} UI NAME:${pokemonUI.name} UI ID:${pokemonUI.id}`,pokemonUI.sprites.front_default)
        //   }
        // }
      });
    // this.http.get(`${this.apiUrl}/api/allPokemon`, {withCredentials: true, observe: "response"}).subscribe(async (res: any) => {
    //   console.log('BEGIN')
    //   for (let i = 418; i<= 419; i++) {
    //     const pokemonUI = await this.pokemonClient.getPokemonById(i)
    //     console.log('Pokemon UI', pokemonUI.sprites.other?.home.front_shiny_female)
    //     console.log('Pokemon UI', pokemonUI.sprites.other?.home.front_female)
    //     console.log('Pokemon UI', pokemonUI.sprites.other?.dream_world.front_female)
    //     console.log('Pokemon UI', pokemonUI.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny_female)
    //     console.log('Pokemon UI', pokemonUI.sprites.versions["generation-iv"]["diamond-pearl"].front_female)
    //
    //
    //
    //     if(!pokemonUI.sprites.other?.home.front_default || !pokemonUI.sprites.other?.home.front_female || !pokemonUI.sprites.other?.home.front_shiny || !pokemonUI.sprites.other?.home.front_shiny_female) {
    //       console.log('NO HOME\n\n\n\n', pokemonUI.name)
    //     }
    //   }
    // })

    // this.http.get(`${this.apiUrl}/api/pokemonteambattle`, {withCredentials: true, observe: "response"}).subscribe((res: any) => {
    //   if (res instanceof HttpErrorResponse) {
    //     console.log("ERROROROROROROR", res)
    //     return;
    //   }
    //   console.log("Pokemon Battle", res)
    //   // @ts-ignore
    //   if(res.body?.outcome) {
    //     // @ts-ignore
    //     this.outcome = res.body.outcome.join('\r\n')
    //     // console.log("Pokemon Battle", this.outcome)
    //   }
    // })
  }
}
