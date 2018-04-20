import {Component} from '@angular/core';

import {UserService} from '../_shared/services';

@Component({
    selector: 'nbs-game',
    templateUrl: './game.component.html'
})
export class GameComponent{

    constructor(private userService: UserService){}

    logout(){
        this.userService.logout().subscribe(data => console.log(data));
    }
    
}