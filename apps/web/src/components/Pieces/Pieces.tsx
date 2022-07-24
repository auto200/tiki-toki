import { Container, Group } from "@mantine/core";
import { Piece, PieceSize } from "tic-tac-shared";

const PIECE_SIZE_TO_PX: { [key in PieceSize]: number } = {
    [PieceSize.small]: 30,
    [PieceSize.medium]: 50,
    [PieceSize.big]: 70,
};

type PiecesProps = {
    pieces: Piece[];
};

const BASE_BORDER_WIDTH = 2;

export const Pieces: React.FC<PiecesProps> = ({ pieces }) => {
    return (
        <Group>
            {pieces.map(piece => (
                <Container
                    key={piece.id}
                    sx={({ colors, spacing }) => ({
                        padding: spacing.sm,
                        cursor: "pointer",
                        "&:hover": {
                            outline: `3px solid ${colors.dark[5]}`,
                        },
                    })}
                >
                    <Container
                        sx={{
                            border: "2px solid green",
                            borderWidth: BASE_BORDER_WIDTH + piece.size,
                            borderRadius: "50%",
                            padding: 0,
                            width: PIECE_SIZE_TO_PX[piece.size],
                            height: PIECE_SIZE_TO_PX[piece.size],
                        }}
                    />
                </Container>
            ))}
        </Group>
    );
};
