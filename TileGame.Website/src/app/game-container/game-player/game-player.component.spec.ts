import { TestBed, async } from '@angular/core/testing';

import { GamePlayerComponent } from './game-player.component';
import { MoveCounterComponent } from '../move-counter/move-counter.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { WordDisplayComponent } from '../word-display/word-display.component';
import { TimerComponent } from '../timer/timer.component';
import { WinScreenComponent } from '../win-screen/win-screen.component';
import { LoseScreenComponent } from '../lose-screen/lose-screen.component';
import { GameTileComponent } from '../game-board/game-tile/game-tile.component';

describe('GamePlayerComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					GamePlayerComponent,
					MoveCounterComponent,
					GameBoardComponent,
					WordDisplayComponent,
					TimerComponent,
					WinScreenComponent,
					LoseScreenComponent,
					GameTileComponent
				]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(GamePlayerComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
