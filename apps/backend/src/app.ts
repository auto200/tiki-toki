import express, { Express } from "express";

export const initApp = () => {
    const app: Express = express();

    return app;
};
