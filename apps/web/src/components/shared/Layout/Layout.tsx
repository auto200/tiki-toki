import { Box, Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";

type LayoutProps = {
    children: React.ReactNode;
};
//TODO: we probably shouldn't show this on mobile view
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    const showHomeButton = pathname !== "/";
    return (
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
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
                    <Link href="/">
                        <span>
                            <AiOutlineHome />
                        </span>
                    </Link>
                </Box>
            )}
            {children}
        </Center>
    );
};
