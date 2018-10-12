import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { UserHttpService } from './user-http-service';
import { UserService } from './user-service';

describe('UserService', () => {
	const mockRouter = jasmine.createSpyObj([ 'navigate' ]);
	const mockUserHttpService = jasmine.createSpyObj([ 'checkAccess', 'register', 'login', 'logout' ]);
	const loginUrl = '/users/login';
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [
					UserService,
					{ provide: Router, useValue: mockRouter },
					{ provide: UserHttpService, useValue: mockUserHttpService }
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
				userService = TestBed.get(UserService);
			})
		);

		it('should allow access to the route if check access endpoint returns true', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(of(true));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(result).toEqual(true));
		});

		it('should set isLoggedIn to true if check access endpoint returns true', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(of(true));
			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should not redirect if check access endpoint returns true', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(of(true));
			mockRouter.navigate.calls.reset();

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});

		it('should not allow access to the route if check access endpoint returns an error', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(throwError('Test Error'));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(result).toEqual(false));
		});

		it('should not set isLoggedIn to true if check access endpoint returns an error', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(throwError('Test Error'));

			// Act
			const canActivate = userService.canActivate({}, { url: '/test' });

			// Assert
			canActivate.subscribe((result) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should redirect to the login route if the check access endpoint returns an error', () => {
			// Arrange
			mockUserHttpService.checkAccess.and.returnValue(throwError('Test Error'));
			mockRouter.navigate.calls.reset();

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
				userService = TestBed.get(UserService);
			})
		);

		it('should set isLoggedIn to true on registration success', () => {
			// Arrange
			mockUserHttpService.register.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should redirect to the home page on registration success', () => {
			// Arrange
			mockUserHttpService.register.and.returnValue(of(true));
			mockRouter.navigate.calls.reset();
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to true on registration failure', () => {
			// Arrange
			mockUserHttpService.register.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const register = userService.register(user);

			// Assert
			register.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should not redirect on registration failure', () => {
			// Arrange
			mockUserHttpService.register.and.returnValue(throwError('Test Error'));
			mockRouter.navigate.calls.reset();
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
				userService = TestBed.get(UserService);
			})
		);

		it('should set isLoggedIn to true on login success', () => {
			// Arrange
			mockUserHttpService.login.and.returnValue(of(true));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should redirect to the home page on login success', () => {
			// Arrange
			mockUserHttpService.login.and.returnValue(of(true));
			mockRouter.navigate.calls.reset();
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to true on login failure', () => {
			// Arrange
			mockUserHttpService.login.and.returnValue(throwError('Test Error'));
			const user = { username: 'testUser' };

			// Act
			const login = userService.login(user);

			// Assert
			login.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should not redirect on login failure', () => {
			// Arrange
			mockUserHttpService.login.and.returnValue(throwError('Test Error'));
			mockRouter.navigate.calls.reset();
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
				mockUserHttpService.login.and.returnValue(of(true));
				userService = TestBed.get(UserService);
				const user = { username: 'testUser' };
				userService.login(user);
			})
		);

		it('should set isLoggedIn to false on logout success', () => {
			// Arrange
			mockUserHttpService.logout.and.returnValue(of(true));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => expect(userService.isLoggedIn()).toEqual(false));
		});

		it('should redirect to the home page on logout success', () => {
			// Arrange
			mockUserHttpService.logout.and.returnValue(of(true));
			mockRouter.navigate.calls.reset();

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => expect(mockRouter.navigate).toHaveBeenCalledWith([ '/' ]));
		});

		it('should not set isLoggedIn to false on logout failure', () => {
			// Arrange
			mockUserHttpService.logout.and.returnValue(throwError('Test Error'));

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => {}, (error) => expect(userService.isLoggedIn()).toEqual(true));
		});

		it('should not redirect on logout failure', () => {
			// Arrange
			mockUserHttpService.logout.and.returnValue(throwError('Test Error'));
			mockRouter.navigate.calls.reset();

			// Act
			const logout = userService.logout();

			// Assert
			logout.subscribe((result) => {}, (error) => expect(mockRouter.navigate).not.toHaveBeenCalled());
		});
	});
});
