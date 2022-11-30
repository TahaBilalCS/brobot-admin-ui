import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, take } from 'rxjs';

// import { PokemonClient } from 'pokenode-ts';

export interface PokemonParsed extends PokemonDB {
  cardBgUrl: string;
  cardPokemonUrl: string;
  shinyImgNotFound: boolean;
}

export type PokemonDB = {
  name: string;
  nameId: string;
  /**
   * Look into "check constraints" (in pgAdmin) to limit slot number to 0-6
   */
  slot: number;
  level: number;
  /**
   * 1/8192 chance but we'll do 1/250
   */
  shiny: boolean;
  wins: number;
  losses: number;
  draws: number;
  item: string;
  moves: string[];
  dexNum: number;
  color: string;
  types: string[];
  /**
   * 'M', 'F', or 'N'
   */
  gender: string;
  nature: string;
  ability: string;
  createdDate: string;
  updatedDate: string;
};

// https://res.cloudinary.com/dsmddewxs/image/upload/v1668993131/pokemon/card-bgs/pink.png
@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent implements OnInit {
  // pokemonClient: PokemonClient = new PokemonClient({ cacheOptions: {} });
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  allowedFemaleNums = [
    111, 112, 118, 119, 12, 123, 129, 130, 154, 165, 166, 178, 185, 186, 19,
    190, 194, 195, 198, 20, 202, 203, 207, 208, 212, 214, 215, 217, 221, 224,
    229, 232, 25, 255, 256, 257, 26, 267, 269, 272, 274, 275, 3, 307, 308, 315,
    316, 317, 322, 323, 332, 350, 369, 396, 397, 398, 399, 400, 401, 402, 403,
    404, 405, 407, 41, 415, 417, 418, 419, 42, 424, 44, 443, 444, 445, 449, 45,
    450, 453, 454, 456, 457, 459, 460, 461, 464, 465, 473, 64, 65, 84, 85, 97,
  ];

  userPokemon: PokemonParsed[] = [];

  pokemonNotFoundUrl =
    'https://res.cloudinary.com/dsmddewxs/image/upload/v1668805125/pokemon/960x960/default/0';
  backgroundNotFoundUrl =
    'https://res.cloudinary.com/dsmddewxs/image/upload/v1668999916/pokemon/card-bgs/330x480/black';

  username = new FormControl('');
  teamOwner = '';

  async onSubmitCancel() {
    if (!this.loading && this.searchTimeReady) {
      this.userPokemon = [];
      await this.getPokemon(this.username.value);
    }
  }
  async onSubmit() {
    this.userPokemon = [];
    await this.getPokemon(this.username.value);
  }
  getCardBgUrl(pokemon: PokemonDB) {
    return `https://res.cloudinary.com/dsmddewxs/image/upload/v1668999916/pokemon/card-bgs/330x480/${pokemon.color}`;
  }

  getPokemonUrl(pokemon: PokemonDB): {
    url: string;
    shinyImgNotFound: boolean;
  } {
    let imgUrl;
    let notFound = false;
    // If gender is F and it is allowed
    if (pokemon.gender === 'F') {
      if (this.allowedFemaleNums.includes(pokemon.dexNum)) {
        imgUrl = pokemon.shiny ? 'shiny_female' : 'female';
      } else {
        if (pokemon.shiny) {
          notFound = true;
        }
        imgUrl = pokemon.shiny ? 'shiny' : 'default';
      }
    } else {
      imgUrl = pokemon.shiny ? 'shiny' : 'default';
    }

    return {
      url: `https://res.cloudinary.com/dsmddewxs/image/upload/v1668805125/pokemon/960x960/${imgUrl}/${pokemon.dexNum}`,
      shinyImgNotFound: notFound,
    };
  }

  openPokeStats(pokemon: PokemonDB, index: number) {
    const el = document.getElementById('card-' + index);
    let position = {};
    if (el) {
      const box = el.getBoundingClientRect();
      position = {
        left: box.left + 10 + 'px',
        top: box.top + 10 + 'px',
      };
    }
    this.matDialog.open(PokeStatsComponent, {
      data: pokemon,
      position: position,
      panelClass: 'poke-stats-dialog',
    });
  }

  openPokeMoves(moves: string[], index: number) {
    const el = document.getElementById('card-' + index);
    let position = {};
    if (el) {
      const box = el.getBoundingClientRect();
      position = {
        left: box.left + 10 + 'px',
        top: box.top + 10 + 'px',
      };
    }

    this.matDialog.open(PokeMovesComponent, {
      data: moves,
      position: position,
      panelClass: 'poke-stats-dialog',
    });
  }

  loading = true;
  searchTimeReady = true;

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['username']) {
        this.username.setValue(params['username']);
        this.onSubmit();
      } else {
        this.loading = false;
      }
    });
  }

  errored = false;
  async getPokemon(name: string | null): Promise<void> {
    // Update url with inputted username (for easier copy/paste)
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { username: name },
    });
    this.loading = true;
    this.errored = false;
    this.searchTimeReady = false;
    if (name)
      this.http
        .get(`${this.apiUrl}/api/pokemonTeams`, {
          withCredentials: true,
          params: { teamName: name },
        })
        .pipe(
          catchError((err) => {
            return of(err);
          })
        )
        .subscribe(async (res: any) => {
          if (res instanceof HttpErrorResponse) {
            this.errored = true;
            this.searchTimeReady = true;
            this.loading = false;
            return;
          }

          let pokemonList: PokemonParsed[] = [];
          if (
            res.pokemonTeam &&
            res.pokemonTeam.pokemon &&
            res.pokemonTeam.pokemon.length > 0
          ) {
            const sortedBefore = res.pokemonTeam.pokemon.sort(
              (a: any, b: any) => a.slot - b.slot
            );
            for (let i = 1; i <= 6; i++) {
              const pokemonAtSlot = sortedBefore.find((p: any) => p.slot === i);
              if (pokemonAtSlot) {
                const cardBgUrl = this.getCardBgUrl(pokemonAtSlot);
                const cardPokemonUrlObj = this.getPokemonUrl(pokemonAtSlot);
                const { url, shinyImgNotFound } = cardPokemonUrlObj;
                pokemonList.push({
                  ...pokemonAtSlot,
                  cardBgUrl,
                  cardPokemonUrl: url,
                  shinyImgNotFound,
                });
              } else {
                pokemonList.push({ slot: i } as PokemonParsed);
              }
            }
            this.teamOwner = res.displayName;

            this.userPokemon = pokemonList.sort((a, b) => a.slot - b.slot);
            setTimeout(() => {
              this.loading = false;
            }, 250);

            setTimeout(() => {
              this.searchTimeReady = true;
            }, 2000);
          } else {
            this.errored = true;
            this.searchTimeReady = true;
            this.loading = false;
            return;
          }
        });
  }
}

