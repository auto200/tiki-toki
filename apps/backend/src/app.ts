import express, { Express } from "express";

export const initApp = (): Express => {
    const app = express();

    return app;
};
