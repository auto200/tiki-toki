import { MenuContainer } from "@components/Menu";
import { MenuItem, MenuItemProps } from "@components/Menu/MenuItem";
import { Layout } from "@components/shared/Layout";
import { NextPageWithLayout } from "common/types";
import NextLink from "next/link";
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

const Home: NextPageWithLayout = () => {
    return (
        <MenuContainer>
            {menuItems.map(item => (
                <NextLink key={item.text} href={item.href} passHref legacyBehavior>
                    <MenuItem
                        component="a"
                        icon={item.icon}
                        text={item.text}
                        data-cy={item["data-cy"]}
                    />
                </NextLink>
            ))}
        </MenuContainer>
    );
};

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
