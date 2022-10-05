import { Socket } from "socket.io";
import { ClientStatus, PlayerState, SocketEvent } from "tic-tac-shared";

export class GamePlayer {
    public id: string;

    constructor(
        public socket: Socket,
        private _state: PlayerState = { status: ClientStatus.IDLE },
    ) {
        this.id = socket.id;
    }

    public get state() {
        return this._state;
    }

    public setState(state: PlayerState): void {
        this._state = state;
        this.socket.emit(SocketEvent.clientState, this._state);
    }
}
