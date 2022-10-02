import { Server } from "socket.io";
import { Game, Player, Players, SocketEvent } from "tic-tac-shared";
import { GamePlayer } from "./GamePlayer";

export default class GameRoom {
    public game: Game;

    constructor(
        public readonly id: string,
        player1: GamePlayer,
        player2: GamePlayer,
        private io: Server,
    ) {
        //todo pass id to game
        this.game = Game.create(
            Players.create(Player.create(player1.id), Player.create(player2.id)),
        );

        player1.socket.join(id);
        player2.socket.join(id);

        this.emitToPlayers(SocketEvent.gameStart, this.game);
    }

    private emitToPlayers(event: SocketEvent, data: unknown) {
        this.io.to(this.id).emit(event, data);
    }

    public playerDisconnected(player: GamePlayer) {
        //TODO
        this.emitToPlayers(SocketEvent.gameEnd, { message: `${player.id} left.` });
    }

    public toJSON() {
        return this.game;
    }
}
