import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
    preset: "ts-jest",
    testPathIgnorePatterns: ["<rootDir>/dist/"],
    transformIgnorePatterns: ["node_modules"],
};
export default config;
