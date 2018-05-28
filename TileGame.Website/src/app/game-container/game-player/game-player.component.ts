import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Move} from '../../_shared/types';

@Component({
    selector: 'nbs-game-player',
    templateUrl: './game-player.component.html'
})
export class GamePlayerComponent{
    private _puzzleArray: string[] = [];
    moves: number = 0;

    @Input() wordList: string[];
    @Output() move: EventEmitter<Move> = new EventEmitter<Move>();

    @Input() set puzzleArray(puzzleArray: string[]){
        this._puzzleArray = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }

    getGameSize(): number{
        return this.wordList.length;
    }

    onMove(move: Move): void{
        this.move.emit(move);
        this.moves = this.moves + 1;
    }
}