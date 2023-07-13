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

    public playerLeft(player: GamePlayer): [GamePlayer, GamePlayer] | undefined {
        if (player.state.status !== ClientStatus.IN_GAME) return;

        const gameRoom = this.gameRooms.get(player.state.game.id);
        if (!gameRoom) return;

        gameRoom.player1.setState({ status: ClientStatus.IDLE });
        gameRoom.player2.setState({ status: ClientStatus.IDLE });

        const playersToNotify: [GamePlayer, GamePlayer] = [gameRoom.player1, gameRoom.player2];

        this.gameRooms.delete(gameRoom.id);

        return playersToNotify;
    }

    public getRoomById(gameId: Game["id"]) {
        return this.gameRooms.get(gameId);
    }
}
