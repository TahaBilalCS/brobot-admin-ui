import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamOverlayComponent } from 'src/app/feature/twitch/components/stream-overlay/stream-overlay.component';
import { CommandsComponent } from 'src/app/feature/twitch/components/commands/commands.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [StreamOverlayComponent, CommandsComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
  ],
})
export class TwitchModule {}
