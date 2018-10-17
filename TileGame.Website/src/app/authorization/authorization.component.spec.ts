import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthorizationComponent } from './authorization.component';

describe('AuthorizationComponent', () => {
	const mockRouter = jasmine.createSpyObj([ 'navigate' ]);
	beforeEach(
		async(() => {
			mockRouter.navigate.calls.reset();
			TestBed.configureTestingModule({
				declarations: [ AuthorizationComponent ],
				providers: [ { provide: Router, useValue: mockRouter } ]
			});
		})
	);

	it('should exist', () => {
		async(() => {
			const fixture = TestBed.createComponent(AuthorizationComponent);
			expect(fixture.debugElement.componentInstance).toBeTruthy();
		});
	});

	it('should call navigate on the router with the path provided', () => {
		// Arrange
		const component = new AuthorizationComponent(mockRouter);
		const testPath = 'testpath';

		// Act
		component.navigateTo(testPath);

		// Assert
		expect(mockRouter.navigate).toHaveBeenCalledWith([ testPath ]);
	});
});
