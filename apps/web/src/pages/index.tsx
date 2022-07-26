import { MenuContainer } from "@components/Menu";
import { MenuItemLink, MenuItemProps } from "@components/Menu/MenuItem";
import { Layout } from "@components/shared/Layout";
import type { NextPage } from "next";
import { GiBabyfootPlayers, GiVintageRobot, GiWireframeGlobe } from "react-icons/gi";

const menuItems: (MenuItemProps & { href: string; "data-cy": string })[] = [
    {
        href: "/local1v1",
        icon: <GiBabyfootPlayers />,
        text: "Local 1v1",
        "data-cy": "local1v1",
    },
    {
        href: "/playerVsAi",
        icon: <GiVintageRobot />,
        text: "Play against AI",
        "data-cy": "playerVsAi",
    },
    {
        href: "/online",
        icon: <GiWireframeGlobe />,
        text: "Play online",
        "data-cy": "onlineGame",
    },
];

const Home: NextPage = () => {
    return (
        <Layout>
            <MenuContainer>
                {menuItems.map(menuItemProps => (
                    <MenuItemLink key={menuItemProps.text} {...menuItemProps} />
                ))}
            </MenuContainer>
        </Layout>
    );
};

export default Home;
