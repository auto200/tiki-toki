import { nanoid } from "nanoid";
import { Piece } from "../Piece";

export type Cell = {
    id: string;
    pieces: Piece["id"][];
    dominantPieceId: Piece["id"] | null;
};

export const Cell = {
    create: (
        id: string = nanoid(),
        pieces: Piece["id"][] = [],
        dominantPiece: Cell["dominantPieceId"] = null,
    ): Cell => ({ id, pieces, dominantPieceId: dominantPiece }),
    /** For now we assume that players cannot place pieces in a cell that they
     * dominate */
    canPlacePiece: (cell: Cell, piece: Piece, allPlayersPieces: Piece[]): boolean => {
        const dominantPiece = allPlayersPieces.find(({ id }) => id === cell.dominantPieceId);
        const isAlreadyDominating = dominantPiece?.ownerId === piece.ownerId;
        const isBigger = dominantPiece ? dominantPiece.size < piece.size : true;

        return !isAlreadyDominating && isBigger;
    },
    placePiece: (cell: Cell, pieceId: Piece["id"]): Cell => ({
        ...cell,
        pieces: [...cell.pieces, pieceId],
        dominantPieceId: pieceId,
    }),
};
