export const isNotNullable = <T>(a: T | null | undefined): a is T => a !== null && a !== undefined;
