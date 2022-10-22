import { Box, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import React from "react";

export type MenuItemProps = {
    icon: React.ReactNode;
    text: string;
    disabled?: boolean;
} & Record<string, any>;

export const MenuItem = ({ icon, text, disabled, ...rest }: MenuItemProps) => {
    return (
        <Box
            sx={({ colors, spacing }) => ({
                width: 200,
                paddingBottom: spacing.xl,
                border: `2px solid ${colors.indigo![8]}`,
                borderRadius: 5,
                cursor: "pointer",
                textAlign: "center",
                color: colors.dark![0],
                transition: "transform 0.2s",
                ...(disabled
                    ? {
                          opacity: 0.5,
                      }
                    : {
                          "&:hover": {
                              transform: "translateY(-5px) scale(1.03)",
                          },
                      }),
            })}
            onClick={() => {
                !disabled && rest.onClick && rest.onClick();
            }}
        >
            <Box sx={{ fontSize: 100 }}>{icon}</Box>
            <Text weight="bold" size="xl">
                {text}
            </Text>
        </Box>
    );
};

export type MenuItemLinkProps = {
    href: string;
} & MenuItemProps;

export const MenuItemLink = ({ href, ...menuItemProps }: MenuItemLinkProps) => {
    return (
        <NextLink href={href} style={{ width: 200, textDecoration: "none" }}>
            <MenuItem {...menuItemProps} />
        </NextLink>
    );
};
