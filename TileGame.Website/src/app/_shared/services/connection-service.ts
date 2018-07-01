import {Injectable, Inject} from '@angular/core';
import {Subject} from 'rxjs';

import {SIGNALR_TOKEN} from './signalr-provider'
import {HubConnection} from '@aspnet/signalr';
import {environment} from '../../../environments/environment';

import {GameOptions, Move} from '../types';
import {GameStatus} from '../enums';

@Injectable()
export class ConnectionService {

    private hubConnection: HubConnection;
    private baseUrl: string = environment.baseUrl;
    private statusSource: Subject<GameStatus> = new Subject<GameStatus>();
    private puzzleSource: Subject<string[]> = new Subject<string[]>();
    private wordListSource: Subject<string[]> = new Subject<string[]>();
    private playerMoveSource: Subject<number[]> = new Subject<number[]>();
    private winConfirmedSource: Subject<void> = new Subject<void>();
    private playerWinSource: Subject<string> = new Subject<string>();

    constructor(@Inject(SIGNALR_TOKEN) private signalR: any) {
        this.init();
    }

    init(): void{
        this.hubConnection = new this.signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/hubs/game`)
        .build();

        this.hubConnection.on('SetStatus', status => {
            console.log('Status set to: ' + status);
            this.setStatus(status);
        });

        this.hubConnection.on('StartGame', (puzzleArray, wordList) => {
            console.log('Starting game');
            this.startGame(puzzleArray, wordList);
        });

        this.hubConnection.on('PlayerMove', (moveHistory) => {
            console.log('Player move');
            this.playerMove(moveHistory);
        })

        this.hubConnection.on('WinConfirmed', () => {
            console.log('You win');
            this.winConfirmed();
        });

        this.hubConnection.on('PlayerWin', username => {
            console.log('Other player win');
            this.playerWin(username);
        });
    }

    startConnection(gameOptions: GameOptions): void{
        console.log('starting connection');
        this.hubConnection.stop().then(() => {
            this.hubConnection.start().then(() => {
                this.makeConnection(gameOptions);
            });
        });
    }

    makeConnection(gameOptions: GameOptions): void{
        this.hubConnection.send('MakeConnection', gameOptions.password, gameOptions.gameType, gameOptions.gameSize);
    }

    move(move: Move): void{
        this.hubConnection.send('Move', move);
    }

    getStatusChanges(): Subject<GameStatus>{
        return this.statusSource;
    }

    getPuzzleChanges(): Subject<string[]>{
        return this.puzzleSource;
    }

    getWordListChanges(): Subject<string[]>{
        return this.wordListSource;
    }

    getPlayerMoveChanges(): Subject<number[]>{
        return this.playerMoveSource;
    }

    getWinConfirmedChanges(): Subject<void>{
        return this.winConfirmedSource;
    }

    getPlayerWinChanges(): Subject<string>{
        return this.playerWinSource;
    }

    setStatus(status: GameStatus): void{
        this.statusSource.next(status);
    }

    startGame(puzzleArray: string[], wordList: string[]): void{
        this.setStatus(GameStatus.Ready);
        this.puzzleSource.next(puzzleArray);
        this.wordListSource.next(wordList);
    }

    playerMove(moveHistory: number[]): void{
        this.playerMoveSource.next(moveHistory);
    }

    winConfirmed(): void {
        this.winConfirmedSource.next();
    }

    playerWin(username: string){
        this.playerWinSource.next(username);
    }

}