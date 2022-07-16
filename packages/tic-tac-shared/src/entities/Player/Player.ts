import { nanoid } from "nanoid";
import { Piece, PieceSize } from "../Piece";

export type Player = {
    id: string;
    gameId: string;
    pieces: [Piece, Piece, Piece, Piece, Piece, Piece];
};

export const Player = {
    create: (gameId: string, id: string = nanoid(), pieces?: Player["pieces"]): Player => ({
        id,
        gameId,
        pieces: pieces || Player.initPlayerPieces(id),
    }),
    isPieceOwner: (player: Player, piece: Piece): boolean =>
        player.pieces.some(playerPiece => playerPiece.ownerId === piece.id),
    initPlayerPieces: (playerId: string): Player["pieces"] => [
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.big),
        Piece.create(playerId, PieceSize.big),
    ],
};
