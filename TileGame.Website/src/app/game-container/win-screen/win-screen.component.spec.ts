import { TestBed, async } from '@angular/core/testing';

import { WinScreenComponent } from './win-screen.component';

describe('WinScreenComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ WinScreenComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(WinScreenComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
