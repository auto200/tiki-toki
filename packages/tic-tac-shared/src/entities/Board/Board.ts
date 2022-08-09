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
    placePiece: (board: Board, targetCell: Cell, piece: Piece): Board => ({
        ...board,
        cells: board.cells.map(boardCell =>
            boardCell.id === targetCell.id ? Cell.placePiece(targetCell, piece) : boardCell,
        ),
    }),
    getCellById: (board: Board, cellId: Cell["id"]): Cell | null =>
        board.cells.find(({ id }) => cellId === id) || null,
    getAllCellIdsThatPieceCanBePlacedIn: (board: Board, piece: Piece): string[] =>
        board.cells.filter(cell => Cell.canPlacePiece(cell, piece)).map(({ id }) => id),
};
