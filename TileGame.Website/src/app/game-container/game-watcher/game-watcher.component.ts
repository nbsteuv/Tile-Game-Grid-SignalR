import { Component, Input } from '@angular/core';

import { IncomingMove, Player } from '../../_shared/types';

@Component({
    selector: 'nbs-game-watcher',
    templateUrl: './game-watcher.component.html'
})
export class GameWatcherComponent {
    private _players: Player[] = [];

    @Input() puzzleArray: string[];
    @Input() wordList: string[];

    @Input() set incomingMove(incomingMove: IncomingMove) {

    }

    @Input() set players(playerList: string[]) {
        this._players = playerList.map(username => {
            return { username: username, incomingMove: null }
        });
    }


    getGameSize(): number {
        return this.wordList.length;
    }
}