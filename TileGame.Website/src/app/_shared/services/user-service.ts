import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../types';
import { UserHttpService } from './user-http-service';

@Injectable()
export class UserService implements CanActivate {
	private loggedIn = false;

	constructor(private router: Router, private userHttpService: UserHttpService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const url: string = state.url;
		return this.checkAccess(url, true);
	}

	checkAccess(url: string, redirect: boolean): Observable<boolean> {
		if (this.loggedIn) {
			return of(true);
		}
		const observable = this.userHttpService.checkAccess().pipe(
			map((data) => {
				this.loggedIn = true;
				return true;
			}),
			catchError(() => {
				this.router.navigate([ '/users/login' ]);
				return of(false);
			})
		);
		return observable;
	}

	isLoggedIn() {
		return this.loggedIn;
	}

	register(user: User): Observable<void> {
		const observable = this.userHttpService.register(user);
		observable.subscribe(
			(data) => {
				this.loggedIn = true;
				this.router.navigate([ '/' ]);
			},
			(err) => {
				console.log(err);
			}
		);
		return observable;
	}

	login(user: User): Observable<void> {
		const observable = this.userHttpService.login(user);
		observable.subscribe(
			(data) => {
				this.loggedIn = true;
				this.router.navigate([ '/' ]);
			},
			(err) => {
				console.log(err);
			}
		);
		return observable;
	}

	logout(): Observable<void> {
		const observable = this.userHttpService.logout();
		observable.subscribe(
			(data) => {
				this.loggedIn = false;
				this.router.navigate([ '/' ]);
			},
			(err) => {
				console.log(err);
				// TODO: Create error handler that can be injected
			}
		);
		return observable;
	}
}
