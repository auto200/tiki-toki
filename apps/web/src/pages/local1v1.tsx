import { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
    //ad1. Lazy importing actual game because there is no additional value in
    //prerendering and it only generates css class mismatches
    //ad2. nextjs' `dynamic` typing - https://stackoverflow.com/a/69353026
    const Local1v1 = dynamic<{}>(
        import("modules/Local1v1").then(mod => mod.Local1v1),
        { ssr: false },
    );

    return <Local1v1 />;
};

export default Home;
