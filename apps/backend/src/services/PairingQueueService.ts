import { ClientStatus } from "tic-tac-shared";
import { GamePlayer } from "../entities/GamePlayer";

export class PairingQueueService {
    private static readonly MAX_QUE_LENGTH = 2;

    private playersInQueue: GamePlayer[] = [];

    private push(player: GamePlayer): void {
        this.playersInQueue.push(player);
        player.setState({ status: ClientStatus.IN_QUEUE });
    }

    public joinQueue(player: GamePlayer): [GamePlayer, GamePlayer] | undefined {
        this.push(player);

        if (this.playersInQueue.length >= PairingQueueService.MAX_QUE_LENGTH) {
            const [player1, player2] = this.playersInQueue;
            if (!player1 || !player2) return;

            this.playersInQueue.length = 0;

            return [player1, player2];
        }
    }

    public leaveQueue(player: GamePlayer): void {
        const playerIndex = this.playersInQueue.findIndex(p => p.id === player.id);
        this.playersInQueue.splice(playerIndex, 1);

        player.setState({ status: ClientStatus.IDLE });
    }
}
