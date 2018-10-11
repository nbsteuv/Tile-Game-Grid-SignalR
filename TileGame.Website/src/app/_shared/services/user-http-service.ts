import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../types';
import { HttpService } from './http-service';

@Injectable()
export class UserHttpService {
	constructor(private httpService: HttpService) {}

	checkAccess(): Observable<boolean> {
		return this.httpService.post('/api/account/checkaccess');
	}

	register(user: User): Observable<void> {
		return this.httpService.post('/api/account/register', user);
	}

	login(user: User): Observable<void> {
		return this.httpService.post('/api/account/login', user);
	}

	logout(): Observable<void> {
		return this.httpService.post('/api/account/logout');
	}
}
