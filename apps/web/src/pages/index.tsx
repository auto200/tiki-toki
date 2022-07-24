import { Button, Center, Group } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
            <Group>
                <Button disabled>Play online</Button>
                <Link href="local1v1">
                    <Button>Local 1v1</Button>
                </Link>
                <Button disabled>Play against AI</Button>
            </Group>
        </Center>
    );
};

export default Home;
