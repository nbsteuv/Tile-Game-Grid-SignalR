import {Component} from '@angular/core';

import {UserService} from '../../_shared/services';
import {User} from '../../_shared/types';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    user: User = new User();
    loginFail = false;
    requiredFieldsFail = false;

    constructor(private userService: UserService) {}

    login(): void {

        this.clearErrorMessages();

        if (!this.user.username || !this.user.password) {
            this.requiredFieldsFail = true;
            return;
        }

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

    clearErrorMessages(): void {
        this.loginFail = false;
        this.requiredFieldsFail = false;
    }
}
