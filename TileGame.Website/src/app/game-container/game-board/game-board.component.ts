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
    @Input() wordList: string[];
    @Output() move: EventEmitter<Move> = new EventEmitter<Move>();
    @Output() tileStartedMoving: EventEmitter<void> = new EventEmitter<void>();
    @Output() tileStoppedMoving: EventEmitter<void> = new EventEmitter<void>();

    positionArray: Position[] = [];
    tileArray: Tile[] = [];
    puzzleKey: string[] = [];

    @Input() set puzzleArray(puzzleArray: string[]){
        console.log('Setting puzzle array');
        this._puzzleArray = puzzleArray;
        this.currentPuzzle = puzzleArray.slice();
    }

    get puzzleArray(): string[]{
        return this._puzzleArray;
    }

    ngOnInit(): void{
        this.puzzleKey = this.createKey(this.wordList);

        this._puzzleArray.forEach((character, index) => {
            let coordinateX = this.tileArray.length % (this.gameSize);
            let coordinateY = Math.floor(this.tileArray.length / (this.gameSize));
            let tile = {
                position: new Position(0, 0),
                coordinates: new Position(coordinateX, coordinateY),
                currentPuzzleIndex: index
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
            // return;
        }

        let currentPuzzleEmptySpaceIndex = this.getCurrentPuzzleEmptySpaceIndex();

        this.currentPuzzle[currentPuzzleEmptySpaceIndex] = this.currentPuzzle[this.tileArray[tileIndex].currentPuzzleIndex];
        this.currentPuzzle[this.tileArray[tileIndex].currentPuzzleIndex] = ' ';

        this.checkPuzzle();

        let move = new Move(this.currentPuzzle, tileIndex);
        this.move.emit(move);

        this.moveTileToEmptySpace(tileIndex);
    }

    getCurrentPuzzleEmptySpaceIndex(): number{
        for(let i = 0; i < this.currentPuzzle.length; i++){
            if(this.currentPuzzle[i] === ' '){
                return i;
            }
        }
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
        //TODO: It's confusing to keep track of multiple types of indexes (animation and current puzzle state)
        //Should be solved in the DDD rewrite
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
            coordinates: new Position(tile.coordinates.x, tile.coordinates.y),
            currentPuzzleIndex: tile.currentPuzzleIndex
        };
        this.tileArray[tileIndex] = newTile;
    }

    onTileStartedMoving(): void{
        this.tileStartedMoving.emit();
    }

    onTileStoppedMoving(): void{
        this.tileStoppedMoving.emit();
    }

    createKey(wordList: string[]): string[] {
        var wordString = wordList.join('').replace(/\s/g, '');
        var key = wordString.split('');
        key.push(' ');
        return key;
    }

    checkPuzzle(): void {
        //Detect win here to freeze the browser until server confirms
        for(let i = 0; i < this.currentPuzzle.length; i++){
            if(this.currentPuzzle[i] !== this.puzzleKey[i]){
                return;
            }
        }
        console.log('Browser detects win.');
    }
}