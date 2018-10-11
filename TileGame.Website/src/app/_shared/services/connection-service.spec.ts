import { TestBed, async } from '@angular/core/testing';

import { ConnectionService } from './connection-service';
import { SignalrService } from './signalr-service';

describe('ConnectionService', () => {
	const mockSignalrService = jasmine.createSpyObj([ 'getHubConnection' ]);
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ ConnectionService, { provide: SignalrService, useValue: mockSignalrService } ]
			});
		})
	);

	it('should exist', () => {
		mockSignalrService.getHubConnection.and.returnValue({ on: () => {} });
		const connectionService = TestBed.get(ConnectionService);
		expect(connectionService).toBeTruthy();
	});
});
