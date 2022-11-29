import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/feature/login/login.component';
import { TwitchAuthGuard } from 'src/app/core/guards/twitch-auth/twitch-auth-guard.service';
import { HomeComponent } from 'src/app/feature/home/home.component';
import { TeamSearchComponent } from 'src/app/feature/pokemon/components/team-search/team-search.component';
import { BattleOutcomeComponent } from 'src/app/feature/pokemon/components/battle-outcome/battle-outcome.component';
import { LeaderboardComponent } from 'src/app/feature/pokemon/components/leaderboard/leaderboard.component';
import { StreamOverlayComponent } from 'src/app/feature/twitch/components/stream-overlay/stream-overlay.component';
import { CommandsComponent } from 'src/app/feature/twitch/components/commands/commands.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [TwitchAuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pokemon/team',
    component: TeamSearchComponent,
    canActivate: [TwitchAuthGuard],
  },
  {
    path: 'pokemon/battleoutcome',
    component: BattleOutcomeComponent,
    canActivate: [TwitchAuthGuard],
  },
  {
    path: 'pokemon/leaderboard',
    component: LeaderboardComponent,
    canActivate: [TwitchAuthGuard],
  },
  {
    path: 'commands',
    component: CommandsComponent,
    canActivate: [TwitchAuthGuard],
  },
  { path: 'twitch/supahot/overlay', component: StreamOverlayComponent },
  { path: '**', redirectTo: 'commands' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
