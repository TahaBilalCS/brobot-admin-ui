import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from 'src/app/feature/pokemon/components/leaderboard/leaderboard.component';
import {
  PokeStatsComponent,
  TeamSearchComponent,
  PokeMovesComponent,
} from './components/team-search/team-search.component';
import { BattleOutcomeComponent } from './components/battle-outcome/battle-outcome.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';

const MaterialModules = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatTooltipModule,
  MatDialogModule,
];
@NgModule({
  declarations: [
    LeaderboardComponent,
    TeamSearchComponent,
    BattleOutcomeComponent,
    PokeStatsComponent,
    PokeMovesComponent,
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
    MatDividerModule,
    MatTableModule,
    // todo why have to declare here if already declared in app module? Shared
    SharedModule,
    RouterLink,
  ],
})
export class PokemonModule {}
