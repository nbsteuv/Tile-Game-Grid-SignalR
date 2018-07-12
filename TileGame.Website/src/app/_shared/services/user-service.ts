import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../types';
import { HttpService } from './http-service';

@Injectable()
export class UserService implements CanActivate {

    loggedIn = false;

    constructor(private router: Router, private httpService: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;
        return this.checkAccess(url, true);
    }

    checkAccess(url: string, redirect: boolean): Observable<boolean> {
        if (this.loggedIn) {
            return of(true);
        }
        const observable = this.httpService.post('/api/account/checkaccess')
            .pipe(
                map(
                    data => {
                        console.log(data);
                        this.loggedIn = true;
                        return true;
                    }
                ),
                catchError(
                    () => {
                        this.router.navigate(['/api/users/login']);
                        return of(false);
                    }
                )
            );
        return observable;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    register(user: User): Observable<void> {
        const observable = this.httpService.post('/api/account/register', user);
        observable.subscribe(
            data => {
                this.loggedIn = true;
                this.router.navigate(['/']);
            },
            err => {
                console.log(err);
            }
        );
        return observable;
    }

    login(user: User): Observable<void> {
        const observable = this.httpService.post('/api/account/login', user);
        observable.subscribe(
            data => {
                this.loggedIn = true;
                this.router.navigate(['/']);
            },
            err => {
                console.log(err);
            }
        );
        return observable;
    }

    logout(): Observable<void> {
        console.log('trying to log out');
        const observable = this.httpService.post('/api/account/logout');
        observable.subscribe(
            data => {
                console.log('success');
                console.log(data);
                this.loggedIn = false;
                this.router.navigate(['']);
            },
            err => {
                console.log('error');
                console.log(err);
                // TODO: Create error handler that can be injected
            }
        );
        return observable;
    }
}
