import { PieceProps } from "@components/Piece";
import { Center, createPolymorphicComponent, createStyles, keyframes } from "@mantine/core";
import React, { forwardRef, useState } from "react";
import { Cell, Piece as GamePiece } from "tic-tac-shared";
import { BoardCellPiece } from "./BoardCellPiece";

const scaleIn = keyframes({
    from: { transform: "scale(0.5)" },
    to: { transform: "scale(1)" },
});

const useStyles = createStyles(({ colors }) => ({
    wrapper: {
        backgroundColor: colors.dark![8],
        width: "100%",
        aspectRatio: "1",
        animation: `${scaleIn} 1s ease-in-out forwards`,
    },
    canPlace: {
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

type BoardCellProps = {
    cellIndex: number;
    makeMove: (id: string) => void;
    cell: Cell;
    canPlace: boolean;
    allPlayersPieces: GamePiece[];
    selectedPiece: GamePiece | null;
    getPieceColor: (piece: GamePiece) => PieceProps["color"];
};

const _BoardCell: React.FC<BoardCellProps> = forwardRef(
    ({ cellIndex, cell, makeMove, canPlace, allPlayersPieces, selectedPiece, getPieceColor }) => {
        const { classes, cx } = useStyles();
        const [isHovering, setIsHovering] = useState(false);

        const dominantPiece = allPlayersPieces.find(({ id }) => id === cell.dominantPieceId);

        return (
            <Center
                data-cy={`cell-${cellIndex}`}
                onClick={() => canPlace && makeMove(cell.id)}
                className={cx(classes.wrapper, { [classes.canPlace]: canPlace })}
                style={{ transformOrigin: getCellTransformOrigin(cellIndex) }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <BoardCellPiece
                    canPlace={canPlace}
                    dominantPiece={dominantPiece}
                    getPieceColor={getPieceColor}
                    isHovering={isHovering}
                    selectedPiece={selectedPiece}
                />
            </Center>
        );
    },
);

_BoardCell.displayName = "BoardCell";

export const BoardCell = createPolymorphicComponent<"div", BoardCellProps>(_BoardCell);
