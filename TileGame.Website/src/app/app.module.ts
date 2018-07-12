import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorizationModule } from './authorization/authorization.module';
import { AppRoutingModule } from './app.routing';

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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameContainerComponent,
    WordDisplayComponent,
    TimerComponent,
    MoveCounterComponent,
    MenuComponent,
    GameTileComponent,
    GameBoardComponent,
    GamePlayerComponent,
    WinScreenComponent,
    LoseScreenComponent,
    GameWatcherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthorizationModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    SIGNALR_PROVIDER,
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
