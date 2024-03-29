import { PieceProps } from "@components/Piece";
import { createStyles, SimpleGrid } from "@mantine/core";
import { EndGameComposition } from "common/models";
import { useState } from "react";
import { Board as GameBoard, Cell, GRID_SIZE, Piece as GamePiece } from "tic-tac-shared/game-core";
import { BoardCell } from "./BoardCell";
import { EndGameAnimation } from "./EndGameAnimation";

const useStyles = createStyles(({ colors }) => ({
    grid: {
        position: "relative",
        aspectRatio: "1",
        backgroundColor: colors.gray[4],
    },
}));

export type BoardProps = {
    board: GameBoard;
    makeMove: (cellId: Cell["id"]) => void;
    canPlaceIn: Cell["id"][];
    getPieceColor: (piece: GamePiece) => PieceProps["color"];
    selectedPiece: GamePiece | null;
    allPlayersPieces: GamePiece[];
    endGameComposition: EndGameComposition;
};

export const Board: React.FC<BoardProps> = ({
    board,
    makeMove,
    canPlaceIn,
    getPieceColor,
    selectedPiece,
    allPlayersPieces,
    endGameComposition,
}) => {
    const { classes } = useStyles();
    const [hoveringCellId, setHoveringCellId] = useState<null | Cell["id"]>(null);

    return (
        <SimpleGrid cols={GRID_SIZE} spacing="sm" className={classes.grid}>
            {board.cells.map((cell, i) => (
                <BoardCell
                    key={cell.id}
                    cellIndex={i}
                    makeMove={makeMove}
                    canPlace={!!selectedPiece && canPlaceIn.includes(cell.id)}
                    cell={cell}
                    allPlayersPieces={allPlayersPieces}
                    getPieceColor={getPieceColor}
                    selectedPiece={selectedPiece}
                    isHovering={hoveringCellId === cell.id}
                    onMouseEnter={() => selectedPiece && setHoveringCellId(cell.id)}
                    onMouseLeave={() => setHoveringCellId(null)}
                />
            ))}
            {endGameComposition && <EndGameAnimation composition={endGameComposition} />}
        </SimpleGrid>
    );
};
