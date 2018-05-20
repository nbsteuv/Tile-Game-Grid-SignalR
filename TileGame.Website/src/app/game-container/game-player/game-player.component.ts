import {Component, Input} from '@angular/core';

@Component({
    selector: 'nbs-game-player',
    templateUrl: './game-player.component.html'
})
export class GamePlayerComponent{
    private _puzzleArray: string[] = [];
    moves: number = 0;

    @Input() wordList: string[];

    @Input() set puzzleArray(puzzleArray: string[]){
        this._puzzleArray = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }

    getGameSize(): number{
        return this.wordList.length;
    }

    onMove(): void{
        this.moves = this.moves + 1;
    }
}