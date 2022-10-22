import { Cell, Game, Piece, PlayerKey } from "../entities";

export enum ClientStatus {
    IDLE,
    IN_QUEUE,
    IN_GAME,
}

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
      };

export type SocketEventPayloadMakeMove = {
    selectedPieceId: Piece["id"];
    cellId: Cell["id"];
};
