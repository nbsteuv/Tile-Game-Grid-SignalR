import { GameType } from '../enums';

export class GameOptions {
    gameType: GameType = GameType.Single;
    gameSize = 4;
    password = '';
}
