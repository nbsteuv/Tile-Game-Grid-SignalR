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
    private winConfirmedSource: Subject<void> = new Subject<void>();

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

        this.hubConnection.on('WinConfirmed', () => {
            console.log('You win');
            this.winConfirmed();
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

    getWinConfirmedChanges(): Subject<void>{
        return this.winConfirmedSource;
    }

    setStatus(status: GameStatus): void{
        this.statusSource.next(status);
    }

    startGame(puzzleArray: string[], wordList: string[]): void{
        this.puzzleSource.next(puzzleArray);
        this.wordListSource.next(wordList);
    }

    winConfirmed(): void {
        this.winConfirmedSource.next();
    }

}