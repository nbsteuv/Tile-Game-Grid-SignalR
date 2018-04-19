import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import {User} from '../types';
import {HttpService} from './http-service';

@Injectable()
export class UserService implements CanActivate{
    
    loggedIn: boolean = false;

    constructor(private router: Router, private httpService: HttpService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        let url: string = state.url;
        //TODO: Carry url through for redirect
        return this.checkAccess(url, true);
    }

    checkAccess(url: string, redirect: boolean): Observable<boolean>{
        if(this.loggedIn){
            return Observable.of(true);
        }
        let observable = this.httpService.post('/api/account/checkaccess')
            .map(
                data => {
                    console.log(data);
                    this.loggedIn = true;
                    return true;
                }
            ).catch(
                () => {
                    this.router.navigate(['/admin/login']);
                    return Observable.of(false);
                }
            )
        return observable;
    }

    isLoggedIn(){
        return this.loggedIn;
    }

    register(user: User): Observable<void>{
        let observable = this.httpService.post('/api/account/register', user);
        observable.subscribe(
            data => {
                this.loggedIn = true;
                this.router.navigate(['/admin']);
            },
            err => {
                console.log(err);
            }
        );
        return observable;
    }

    login(user: User): Observable<void>{
        let observable = this.httpService.post('/api/account/login', user);
        observable.subscribe(
            data => {
                this.loggedIn = true;
                this.router.navigate(['/admin']);
            },
            err => {
                console.log(err);
            }
        );
        return observable;
    }

    logout(): Observable<void>{
        console.log('trying to log out');
        let observable = this.httpService.post('/api/account/logout');
        observable.subscribe(
            data => {
                console.log(data);
                this.loggedIn = false;
                this.router.navigate([''])
            },
            err => {
                console.log(err);
                //TODO: Create error handler that can be injected
            }
        );
        return observable;
    }
}
