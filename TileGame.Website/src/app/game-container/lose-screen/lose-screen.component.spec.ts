import { TestBed, async } from '@angular/core/testing';

import { LoseScreenComponent } from './lose-screen.component';

describe('LoseScreenComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ LoseScreenComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(LoseScreenComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
