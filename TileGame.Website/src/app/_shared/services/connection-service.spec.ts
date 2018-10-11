import { TestBed, async } from '@angular/core/testing';

import { ConnectionService } from './connection-service';

import { SIGNALR_TOKEN } from './signalr-provider';

function signalRFactory() {
	return {
		HubConnectionBuilder: () => {
			return {
				withUrl: (url) => {
					return {
						build: () => {
							return {
								on: () => {}
							};
						}
					};
				}
			};
		}
	};
}

export const SIGNALR_PROVIDER = [ { provide: SIGNALR_TOKEN, useFactory: signalRFactory } ];

describe('ConnectionService', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ SIGNALR_PROVIDER, ConnectionService ]
			});
		})
	);

	it('should exist', () => {
		const connectionService = TestBed.get(ConnectionService);
		expect(connectionService).toBeTruthy();
	});
});
