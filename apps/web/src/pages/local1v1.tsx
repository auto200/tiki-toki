import { Layout } from "@components/shared/Layout";
import { OfflineGameProps } from "modules/OfflineGame/OfflineGame";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const Local1v1: NextPage = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const OfflineGame = dynamic<OfflineGameProps>(
        import("modules/OfflineGame").then(mod => mod.OfflineGame),
        { ssr: false },
    );

    return (
        <Layout>
            <OfflineGame mode="local1v1" />
        </Layout>
    );
};

export default Local1v1;
