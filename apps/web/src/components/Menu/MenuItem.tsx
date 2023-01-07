import { Button, ButtonProps, createPolymorphicComponent, createStyles, Text } from "@mantine/core";
import React, { forwardRef } from "react";

const useStyles = createStyles(({ colors, spacing }) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        paddingBlock: spacing.xl,
        border: `2px solid ${colors.indigo[8]}`,
        borderRadius: 5,
        color: colors.dark[0],
        textAlign: "center",
        textDecoration: "none",
        transition: "transform 0.2s",
        backgroundColor: "transparent",
        cursor: "pointer",
        "&:hover:enabled": {
            transform: "translateY(-5px) scale(1.03)",
        },
        "&:disabled": {
            opacity: 0.5,
            cursor: "auto",
        },
    },
    icon: {
        fontSize: 100,
    },
}));

export type MenuItemProps = {
    icon: React.ReactNode;
    text: string;
} & ButtonProps;

const _MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({ icon, text, ...rest }, ref) => {
    const { classes } = useStyles();

    return (
        <Button ref={ref} unstyled className={classes.wrapper} {...rest}>
            <Text className={classes.icon}>{icon}</Text>
            <Text weight="bold" size="xl">
                {text}
            </Text>
        </Button>
    );
});

_MenuItem.displayName = "MenuItem";
export const MenuItem = createPolymorphicComponent<"button", MenuItemProps>(_MenuItem);
