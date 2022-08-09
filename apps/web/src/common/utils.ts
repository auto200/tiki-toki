import { Piece, Players } from "tic-tac-shared";
import { PieceType } from "./models";

export const getPieceType = (players: Players, piece: Piece): PieceType =>
    Players.playerIdToPlayerKey(players, piece.ownerId) === "two" ? "enemy" : "ally";
