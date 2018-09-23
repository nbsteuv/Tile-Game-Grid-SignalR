import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../_shared/services';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	const mockUserService = {};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ LoginComponent ],
				imports: [ FormsModule ],
				providers: [ { provide: UserService, useValue: mockUserService } ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
