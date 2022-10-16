import { Box, Button, Center, Stack } from "@mantine/core";
import React from "react";
import { assertNotReachable, ClientStatus, Players } from "tic-tac-shared";
import { GameView } from "./components/GameView";
import { useOnlineGame } from "./hooks/useOnlineGame";

export const OnlineGame: React.FC = () => {
    const { state, joinQueue, leaveQueue, makeMove } = useOnlineGame();

    switch (state.status) {
        case ClientStatus.IDLE: {
            return (
                <Box>
                    <Button disabled>Create Lobby</Button>
                    <Button onClick={joinQueue}>Find Game</Button>
                </Box>
            );
        }
        case ClientStatus.IN_QUEUE: {
            return (
                <Stack>
                    <Center>in Queue</Center>
                    <Box>
                        <Button onClick={leaveQueue}>Leave Queue</Button>
                    </Box>
                </Stack>
            );
        }
        case ClientStatus.IN_GAME: {
            return (
                <GameView
                    game={state.game}
                    makeMove={makeMove}
                    allyPlayerKey={state.playerKey}
                    enemyPlayerKey={Players.getOtherPlayerKey(state.playerKey)}
                />
            );
        }
        default: {
            assertNotReachable(state);
        }
    }
};
