import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import {environment} from '../../../environments/environment';

@Injectable()
export class HttpService{

    baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient){}

    get(url: string): Observable<any>{
        let options = {
            withCredentials: true
        };
        let requestUrl: string = this.baseUrl + url;
        let observable: Observable<any> = this.httpClient.get(requestUrl, options).share();
        return observable;
    }

    post(url: string, T: any = {}): Observable<any>{
        let options = {
            withCredentials: true
        };
        let requestUrl: string = this.baseUrl + url;
        let observable: Observable<any> = this.httpClient.post(requestUrl, T, options).share();
        return observable;
    }
    
}