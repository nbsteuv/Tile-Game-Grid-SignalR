import { TestBed, async } from '@angular/core/testing';

import { MoveCounterComponent } from './move-counter.component';

describe('MoveCounterComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ MoveCounterComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(MoveCounterComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
