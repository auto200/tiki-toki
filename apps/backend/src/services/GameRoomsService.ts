import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";

export class GameRoomsService {
    constructor(private gameRooms: Map<string, GameRoom> = new Map()) {}

    public addGame(game: GameRoom) {
        this.gameRooms.set(game.id, game);
    }

    public playerLeft(player: GamePlayer, gameRoom: GameRoom) {
        //TODO:notify players
        this.gameRooms.delete(gameRoom.id);
    }
}
