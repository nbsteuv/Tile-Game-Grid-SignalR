import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AuthorizationModule} from './authorization/authorization.module';
import {AppRoutingModule} from './app.routing';

import {HttpService, SIGNALR_PROVIDER, ConnectionService} from './_shared/services';

import {AppComponent} from './app.component';
import {GameContainerComponent} from './game/game-container.component';


@NgModule({
  declarations: [
    AppComponent,
    GameContainerComponent
  ],
  imports: [
    BrowserModule,
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
