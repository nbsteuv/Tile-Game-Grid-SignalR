import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'authorization-root',
    templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {

    currentRoute: string = '';

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.currentRoute = this.router.url;
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

}
