import { Piece, PieceProps } from "@components/Piece";
import { Center, createStyles, SimpleGrid } from "@mantine/core";
import { EndGameComposition } from "common/models";
import { motion } from "framer-motion";
import { useState } from "react";
import { Board as GameBoard, Cell, GRID_SIZE, Piece as GamePiece } from "tic-tac-shared";
import { WinningStrike } from "./WinningStrike";

const useStyles = createStyles(({ colors }) => ({
    grid: {
        position: "relative",
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

const getCellTransformOrigin = (cellIndex: number): string => {
    switch (cellIndex) {
        case 0:
            return "top left";
        case 1:
            return "top";
        case 2:
            return "top right";
        case 3:
            return "left";
        case 4:
            return "center";
        case 5:
            return "right";
        case 6:
            return "bottom left";
        case 7:
            return "bottom";
        case 8:
            return "bottom right";
        default:
            return "center";
    }
};

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
                        component={motion.div}
                        onClick={() => canPlace && makeMove(cell.id)}
                        className={cx(classes.cell, { [classes["cell--can-place"]]: canPlace })}
                        onMouseEnter={() => setHoveringCellId(cell.id)}
                        onMouseLeave={() => setHoveringCellId(null)}
                        initial={{
                            scale: 0.5,
                            transformOrigin: getCellTransformOrigin(i),
                        }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                    >
                        {isHovering && canPlace ? (
                            <Piece
                                piece={selectedPiece}
                                color={getPieceColor(selectedPiece)}
                                dimmed
                            />
                        ) : dominantPiece ? (
                            <Piece
                                piece={dominantPiece}
                                color={getPieceColor(dominantPiece)}
                                animate
                            />
                        ) : null}
                    </Center>
                );
            })}
            {endGameComposition &&
                (endGameComposition === "DRAW" ? (
                    <>
                        <WinningStrike composition={"dia-1"} />
                        <WinningStrike composition={"dia-2"} />
                    </>
                ) : (
                    <WinningStrike composition={endGameComposition} />
                ))}
        </SimpleGrid>
    );
};
