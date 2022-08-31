import { Layout } from "@components/shared/Layout";
import { Button, Group } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <Layout>
            <Group>
                <Link href="/online">
                    <Button>Play online</Button>
                </Link>
                <Link href="/local1v1">
                    <Button data-cy="local1v1">Local 1v1</Button>
                </Link>
                <Link href="/playerVsAi">
                    <Button>Play against AI</Button>
                </Link>
            </Group>
        </Layout>
    );
};

export default Home;
