import { GRID_SIZE } from "@constants";
import { Cell } from "../Cell";
import times from "lodash/times";
import { Piece } from "../Piece";

export type Board = {
    cells: Cell[];
};

export const Board = {
    create: (cells: Cell[] = times(GRID_SIZE * GRID_SIZE, () => Cell.create())): Board => ({
        cells,
    }),
    placePiece: (board: Board, cell: Cell, piece: Piece): Board => ({
        ...board,
        cells: board.cells.map(boardCell =>
            boardCell.id === cell.id ? Cell.placePiece(cell, piece) : cell,
        ),
    }),
};
