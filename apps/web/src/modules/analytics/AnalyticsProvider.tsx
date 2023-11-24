import { piwikProConfig } from "config/piwikProConfig";
import PiwikProProvider from "@piwikpro/next-piwik-pro";

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
