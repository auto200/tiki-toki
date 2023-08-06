import times from "lodash/times";
import { GRID_SIZE } from "../../constants";
import { Cell } from "../Cell";
import { Piece } from "../Piece";

export type Board = {
    cells: Cell[];
};

export const Board = {
    create: (cells: Cell[] = times(GRID_SIZE * GRID_SIZE, () => Cell.create())): Board => ({
        cells,
    }),
    placePiece: (board: Board, targetCellId: Cell["id"], pieceId: Piece["id"]): Board => ({
        ...board,
        cells: board.cells.map(cell =>
            cell.id === targetCellId ? Cell.placePiece(cell, pieceId) : cell,
        ),
    }),
    getCellById: (board: Board, cellId: Cell["id"]): Cell | null =>
        board.cells.find(({ id }) => cellId === id) || null,
    getAllCellIdsThatPieceCanBePlacedIn: (
        board: Board,
        piece: Piece,
        allPLayersPieces: Piece[],
    ): string[] =>
        board.cells
            .filter(cell => Cell.canPlacePiece(cell, piece, allPLayersPieces))
            .map(({ id }) => id),
};
