import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Move, IncomingMove } from '../../_shared/types';
import { GameStatus, GameType } from '../../_shared/enums';

@Component({
	selector: 'nbs-game-player',
	templateUrl: './game-player.component.html'
})
export class GamePlayerComponent {
	private _puzzleArray: string[] = [];
	moves = 0;

	gameStatus = {
		ready: GameStatus.Ready,
		win: GameStatus.Win,
		lose: GameStatus.Lose
	};

	gameType = {
		single: GameType.Single,
		race: GameType.Race
	};

	@Input() wordList: string[];
	@Input() currentGameStatus: GameStatus;
	@Input() currentGameType: GameType;
	@Input() incomingMove: IncomingMove;
	@Output() move: EventEmitter<Move> = new EventEmitter<Move>();
	@Output() tileStartedMoving: EventEmitter<void> = new EventEmitter<void>();
	@Output() tileStoppedMoving: EventEmitter<void> = new EventEmitter<void>();
	@Output() playAgainClicked: EventEmitter<void> = new EventEmitter<void>();

	@Input()
	set puzzleArray(puzzleArray: string[]) {
		this._puzzleArray = puzzleArray;
	}

	get puzzleArray(): string[] {
		return this._puzzleArray;
	}

	getGameSize(): number {
		return this.wordList.length;
	}

	onMove(move: Move): void {
		this.move.emit(move);
		this.moves = this.moves + 1;
	}

	onTileStartedMoving(): void {
		this.tileStartedMoving.emit();
	}

	onTileStoppedMoving(): void {
		this.tileStoppedMoving.emit();
	}

	onPlayAgainClicked(): void {
		this.playAgainClicked.emit();
	}
}