@Component({
  selector: 'app-poke-stats-dialog',
  template: `<section style="height: 480px; width: 330px; text-align: center">
    <h2 style="font-size: 30px;">Name: {{ data.name }}</h2>
    <h2>Pokedex #{{ data.dexNum }}</h2>
    <h2>Level: {{ data.level }}</h2>
    <h2>Gender: {{ data.gender }}</h2>
    <h2 style="color: gold">Shiny: {{ data.shiny === true ? 'Yes' : 'No' }}</h2>
    <h2 style="color: green">Wins: {{ data.wins }}</h2>
    <h2 style="color: red">Losses: {{ data.losses }}</h2>
    <h2 style="color: white">Draws: {{ data.draws }}</h2>
    <h2>Nature: {{ data.nature }}</h2>
    <h2>Types: {{ data.types }}</h2>
    <h2>Color: {{ data.color }}</h2>
    <h2>Created: {{ data.createdDate | date }}</h2>
  </section>`,
  styles: [
    'h1, h2 { font-family: "Electrolize-Regular", sans-serif; font-weight: 600; margin: 10px 0; }',
  ],
})
export class PokeStatsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PokemonDB) {}
}

@Component({
  selector: 'app-poke-moves-dialog',
  template: `<section
    style="height: 480px; width: 330px; text-align: center; overflow-x: hidden;"
  >
    <h1 style="color: gold">Moves ({{ data.length }})</h1>
    <h1 *ngFor="let move of data">{{ move }}</h1>
  </section>`,
  styles: [
    'h1, h2 { font-family: "Electrolize-Regular", sans-serif; font-weight: 600; margin: 10px 0; }',
  ],
})
export class PokeMovesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
