import {InjectionToken} from '@angular/core';

export const SIGNALR_TOKEN = new InjectionToken('signalR');

export function signalRFactory() {
    return window['signalR'];
}

export const SIGNALR_PROVIDER = [
    { provide: SIGNALR_TOKEN, useFactory: signalRFactory },
];