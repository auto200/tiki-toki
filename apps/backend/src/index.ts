import "dotenv/config";

import { appConfig } from "@config/app.config";
import { createRootService } from "@config/rootService";

import { initApp } from "./app";
import { initSocket } from "./socket";

const rootService = createRootService();

const app = initApp();

const server = app.listen(appConfig.PORT, () => {
    console.log(`Server is running at https://localhost:${appConfig.PORT}`);
});

initSocket(server, rootService);
