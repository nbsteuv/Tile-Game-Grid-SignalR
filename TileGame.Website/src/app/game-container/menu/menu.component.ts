import {Component, Output, EventEmitter} from '@angular/core';

import {GameOptions} from '../../_shared/types';

@Component({
    selector: 'nbs-menu-component',
    templateUrl: './menu.component.html'
})
export class MenuComponent{
    @Output() gameOptionsSubmitted: EventEmitter<GameOptions> = new EventEmitter<GameOptions>();

    gameOptions: GameOptions = new GameOptions();

    submitGameOptions(){
        this.gameOptionsSubmitted.emit(this.gameOptions);
    }
}