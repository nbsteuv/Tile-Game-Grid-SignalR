import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';

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
    movingTiles: number = 0;
    winCondition: boolean = false;

    gameStatus = {
        noGame: GameStatus.NoGame,
        ready: GameStatus.Ready,
        waiting: GameStatus.Waiting,
        watching: GameStatus.Watching,
        disconnected: GameStatus.Disconnected,
        win: GameStatus.Win,
        lose: GameStatus.Lose
    }

    constructor(private connectionService: ConnectionService) { }

    ngOnInit(): void {
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
        )

        this.connectionService.getPlayerMoveChanges().subscribe(
            data => {
                this.incomingMove = data;
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
        );

        this.connectionService.getPlayerWinChanges().subscribe(
            data => {
                console.log(data);
                this.playerGameStatus = GameStatus.Lose
            },
            err => {
                console.log(err);
            }
        );
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
        //TODO: Put all cosmetic variables like delays and transition speeds into separate constants file for quick adjustment
        if (this.winCondition && this.movingTiles === 0) {
            interval(500).subscribe(() => {
                this.playerGameStatus = GameStatus.Win;
            });
        }
    }

}