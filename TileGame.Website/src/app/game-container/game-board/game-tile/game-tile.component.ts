import {Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AnimationBuilder, AnimationPlayer, style, animate} from '@angular/animations';

import {Position} from '../../../_shared/types';

@Component({
    selector: 'nbs-game-tile',
    templateUrl: './game-tile.component.html'
})
export class GameTileComponent implements OnInit{
    @Input() character: string;
    @Output() tilePositionRetrieved: EventEmitter<Position> = new EventEmitter<Position>();
    @Output() tileClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() tileStartedMoving: EventEmitter<void> = new EventEmitter<void>();
    @Output() tileStoppedMoving: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('tile') tile;
    animationPlayer: AnimationPlayer;
    private _position: Position;

    translateX: string = '';
    translateY: string = '';
    isMoving: boolean = false;

    constructor(private elementRef: ElementRef, private animationBuilder: AnimationBuilder){}

    ngOnInit(){
        let rect = this.elementRef.nativeElement.getBoundingClientRect();
        let position: Position = {
            x: rect.left,
            y: rect.top
        };
        this._position = position;
        this.tilePositionRetrieved.emit(position);
    }

    @Input() set position(position: Position){

        if(!this._position || this._position === position || !this.tile){
            //We haven't set the tile's position yet for comparison, the position is not changed, or this is the empty tile space
            return;
        }

        let translateX = position.x - this._position.x;
        let translateY = position.y - this._position.y;

        if(this.animationPlayer){
            this.animationPlayer.destroy();
        }

        const factory = this.animationBuilder.build([
            style({transform: '*'}),
            animate('500ms ease-out', style({transform: `translate(${translateX}px, ${translateY}px)`}))
        ]);

        this.isMoving = true;
        this.tileStartedMoving.emit();

        this.animationPlayer = factory.create(this.tile.nativeElement, {});
        this.animationPlayer.onDone(() => {
            //Prevent animating from same beginning spot each time
            this.translateX = translateX + 'px';
            this.translateY = translateY + 'px';
            this.isMoving = false;
            this.tileStoppedMoving.emit();
        })
        this.animationPlayer.play();
    }

    onTileClick(){
        if(this.isMoving){
            return;
        }
        this.tileClicked.emit();
    }
}