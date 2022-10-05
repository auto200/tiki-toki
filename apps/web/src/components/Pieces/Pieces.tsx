import { Piece, PieceProps } from "@components/Piece";
import { Container, SimpleGrid } from "@mantine/core";
import { Piece as GamePiece } from "tic-tac-shared";

type PiecesProps = {
    pieces: GamePiece[];
    turnActive: boolean;
    piecesColor: PieceProps["color"];
    selectedPieceId: GamePiece["id"] | null;
    selectPiece: (id: string) => void;
    canMakeMove: boolean;
};

export const Pieces: React.FC<PiecesProps> = ({
    pieces,
    turnActive,
    piecesColor,
    selectedPieceId,
    selectPiece,
    canMakeMove,
}) => {
    return (
        <SimpleGrid
            cols={3}
            breakpoints={[{ minWidth: 600, cols: 6 }]}
            m="sm"
            p="sm"
            sx={({ colors }) => ({
                ...(turnActive && {
                    outline: `2px solid ${colors.gray![4]}`,
                }),
            })}
        >
            {pieces.map((piece, i) => {
                const canUse = turnActive && canMakeMove && !piece.used;
                return (
                    <Container
                        key={piece.id}
                        data-cy={`piece-${piecesColor}-${i}`}
                        onClick={() => canUse && selectPiece(piece.id)}
                        sx={({ colors, spacing }) => ({
                            display: "flex",
                            alignItems: "center",
                            padding: spacing.sm,
                            aspectRatio: "1",
                            ...(canUse && {
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: colors.dark![5],
                                },
                            }),
                            outline:
                                selectedPieceId === piece.id ? `3px solid ${colors.dark![5]}` : "",
                        })}
                    >
                        <Piece piece={piece} color={piecesColor} dimmed={piece.used} />
                    </Container>
                );
            })}
        </SimpleGrid>
    );
};
