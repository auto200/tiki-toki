import { Piece } from "@components/Piece/Piece";
import { Container, SimpleGrid } from "@mantine/core";
import { PieceType } from "common/models";
import { Piece as GamePiece } from "tic-tac-shared";

type PiecesProps = {
    pieces: GamePiece[];
    turnActive: boolean;
    piecesType: PieceType;
    selectedPieceId: GamePiece["id"] | null;
    selectPiece: (id: string) => void;
};

export const Pieces: React.FC<PiecesProps> = ({
    pieces,
    turnActive,
    piecesType,
    selectedPieceId,
    selectPiece,
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
                        onClick={() => canUse && selectPiece(piece.id)}
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
                        <Piece piece={piece} type={piecesType} />
                    </Container>
                );
            })}
        </SimpleGrid>
    );
};
