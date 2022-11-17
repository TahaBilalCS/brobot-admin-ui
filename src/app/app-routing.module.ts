import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/feature/login/login.component';
import { TwitchAuthGuard } from 'src/app/core/guards/twitch-auth/twitch-auth-guard.service';
import { HomeComponent } from 'src/app/feature/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [TwitchAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
