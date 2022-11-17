import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { TeamSearchComponent } from './components/team-search/team-search.component';
import { BattleOutcomeComponent } from './components/battle-outcome/battle-outcome.component';

@NgModule({
  declarations: [CardComponent, TeamSearchComponent, BattleOutcomeComponent],
  imports: [CommonModule],
})
export class PokemonModule {}
