import { nanoid } from "nanoid";
import { ClientStatus, Game } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";

export class GameRoomsService {
    constructor(private gameRooms: Map<string, GameRoom> = new Map()) {}

    private removeGame(gameRoom: GameRoom) {
        this.gameRooms.delete(gameRoom.id);
    }

    public createGame(player1: GamePlayer, player2: GamePlayer): GameRoom {
        const game = new GameRoom(nanoid(), player1, player2);
        this.gameRooms.set(game.id, game);

        return game;
    }

    public playerLeft(gameRoom: GameRoom): void {
        gameRoom.player1.setState({ status: ClientStatus.IDLE });
        gameRoom.player2.setState({ status: ClientStatus.IDLE });

        this.gameRooms.delete(gameRoom.id);
    }

    public getRoomById(gameId: Game["id"]) {
        return this.gameRooms.get(gameId);
    }

    public rematch(prevGameRoom: GameRoom) {
        const newGame = this.createGame(prevGameRoom.player1, prevGameRoom.player2);
        this.removeGame(prevGameRoom);

        return newGame;
    }
}
