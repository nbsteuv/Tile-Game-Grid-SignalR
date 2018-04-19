import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {UserService} from '../../_shared/services';
import {User} from '../../_shared/types';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent{
    user: User = new User();
    loginFail: boolean = false;

    constructor(private userService: UserService){}

    login(){
        //TODO: Validate password and email
        this.loginFail = false;
        this.userService.login(this.user)
            .subscribe(
                data => {
                    console.log('Login success');
                },
                err => {
                    this.loginFail = true;
                }
            );
    }
}