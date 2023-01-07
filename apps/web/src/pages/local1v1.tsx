import { Layout } from "@components/shared/Layout";
import { NextPageWithLayout } from "common/types";
import { OfflineGameProps } from "modules/OfflineGame/OfflineGame";
import dynamic from "next/dynamic";

const Local1v1: NextPageWithLayout = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const OfflineGame = dynamic<OfflineGameProps>(
        import("modules/OfflineGame").then(mod => mod.OfflineGame),
        { ssr: false },
    );

    return <OfflineGame mode="local1v1" />;
};

Local1v1.getLayout = page => <Layout>{page}</Layout>;

export default Local1v1;
