import {Component} from '@angular/core';

import {UserService} from '../_shared/services';

@Component({
    selector: 'nbs-game-container',
    templateUrl: './game-container.component.html'
})
export class GameContainerComponent{

    constructor(private userService: UserService){}

    logout(){
        this.userService.logout().subscribe(data => console.log(data));
    }
    
}