import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { SideNavComponent } from 'src/app/core/side-nav/side-nav.component';
// import { RouterOutlet } from '@angular/router';

/**
 * This abstract class used for module building by extending this class
 * prevents importing the module into somewhere else than root App Module.
 */
export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded.`
      );
    }
  }
}

const MaterialModules = [MatToolbarModule, MatButtonModule, MatIconModule];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ...MaterialModules],
  exports: [HeaderComponent],
})
export class CoreModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
}
