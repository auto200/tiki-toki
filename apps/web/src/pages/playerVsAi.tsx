import { OfflineGameProps } from "modules/OfflineGame/OfflineGame";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const PlayerVsAi: NextPage = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const OfflineGame = dynamic<OfflineGameProps>(
        import("modules/OfflineGame").then(mod => mod.OfflineGame),
        { ssr: false },
    );

    return <OfflineGame mode="playerVsAi" />;
};

export default PlayerVsAi;
