import { Container, SimpleGrid } from "@mantine/core";
import { Piece, PieceSize } from "tic-tac-shared";

const PIECE_SIZE_TO_PX: { [key in PieceSize]: number } = {
    [PieceSize.small]: 30,
    [PieceSize.medium]: 50,
    [PieceSize.big]: 70,
};

type PiecesProps = {
    pieces: Piece[];
    turnActive: boolean;
    piecesColor: "enemy" | "ally";
    selectedPieceId: Piece["id"] | null;
    setSelectedPieceId: (id: string) => void;
};

const BASE_BORDER_WIDTH = 2;

export const Pieces: React.FC<PiecesProps> = ({
    pieces,
    turnActive,
    piecesColor,
    selectedPieceId,
    setSelectedPieceId,
}) => {
    return (
        <SimpleGrid
            cols={3}
            breakpoints={[{ minWidth: 600, cols: 6 }]}
            sx={({ colors, spacing }) => ({
                padding: spacing.lg,
                ...(turnActive && {
                    outline: `2px solid ${colors.gray[4]}`,
                }),
            })}
        >
            {pieces.map(piece => {
                const canUse = turnActive && !piece.used;
                return (
                    <Container
                        key={piece.id}
                        onClick={() => canUse && setSelectedPieceId(piece.id)}
                        sx={({ colors, spacing }) => ({
                            display: "flex",
                            alignItems: "center",
                            padding: spacing.sm,
                            aspectRatio: "1",
                            ...(canUse && {
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: colors.dark[5],
                                },
                            }),
                            outline:
                                selectedPieceId === piece.id ? `3px solid ${colors.dark[5]}` : "",
                        })}
                    >
                        <Container
                            sx={({ colors }) => ({
                                border: `2px solid ${
                                    piecesColor === "ally" ? colors.green[8] : colors.red[8]
                                }`,
                                borderWidth: BASE_BORDER_WIDTH + piece.size,
                                borderRadius: "50%",
                                padding: 0,
                                width: PIECE_SIZE_TO_PX[piece.size],
                                height: PIECE_SIZE_TO_PX[piece.size],
                                ...(piece.used && { visibility: "hidden" }),
                            })}
                        />
                    </Container>
                );
            })}
        </SimpleGrid>
    );
};
