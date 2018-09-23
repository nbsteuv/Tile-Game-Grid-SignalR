import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AuthorizationModule } from './authorization/authorization.module';

import { HttpService, SIGNALR_PROVIDER, ConnectionService } from './_shared/services';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GameContainerComponent } from './game-container/game-container.component';
import { WordDisplayComponent } from './game-container/word-display/word-display.component';
import { TimerComponent } from './game-container/timer/timer.component';
import { MoveCounterComponent } from './game-container/move-counter/move-counter.component';
import { MenuComponent } from './game-container/menu/menu.component';
import { GameBoardComponent } from './game-container/game-board/game-board.component';
import { GameTileComponent } from './game-container/game-board/game-tile/game-tile.component';
import { GamePlayerComponent } from './game-container/game-player/game-player.component';
import { WinScreenComponent } from './game-container/win-screen/win-screen.component';
import { LoseScreenComponent } from './game-container/lose-screen/lose-screen.component';
import { GameWatcherComponent } from './game-container/game-watcher/game-watcher.component';

describe('AppComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					AppComponent,
					NavbarComponent,
					GameContainerComponent,
					WordDisplayComponent,
					TimerComponent,
					MoveCounterComponent,
					MenuComponent,
					GameBoardComponent,
					GameTileComponent,
					GamePlayerComponent,
					WinScreenComponent,
					LoseScreenComponent,
					GameWatcherComponent
				],
				imports: [
					// Angular Modules
					BrowserModule,
					FormsModule,
					HttpClientModule,
					BrowserAnimationsModule,

					// Custom Modules
					AppRoutingModule,
					AuthorizationModule,
					FormsModule
				],
				providers: [
					HttpService,
					SIGNALR_PROVIDER,
					ConnectionService,
					{ provide: APP_BASE_HREF, useValue: '/' }
				]
			}).compileComponents();
		})
	);
	it(
		'should create the app',
		async(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.debugElement.componentInstance;
			expect(app).toBeTruthy();
		})
	);
});
