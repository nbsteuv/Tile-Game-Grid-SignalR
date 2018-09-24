import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ConnectionService } from '../_shared/services';

import { GameContainerComponent } from './game-container.component';
import { MenuComponent } from './menu/menu.component';
import { GamePlayerComponent } from './game-player/game-player.component';
import { MoveCounterComponent } from './move-counter/move-counter.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { TimerComponent } from './timer/timer.component';
import { WinScreenComponent } from './win-screen/win-screen.component';
import { LoseScreenComponent } from './lose-screen/lose-screen.component';
import { GameTileComponent } from './game-board/game-tile/game-tile.component';

describe('GameContainerComponent', () => {
	const mockConnectionService = {};

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					GameContainerComponent,
					MenuComponent,
					GamePlayerComponent,
					MoveCounterComponent,
					GameBoardComponent,
					WordDisplayComponent,
					TimerComponent,
					WinScreenComponent,
					LoseScreenComponent,
					GameTileComponent
				],
				imports: [ FormsModule ],
				providers: [ { provide: ConnectionService, useValue: mockConnectionService } ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(GameContainerComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
