import { ZodObject, ZodRawShape, z } from "zod";

export const socketEventPayloadMakeMoveSchema = z.object({
    selectedPieceId: z.string(),
    cellId: z.string(),
});

export type SocketEventPayloadMakeMove = z.infer<typeof socketEventPayloadMakeMoveSchema>;

export function validateEnv<T extends ZodObject<ZodRawShape>>(
    schema: T,
    envs: Record<string, string | undefined> = process?.env || {},
): z.infer<T> {
    const result = schema.safeParse(envs);

    if (!result.success) {
        throw new Error(`Configuration validation error, ${result.error.message}`);
    }
    return result.data;
}
