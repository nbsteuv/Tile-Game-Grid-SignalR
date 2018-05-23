import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {UserService} from './_shared/services';

import {GameContainerComponent} from './game-container/game-container.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: GameContainerComponent/*, canActivate: [UserService]*/}
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}