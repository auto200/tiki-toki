import { nanoid } from "nanoid";
import { Server } from "socket.io";
import { GamePlayer } from "../entities/GamePlayer";
import GameRoom from "../entities/GameRoom";
import { GameRoomsService } from "./GameRoomsService";

export class PairingQueueService {
    constructor(private gameRoomsService: GameRoomsService, private io: Server) {}
    private static readonly MAX_QUE_LENGTH = 2;

    private playersInQueue: GamePlayer[] = [];

    private isPlayerInQueue(player: GamePlayer): boolean {
        return this.playersInQueue.some(qPlayer => qPlayer.id === player.id);
    }

    private push(player: GamePlayer): void {
        this.playersInQueue.push(player);
    }

    public joinQueue(player: GamePlayer): void {
        if (this.isPlayerInQueue(player)) return;
        this.push(player);

        if (this.playersInQueue.length < PairingQueueService.MAX_QUE_LENGTH) return;

        const [player1, player2] = this.playersInQueue;
        this.gameRoomsService.addGame(new GameRoom(nanoid(), player1!, player2!, this.io));
        this.playersInQueue = [];
    }

    public leaveQueue(player: GamePlayer): void {
        if (!this.isPlayerInQueue(player)) return;
        this.playersInQueue = this.playersInQueue.filter(qPlayer => qPlayer.id !== player.id);
    }
}
