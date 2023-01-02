import { Piece, PieceProps } from "@components/Piece";
import { createStyles, SimpleGrid } from "@mantine/core";
import { Piece as GamePiece } from "tic-tac-shared";
import { PieceWrapper } from "./PieceWrapper";

const useStyles = createStyles(({ spacing, colors }) => ({
    wrapper: {
        margin: spacing.sm,
        padding: spacing.sm,
    },
    turnActive: {
        outline: `2px solid ${colors.gray[4]}`,
    },
}));

type PiecesProps = {
    pieces: GamePiece[];
    isTurnActive: boolean;
    piecesColor: PieceProps["color"];
    selectedPieceId: GamePiece["id"] | null;
    selectPiece: (id: string) => void;
    canMakeMove: boolean;
};

export const Pieces: React.FC<PiecesProps> = ({
    pieces,
    isTurnActive,
    piecesColor,
    selectedPieceId,
    selectPiece,
    canMakeMove,
}) => {
    const { classes, cx } = useStyles();

    return (
        <SimpleGrid
            cols={3}
            breakpoints={[{ minWidth: 600, cols: 6 }]}
            className={cx(classes.wrapper, { [classes.turnActive]: isTurnActive })}
        >
            {pieces.map((piece, i) => (
                <PieceWrapper
                    key={piece.id}
                    pieceIndex={i}
                    pieceColor={piecesColor}
                    canUse={isTurnActive && canMakeMove && !piece.used}
                    isSelected={selectedPieceId === piece.id}
                    onSelect={() => selectPiece(piece.id)}
                >
                    <Piece piece={piece} color={piecesColor} dimmed={piece.used} animate />
                </PieceWrapper>
            ))}
        </SimpleGrid>
    );
};
