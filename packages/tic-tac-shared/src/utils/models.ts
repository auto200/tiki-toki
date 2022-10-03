import { Game } from "../entities";

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
          game: Game;
      };
