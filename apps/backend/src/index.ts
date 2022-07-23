import dotenv from "dotenv";
import express, { Express } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import { SocketEvent } from "tic-tac-shared";
import { GamePlayer } from "./entities/GamePlayer";
import { GameRoomsService } from "./services/GameRoomsService";
import { PairingQueueService } from "./services/PairingQueueService";
import { PlayersRegistryService } from "./services/PlayersRegistryService";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

const io = new SocketIOServer(server, {
    //todo: restrict origin
    cors: { origin: "*" },
});

const playersRegistryService = new PlayersRegistryService();
const gameRoomsService = new GameRoomsService();
const pairingQueueService = new PairingQueueService(gameRoomsService, io);

io.on(SocketEvent.connection, (socket: Socket) => {
    console.log("player connected", socket.id);
    const player = new GamePlayer(socket, pairingQueueService, gameRoomsService);
    playersRegistryService.addPlayer(player);

    //todo: figure out how to handle reconnecting players
    socket.on(SocketEvent.disconnect, () => {
        console.log("player disconnected", socket.id);
        playersRegistryService.removePlayer(player);
    });
});
