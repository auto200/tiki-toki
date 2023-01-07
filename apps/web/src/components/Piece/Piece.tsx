import { Container, createStyles } from "@mantine/core";
import { Piece as GamePiece, PieceSize } from "tic-tac-shared";

const PIECE_SIZE_TO_PX: Record<PieceSize, number> = {
    [PieceSize.small]: 30,
    [PieceSize.medium]: 50,
    [PieceSize.big]: 70,
};
const BASE_BORDER_WIDTH = 2;

const useStyles = createStyles(
    ({ colors }, { pieceSize, color }: { pieceSize: PieceSize; color: PieceProps["color"] }) => ({
        piece: {
            border: `2px solid ${colors[color][8]}`,
            borderWidth: BASE_BORDER_WIDTH + pieceSize,
            borderRadius: "50%",
            padding: 0,
            width: PIECE_SIZE_TO_PX[pieceSize],
            height: PIECE_SIZE_TO_PX[pieceSize],
        },
        dimmed: {
            opacity: 0.2,
        },
        animate: {
            transition: "opacity 0.2s",
        },
    }),
);

export type PieceProps = {
    piece: GamePiece;
    color: "green" | "red";
    dimmed?: boolean;
    animate?: boolean;
};

export const Piece: React.FC<PieceProps> = ({ piece, color, dimmed, animate }) => {
    const { classes, cx } = useStyles({ pieceSize: piece.size, color });
    return (
        <Container
            className={cx(classes.piece, { [classes.dimmed]: dimmed, [classes.animate]: animate })}
        />
    );
};
