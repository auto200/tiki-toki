import { MantineProvider } from "@mantine/core";
import { GameContextProvider } from "contexts/GameContext";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Tiki Toki</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}
            >
                <GameContextProvider>
                    <Component {...pageProps} />
                </GameContextProvider>
            </MantineProvider>
        </>
    );
}
