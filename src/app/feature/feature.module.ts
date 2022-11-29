import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BottomSheetAudioComponent,
  LoginComponent,
} from 'src/app/feature/login/login.component';
import { HomeComponent } from 'src/app/feature/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PokemonModule } from 'src/app/feature/pokemon/pokemon.module';
import { TwitchModule } from 'src/app/feature/twitch/twitch.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

const MaterialModules = [MatButtonModule, MatBottomSheetModule];

const LoginAndHomeComponents = [
  LoginComponent,
  HomeComponent,
  BottomSheetAudioComponent,
];
@NgModule({
  declarations: [...LoginAndHomeComponents],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    PokemonModule,
    TwitchModule,
    MatProgressBarModule,
    RouterLink,
  ],
})
export class FeatureModule {}
