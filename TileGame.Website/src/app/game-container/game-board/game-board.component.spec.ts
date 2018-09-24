import { TestBed, async } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameTileComponent } from './game-tile/game-tile.component';

describe('GameBoardComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ GameBoardComponent, GameTileComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(GameBoardComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
