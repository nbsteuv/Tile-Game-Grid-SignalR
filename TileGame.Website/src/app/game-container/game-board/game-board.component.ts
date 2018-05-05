import {Component, Input} from '@angular/core';

@Component({
    selector: 'nbs-game-board',
    templateUrl: './game-board.component.html'
})
export class GameBoardComponent{
    private _puzzleArray: string[] = [];

    @Input() set puzzleArray(puzzleArray: string[]){
        this._puzzleArray = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }
}