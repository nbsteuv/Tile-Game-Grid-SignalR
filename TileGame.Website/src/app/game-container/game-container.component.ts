import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';

import { UserService, ConnectionService } from '../_shared/services';
import { GameOptions, Move } from '../_shared/types';
import { GameStatus } from '../_shared/enums';

@Component({
    selector: 'nbs-game-container',
    templateUrl: './game-container.component.html'
})
export class GameContainerComponent implements OnInit {

    currentGameStatus: GameStatus = GameStatus.NoGame;
    puzzleArray: string[] = [];
    wordList: string[] = [];
    movingTiles: number = 0;
    winCondition: boolean = false;

    gameStatus = {
        noGame: GameStatus.NoGame,
        ready: GameStatus.Ready,
        waiting: GameStatus.Waiting,
        watching: GameStatus.Watching,
        win: GameStatus.Win
    }

    constructor(private userService: UserService, private connectionService: ConnectionService) { }

    ngOnInit(): void {
        this.connectionService.getStatusChanges().subscribe(
            data => {
                console.log('Status changed to ' + data);
                this.currentGameStatus = data;
            },
            err => {
                console.log(err);
            }
        )

        this.connectionService.getPuzzleChanges().subscribe(
            data => {
                console.log('Puzzle array:');
                console.log(data);
                this.puzzleArray = data;
            },
            err => {
                console.log(err);
            }
        )

        this.connectionService.getWordListChanges().subscribe(
            data => {
                console.log('Word list:');
                console.log(data);
                this.wordList = data;
            },
            err => {
                console.log(err);
            }
        )

        this.connectionService.getWinConfirmedChanges().subscribe(
            data => {
                this.winCondition = true;
            },
            err => {
                console.log(err);
            }
        )
    }

    logout(): void {
        this.userService.logout().subscribe(data => console.log(data));
    }

    connect(gameOptions: GameOptions): void {
        this.connectionService.startConnection(gameOptions);
    }

    onGameOptionsSubmitted(gameOptions: GameOptions): void {
        this.connect(gameOptions);
    }

    onMove(move: Move): void {
        this.connectionService.move(move);
    }

    onTileStartedMoving(): void {
        this.movingTiles++;
    }

    onTileStoppedMoving(): void {
        this.movingTiles--;
        //TODO: Put all cosmetic variables like delays and transition speeds into separate constants file for quick adjustment
        if (this.winCondition && this.movingTiles === 0) {
            interval(500).subscribe(() => {
                this.currentGameStatus = GameStatus.Win;
            });
        }
    }

}