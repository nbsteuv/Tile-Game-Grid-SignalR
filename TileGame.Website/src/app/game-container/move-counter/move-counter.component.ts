import { Component, Input } from '@angular/core';

@Component({
    selector: 'nbs-move-counter',
    templateUrl: './move-counter.component.html'
})
export class MoveCounterComponent {
    @Input() moves: number;
}
