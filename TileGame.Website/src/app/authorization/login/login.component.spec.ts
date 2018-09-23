import { TestBed, async } from '@angular/core/testing';
import { Directive } from '@angular/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ LoginComponent, NgFormDirectiveStub ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});

@Directive({
	selector: '[ngForm]'
})
export class NgFormDirectiveStub {}
