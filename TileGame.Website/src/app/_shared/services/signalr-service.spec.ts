// import { TestBed, async } from '@angular/core/testing';
// import { InjectionToken } from '@angular/core';

// import { SignalrService } from './signalr-service';

// const SIGNALR_TOKEN = new InjectionToken('signalR');

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

// describe('ConnectionService', () => {
// 	beforeEach(
// 		async(() => {
// 			TestBed.configureTestingModule({
// 				providers: [ { provide: SIGNALR_TOKEN, useFactory: signalRFactory }, SignalrService ]
// 			});
// 		})
// 	);

// 	it('should exist', () => {
// 		const connectionService = TestBed.get(SignalrService);
// 		expect(connectionService).toBeTruthy();
// 	});
// });