import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { SharedModule } from './shared/shared.module';

// const AppMaterialModules: [] = [];
const GlobalModules = [CoreModule];
const FeatureModules = [FeatureModule];
const SharedModules = [SharedModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ...AppMaterialModules,
    ...GlobalModules,
    ...FeatureModules,
    ...SharedModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
