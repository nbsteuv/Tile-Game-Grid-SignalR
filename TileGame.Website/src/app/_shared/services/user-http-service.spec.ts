import { TestBed, async } from '@angular/core/testing';

import { of } from 'rxjs';

import { UserHttpService } from './user-http-service';
import { HttpService } from './http-service';

describe('UserHttpService', () => {
	const mockHttpService = jasmine.createSpyObj([ 'post' ]);
	const checkAccessApiUrl = '/api/account/checkaccess'; // TODO: Put endpoints in application constants to avoid repetition of strings
	const registerApiUrl = '/api/account/register';
	const loginApiUrl = '/api/account/login';
	const logoutApiUrl = '/api/account/logout';
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

	it('should call the check access endpoint when checkAccess is called', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userHttpService = TestBed.get(UserHttpService);

		// Act
		const checkAccess = userHttpService.checkAccess();

		// Assert
		expect(mockHttpService.post).toHaveBeenCalledWith(checkAccessApiUrl);
	});

	it('should call registration endpoint and pass created user object', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userHttpService = TestBed.get(UserHttpService);
		const user = { username: 'testUser' };

		// Act
		const register = userHttpService.register(user);

		// Assert
		register.subscribe((result) => expect(mockHttpService.post).toHaveBeenCalledWith(registerApiUrl, user));
	});

	it('should call login endpoint and pass created user object', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userHttpService = TestBed.get(UserHttpService);
		const user = { username: 'testUser' };

		// Act
		const login = userHttpService.login(user);

		// Assert
		login.subscribe((result) => expect(mockHttpService.post).toHaveBeenCalledWith(loginApiUrl, user));
	});

	it('should call logout endpoint when logout method is called', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userHttpService = TestBed.get(UserHttpService);

		// Act
		const logout = userHttpService.logout();

		// Assert
		logout.subscribe((result) => expect(mockHttpService.post).toHaveBeenCalledWith(logoutApiUrl));
	});
});
