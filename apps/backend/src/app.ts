import express, { Express } from "express";

export const initApp = (): Express => {
    const app = express();

    app.get("/ping", (_, res) => res.send("pong"));

    return app;
};
