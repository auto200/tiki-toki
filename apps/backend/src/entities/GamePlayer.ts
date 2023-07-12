import { ClientStatus, PlayerState } from "tic-tac-shared";

export class GamePlayer {
    constructor(public id: string, private _state: PlayerState = { status: ClientStatus.IDLE }) {}

    public get state() {
        return this._state;
    }

    public setState(state: PlayerState): void {
        this._state = state;
    }
}
