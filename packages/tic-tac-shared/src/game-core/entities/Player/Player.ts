import { nanoid } from "nanoid";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece, PieceSize } from "../Piece";

export type Player = {
    id: string;
    pieces: Piece[];
};

export const Player = {
    create: (id: string = nanoid(), pieces?: Player["pieces"]): Player => ({
        id,
        pieces: pieces || Player.initPlayerPieces(id),
    }),
    initPlayerPieces: (playerId: string): Player["pieces"] => [
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.big),
        Piece.create(playerId, PieceSize.big),
    ],
    usePiece: (player: Player, piece: Piece): Player => ({
        ...player,
        pieces: player.pieces.map(playerPiece =>
            playerPiece.id === piece.id ? { ...playerPiece, isUsed: true } : playerPiece,
        ),
    }),
    getPieceById: (player: Player, pieceId: Piece["id"]): Piece | null =>
        player.pieces.find(({ id }) => id === pieceId) || null,
    canMakeAnyMove: (player: Player, board: Board, allPlayersPieces: Piece[]): boolean =>
        player.pieces.some(
            piece =>
                !piece.isUsed &&
                board.cells.some(cell => Cell.canPlacePiece(cell, piece, allPlayersPieces)),
        ),
};
