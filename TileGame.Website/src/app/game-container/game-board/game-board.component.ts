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

    ngOnInit(): void{
        this._puzzleArray.forEach(() => {
            this.positionArray.push(new Position());
        });
    }

    onTilePositionRetrieved(index: number, position: Position): void{
        this.positionArray[index] = position;
    }

    onTileClick(tileIndex: number): void{
        this.moveTileToEmptySpace(tileIndex);
    }

    getGridStyle(): object{
        let gridTemplateColumns = `repeat(${this.gameSize}, 1fr)`;
        let gridStyle = {
            'grid-template-columns': gridTemplateColumns
        }
        return gridStyle;
    } 

    moveTileToEmptySpace(tileIndex: number): void{
        let emptySpacePosition = this.getEmptySpacePosition();
        let tilePosition = this.getTilePosition(tileIndex);
        this.setTilePosition(tileIndex, emptySpacePosition);
        this.setEmptySpacePosition(tilePosition);
        console.log(this.positionArray);
    }

    getEmptySpaceTileIndex(): number{
        let emptySpaceTileIndex = this.positionArray.length - 1;
        return emptySpaceTileIndex;
    }

    getEmptySpacePosition(): Position{
        let emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        let emptySpacePosition = this.getTilePosition(emptySpaceTileIndex);
        return emptySpacePosition;
    }

    setEmptySpacePosition(position: Position): void{
        let emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        this.setTilePosition(emptySpaceTileIndex, position);
    }

    getTilePosition(tileIndex: number): Position{
        let tilePosition = this.positionArray[tileIndex];
        return tilePosition;
    }

    setTilePosition(tileIndex: number, position: Position): void{
        this.positionArray[tileIndex] = position;
    }
}