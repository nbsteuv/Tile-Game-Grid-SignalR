import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { HttpService } from './http-service';
import { UserHttpService } from './user-http-service';
import { UserService } from './user-service';

describe('UserService', () => {
	const mockRouter = jasmine.createSpyObj([ 'navigate' ]);
	const mockHttpService = jasmine.createSpyObj([ 'post' ]);
	const loginUrl = '/users/login';
	beforeEach(
		async(() => {
			mockRouter.navigate.calls.reset();
			mockHttpService.post.calls.reset();
			TestBed.configureTestingModule({
				providers: [
					UserService,
					{ provide: Router, useValue: mockRouter },
					{ provide: HttpService, useValue: mockHttpService },
					UserHttpService
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

	describe('canActivate', () => {
		let userService;
		beforeEach(
			async(() => {
				mockRouter.navigate.calls.reset();
				mockHttpService.post.calls.reset();
				userService = TestBed.get(UserService);
			})
		);

		it('should allow access to the route if check access endpoint returns true', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(result).toEqual(true));
		});

		it('should set isLoggedIn to true if check access endpoint returns true', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should not redirect if check access endpoint returns true', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});

		it('should not allow access to the route if check access endpoint returns an error', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(result).toEqual(false));
		});

		it('should not set isLoggedIn to true if check access endpoint returns an error', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should redirect to the login route if the check access endpoint returns an error', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ loginUrl ]));
		});
	});

	describe('registration', () => {
		let userService;
		beforeEach(
			async(() => {
				mockRouter.navigate.calls.reset();
				mockHttpService.post.calls.reset();
				userService = TestBed.get(UserService);
			})
		);

		it('should set isLoggedIn to true on registration success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should redirect to the home page on registration success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to true on registration failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should not redirect on registration failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => {}, (error) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});
	});

	describe('login', () => {
		let userService;
		beforeEach(
			async(() => {
				mockRouter.navigate.calls.reset();
				mockHttpService.post.calls.reset();
				userService = TestBed.get(UserService);
			})
		);

		it('should set isLoggedIn to true on login success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should redirect to the home page on login success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to true on login failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should not redirect on login failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => {}, (error) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});
	});

	describe('logout', () => {
		let userService;
		beforeEach(
			async(() => {
				mockRouter.navigate.calls.reset();
				mockHttpService.post.calls.reset();

				mockHttpService.post.and.returnValue(of(true));
				userService = TestBed.get(UserService);
				const user = { username: 'testUser' };
				userService.login(user);

				mockRouter.navigate.calls.reset();
				mockHttpService.post.calls.reset();
			})
		);

		it('should set isLoggedIn to false on logout success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should redirect to the home page on logout success', () => {
			// Arrange
			mockHttpService.post.and.returnValue(of(true));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to false on logout failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should not redirect on logout failure', () => {
			// Arrange
			mockHttpService.post.and.returnValue(throwError('Test Error'));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => {}, (error) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});
	});
});
