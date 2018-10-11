import { TestBed, async } from '@angular/core/testing';

import { SignalrService } from './signalr-service';

import { SIGNALR_TOKEN } from './signalr-provider';

function signalRFactory() {
	return {
		HubConnectionBuilder: () => {
			return {
				withUrl: (url) => {
					return {
						build: () => {
							return {
								testProperty: 'Test123'
							};
						}
					};
				}
			};
		}
	};
}

describe('SignalrService', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ { provide: SIGNALR_TOKEN, useFactory: signalRFactory }, SignalrService ]
			});
		})
	);

	it('should exist', () => {
		const signalrService = TestBed.get(SignalrService);
		expect(signalrService).toBeTruthy();
	});

	it('should return HubConnection instance', () => {
		const signalrService = TestBed.get(SignalrService);
		const hubConnection = signalrService.getHubConnection();
		expect(hubConnection.testProperty).toEqual('Test123');
	});
});
