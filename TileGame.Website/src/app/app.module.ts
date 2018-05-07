import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AuthorizationModule} from './authorization/authorization.module';
import {AppRoutingModule} from './app.routing';

import {HttpService, SIGNALR_PROVIDER, ConnectionService} from './_shared/services';

import {AppComponent} from './app.component';
import {GameContainerComponent} from './game-container/game-container.component';
import {MenuComponent} from './game-container/menu/menu.component';
import {GameBoardComponent} from './game-container/game-board/game-board.component';
import {GameTileComponent} from './game-container/game-board/game-tile/game-tile.component';
import {GamePlayerComponent} from './game-container/game-player/game-player.component';


@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent,
    MenuComponent,
    GameTileComponent,
    GameBoardComponent,
    GamePlayerComponent
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
