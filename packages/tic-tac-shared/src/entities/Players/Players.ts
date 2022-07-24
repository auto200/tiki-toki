import sample from "lodash/sample";
import { Piece } from "../Piece";
import { Player } from "../Player";

export type Players = {
    one: Player;
    two: Player;
};
export type PlayerKey = keyof Players;

export const Players = {
    create: (playerOne: Player, playerTwo: Player): Players => ({
        one: playerOne,
        two: playerTwo,
    }),
    getInitialPlayerTurn: (players: Players): PlayerKey =>
        sample(Object.keys(players) as PlayerKey[])!,
    usePiece: (players: Players, playerKey: PlayerKey, piece: Piece): Players => ({
        ...players,
        [playerKey]: Player.usePiece(players[playerKey], piece),
    }),
};
