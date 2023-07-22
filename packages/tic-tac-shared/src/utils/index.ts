export * from "./constants";
export * from "./models";
export * from "./socketEvents";
export * from "./validation";

export const isNotNullable = <T>(a: T | null | undefined): a is T => a !== null && a !== undefined;
export const assertNotReachable = (x: never) => {
    throw new Error("this code should not be reachable");
};
