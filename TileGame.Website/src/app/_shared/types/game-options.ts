import {GameType} from '../enums';

export class GameOptions{
    gameType: GameType = GameType.Single;
    password: string;
}