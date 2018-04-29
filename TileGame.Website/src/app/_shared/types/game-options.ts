import {GameType} from '../enums';

export class GameOptions{
    gameType: GameType = GameType.Single;
    gameSize: number = 4;
    password: string = '';
}