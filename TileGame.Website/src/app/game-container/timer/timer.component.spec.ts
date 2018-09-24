import { TestBed, async } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ TimerComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(TimerComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
