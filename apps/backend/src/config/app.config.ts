import { validateEnv } from "tic-tac-shared";
import { z } from "zod";

const appConfigSchema = z.object({
    PORT: z.preprocess(val => Number.parseInt(String(val), 10), z.number().positive()),
    CORS_ORIGIN: z.string().url().optional(),
});

export const appConfig = validateEnv(appConfigSchema);
