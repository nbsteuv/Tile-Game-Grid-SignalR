import { TestBed, async } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';

describe('AuthorizationComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ AuthorizationComponent ]
			});
		})
	);

	it('should exist', () => {
		async(() => {
			const fixture = TestBed.createComponent(AuthorizationComponent);
			expect(fixture.debugElement.componentInstance).toBeTruthy();
		});
	});
});
