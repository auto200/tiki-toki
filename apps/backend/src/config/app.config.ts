import { z } from "zod";

import { validateEnv } from "./validateConfig";

const appConfigSchema = z.object({
    PORT: z.preprocess(val => Number.parseInt(String(val), 10), z.number().positive()),
    CORS_ORIGIN: z.string().url().optional(),
});

export const appConfig = validateEnv(appConfigSchema);
