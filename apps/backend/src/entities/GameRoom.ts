import { Server } from "socket.io";
import { Game, Players } from "tic-tac-shared";
import { GamePlayer } from "./GamePlayer";

export default class GameRoom {
    public game: Game;

    constructor(public readonly id: string, player1: GamePlayer, player2: GamePlayer, io: Server) {
        this.game = Game.create(Players.create(player1.id, player2.id));
    }

    public playerDisconnected(player: GamePlayer) {
        //TODO
    }
}
