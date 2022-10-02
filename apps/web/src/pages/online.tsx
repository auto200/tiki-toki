import { Layout } from "@components/shared/Layout";
import { OnlineGame } from "modules/OnlineGame";
import { NextPage } from "next";

const Online: NextPage = () => {
    return (
        <Layout>
            <OnlineGame />
        </Layout>
    );
};

export default Online;
