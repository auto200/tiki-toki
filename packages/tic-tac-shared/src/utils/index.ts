import { ZodTypeAny, z } from "zod";

export const isNotNullable = <T>(a: T | null | undefined): a is T => a !== null && a !== undefined;

export const assertNotReachable = (x: never) => {
    throw new Error("this code should not be reachable");
};

export function validateEnv<T extends ZodTypeAny>(
    schema: T,
    envs: Record<string, string | undefined> = process?.env || {},
): z.infer<T> {
    const result = schema.safeParse(envs);

    if (!result.success) {
        throw new Error(`Configuration validation error, ${result.error.message}`);
    }
    return result.data;
}
