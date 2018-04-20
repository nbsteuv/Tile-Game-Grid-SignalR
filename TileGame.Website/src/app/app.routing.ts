import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserService} from './_shared/services';

import {GameComponent} from './game/game.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: GameComponent, canActivate: [UserService]}
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}