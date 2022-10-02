import { Box, Button, Stack } from "@mantine/core";
import React from "react";
import { assertNotReachable, ClientStatus } from "tic-tac-shared";
import { useOnlineGame } from "./hooks/useOnlineGame";

export const OnlineGame: React.FC = () => {
    const { state, joinQueue, leaveQueue } = useOnlineGame();

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
                    <Box>in Queue</Box>
                    <Box>
                        <Button onClick={leaveQueue}>Leave Queue</Button>
                    </Box>
                </Stack>
            );
        }
        case ClientStatus.IN_GAME: {
            return <div>GAME</div>;
        }
        default: {
            assertNotReachable(state);
        }
    }
};
