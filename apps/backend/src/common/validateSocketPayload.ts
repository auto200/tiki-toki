import { z } from "zod";

export function validateSocketPayload<T extends z.ZodTypeAny>(
    schema: T,
    onSuccess: (payload: z.infer<T>) => void,
    onError: (error: z.ZodError["issues"]) => void,
): (payload: unknown) => void {
    return payload => {
        const result = schema.safeParse(payload);

        if (result.success) {
            return onSuccess(result.data);
        }

        onError(result.error.issues);
    };
}
