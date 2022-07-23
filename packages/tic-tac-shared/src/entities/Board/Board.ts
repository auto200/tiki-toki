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
};