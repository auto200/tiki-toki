import sample from "lodash/sample";
import { Piece } from "../Piece";
import { Player } from "../Player";

export type Players = {
    one: Player;
    two: Player;
};
export type PlayerKey = keyof Players;

export const Players = {
    create: (playerOneId: string, playerTwoId: string): Players => ({
        one: Player.create(playerOneId),
        two: Player.create(playerTwoId),
    }),
    getInitialPlayerTurn: (players: Players): PlayerKey =>
        sample(Object.keys(players) as PlayerKey[])!,
    usePiece: (players: Players, playerKey: PlayerKey, piece: Piece): Players => ({
        ...players,
        [playerKey]: Player.usePiece(players[playerKey], piece),
    }),
};
