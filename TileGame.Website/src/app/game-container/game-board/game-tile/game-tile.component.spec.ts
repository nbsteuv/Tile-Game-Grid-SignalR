import { TestBed, async } from '@angular/core/testing';
import { AnimationBuilder } from '@angular/animations';

import { GameTileComponent } from './game-tile.component';

describe('GameTileComponent', () => {
	const mockAnimationBuilder = {};
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ GameTileComponent ],
				providers: [ { provide: AnimationBuilder, useValue: mockAnimationBuilder } ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(GameTileComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
