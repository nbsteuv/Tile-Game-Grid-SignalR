import {Component, Input} from '@angular/core';

@Component({
    selector: 'nbs-game-player',
    templateUrl: './game-player.component.html'
})
export class GamePlayerComponent{
    private _puzzleArray: string[] = [];

    @Input() wordList: string[];

    @Input() set puzzleArray(puzzleArray: string[]){
        this._puzzleArray = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }
}