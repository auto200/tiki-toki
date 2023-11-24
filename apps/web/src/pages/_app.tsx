import { MantineProvider } from "@mantine/core";
import { NextPageWithLayout } from "common/types";
import { AnalyticsProvider } from "modules/analytics/AnalyticsProvider";
import { AppProps } from "next/app";
import Head from "next/head";

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
    const { Component, pageProps } = props;

    const getLayout = Component.getLayout ?? (page => page);

    return (
        <>
            <Head>
                <title>Tiki Toki</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <AnalyticsProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "dark",
                    }}
                >
                    {getLayout(<Component {...pageProps} />)}
                </MantineProvider>
            </AnalyticsProvider>
        </>
    );
}
