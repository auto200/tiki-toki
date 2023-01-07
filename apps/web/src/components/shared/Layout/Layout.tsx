import { Anchor, Box, Center } from "@mantine/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

type LayoutProps = {
    children: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();

    const showHomeButton = pathname !== "/";

    return (
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
            {/* //TODO: we probably shouldn't show this on mobile view */}
            {showHomeButton && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 15,
                        left: 15,
                        fontSize: 30,
                        cursor: "pointer",
                        opacity: 0.5,
                        transition: "opacity 0.2s",
                        "&:hover": {
                            opacity: 1,
                        },
                    }}
                >
                    <NextLink href="/" legacyBehavior passHref>
                        <Anchor sx={{ fontSize: "inherit", color: "inherit" }}>
                            <AiOutlineHome />
                        </Anchor>
                    </NextLink>
                </Box>
            )}
            {children}
        </Center>
    );
};
