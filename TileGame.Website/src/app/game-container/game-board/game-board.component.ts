import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';

import { Position, Tile, Move, IncomingMove } from '../../_shared/types';

@Component({
    selector: 'nbs-game-board',
    templateUrl: './game-board.component.html'
})
export class GameBoardComponent implements OnInit, AfterViewInit {
    private _puzzleArray: string[] = [];
    private currentPuzzle: string[] = [];

    @Input() gameSize: number;
    @Input() wordList: string[];
    @Input() isOpponentBoard: boolean;
    @Output() move: EventEmitter<Move> = new EventEmitter<Move>();
    @Output() tileStartedMoving: EventEmitter<void> = new EventEmitter<void>();
    @Output() tileStoppedMoving: EventEmitter<void> = new EventEmitter<void>();

    gridGap = 0;
    readyToAcceptPositions = false;

    moveIndex = 0;
    positionArray: Position[] = [];
    tileArray: Tile[] = [];
    puzzleKey: string[] = [];
    lockTiles = false;

    @Input() set puzzleArray(puzzleArray: string[]) {
        console.log('Setting puzzle array');
        this._puzzleArray = puzzleArray;
        this.currentPuzzle = puzzleArray.slice();
    }

    get puzzleArray(): string[] {
        return this._puzzleArray;
    }

    @Input() set incomingMove(incomingMove: IncomingMove) {
        if (incomingMove) {
            while (incomingMove.moveHistory.length > this.moveIndex) {
                this.moveTileToEmptySpace(incomingMove.moveHistory[this.moveIndex]);
                this.moveIndex++;
            }

        }
    }

    constructor(private elementRef: ElementRef, private changeDectectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.puzzleKey = this.createKey(this.wordList);

        this._puzzleArray.forEach((character, index) => {
            const coordinateX = this.tileArray.length % (this.gameSize);
            const coordinateY = Math.floor(this.tileArray.length / (this.gameSize));
            const tile = {
                position: new Position(0, 0),
                coordinates: new Position(coordinateX, coordinateY),
                currentPuzzleIndex: index
            };
            this.tileArray.push(tile);
        });
    }

    ngAfterViewInit(): void {
        const gameBoardRect = this.elementRef.nativeElement.children[0].getBoundingClientRect();
        const gameBoardHeight = gameBoardRect.height;
        this.gridGap = (gameBoardHeight / 12) / this.gameSize;
        this.changeDectectorRef.detectChanges();
        this.readyToAcceptPositions = true;
    }

    onTilePositionRetrieved(index: number, position: Position): void {
        this.tileArray[index].position = position;
    }

    onTileClick(tileIndex: number): void {
        if (this.lockTiles || this.isOpponentBoard) {
            return;
        }

        const emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        const coordinateDifferenceX = Math.abs(this.tileArray[tileIndex].coordinates.x - this.tileArray[emptySpaceTileIndex].coordinates.x);
        const coordinateDifferenceY = Math.abs(this.tileArray[tileIndex].coordinates.y - this.tileArray[emptySpaceTileIndex].coordinates.y);
        if (coordinateDifferenceX + coordinateDifferenceY !== 1) {
            return;
        }

        const currentPuzzleEmptySpaceIndex = this.getCurrentPuzzleEmptySpaceIndex();

        this.currentPuzzle[currentPuzzleEmptySpaceIndex] = this.currentPuzzle[this.tileArray[tileIndex].currentPuzzleIndex];
        this.currentPuzzle[this.tileArray[tileIndex].currentPuzzleIndex] = ' ';

        this.checkPuzzle();

        const move = new Move(this.currentPuzzle, tileIndex);
        this.move.emit(move);

        this.moveTileToEmptySpace(tileIndex);
    }

    getCurrentPuzzleEmptySpaceIndex(): number {
        for (let i = 0; i < this.currentPuzzle.length; i++) {
            if (this.currentPuzzle[i] === ' ') {
                return i;
            }
        }
    }

    getGridStyle(): object {
        const gridTemplateColumns = `repeat(${this.gameSize}, 1fr)`;
        const gridGap = `${this.gridGap}px`;
        const gridStyle = {
            'grid-template-columns': gridTemplateColumns,
            'grid-gap': gridGap
        };
        return gridStyle;
    }

    moveTileToEmptySpace(tileIndex: number): void {
        const emptySpace = this.getEmptySpace();
        const tile = this.getTile(tileIndex);
        this.setTile(tileIndex, emptySpace);
        this.setEmptySpace(tile);
    }

    getEmptySpaceTileIndex(): number {
        // TODO: It's confusing to keep track of multiple types of indexes (animation and current puzzle state)
        // Should be solved in the DDD rewrite
        const emptySpaceTileIndex = this.tileArray.length - 1;
        return emptySpaceTileIndex;
    }

    getEmptySpace(): Tile {
        const emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        const emptySpacePosition = this.getTile(emptySpaceTileIndex);
        return emptySpacePosition;
    }

    setEmptySpace(tile: Tile): void {
        const emptySpaceTileIndex = this.getEmptySpaceTileIndex();
        this.setTile(emptySpaceTileIndex, tile);
    }

    getTile(tileIndex: number): Tile {
        const tile = this.tileArray[tileIndex];
        return tile;
    }

    setTile(tileIndex: number, tile: Tile): void {
        const newTile = {
            position: new Position(tile.position.x, tile.position.y),
            coordinates: new Position(tile.coordinates.x, tile.coordinates.y),
            currentPuzzleIndex: tile.currentPuzzleIndex
        };
        this.tileArray[tileIndex] = newTile;
    }

    onTileStartedMoving(): void {
        this.tileStartedMoving.emit();
    }

    onTileStoppedMoving(): void {
        this.tileStoppedMoving.emit();
    }

    createKey(wordList: string[]): string[] {
        const wordString = wordList.join('').replace(/\s/g, '');
        const key = wordString.split('');
        key.push(' ');
        return key;
    }

    checkPuzzle(): void {
        // Detect win here to freeze the browser until server confirms
        for (let i = 0; i < this.currentPuzzle.length; i++) {
            if (this.currentPuzzle[i] !== this.puzzleKey[i]) {
                return;
            }
        }
        this.lockTiles = true;
    }
}
