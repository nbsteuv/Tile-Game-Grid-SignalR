import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../_shared/services';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
	const mockUserService = {};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ SignupComponent ],
				imports: [ FormsModule ],
				providers: [ { provide: UserService, useValue: mockUserService } ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(SignupComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
