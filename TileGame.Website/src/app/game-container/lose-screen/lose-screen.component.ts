import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nbs-lose-screen',
    templateUrl: './lose-screen.component.html'
})
export class LoseScreenComponent {

    @Output() playAgainClicked: EventEmitter<void> = new EventEmitter<void>();

    onPlayAgainClicked(): void {
        this.playAgainClicked.emit();
    }

}
