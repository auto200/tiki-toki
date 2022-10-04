import { ClientStatus } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";
import { GameRoomsService } from "./GameRoomsService";

export class PairingQueueService {
    constructor(private gameRoomsService: GameRoomsService) {}
    private static readonly MAX_QUE_LENGTH = 2;

    private playersInQueue: GamePlayer[] = [];

    private push(player: GamePlayer): void {
        this.playersInQueue.push(player);
        player.setState({ status: ClientStatus.IN_QUEUE });
    }

    public joinQueue(player: GamePlayer): void {
        this.push(player);
        if (this.playersInQueue.length >= PairingQueueService.MAX_QUE_LENGTH) {
            return this.onQueueFull();
        }
    }

    private onQueueFull(): void {
        const [player1, player2] = this.playersInQueue;
        if (!player1 || !player2) return;
        this.gameRoomsService.createGame(player1, player2);
        this.playersInQueue = [];
    }

    public leaveQueue(player: GamePlayer): void {
        this.playersInQueue = this.playersInQueue.filter(qPlayer => qPlayer.id !== player.id);
        player.setState({ status: ClientStatus.IDLE });
    }
}
