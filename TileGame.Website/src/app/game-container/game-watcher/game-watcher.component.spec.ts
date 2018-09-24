import { TestBed, async } from '@angular/core/testing';

import { GameWatcherComponent } from './game-watcher.component';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameTileComponent } from '../game-board/game-tile/game-tile.component';

describe('GameWatcherComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ GameWatcherComponent, WordDisplayComponent, GameBoardComponent, GameTileComponent ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(GameWatcherComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
