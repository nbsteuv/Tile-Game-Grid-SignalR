import { TestBed, async } from '@angular/core/testing';

import { UserHttpService } from './user-http-service';
import { HttpService } from './http-service';

fdescribe('UserHttpService', () => {
	const mockHttpService = {};
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ UserHttpService, { provide: HttpService, useValue: mockHttpService } ]
			});
		})
	);

	it('should exist', () => {
		const userHttpService = TestBed.get(UserHttpService);
		expect(userHttpService).toBeTruthy();
	});
});
