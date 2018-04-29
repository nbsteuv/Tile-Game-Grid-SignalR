import {Component} from '@angular/core';

import {UserService, ConnectionService} from '../_shared/services';
import {GameOptions} from '../_shared/types';

@Component({
    selector: 'nbs-game-container',
    templateUrl: './game-container.component.html'
})
export class GameContainerComponent{

    connection: any;

    constructor(private userService: UserService, private connectionService: ConnectionService){}

    logout(){
        this.userService.logout().subscribe(data => console.log(data));
    }

    connect(gameOptions: GameOptions){
        this.connectionService.startConnection(gameOptions);
    }

    onGameOptionsSubmitted(gameOptions: GameOptions){
        this.connect(gameOptions);
    }
    
}