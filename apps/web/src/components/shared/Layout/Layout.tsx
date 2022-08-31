import { Center } from "@mantine/core";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
            {children}
        </Center>
    );
};
