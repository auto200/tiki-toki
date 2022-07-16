import { nanoid } from "nanoid";
import { Piece } from "../Piece";

export type Cell = {
    id: string;
    pieces: Piece[];
    dominantPiece: Piece | null;
};

export const Cell = {
    create: (
        id: string = nanoid(),
        pieces: Piece[] = [],
        dominantPiece: Cell["dominantPiece"] = null,
    ): Cell => ({ id, pieces, dominantPiece }),
    /** For now we assume that players cannot place pieces in a cell that they
     * dominate */
    canPlacePiece: (cell: Cell, piece: Piece): boolean =>
        cell.dominantPiece?.ownerId !== piece.ownerId &&
        cell.pieces.every(cellPiece => cellPiece.size < piece.size),
    placePiece: (cell: Cell, piece: Piece): Cell => ({
        ...cell,
        pieces: [...cell.pieces, piece],
        dominantPiece: piece,
    }),
};
