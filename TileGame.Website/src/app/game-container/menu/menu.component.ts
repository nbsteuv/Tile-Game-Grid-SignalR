import {Component, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {GameOptions} from '../../_shared/types';
import {GameType} from '../../_shared/enums';

@Component({
    selector: 'nbs-menu-component',
    templateUrl: './menu.component.html'
})
export class MenuComponent{
    @Output() gameOptionsSubmitted: EventEmitter<GameOptions> = new EventEmitter<GameOptions>();

    gameOptions: GameOptions = new GameOptions();
    requirePassword: boolean = false;
    singleGameType: GameType = GameType.Single;
    raceGameType: GameType = GameType.Race;

    submitGameOptions(){
        this.gameOptionsSubmitted.emit(this.gameOptions);
    }
}