import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_shared/services';

@Component({
    selector: 'nbs-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(private userService: UserService, private router: Router) { }

    logout(): void {
        this.userService.logout().subscribe(
            data => {
                this.router.navigate(['/users/login']);
            },
            err => {
                console.log(err);
            }
        );
    }

    isLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }

}
