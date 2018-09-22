import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameContainerComponent } from './game-container/game-container.component';

@NgModule({
	imports: [ RouterModule.forRoot([ { path: '', component: GameContainerComponent } ]) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
