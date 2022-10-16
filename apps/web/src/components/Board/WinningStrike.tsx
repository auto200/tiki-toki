import { Box, createStyles } from "@mantine/core";
import { END_GAME_ANIMATION_DURATION_MS } from "common/constants";
import React from "react";
import { WinningComposition } from "tic-tac-shared";

type WinningStrikeProps = {
    composition: WinningComposition;
};
const LINE_WIDTH = {
    value: 15,
    px: "15px",
};
const useStyles = createStyles(({ colors }) => ({
    container: {
        position: "absolute",
        width: "calc(100% - 16px)",
        marginLeft: 10,
        marginRight: 10,
        "& rect": {
            fill: colors.indigo![7],
        },
    },
    "row-1": {
        top: "14.5%",
    },
    "row-2": {
        top: "47.5%",
    },
    "row-3": {
        top: "81.5%",
    },
    "col-1": {
        top: -5,
        left: "14.5%",
        transform: "rotate(90deg)",
        transformOrigin: "left",
    },
    "col-2": {
        top: -5,
        left: `calc(50% - (${LINE_WIDTH.px} / 2))`,
        transform: "rotate(90deg)",
        transformOrigin: "left",
    },
    "col-3": {
        top: -5,
        left: "82%",
        transform: "rotate(90deg)",
        transformOrigin: "left",
    },
    "dia-1": {
        top: "50%",
        transform: "rotate(45deg) scaleX(1.2)",
    },
    "dia-2": {
        top: "50%",
        transform: "rotate(-45deg) scaleX(1.2)",
    },
}));

export const WinningStrike: React.FC<WinningStrikeProps> = ({ composition }) => {
    const { classes, cx } = useStyles();

    return (
        <Box className={cx(classes.container, classes[composition])}>
            <svg width="100%" height={LINE_WIDTH.px}>
                <rect
                    x="1"
                    y="1"
                    width="100%"
                    height={LINE_WIDTH.px}
                    strokeWidth="1"
                    ry="10px"
                    rx="10px"
                >
                    <animate
                        attributeName="width"
                        from="0"
                        to="100%"
                        dur={`${END_GAME_ANIMATION_DURATION_MS}ms`}
                    />
                </rect>
            </svg>
        </Box>
    );
};
