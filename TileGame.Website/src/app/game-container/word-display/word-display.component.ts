import { Component, Input } from '@angular/core';

@Component({
    selector: 'nbs-word-display',
    templateUrl: './word-display.component.html'
})
export class WordDisplayComponent {
    @Input() wordList: string[];
}
