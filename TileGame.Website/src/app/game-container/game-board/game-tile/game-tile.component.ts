import {Component, Input} from '@angular/core';

@Component({
    selector: 'nbs-game-tile',
    templateUrl: './game-tile.component.html'
})
export class GameTileComponent{
    @Input() character: string;
}