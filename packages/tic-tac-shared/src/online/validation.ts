import { z } from "zod";

export const socketEventPayloadMakeMoveSchema = z.object({
    selectedPieceId: z.string(),
    cellId: z.string(),
});

export type SocketEventPayloadMakeMove = z.infer<typeof socketEventPayloadMakeMoveSchema>;
