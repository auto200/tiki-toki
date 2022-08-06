import { Container } from "@mantine/core";
import { PieceType } from "common/models";
import { Piece as GamePiece, PieceSize } from "tic-tac-shared";

const PIECE_SIZE_TO_PX: { [key in PieceSize]: number } = {
    [PieceSize.small]: 30,
    [PieceSize.medium]: 50,
    [PieceSize.big]: 70,
};
const BASE_BORDER_WIDTH = 2;

type PieceProps = {
    piece: GamePiece;
    type: PieceType;
};

export const Piece: React.FC<PieceProps> = ({ piece, type }) => {
    return (
        <Container
            sx={({ colors }) => ({
                border: `2px solid ${type === "ally" ? colors.green[8] : colors.red[8]}`,
                borderWidth: BASE_BORDER_WIDTH + piece.size,
                borderRadius: "50%",
                padding: 0,
                width: PIECE_SIZE_TO_PX[piece.size],
                height: PIECE_SIZE_TO_PX[piece.size],
                ...(piece.used && { visibility: "hidden" }),
            })}
        />
    );
};
