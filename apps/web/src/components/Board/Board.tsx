import { Piece } from "@components/Piece";
import { Center, createStyles, SimpleGrid } from "@mantine/core";
import { PieceType } from "common/models";
import { useState } from "react";
import { Board as GameBoard, Cell, GRID_SIZE, Piece as GamePiece } from "tic-tac-shared";

const useStyles = createStyles(({ colors }) => ({
    grid: {
        aspectRatio: "1",
        backgroundColor: colors.gray[4],
    },
    cell: {
        backgroundColor: colors.dark[8],
        width: "100%",
        aspectRatio: "1",
    },
    "cell--can-place": {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: colors.dark[7],
        },
    },
}));

type BoardProps = {
    board: GameBoard;
    makeMove: (cellId: Cell["id"]) => void;
    canPlaceIn: Cell["id"][];
    getPieceType: (piece: GamePiece) => PieceType;
    selectedPiece: GamePiece | null;
    allPlayersPieces: GamePiece[];
};

export const Board: React.FC<BoardProps> = ({
    board,
    makeMove,
    canPlaceIn,
    getPieceType,
    selectedPiece,
    allPlayersPieces,
}) => {
    const { classes, cx } = useStyles();
    const [hoveringCellId, setHoveringCellId] = useState<Cell["id"] | null>(null);

    return (
        <SimpleGrid cols={GRID_SIZE} spacing="sm" className={classes.grid}>
            {board.cells.map((cell, i) => {
                const canPlace = canPlaceIn.includes(cell.id);
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
                        {canPlace && selectedPiece && hoveringCellId === cell.id ? (
                            <Piece
                                piece={selectedPiece}
                                type={getPieceType(selectedPiece)}
                                dimmed
                            />
                        ) : dominantPiece ? (
                            <Piece piece={dominantPiece} type={getPieceType(dominantPiece)} />
                        ) : null}
                    </Center>
                );
            })}
        </SimpleGrid>
    );
};
