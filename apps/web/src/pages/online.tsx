import { Layout } from "@components/shared/Layout";
import { NextPageWithLayout } from "common/types";
import { OnlineGame } from "modules/OnlineGame";

const Online: NextPageWithLayout = () => {
    return <OnlineGame />;
};
Online.getLayout = page => <Layout>{page}</Layout>;

export default Online;
