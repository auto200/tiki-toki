import { ClientStatus, PlayerState } from "tic-tac-shared/online";

export class GamePlayer {
    constructor(
        public readonly id: string,
        private _state: PlayerState = { status: ClientStatus.IDLE },
    ) {}

    public get state() {
        return this._state;
    }

    public setState(state: PlayerState): void {
        this._state = state;
    }
}
