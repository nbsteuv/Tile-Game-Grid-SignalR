import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {UserService} from '../../_shared/services';
import {User} from '../../_shared/types';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent{
    user: User = new User();
    passwordMismatch: boolean = false;
    accountCreationFailMessage: string = '';

    constructor(private userService: UserService){}

    createAccount(){
        this.accountCreationFailMessage = '';
        if(this.user.password !== this.user.password2){
            this.passwordMismatch = true;
        } else {
            this.passwordMismatch = false;
            this.userService.register(this.user)
                .subscribe(
                    data => {
                        console.log("Account creation success.");
                    },
                    err => {
                        this.accountCreationFailMessage = 'Account creation failed.';
                    }
                );
        }
    }
}

