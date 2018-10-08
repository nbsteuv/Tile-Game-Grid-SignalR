import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http-service';

describe('HttpService', () => {
	const mockHttpClient = {};
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ HttpService, { provide: HttpClient, useValue: mockHttpClient } ]
			});
		})
	);

	it('should exist', () => {
		const httpService = TestBed.get(HttpService);
		expect(httpService).toBeTruthy();
	});
});
