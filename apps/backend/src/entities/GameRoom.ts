import { Server } from "socket.io";
import {
    ClientStatus,
    Game,
    Player,
    Players,
    SocketEvent,
    SocketEventPayloadMakeMove,
} from "tic-tac-shared";
import { GamePlayer } from "./GamePlayer";

export default class GameRoom {
    public game: Game;

    constructor(
        public readonly id: string,
        private player1: GamePlayer,
        private player2: GamePlayer,
        private io: Server,
    ) {
        this.game = Game.create(
            Players.create(Player.create(player1.id), Player.create(player2.id)),
            undefined,
            undefined,
            id,
        );
        console.log(JSON.stringify(this.game));

        player1.socket.join(id);
        player2.socket.join(id);

        this.registerGameEvents();
        this.emitGameStateToPlayers();
    }

    private emitToPlayers(event: SocketEvent, data: unknown) {
        this.io.to(this.id).emit(event, data);
    }

    private emitGameStateToPlayers() {
        this.player1.setState({ status: ClientStatus.IN_GAME, game: this.game, playerKey: "one" });
        this.player2.setState({ status: ClientStatus.IN_GAME, game: this.game, playerKey: "two" });
    }

    private registerGameEvents() {
        this.player1.socket.on(SocketEvent.makeMove, this.handleMakeMove.bind(this));
        this.player2.socket.on(SocketEvent.makeMove, this.handleMakeMove.bind(this));
    }

    //TODO: runtime typechecking
    private handleMakeMove({ selectedPieceId, cellId }: SocketEventPayloadMakeMove) {
        //TODO: handle errors
        try {
            this.game = Game.makeMove(this.game, selectedPieceId, cellId);
            this.emitGameStateToPlayers();
        } catch (err) {
            console.log(err);
        }
    }

    public playerDisconnected(player: GamePlayer) {
        //TODO
        this.emitToPlayers(SocketEvent.gameEnd, { message: `${player.id} left.` });
    }

    public toJSON() {
        return this.game;
    }
}
