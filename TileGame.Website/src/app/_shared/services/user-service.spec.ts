import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HttpService } from './http-service';
import { UserService } from './user-service';

describe('UserService', () => {
	const mockRouter = {};
	const mockHttpService = {};
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [
					UserService,
					{ provide: Router, useValue: mockRouter },
					{ provide: HttpService, useValue: mockHttpService }
				]
			});
		})
	);

	it('should exist', () => {
		const userService = TestBed.get(UserService);
		expect(userService).toBeTruthy();
	});
});
