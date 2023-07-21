import { Cell, Game, Piece, Player, PlayerKey } from "../entities";

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

export type SocketEventPayloadMakeMove = {
    selectedPieceId: Piece["id"];
    cellId: Cell["id"];
};
