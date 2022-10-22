import dotenv from "dotenv";
import express, { Express } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import { assertNotReachable, ClientStatus, SocketEvent } from "tic-tac-shared";
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
    //dunno why it's breaking all the time
    cors: { origin: "*" },
});

const playersRegistryService = new PlayersRegistryService();
const gameRoomsService = new GameRoomsService(io);
const pairingQueueService = new PairingQueueService(gameRoomsService);

io.on(SocketEvent.connection, (socket: Socket) => {
    console.log("player connected", socket.id);
    const player = new GamePlayer(socket);
    playersRegistryService.addPlayer(player);

    socket.on(
        SocketEvent.joinQueue,
        () => player.state.status === ClientStatus.IDLE && pairingQueueService.joinQueue(player),
    );
    socket.on(
        SocketEvent.leaveQueue,
        () =>
            player.state.status === ClientStatus.IN_QUEUE && pairingQueueService.leaveQueue(player),
    );

    //todo: figure out how to handle reconnecting players
    socket.on(SocketEvent.disconnect, () => {
        switch (player.state.status) {
            case ClientStatus.IDLE: {
                break;
            }
            case ClientStatus.IN_QUEUE: {
                pairingQueueService.leaveQueue(player);
                break;
            }
            case ClientStatus.IN_GAME: {
                gameRoomsService.playerLeft(player);
                break;
            }
            default: {
                assertNotReachable(player.state);
            }
        }

        playersRegistryService.removePlayer(player);
        console.log("player disconnected", socket.id);
    });
});
