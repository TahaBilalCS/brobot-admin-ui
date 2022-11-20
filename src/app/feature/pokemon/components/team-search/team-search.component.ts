import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { PokemonClient } from 'pokenode-ts';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent implements OnInit {
  // pokemonClient: PokemonClient = new PokemonClient({ cacheOptions: {} });

  // todo then do websockets
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('TeamSearchComponent Init');
    // this.http
    //   .get(`${this.apiUrl}/api/pokemonTeams`, {
    //     withCredentials: true,
    //     params: { teamName: 'lebrotherbill' },
    //   })
    //   .subscribe(async (res: any) => {
    //     console.log('TEWAM RES', res);
    //
    //     // if (res.pokemonTeam && res.pokemonTeam.pokemon && res.pokemonTeam.pokemon.length >0) {
    //     //   console.log('whats up')
    //     //   for (let i = 0; i < res.pokemonTeam.pokemon.length; i++) {
    //     //     const pokemon = res.pokemonTeam.pokemon[i];
    //     //     const pokemonUI = await this.pokemonClient.getPokemonById(pokemon.nameId)
    //     //     console.log('Pokemon UI', pokemonUI)
    //     //     console.log(`DB NAME: ${pokemon.nameId} UI NAME:${pokemonUI.name} UI ID:${pokemonUI.id}`,pokemonUI.sprites.front_default)
    //     //   }
    //     // }
    //   });
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
  }
}
