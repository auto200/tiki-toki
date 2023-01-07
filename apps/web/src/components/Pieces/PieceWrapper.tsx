import {
    Button,
    ButtonProps,
    createPolymorphicComponent,
    createStyles,
    keyframes,
} from "@mantine/core";
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
        justifyContent: "center",
        height: "100%",
        padding: spacing.sm,
        margin: "0 auto",
        aspectRatio: "1",
        borderRadius: 0,
        backgroundColor: "transparent",
        transformOrigin: "center",
        opacity: 0,
        animation: `${appear} 1s ease-in-out forwards`,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: colors.dark[5],
        },
        "&:disabled": {
            cursor: "auto",
            backgroundColor: "transparent",
        },
    },
    selected: {
        outline: `3px solid ${colors.dark[5]} !important`,
        outlineOffset: "0 !important",
    },
}));

type PieceWrapperProps = {
    children: React.ReactNode;
    isSelected: boolean;
} & ButtonProps;

export const _PieceWrapper: React.FC<PieceWrapperProps> = ({ children, isSelected, ...rest }) => {
    const { classes, cx } = useStyles();

    return (
        <Button
            className={cx(classes.wrapper, {
                [classes.selected]: isSelected,
            })}
            {...rest}
        >
            {children}
        </Button>
    );
};

export const PieceWrapper = createPolymorphicComponent<"button", PieceWrapperProps>(_PieceWrapper);
