import { Group } from "@mantine/core";
import React from "react";

type MenuContainerProps = {
    children: React.ReactNode;
};

export const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
    return <Group sx={{ width: "100%", justifyContent: "center" }}>{children}</Group>;
};
