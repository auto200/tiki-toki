import { nanoid } from "nanoid";
import { ClientStatus, Game } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";

export class GameRoomsService {
    constructor(private gameRooms: Map<string, GameRoom> = new Map()) {}

    public createGame(player1: GamePlayer, player2: GamePlayer): GameRoom {
        const game = new GameRoom(nanoid(), player1, player2);
        this.gameRooms.set(game.id, game);

        return game;
    }

    public playerLeft(player: GamePlayer) {
        //TODO:notify players
        if (player.state.status !== ClientStatus.IN_GAME) return;

        this.gameRooms.delete(player.state.game.id);
    }

    public getRoomById(gameId: Game["id"]) {
        return this.gameRooms.get(gameId);
    }
}
