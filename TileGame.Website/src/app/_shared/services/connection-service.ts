import {Injectable, Inject} from '@angular/core';
import {Subject} from 'rxjs';

import {SIGNALR_TOKEN} from './signalr-provider'
import {HubConnection} from '@aspnet/signalr';
import {environment} from '../../../environments/environment';

import {GameOptions} from '../types';
import {GameStatus} from '../enums';

@Injectable()
export class ConnectionService {

    private hubConnection: HubConnection;
    private baseUrl: string = environment.baseUrl;
    private statusChanges: Subject<GameStatus> = new Subject<GameStatus>();
    private puzzleChanges: Subject<string[]> = new Subject<string[]>();
    private wordListChanges: Subject<string[]> = new Subject<string[]>();

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

    getStatusChanges(): Subject<GameStatus>{
        return this.statusChanges;
    }

    getPuzzleChanges(): Subject<string[]>{
        return this.puzzleChanges;
    }

    getWordListChanges(): Subject<string[]>{
        return this.wordListChanges;
    }

    setStatus(status: GameStatus): void{
        this.statusChanges.next(status);
    }

    startGame(puzzleArray: string[], wordList: string[]){
        this.puzzleChanges.next(puzzleArray);
        this.wordListChanges.next(wordList);
    }

}