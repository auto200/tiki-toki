import { Piece, PieceProps } from "@components/Piece";
import {
    Button,
    ButtonProps,
    createPolymorphicComponent,
    createStyles,
    keyframes,
} from "@mantine/core";
import React from "react";
import { Cell, Piece as GamePiece } from "tic-tac-shared/game-core";

const scaleIn = keyframes({
    from: { transform: "scale(0.5)" },
    to: { transform: "scale(1)" },
});

const useStyles = createStyles(({ colors }) => ({
    wrapper: {
        backgroundColor: colors.dark[8],
        width: "100%",
        height: "100%",
        borderRadius: 0,
        aspectRatio: "1",
        padding: 0,
        animation: `${scaleIn} 1s ease-in-out forwards`,
        cursor: "pointer",

        "&:hover": { backgroundColor: colors.dark[7], cursor: "pointer" },
        "&:disabled": { backgroundColor: colors.dark[8] },
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
    isHovering: boolean;
} & ButtonProps;

const _BoardCell: React.FC<BoardCellProps> = ({
    cellIndex,
    cell,
    makeMove,
    canPlace,
    allPlayersPieces,
    selectedPiece,
    getPieceColor,
    isHovering,
    ...rest
}) => {
    const { classes } = useStyles();

    const displayPiecePreview = isHovering && selectedPiece && canPlace;
    const dominantPiece = allPlayersPieces.find(({ id }) => id === cell.dominantPieceId);

    return (
        <Button
            data-cy={`cell-${cellIndex}`}
            onClick={() => makeMove(cell.id)}
            className={classes.wrapper}
            style={{ transformOrigin: getCellTransformOrigin(cellIndex) }}
            disabled={!canPlace}
            {...rest}
        >
            {displayPiecePreview && (
                <Piece piece={selectedPiece} color={getPieceColor(selectedPiece)} dimmed />
            )}
            {!displayPiecePreview && dominantPiece && (
                <Piece piece={dominantPiece} color={getPieceColor(dominantPiece)} animate />
            )}
        </Button>
    );
};

export const BoardCell = createPolymorphicComponent<"button", BoardCellProps>(_BoardCell);
