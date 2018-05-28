import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Position, Tile, Move} from '../../_shared/types';

@Component({
    selector: 'nbs-game-board',
    templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit{
    private _puzzleArray: string[] = [];
    private currentPuzzle: string[] = [];

    @Input() gameSize: number;
    @Output() move: EventEmitter<Move> = new EventEmitter<Move>();

    positionArray: Position[] = [];

    tileArray: Tile[] = [];

    @Input() set puzzleArray(puzzleArray: string[]){
        console.log('Setting puzzle array');
        this._puzzleArray = puzzleArray;
        this.currentPuzzle = puzzleArray;
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }

    ngOnInit(): void{
        this._puzzleArray.forEach(() => {
            let coordinateX = this.tileArray.length % (this.gameSize);
            let coordinateY = Math.floor(this.tileArray.length / (this.gameSize));
            let tile = {
                position: new Position(0, 0),
                coordinates: new Position(coordinateX, coordinateY)
            }
            this.tileArray.push(tile);
        });
    }

    onTilePositionRetrieved(index: number, position: Position): void{
        this.tileArray[index].position = position;
    }

    onTileClick(tileIndex: number): void{
        let emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        let coordinateDifferenceX = Math.abs(this.tileArray[tileIndex].coordinates.x - this.tileArray[emptySpaceTileIndex].coordinates.x);
        let coordinateDifferenceY = Math.abs(this.tileArray[tileIndex].coordinates.y - this.tileArray[emptySpaceTileIndex].coordinates.y);
        if(coordinateDifferenceX + coordinateDifferenceY !== 1){
            return;
        }

        this.currentPuzzle[emptySpaceTileIndex] = this.currentPuzzle[tileIndex];
        this.currentPuzzle[tileIndex] = ' ';
        console.log('Current puzzle:');
        console.log(this.currentPuzzle);
        let move = new Move(this.currentPuzzle, tileIndex);
        this.move.emit(move);

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
        let emptySpace = this.getEmptySpace();
        let tile = this.getTile(tileIndex);
        this.setTile(tileIndex, emptySpace);
        this.setEmptySpace(tile);
    }

    getEmptySpaceTileIndex(): number{
        let emptySpaceTileIndex = this.tileArray.length - 1;
        return emptySpaceTileIndex;
    }

    getEmptySpace(): Tile{
        let emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        let emptySpacePosition = this.getTile(emptySpaceTileIndex);
        return emptySpacePosition;
    }

    setEmptySpace(tile: Tile): void{
        let emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        this.setTile(emptySpaceTileIndex, tile);
    }

    getTile(tileIndex: number): Tile{
        let tile = this.tileArray[tileIndex];
        return tile;
    }

    setTile(tileIndex: number, tile: Tile): void{
        let newTile = {
            position: new Position(tile.position.x, tile.position.y),
            coordinates: new Position(tile.coordinates.x, tile.coordinates.y)
        };
        this.tileArray[tileIndex] = newTile;
    }
}