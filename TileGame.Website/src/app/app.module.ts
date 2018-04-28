import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AuthorizationModule} from './authorization/authorization.module';
import {AppRoutingModule} from './app.routing';

import {HttpService, SIGNALR_PROVIDER, ConnectionService} from './_shared/services';

import {AppComponent} from './app.component';
import {GameContainerComponent} from './game-container/game-container.component';
import {MenuComponent} from './game-container/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
