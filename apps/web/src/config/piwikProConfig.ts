import { z } from "zod";

import { validateEnv } from "tic-tac-shared/utils";

const piwikProConfigSchema = z
    .object({
        NEXT_PUBLIC_PIWIK_CONTAINER_ID: z.string().optional(),
        NEXT_PUBLIC_PIWIK_CONTAINER_URL: z.string().url().optional(),
    })
    .transform(config => {
        const values: Array<string | undefined> = Object.values(config);
        if (values.length === 0 || values.includes(undefined)) return null;

        return config as Required<typeof config>;
    });

export const piwikProConfig = validateEnv(piwikProConfigSchema, {
    NEXT_PUBLIC_PIWIK_CONTAINER_ID: process.env.NEXT_PUBLIC_PIWIK_CONTAINER_ID,
    NEXT_PUBLIC_PIWIK_CONTAINER_URL: process.env.NEXT_PUBLIC_PIWIK_CONTAINER_URL,
});
