import { Component, OnInit } from '@angular/core';

import { of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UserService, ConnectionService } from '../_shared/services';
import { GameOptions, Move, IncomingMove } from '../_shared/types';
import { GameStatus, GameType } from '../_shared/enums';

@Component({
    selector: 'nbs-game-container',
    templateUrl: './game-container.component.html'
})
export class GameContainerComponent implements OnInit {

    currentGameStatus: GameStatus = GameStatus.NoGame;
    playerGameStatus: GameStatus = GameStatus.NoGame;
    currentGameType: GameType = GameType.Single;
    incomingMove: IncomingMove;
    puzzleArray: string[] = [];
    wordList: string[] = [];
    playerList: string[] = [];
    movingTiles = 0;
    winCondition = false;

    gameStatus = {
        noGame: GameStatus.NoGame,
        ready: GameStatus.Ready,
        waiting: GameStatus.Waiting,
        watching: GameStatus.Watching,
        disconnected: GameStatus.Disconnected,
        win: GameStatus.Win,
        lose: GameStatus.Lose
    };

    constructor(private connectionService: ConnectionService) { 
        console.log('Running constructor for game container');
    }

    ngOnInit(): void {
        console.log('Running ngOnInit of game container');
        this.connectionService.getStatusChanges().subscribe(
            data => {
                console.log('Status changed to ' + data);
                this.currentGameStatus = data;
                this.playerGameStatus = data;
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getPuzzleChanges().subscribe(
            data => {
                console.log('Puzzle array:');
                console.log(data);
                this.puzzleArray = data;
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getWordListChanges().subscribe(
            data => {
                console.log('Word list:');
                console.log(data);
                this.wordList = data.map(word => {
                    const cleanedWord = word.replace(' ', '');
                    return cleanedWord;
                });
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getPlayerListChanges().subscribe(
            data => {
                console.log('Player list:');
                console.log(data);
                this.playerList = data;
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getPlayerMoveChanges().subscribe(
            data => {
                this.incomingMove = data;
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getWinConfirmedChanges().subscribe(
            data => {
                this.winCondition = true;
            },
            err => {
                console.log(err);
            }
        );

        this.connectionService.getPlayerWinChanges().subscribe(
            data => {
                console.log(data);
                this.playerGameStatus = GameStatus.Lose;
            },
            err => {
                console.log(err);
            }
        );

        console.log('All subscriptions set up in game container');
    }

    connect(gameOptions: GameOptions): void {
        this.connectionService.startConnection(gameOptions);
    }

    onGameOptionsSubmitted(gameOptions: GameOptions): void {
        this.currentGameType = gameOptions.gameType;
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
        // TODO: Put all cosmetic variables like delays and transition speeds into separate constants file for quick adjustment
        if (this.winCondition && this.movingTiles === 0) {
            of(0).pipe(delay(300)).subscribe(() => {
                this.playerGameStatus = GameStatus.Win;
            });
        }
    }

    resetGame(): void {
        this.connectionService.stopConnection();
        this.currentGameStatus = GameStatus.NoGame;
        this.playerGameStatus = GameStatus.NoGame;
        this.incomingMove = null;
        this.puzzleArray = [];
        this.wordList = [];
        this.playerList = [];
        this.movingTiles = 0;
        this.winCondition = false;
    }

}
