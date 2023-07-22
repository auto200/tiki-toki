import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import {
    assertNotReachable,
    ClientStatus,
    SocketEvent,
    socketEventPayloadMakeMoveSchema,
} from "tic-tac-shared";
import { GamePlayer } from "@entities/GamePlayer";
import { RootService } from "@config/rootService";
import { GameRoom } from "@entities/GameRoom";
import { validateSocketPayload } from "@common/validateSocketPayload";

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

            sendGameStateToPlayers(io, gameRoom);
        });

        socket.on(SocketEvent.leaveQueue, () => {
            if (player.state.status !== ClientStatus.IN_QUEUE) {
                return socket.emit(SocketEvent.error, "Player is not in queue");
            }

            pairingQueueService.leaveQueue(player);

            socket.emit(SocketEvent.clientState, player.state);
        });

        socket.on(
            SocketEvent.makeMove,
            validateSocketPayload(
                socketEventPayloadMakeMoveSchema,
                payload => {
                    if (player.state.status !== ClientStatus.IN_GAME) {
                        return socket.emit(SocketEvent.error, "Player is not in game");
                    }

                    const gameRoom = gameRoomsService.getRoomById(player.state.game.id);

                    if (!gameRoom) {
                        return socket.emit(SocketEvent.error, "Player is not in a game");
                    }

                    try {
                        gameRoom.makeMove(payload);
                        sendGameStateToPlayers(io, gameRoom);
                    } catch (err) {
                        return socket.emit(SocketEvent.error, err);
                    }
                },
                err => socket.emit(SocketEvent.payloadError, err),
            ),
        );

        socket.on(SocketEvent.leaveEndedGame, () => {
            if (player.state.status !== ClientStatus.IN_GAME) {
                return socket.emit(SocketEvent.error, "Player is not in game");
            }

            if (player.state.game.state.state !== "ENDED") {
                return socket.emit(SocketEvent.error, "Game has not ended yet");
            }

            const gameRoomToClose = gameRoomsService.getRoomById(player.state.game.id);
            if (!gameRoomToClose) return;

            // close gameRoom
            gameRoomsService.playerLeft(gameRoomToClose);

            sendGameStateToPlayers(io, gameRoomToClose);
        });

        socket.on(SocketEvent.rematchProposition, () => {
            if (player.state.status !== ClientStatus.IN_GAME) {
                return socket.emit(SocketEvent.error, "Player is not in game");
            }

            if (player.state.game.state.state === "PLAYING") {
                return socket.emit(SocketEvent.error, "Game is still in progress");
            }

            const gameRoom = gameRoomsService.getRoomById(player.state.game.id);
            if (!gameRoom) return;

            if (gameRoom.isPlayerReadyToRematch(player)) {
                return socket.emit(
                    SocketEvent.error,
                    "Player already declared itself ready to rematch",
                );
            }

            gameRoom.proposeRematch(player);

            if (!gameRoom.areAllPlayersReadyToRematch) {
                return sendGameStateToPlayers(io, gameRoom);
            }
            const oldGameRoom = gameRoom;
            const newGameRoom = gameRoomsService.rematch(oldGameRoom);

            sendGameStateToPlayers(io, newGameRoom);
        });

        //todo: figure out how to handle reconnecting players
        socket.on(SocketEvent.disconnect, () => {
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
                    const gameRoom = gameRoomsService.getRoomById(player.state.game.id);
                    if (!gameRoom) return;

                    gameRoomsService.playerLeft(gameRoom);

                    sendGameStateToPlayers(io, gameRoom);

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

function sendGameStateToPlayers(io: SocketIOServer, gameRoom: GameRoom) {
    io.in(gameRoom.player1.id).emit(SocketEvent.clientState, gameRoom.player1.state);
    io.in(gameRoom.player2.id).emit(SocketEvent.clientState, gameRoom.player2.state);
}
