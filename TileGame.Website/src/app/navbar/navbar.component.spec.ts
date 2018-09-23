import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserService } from '../_shared/services';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
	const mockUserService = {};
	const mockRouter = {
		navigate: jasmine.createSpy('navigate')
	};
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ NavbarComponent ],
				providers: [
					{ provide: UserService, useValue: mockUserService },
					{ provide: Router, useValue: mockRouter }
				]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(NavbarComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
