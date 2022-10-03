import { ClientStatus } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";

export class GameRoomsService {
    constructor(private gameRooms: Map<string, GameRoom> = new Map()) {}

    public addGame(game: GameRoom) {
        this.gameRooms.set(game.id, game);
    }

    public playerLeft(player: GamePlayer) {
        //TODO:notify players
        if (player.state.status !== ClientStatus.IN_GAME) return;

        this.gameRooms.delete(player.state.game.id);
    }
}
