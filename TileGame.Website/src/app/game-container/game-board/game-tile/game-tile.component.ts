import {
	Component,
	Input,
	Output,
	EventEmitter,
	AfterViewInit,
	ChangeDetectorRef,
	ViewChild,
	ElementRef
} from '@angular/core';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';

import { Position } from '../../../_shared/types';

@Component({
	selector: 'nbs-game-tile',
	templateUrl: './game-tile.component.html'
})
export class GameTileComponent implements AfterViewInit {
	@Input() character: string;
	@Output() tilePositionRetrieved: EventEmitter<Position> = new EventEmitter<Position>();
	@Output() tileClicked: EventEmitter<void> = new EventEmitter<void>();
	@Output() tileStartedMoving: EventEmitter<void> = new EventEmitter<void>();
	@Output() tileStoppedMoving: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('tile') tile;
	animationPlayer: AnimationPlayer;
	private _position: Position;

	fontSize = '';
	translateX = '';
	translateY = '';
	isMoving = false;

	@Input()
	set position(position: Position) {
		if (!this._position || this._position === position || !this.tile) {
			// We haven't set the tile's position yet for comparison, the position is not changed, or this is the empty tile space
			return;
		}

		const translateX = position.x - this._position.x;
		const translateY = position.y - this._position.y;

		if (this.animationPlayer) {
			this.animationPlayer.destroy();
		}

		const factory = this.animationBuilder.build([
			style({ transform: '*' }),
			animate('300ms ease-out', style({ transform: `translate(${translateX}px, ${translateY}px)` }))
		]);

		this.isMoving = true;
		this.tileStartedMoving.emit();

		this.animationPlayer = factory.create(this.tile.nativeElement, {});
		this.animationPlayer.onDone(() => {
			// Prevent animating from same beginning spot each time
			this.translateX = translateX + 'px';
			this.translateY = translateY + 'px';
			this.isMoving = false;
			this.tileStoppedMoving.emit();
		});
		this.animationPlayer.play();
	}

	@Input()
	set emitPosition(emitPosition: boolean) {
		if (!emitPosition) {
			return;
		}
		const rect = this.elementRef.nativeElement.getBoundingClientRect();
		const position: Position = {
			x: rect.left,
			y: rect.top
		};
		this._position = position;
		this.tilePositionRetrieved.emit(position);
	}

	constructor(
		private elementRef: ElementRef,
		private changeDectectorRef: ChangeDetectorRef,
		private animationBuilder: AnimationBuilder
	) {}

	ngAfterViewInit(): void {
		this.setFontSize();
	}

	setFontSize(): void {
		if (!this.tile) {
			return;
		}
		// Set font size relative to tile width -- need to get tile component, since Angular element doesn't have dimensions
		const tileRect = this.elementRef.nativeElement.children[0].getBoundingClientRect();
		const tileHeight = tileRect.height;
		this.fontSize = `${tileHeight / 2}px`;
		this.changeDectectorRef.detectChanges();
	}

	onTileClick(): void {
		if (this.isMoving) {
			return;
		}
		this.tileClicked.emit();
	}
}
