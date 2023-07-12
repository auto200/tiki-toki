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
        public readonly player1: GamePlayer,
        public readonly player2: GamePlayer,
    ) {
        this.game = Game.create(
            Players.create(Player.create(player1.id), Player.create(player2.id)),
            undefined,
            undefined,
            id,
        );
        this.setPlayersState();

        console.log(JSON.stringify(this.game));
    }

    public makeMove({ cellId, selectedPieceId }: SocketEventPayloadMakeMove) {
        this.game = Game.makeMove(this.game, selectedPieceId, cellId);
        this.setPlayersState();
    }

    private setPlayersState() {
        this.player1.setState({
            status: ClientStatus.IN_GAME,
            game: this.game,
            playerKey: "one",
            enemyPlayerKey: "two",
        });

        this.player2.setState({
            status: ClientStatus.IN_GAME,
            game: this.game,
            playerKey: "two",
            enemyPlayerKey: "one",
        });
    }

    // public playerDisconnected(player: GamePlayer) {
    //     //TODO
    //     this.emitToPlayers(SocketEvent.gameEnd, { message: `${player.id} left.` });
    // }

    public toJSON() {
        return this.game;
    }
}
