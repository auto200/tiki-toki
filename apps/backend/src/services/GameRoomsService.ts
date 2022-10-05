import { nanoid } from "nanoid";
import { Server } from "socket.io";
import { ClientStatus } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";

export class GameRoomsService {
    constructor(private io: Server, private gameRooms: Map<string, GameRoom> = new Map()) {}

    public createGame(player1: GamePlayer, player2: GamePlayer) {
        const game = new GameRoom(nanoid(), player1, player2, this.io);
        this.gameRooms.set(game.id, game);
    }

    public playerLeft(player: GamePlayer) {
        //TODO:notify players
        if (player.state.status !== ClientStatus.IN_GAME) return;

        this.gameRooms.delete(player.state.game.id);
    }
}
