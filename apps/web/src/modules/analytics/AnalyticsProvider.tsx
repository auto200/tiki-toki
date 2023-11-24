import { piwikProConfig } from "config/piwikProConfig";
import dynamic from "next/dynamic";

const PiwikProProvider = dynamic(import("@piwikpro/next-piwik-pro"), { ssr: false });

type AnalyticsProviderProps = { children: React.ReactNode };

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
    if (!piwikProConfig) {
        return <>{children}</>;
    }

    return (
        <PiwikProProvider
            containerId={piwikProConfig.NEXT_PUBLIC_PIWIK_CONTAINER_ID}
            containerUrl={piwikProConfig.NEXT_PUBLIC_PIWIK_CONTAINER_URL}
        >
            {children}
        </PiwikProProvider>
    );
}
