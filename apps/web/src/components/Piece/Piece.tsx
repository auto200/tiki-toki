import { Container } from "@mantine/core";
import { Piece as GamePiece, PieceSize } from "tic-tac-shared";

const PIECE_SIZE_TO_PX: Record<PieceSize, number> = {
    [PieceSize.small]: 30,
    [PieceSize.medium]: 50,
    [PieceSize.big]: 70,
};
const BASE_BORDER_WIDTH = 2;

export type PieceProps = {
    piece: GamePiece;
    color: "green" | "red";
    dimmed?: boolean;
};

export const Piece: React.FC<PieceProps> = ({ piece, color, dimmed }) => {
    return (
        <Container
            sx={({ colors }) => ({
                border: `2px solid ${colors[color]![8]}`,
                borderWidth: BASE_BORDER_WIDTH + piece.size,
                borderRadius: "50%",
                padding: 0,
                width: PIECE_SIZE_TO_PX[piece.size],
                height: PIECE_SIZE_TO_PX[piece.size],
                ...(dimmed && { opacity: 0.2 }),
            })}
        />
    );
};
