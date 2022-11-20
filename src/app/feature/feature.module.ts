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

const MaterialModules = [MatButtonModule, MatBottomSheetModule];
@NgModule({
  declarations: [LoginComponent, HomeComponent, BottomSheetAudioComponent],
  imports: [CommonModule, ...MaterialModules, BrowserAnimationsModule],
})
export class FeatureModule {}
