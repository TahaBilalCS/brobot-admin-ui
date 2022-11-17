import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/feature/login/login.component';
import { HomeComponent } from 'src/app/feature/home/home.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [CommonModule],
})
export class FeatureModule {}
