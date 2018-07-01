import {Component, OnInit} from '@angular/core';

import {interval} from 'rxjs';

@Component({
    selector: 'nbs-timer',
    templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {
    time: number = 0;

    ngOnInit() {
        interval(10).subscribe(
            data => {
                // TODO: Fix shaking timer by making each character its own block
                this.time = this.time + 0.01;
            }
        )
    }
}