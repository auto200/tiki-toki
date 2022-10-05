import { Piece, PieceProps } from "@components/Piece";
import { Center, createStyles, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { Board as GameBoard, Cell, GRID_SIZE, Piece as GamePiece } from "tic-tac-shared";

const useStyles = createStyles(({ colors }) => ({
    grid: {
        aspectRatio: "1",
        backgroundColor: colors.gray![4],
    },
    cell: {
        backgroundColor: colors.dark![8],
        width: "100%",
        aspectRatio: "1",
    },
    "cell--can-place": {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: colors.dark![7],
        },
    },
}));

type BoardProps = {
    board: GameBoard;
    makeMove: (cellId: Cell["id"]) => void;
    canPlaceIn: Cell["id"][];
    getPieceColor: (piece: GamePiece) => PieceProps["color"];
    selectedPiece: GamePiece | null;
    allPlayersPieces: GamePiece[];
};

export const Board: React.FC<BoardProps> = ({
    board,
    makeMove,
    canPlaceIn,
    getPieceColor,
    selectedPiece,
    allPlayersPieces,
}) => {
    const { classes, cx } = useStyles();
    const [hoveringCellId, setHoveringCellId] = useState<Cell["id"] | null>(null);

    return (
        <SimpleGrid cols={GRID_SIZE} spacing="sm" className={classes.grid}>
            {board.cells.map((cell, i) => {
                const isHovering = hoveringCellId === cell.id;
                const canPlace = selectedPiece && canPlaceIn.includes(cell.id);
                const dominantPiece = allPlayersPieces.find(
                    ({ id }) => id === cell.dominantPieceId,
                );
                return (
                    <Center
                        key={cell.id}
                        data-cy={`cell-${i}`}
                        onClick={() => canPlace && makeMove(cell.id)}
                        className={cx(classes.cell, { [classes["cell--can-place"]]: canPlace })}
                        onMouseEnter={() => setHoveringCellId(cell.id)}
                        onMouseLeave={() => setHoveringCellId(null)}
                    >
                        {isHovering && canPlace ? (
                            <Piece
                                piece={selectedPiece}
                                color={getPieceColor(selectedPiece)}
                                dimmed
                            />
                        ) : dominantPiece ? (
                            <Piece piece={dominantPiece} color={getPieceColor(dominantPiece)} />
                        ) : null}
                    </Center>
                );
            })}
        </SimpleGrid>
    );
};
