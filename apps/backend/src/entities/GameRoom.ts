import { ClientStatus, Game, Player, Players, SocketEventPayloadMakeMove } from "tic-tac-shared";
import { GamePlayer } from "./GamePlayer";

export class GameRoom {
    public game: Game;
    private playersReadyToRematch: Player["id"][] = [];

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
    }

    public makeMove({ cellId, selectedPieceId }: SocketEventPayloadMakeMove) {
        this.game = Game.makeMove(this.game, selectedPieceId, cellId);
        this.setPlayersState();
    }

    public isPlayerReadyToRematch(player: GamePlayer): boolean {
        return this.playersReadyToRematch.includes(player.id);
    }

    public proposeRematch(player: GamePlayer) {
        this.playersReadyToRematch.push(player.id);
    }

    public get areAllPlayersReadyToRematch() {
        return (
            this.playersReadyToRematch.includes(this.player1.id) &&
            this.playersReadyToRematch.includes(this.player2.id)
        );
    }

    private setPlayersState() {
        this.player1.setState({
            status: ClientStatus.IN_GAME,
            game: this.game,
            playerKey: "one",
            enemyPlayerKey: "two",
            roomState: {
                playersReadyToRematch: this.playersReadyToRematch,
            },
        });

        this.player2.setState({
            status: ClientStatus.IN_GAME,
            game: this.game,
            playerKey: "two",
            enemyPlayerKey: "one",
            roomState: {
                playersReadyToRematch: this.playersReadyToRematch,
            },
        });
    }
}
