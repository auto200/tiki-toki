import { PieceProps } from "@components/Piece";
import { Container, createStyles, keyframes } from "@mantine/core";
import React from "react";

const appear = keyframes({
    from: {
        opacity: 0,
        transform: "scale(0)",
    },
    to: {
        opacity: 1,
        transform: "scale(1)",
    },
});

const useStyles = createStyles(({ spacing, colors }) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: spacing.sm,
        aspectRatio: "1",
        transformOrigin: "center",
        opacity: 0,
        animation: `${appear} 1s ease-in-out forwards`,
    },
    selected: {
        outline: `3px solid ${colors.dark[5]}`,
    },
    usable: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: colors.dark[5],
        },
    },
}));

type PieceWrapperProps = {
    children: React.ReactNode;
    pieceColor: PieceProps["color"];
    pieceIndex: number;
    canUse: boolean;
    isSelected: boolean;
    onSelect: () => void;
};

export const PieceWrapper: React.FC<PieceWrapperProps> = ({
    children,
    pieceColor,
    pieceIndex,
    canUse,
    isSelected,
    onSelect,
}) => {
    const { classes, cx } = useStyles();

    return (
        <Container
            data-cy={`piece-${pieceColor}-${pieceIndex}`}
            onClick={() => canUse && onSelect()}
            className={cx(classes.wrapper, {
                [classes.selected]: isSelected,
                [classes.usable]: canUse,
            })}
            style={{ animationDelay: `${pieceIndex * 0.12}s` }}
        >
            {children}
        </Container>
    );
};
