import { GAME_SERVER_URL } from "common/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ClientStatus, PlayerState, SocketEvent } from "tic-tac-shared";

type Listener = { register: () => void; unregister: () => void };

export const useOnlineGame = () => {
    const [state, setState] = useState<PlayerState>({ status: ClientStatus.IDLE });

    const socket = useRef(
        io(GAME_SERVER_URL, {
            autoConnect: false,
        }),
    ).current;

    const globalListeners = useMemo<Listener>(
        () => ({
            register: () => {
                socket.on(SocketEvent.clientState, (state: PlayerState) => setState(state));
            },
            unregister: () => {
                socket.off(SocketEvent.clientState);
            },
        }),
        [socket],
    );

    useEffect(() => {
        socket.connect();
        globalListeners.register();

        return () => {
            globalListeners.unregister();
            socket.disconnect();
        };
    }, [socket, globalListeners]);

    const joinQueue = () => {
        socket.emit(SocketEvent.joinQueue);
    };
    const leaveQueue = () => {
        socket.emit(SocketEvent.leaveQueue);
    };

    return { state, joinQueue, leaveQueue };
};
