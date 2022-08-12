import { NextPage } from "next";
import dynamic from "next/dynamic";

const PlayerVsAi: NextPage = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const PlayerVsAi = dynamic<{}>(
        import("modules/PlayerVsAi").then(mod => mod.PlayerVsAi),
        { ssr: false },
    );

    return <PlayerVsAi />;
};

export default PlayerVsAi;
