import dotenv from "dotenv";

import { initApp } from "./app";
import { initSocket } from "./socket";
import { createRootService } from "./config/rootService";

dotenv.config();
const port = process.env.PORT || 5000;

const app = initApp();

const server = app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

const rootService = createRootService();

initSocket(server, rootService);
