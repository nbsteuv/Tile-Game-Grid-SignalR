import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

    baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient) { }

    get(url: string): Observable<any> {
        const options = {
            withCredentials: true
        };
        const requestUrl: string = this.baseUrl + url;
        const observable: Observable<any> = this.httpClient.get(requestUrl, options).pipe(share());
        return observable;
    }

    post(url: string, T: any = {}): Observable<any> {
        const options = {
            withCredentials: true
        };
        const requestUrl: string = this.baseUrl + url;
        const observable: Observable<any> = this.httpClient.post(requestUrl, T, options).pipe(share());
        return observable;
    }

}
