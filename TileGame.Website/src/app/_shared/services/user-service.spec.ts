import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { HttpService } from './http-service';
import { UserService } from './user-service';

describe('UserService', () => {
	const mockRouter = jasmine.createSpyObj([ 'navigate' ]);
	const mockHttpService = jasmine.createSpyObj([ 'post' ]);
	const checkAccessUrl = '/api/account/checkaccess'; // TODO: Put endpoints in application constants to avoid repetition of strings
	const loginUrl = '/users/login';
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

	it('should show the user is not logged in when first created', () => {
		// Arrange
		const userService = TestBed.get(UserService);

		// Act
		const isLoggedIn = userService.isLoggedIn();

		// Assert
		const expectedIsLoggedIn = false;
		expect(isLoggedIn).toEqual(expectedIsLoggedIn);
	});

	it('should call the check access endpoint when canActivate is called', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		expect(mockHttpService.post).toHaveBeenCalledWith(checkAccessUrl);
	});

	it('should allow access to the route if check access endpoint returns true', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(result).toEqual(true));
	});

	it('should set isLoggedIn to true if check access endpoint returns true', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
	});

	it('should not redirect if check access endpoint returns true', () => {
		// Arrange
		mockHttpService.post.and.returnValue(of(true));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(mockRouter.navigate).not.toHaveBeenCalled());
	});

	it('should not allow access to the route if check access endpoint returns an error', () => {
		// Arrange
		mockHttpService.post.and.returnValue(throwError('Test error'));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(result).toEqual(false));
	});

	it('should not set isLoggedIn to true if check access endpoint returns an error', () => {
		// Arrange
		mockHttpService.post.and.returnValue(throwError('Test Error'));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(false));
	});

	it('should redirect to the login route if the check access endpoint returns an error', () => {
		// Arrange
		mockHttpService.post.and.returnValue(throwError('Test Error'));
		const userService = TestBed.get(UserService);

		// Act
		const canActivate = userService.canActivate({}, { url: '/test' });

		// Assert
		canActivate.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ loginUrl ]));
	});
});
