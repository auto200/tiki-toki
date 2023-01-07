import { Layout } from "@components/shared/Layout";
import { NextPageWithLayout } from "common/types";
import { OfflineGameProps } from "modules/OfflineGame/OfflineGame";
import dynamic from "next/dynamic";

const PlayerVsAi: NextPageWithLayout = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const OfflineGame = dynamic<OfflineGameProps>(
        import("modules/OfflineGame").then(mod => mod.OfflineGame),
        { ssr: false },
    );

    return (
        <Layout>
            <OfflineGame mode="playerVsAi" />
        </Layout>
    );
};

PlayerVsAi.getLayout = page => <Layout>{page}</Layout>;

export default PlayerVsAi;
