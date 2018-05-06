import {Component, Input, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';

import {Position} from '../../../_shared/types';

@Component({
    selector: 'nbs-game-tile',
    templateUrl: './game-tile.component.html'
})
export class GameTileComponent implements OnInit{
    @Input() character: string;
    @Output() tilePositionRetrieved: EventEmitter<Position> = new EventEmitter<Position>();

    constructor(private elementRef: ElementRef){}

    ngOnInit(){
        let rect = this.elementRef.nativeElement.getBoundingClientRect();
        let position: Position = {
            x: rect.left,
            y: rect.top
        };
        this.tilePositionRetrieved.emit(position);
    }
}