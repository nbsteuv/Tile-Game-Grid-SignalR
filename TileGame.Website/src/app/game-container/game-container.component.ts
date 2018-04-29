import {Component, OnInit} from '@angular/core';

import {UserService, ConnectionService} from '../_shared/services';
import {GameOptions} from '../_shared/types';
import {GameState} from '../_shared/enums';

@Component({
    selector: 'nbs-game-container',
    templateUrl: './game-container.component.html'
})
export class GameContainerComponent implements OnInit{

    currentGameState: GameState = GameState.NoGame;

    gameState = {
        noGame: GameState.NoGame,
        ready: GameState.Ready,
        waiting: GameState.Waiting,
        watching: GameState.Watching
    }

    constructor(private userService: UserService, private connectionService: ConnectionService){}

    ngOnInit(): void{
        this.connectionService.getStateChanges().subscribe(
            data => {
                console.log('State changed to ' + data);
                this.currentGameState = data;
            },
            err => {
                console.log(err);
            }
        )
    }

    logout(): void{
        this.userService.logout().subscribe(data => console.log(data));
    }

    connect(gameOptions: GameOptions): void{
        this.connectionService.startConnection(gameOptions);
    }

    onGameOptionsSubmitted(gameOptions: GameOptions){
        this.connect(gameOptions);
    }
    
}