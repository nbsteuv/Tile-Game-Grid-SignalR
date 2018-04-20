import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AuthorizationModule} from './authorization/authorization.module';
import {AppRoutingModule} from './app.routing';

import {HttpService} from './_shared/services';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthorizationModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
