import {Component} from '@angular/core';

import {UserService, ConnectionService} from '../_shared/services';

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

    connect(){
        this.connectionService.startConnection();
    }
    
}