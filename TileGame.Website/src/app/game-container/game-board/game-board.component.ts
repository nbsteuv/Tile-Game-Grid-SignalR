import {Component, Input, OnInit} from '@angular/core';

import {Position} from '../../_shared/types';

@Component({
    selector: 'nbs-game-board',
    templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit{
    private _puzzleArray: string[] = [];

    @Input() gameSize: number;

    positionArray: Position[] = [];

    @Input() set puzzleArray(puzzleArray: string[]){
        this._puzzleArray = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }

    ngOnInit(){
        this._puzzleArray.forEach(() => {
            this.positionArray.push(new Position());
        });
    }

    onTilePositionRetrieved(index: number, position: Position){
        this.positionArray[index] = position;
    }

    getGridStyle(): object{
        let gridTemplateColumns = `repeat(${this.gameSize}, 1fr)`;
        let gridStyle = {
            'grid-template-columns': gridTemplateColumns
        }
        return gridStyle;
    } 
}