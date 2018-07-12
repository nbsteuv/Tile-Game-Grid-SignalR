import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nbs-win-screen',
    templateUrl: './win-screen.component.html'
})
export class WinScreenComponent {

    @Output() playAgainClicked: EventEmitter<void> = new EventEmitter<void>();

    onPlayAgainClicked(): void {
        this.playAgainClicked.emit();
    }

}
