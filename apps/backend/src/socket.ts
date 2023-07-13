import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import {
    assertNotReachable,
    ClientStatus,
    SocketEvent,
    SocketEventPayloadMakeMove,
} from "tic-tac-shared";
import { GamePlayer } from "./entities/GamePlayer";
import { RootService } from "./config/rootService";

export const initSocket = (
    server: Server,
    { gameRoomsService, pairingQueueService, playersRegistryService }: RootService,
) => {
    const io = new SocketIOServer(server, {
        //todo: restrict origin
        //dunno why it's breaking all the time
        cors: { origin: "*" },
    });

    io.on(SocketEvent.connection, (socket: Socket) => {
        console.log("player connected", socket.id);
        const player = new GamePlayer(socket.id);
        playersRegistryService.addPlayer(player);

        socket.on(SocketEvent.joinQueue, () => {
            if (player.state.status !== ClientStatus.IDLE) {
                return socket.emit(SocketEvent.error, "Player is not IDLE, could not join queue");
            }

            const playersPair = pairingQueueService.joinQueue(player);

            if (!playersPair) {
                return socket.emit(SocketEvent.clientState, player.state);
            }

            const gameRoom = gameRoomsService.createGame(...playersPair);
            playersPair.forEach(player => {
                io.in(player.id).socketsJoin(gameRoom.id);
                io.to(player.id).emit(SocketEvent.clientState, player.state);
            });
        });

        socket.on(SocketEvent.leaveQueue, () => {
            if (player.state.status !== ClientStatus.IN_QUEUE) {
                return socket.emit(SocketEvent.error, "Player is not in queue");
            }

            pairingQueueService.leaveQueue(player);

            socket.emit(SocketEvent.clientState, player.state);
        });

        // TODO: runtime payload validation
        socket.on(SocketEvent.makeMove, (payload: SocketEventPayloadMakeMove) => {
            if (player.state.status !== ClientStatus.IN_GAME) {
                return socket.emit(SocketEvent.error, "Player is not in game");
            }

            const gameRoom = gameRoomsService.getRoomById(player.state.game.id);

            if (!gameRoom) {
                return socket.emit(SocketEvent.error, "Player is not in a game");
            }

            try {
                gameRoom.makeMove(payload);
                io.to(gameRoom.player1.id).emit(SocketEvent.clientState, gameRoom.player1.state);
                io.to(gameRoom.player2.id).emit(SocketEvent.clientState, gameRoom.player2.state);
            } catch (err) {
                return socket.emit(SocketEvent.error, err);
            }
        });

        socket.on(SocketEvent.leaveEndedGame, () => {
            if (player.state.status !== ClientStatus.IN_GAME) {
                return socket.emit(SocketEvent.error, "Player is not in game");
            }

            if (player.state.game.state.state !== "ENDED") {
                return socket.emit(SocketEvent.error, "Game has not ended yet");
            }

            const game = gameRoomsService.getRoomById(player.state.game.id);
            if (!game) return;

            const playersToNotify = gameRoomsService.playerLeft(player);
            if (!playersToNotify) return;

            io.socketsLeave(game.id);
            playersToNotify.forEach(player => {
                io.in(player.id).emit(SocketEvent.clientState, player.state);
            });
        });

        //todo: figure out how to handle reconnecting players
        socket.on(SocketEvent.disconnect, () => {
            console.log(player.state.status);
            switch (player.state.status) {
                case ClientStatus.IDLE: {
                    break;
                }
                case ClientStatus.IN_QUEUE: {
                    console.log("leaving queue");
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
};
