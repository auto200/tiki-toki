import { Game, Player, PlayerKey } from "../game-core";

export enum ClientStatus {
    IDLE,
    IN_QUEUE,
    IN_GAME,
}

export type OnlineRoomState = {
    playersReadyToRematch: Player["id"][];
};

export type PlayerState =
    | {
          status: ClientStatus.IDLE;
      }
    | { status: ClientStatus.IN_QUEUE }
    | {
          status: ClientStatus.IN_GAME;
          playerKey: PlayerKey;
          enemyPlayerKey: PlayerKey;
          game: Game;
          roomState: OnlineRoomState;
      };
