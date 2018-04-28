import {Injectable, Inject} from '@angular/core';

import {SIGNALR_TOKEN} from './signalr-provider'
import {HubConnection} from '@aspnet/signalr';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConnectionService {

    private hubConnection: HubConnection;
    baseUrl: string = environment.baseUrl;

    constructor(@Inject(SIGNALR_TOKEN) private signalR: any) {
        this.init();
    }

    init() {
        this.hubConnection = new this.signalR.HubConnection(`${this.baseUrl}/hubs/game`);

        this.hubConnection.on('SetStatus', status => {
            console.log('Status set to: ' + status);
        });

        this.hubConnection.on('StartGame', puzzleArray => {
            console.log('Starting game');
            puzzleArray.forEach(letter => console.log(letter));
        });
    }

    startConnection() {
        console.log('starting connection');
        this.hubConnection.start().then(() => {
            this.makeConnection();
        });
    }

    makeConnection() {
        var password = '';
        this.hubConnection.send('MakeConnection', password, 1, 4);
    }

}