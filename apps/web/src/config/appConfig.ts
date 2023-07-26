import { validateEnv } from "tic-tac-shared";
import { z } from "zod";

const appConfigSchema = z.object({
    NEXT_PUBLIC_GAME_SERVER_URL: z.string().url(),
});

const appConfigEnvs = {
    NEXT_PUBLIC_GAME_SERVER_URL: process.env.NEXT_PUBLIC_GAME_SERVER_URL,
};

export const appConfig = validateEnv(appConfigSchema, appConfigEnvs);
