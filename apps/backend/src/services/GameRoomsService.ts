import { nanoid } from "nanoid";

import { Game } from "tic-tac-shared/game-core";
import { ClientStatus } from "tic-tac-shared/online";

import { GamePlayer } from "@entities/GamePlayer";
import { GameRoom } from "@entities/GameRoom";

export class GameRoomsService {
    constructor(private gameRooms: Map<string, GameRoom> = new Map()) {}

    private remove(gameRoom: GameRoom) {
        this.gameRooms.delete(gameRoom.id);
    }

    public create(player1: GamePlayer, player2: GamePlayer): GameRoom {
        const gameRoom = new GameRoom(nanoid(), player1, player2);
        this.gameRooms.set(gameRoom.id, gameRoom);

        return gameRoom;
    }

    public close(gameRoom: GameRoom): void {
        gameRoom.player1.setState({ status: ClientStatus.IDLE });
        gameRoom.player2.setState({ status: ClientStatus.IDLE });

        this.gameRooms.delete(gameRoom.id);
    }

    public getRoomById(gameId: Game["id"]) {
        return this.gameRooms.get(gameId);
    }

    public rematch(prevGameRoom: GameRoom) {
        const newGame = this.create(prevGameRoom.player1, prevGameRoom.player2);
        this.remove(prevGameRoom);

        return newGame;
    }
}
