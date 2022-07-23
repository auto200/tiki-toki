import { Socket } from "socket.io";
import { GameRoomsService } from "../services/GameRoomsService";
import { PairingQueueService } from "../services/PairingQueueService";
import GameRoom from "./GameRoom";

type PlayerStatus =
    | {
          status: "IDLE";
      }
    | { status: "IN_QUEUE" }
    | {
          status: "PLAYING";
          game: GameRoom;
      };

export class GamePlayer {
    public id: string;

    constructor(
        private socket: Socket,
        private pairingQueueService: PairingQueueService,
        private gameRoomsService: GameRoomsService,
        public status: PlayerStatus = { status: "IDLE" },
    ) {
        this.id = socket.id;
    }

    public disconnected(): void {
        switch (this.status.status) {
            case "IN_QUEUE": {
                this.pairingQueueService.leaveQueue(this);
                break;
            }
            case "PLAYING": {
                this.gameRoomsService.playerLeft(this, this.status.game);
                break;
            }
        }
    }
}
