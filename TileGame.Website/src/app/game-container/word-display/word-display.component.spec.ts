import { TestBed, async } from '@angular/core/testing';

import { WordDisplayComponent } from './word-display.component';

describe('WordDisplayComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ WordDisplayComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(WordDisplayComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
