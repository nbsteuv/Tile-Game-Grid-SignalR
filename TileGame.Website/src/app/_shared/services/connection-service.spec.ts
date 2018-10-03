// import { TestBed, async } from '@angular/core/testing';
// import { InjectionToken } from '@angular/core';

// import { ConnectionService } from './connection-service';

// const SIGNALR_TOKEN = new InjectionToken('signalR', {
// 	factory: () => ''
// });

// function signalRFactory() {
// 	return {
// 		HubConnectionBuilder: () => {
// 			return {
// 				withUrl: (url) => {
// 					return {
// 						build: () => {}
// 					};
// 				}
// 			};
// 		}
// 	};
// }

// export const SIGNALR_PROVIDER = [ { provide: SIGNALR_TOKEN, useFactory: signalRFactory } ];

// describe('ConnectionService', () => {
// 	beforeEach(
// 		async(() => {
// 			TestBed.configureTestingModule({
// 				providers: [ SIGNALR_PROVIDER, ConnectionService ]
// 			});
// 		})
// 	);

// 	it('should exist', () => {
// 		const connectionService = TestBed.get(ConnectionService);
// 		expect(connectionService).toBeTruthy();
// 	});
// });
