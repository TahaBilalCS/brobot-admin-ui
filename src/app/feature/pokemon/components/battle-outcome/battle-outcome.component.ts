import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';

type BattleOutcomeRes = string[] | null;
@Component({
  selector: 'app-battle-outcome',
  templateUrl: './battle-outcome.component.html',
  styleUrls: ['./battle-outcome.component.scss'],
})
export class BattleOutcomeComponent implements OnInit {
  starterOutcome: string = '';
  teamOutcome: string = '';
  apiUrl = environment.apiUrl;

  loading = true;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const teamBattle = this.http.get<BattleOutcomeRes>(
      `${this.apiUrl}/api/pokemonteambattle`,
      {
        withCredentials: true,
      }
    );

    const starterBattle = this.http.get<BattleOutcomeRes>(
      `${this.apiUrl}/api/pokemonbattle`,
      {
        withCredentials: true,
      }
    );

    forkJoin([teamBattle, starterBattle]).subscribe((res) => {
      this.teamOutcome = res[0] ? res[0].join(' ') : '';
      this.starterOutcome = res[1] ? res[1].join(' ') : '';
      this.loading = false;
    });
  }
}
