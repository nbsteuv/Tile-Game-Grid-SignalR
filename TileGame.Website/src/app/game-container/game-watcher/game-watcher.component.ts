import { Component, Input } from '@angular/core';

import { IncomingMove, Player } from '../../_shared/types';

@Component({
    selector: 'nbs-game-watcher',
    templateUrl: './game-watcher.component.html'
})
export class GameWatcherComponent {
    players: Player[] = [];

    @Input() puzzleArray: string[];
    @Input() wordList: string[];

    @Input() set incomingMove(incomingMove: IncomingMove) {

    }

    getGameSize(): number {
        return this.wordList.length;
    }
}
