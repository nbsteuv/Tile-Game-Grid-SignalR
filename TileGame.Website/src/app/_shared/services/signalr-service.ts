import { Injectable, Inject } from '@angular/core';

import { SIGNALR_TOKEN } from './signalr-provider';
import { HubConnection } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable()
export class SignalrService {
	private hubConnection: HubConnection;
	private baseUrl: string = environment.baseUrl;

	constructor(@Inject(SIGNALR_TOKEN) private signalR: any) {
		this.init();
	}

	init(): void {
		this.hubConnection = new this.signalR.HubConnectionBuilder().withUrl(`${this.baseUrl}/hubs/test`).build();
	}

	getHubConnection() {
		return this.hubConnection;
	}
}
